###

  PageEvent.coffee

###

module.exports.PageEvent = (app) ->

  ###
  # socket.io events
  ###

  getContents:(socket,data) ->
    console.log data

  addStar: (socket,data) ->
    console.log data

  deleteStar: (socket,data) ->
    console.log data