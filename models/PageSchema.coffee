###

  pageSchema.coffee

  * title        [String]     ページのタイトル
  * description  [String]     見出し
  * url          [String]     元記事のurl
  * starred      [Number]       スターが付けられているか
  * feed         [ObjectId]   親Feed

###

Mongo = require 'mongoose'
async = require 'async'
_     = require 'underscore'

debug = require('debug')('models/page')

PageSchema = new Mongo.Schema
  title:       { type: String, index: yes }
  description: String
  url:         String
  starred:     { type: Boolean, default: false }
  pubDate:     Date
  comments:    [String]
  feed:        { type: Mongo.Schema.Types.ObjectId, ref: 'feeds' }

PageSchema.statics.findAndUpdateByArticles = (articles,feed,callback)=>
  pages = []
  async.forEach articles, (article,cb)=>
    desc = sanitizeHTML(article.description) if article.description
    @updateOne article, (page)->
      if page
        pages.push
          page: page
          feed: feed
  ,->
    callback pages

PageSchema.statics.updateOne = (article,callback)->
  @findOneAndUpdate
    title: article.link
    feed : feed._id
  ,
    title      :article.title
    url        :article.link
    feed       :feed._id
    pubDate    :article.pubdate
    description:desc
  , upsert: true , (err,page) ->
    if err
      debug(err)
      return callback(null)
    return callback(page)


###
# Private Method
###
sanitizeHTML = (str)->
  return str.replace /<(.+?)>/g, ''


exports.Page = Mongo.model 'pages', PageSchema
