!function(){var e;e="undefined"!=typeof exports&&null!==exports?exports:this,e.path=window.location.pathname.substr(1),$(function(){var t;return $(".alert").hide(),$("button.close").click(function(e){return e.currentTarget.parentElement.style.display="none"}),_.isEmpty(path)?void 0:(t=io.connect(),e.router=routes(t),t.on("connect",function(){return t.emit("connect stream",path),router.attachSingleEvent(),$NoFeedIsAdded.show()(function(){return""===$Articles.html()?(t.emit("sync stream",{stream:path,latest:latestPubDate()}),setInterval(function(){return console.log("sync by 3 minutes"),t.emit("sync stream",{stream:path,latest:latestPubDate()})},18e4)):void 0}())}))})}.call(this);