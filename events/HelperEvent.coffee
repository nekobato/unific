###

  HelperEvent.coffee
  なんか切り分けできてないやつ

###

module.exports.HelperEvent = (app) ->

  finder = require 'find-rss'
  async  = require 'async'
  _      = require 'underscore'
  debug = require('debug')('events/helper')

  Stream = app.get('models').Stream
  Feed   = app.get('models').Feed
  Page   = app.get('models').Page

  # 汎用socket.ioエラー
  ioError: (err,socket)->
    # @todo エラー種別判定してメッセージ変える
    debug err
    console.trace err
    return socket.emit "serverError","Error:unhandled"

  # 汎用httpエラー
  httpError: (err,res)->
    debug err
    console.trace err
    return res.send 400,"Internal Server Error"

  # Streamが購読しうるモデル(現在Feed/Streamの二種)をDetectionする
  detectCandidateType:(model,callback)->
    return callback null,null if not model._id
    async.parallel [(cb)->
      Stream.findById model._id,(err,streams)->
        return cb err,null if err
        return cb null,null if _.isEmpty streams
        callback null,"stream"
    ,(cb)->
      Feed.findById model._id,(err,feeds)->
        return cb err,null if err
        return cb null,null if _.isEmpty feeds
        cb null,"feed"
    ],(err,result)->
      return callback err,null if err
      return callback null,_.without(result,null)[0]

  # find feed or stream
  findFeed:(req,res) ->
    streamName = decodeURIComponent req.query.stream
    Stream.findOne {title: streamName},(err,stream)->
      return @httpError err if err

      query = req.query.query

      # URLの場合
      if query.match /^(http:\/\/|https:\/\/)/
        finder query, (err,candidates)=>
          return @httpError err,res if err

          # Candidatesの中で既にインスタンスがあるものは置き換え
          resArray = []
          async.forEach candidates,(candidate,cb)->
            Feed.findOne
              url : candidate.url
            ,(err,feed)->
              if err or not feed
                candidate.subscribed = false
                resArray.push candidate
                return cb()
              else
                obj = feed.toObject() # 置き換え
                obj.subscribed = (stream.feeds.indexOf(feed._id) > -1)
                debug "#{obj.title} is Subscribed #{obj.subscribed} by #{streamName}"
                resArray.push obj
                return cb()
          ,->
            return res.json resArray

      # @todo ストリーム検索/フィード検索(キーワード検索)
      else
        Stream.findByTitle query,(err,streams)->
          return @httpError err,res if err
          resArray = []
          for candidate in streams
            continue if candidate._id.toString() is stream._id.toString()
            obj = candidate.toObject()
            obj.subscribed = (stream.streams.indexOf(candidate._id) > -1)
            debug "#{obj.title} is Subscribed #{obj.subscribed} by #{streamName}"
            resArray.push obj
          return res.json resArray

    # @todo ページ送り
    # @todo 時間かかりすぎ？
  getArticlesByStreamWithLimit:(streamName,limit,callback)->
    streamName = decodeURIComponent streamName
    Stream.findOne({title:streamName})
    .populate("streams")
    .exec (err,requestedStream)->
      return callback err,null if err
      streamArray = requestedStream.streams
      articles = []
      feedList = requestedStream.feeds
      for stream in streamArray
        feedList = _.union feedList,stream.feeds
      return callback null,[] if _.isEmpty feedList
      Feed.find
        _id:
          $in:feedList
      .populate
        path:'pages'
        limit: limit
        sort:
          pubDate:-1
      .exec (err,feeds)->
        return callback err,null if err
        for feed in feeds
          for page in feed.pages
            articles.push {feed:feed,page:page}
        articles.sort (a,b)->
          b.page.pubDate - a.page.pubDate
        return callback null,articles
