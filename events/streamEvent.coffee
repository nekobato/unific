###

  StreamEvent.coffee

###

module.exports.StreamEvent = (app) ->

  async  = require 'async'
  RSS    = require 'rss'
  _      = require 'underscore'
  url    = require 'url'
  debug  = require('debug')('events/stream')

  Stream = app.get("models").Stream
  Feed   = app.get("models").Feed
  Page   = app.get("models").Page
  Subscribe   = app.get('models').Subscribe

  HelperEvent = app.get('events').HelperEvent app

  # HTTP EndPoint - Stream
  index: (req,res,next) ->
    title = req.params.stream
    Stream.findOne {title:title},(err,stream)->
      if err
        debug(err)
        return res.send 400,'Internal Server Error'

      if stream?
        return render(res,stream)

      else
        Stream.create
          title:title
          description:'description (click to edit)'
        ,(err,stream)->
          return render(res,stream)

  # HTTP Endpoint - RSS
  rss  : (req,res,next) ->
    title = req.params.stream
    HelperEvent.getArticlesByStreamWithLimit title,100,(err,articles)->
      return HelperEvent.httpError err,res if err
      return res.send 404,"Articles Not Found" if articles.length is 0

      feed = new RSS
        title: "#{title} - Unific"
        description: "Generated By Unific"
        feed_url: "http://unific.net/#{title}/rss"
        site_url: "http://unific.net/#{title}"
        author: "Unific"
        webMaster: "Unific"
        copyright: "2014 unific.net"
        pubDate: articles[0].page.pubDate


      for article in articles
        feed.item
          title: article.page.title
          description:article.page.description
          url: article.page.url
          author: article.feed.title # optional - defaults to feed author property
          date: article.page.pubDate

      xml = feed.xml()
      res.set
        "Content-Type": "text/xml"
      res.send xml

  subscribe:(req,res,next)->
    Stream.findOne title:req.params.stream,(err,stream)->
      return HelperEvent.httpError err,res if err or not stream

      model = JSON.parse req.body.model

      HelperEvent.detectCandidateType model,(err,type)->
        if type is "feed"

          Feed.findOneAndUpdate
            url       : model.url
          ,
            title     : model.title
            sitename  : model.sitename
            url       : model.url
            favicon   : model.favicon
            siteUrl   : model.link or model.siteUrl or model.url.split(model.href)[0]
          , upsert    : true ,(err,feed)->
            return HelperEvent.httpError(err,res) if err or not feed

            # データ更新&watcher
            # @todo ここらへんかなり密になっててやばい
            crowler     = app.get('crowler')
            crowler.addToSet feed

            stream.feeds.addToSet feed._id
            stream.save ->
              res.send 200
              return app.get('emitter').emit "subscribed",
                stream:stream
                model:feed

        else if type is "stream"
          Stream.findOne {_id: model._id},(err,targetStream)->
            return HelperEvent.httpError err,res if err or not stream

            stream.streams.addToSet targetStream._id
            stream.save ->
              res.send 200
              return app.get('emitter').emit "subscribed",
                stream:stream
                model:targetStream

  unsubscribe:(req,res,next)->
    Stream.findOne title:req.params.stream,(err,stream)->
      model = JSON.parse req.body.model
      return HelperEvent.httpError err,res if err or not stream or not model._id?

      HelperEvent.detectCandidateType model,(err,type)->
        return HelperEvent.httpError err,res if err or not type

        if type is "feed"

          stream.feeds.pull model._id
          stream.save ->
            res.send 200

            app.get('emitter').emit "unsubscribed",
              stream:stream
              model:model

        else if type is "stream"

          stream.streams.pull model._id
          stream.save ->
            res.send 200

            app.get('emitter').emit "unsubscribed",
              stream:stream
              model:model

###
# Private Methods
###
render = (res,stream)->
  res.render 'stream',
    stream:stream
