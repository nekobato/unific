!function(){var e;e="undefined"!=typeof exports&&null!==exports?exports:this,e.routes=function(e){return{attachSingleEvent:function(){return e.on("error",function(){return showFade($SomethingWrong)}),$GoButton.click(function(){return HomeEvent.goStream()}),$FindFeedButton.click(function(){return StreamEvent.requestFindFeed(e)}),e.on("found feed",function(e,t){return StreamEvent.receivedFoundFeed(e,t)}),e.on("sync completed",function(e){return StreamEvent.syncArticles(e)}),$UsageButton.click(function(){return DomEvent.pushedUsage()}),$InputImage.change(function(t){return DomEvent.requestUploadImage(t,e)}),e.on("bg uploaded",function(e){return DomEvent.receivedUploadImage(e)}),$ClearBackground.click(function(){return DomEvent.requestClearBg()}),e.on("bg cleared",function(){return DomEvent.receivedClearBg()}),$InputDesc.keyup(function(){return DomEvent.requestChangeDesc(e)}),e.on("desc changed",function(e){return DomEvent.receivedChangeDesc(e)}),$EditFeedButton.click(function(){return FeedEvent.requestFeedList(e)}),e.on("got feed_list",function(e){return FeedEvent.receivedFeedList(e)}),$ApplyEditFeed.click(function(){return FeedEvent.requestEditFeedList(e)}),e.on("edit completed",function(){return FeedEvent.receivedEditFeedList(e)}),$AddFeedButton.click(function(){return FeedEvent.requestAddFeed(e)}),e.on("add-feed succeed",function(){return FeedEvent.receivedAddFeed()}),e.on("star added",function(t){return PageEvent.receivedAddStar(t,e)}),e.on("star deleted",function(t){return PageEvent.receivedDeleteStar(t,e)}),e.on("comment added",function(e){return PageEvent.receivedAddComment(e)})},attachDomEvent:function(t){return configureFancyBox(t),t.find(".read-more").click(function(){return PageEvent.requestReadMore(t,e)}),t.find(".submitComment").click(function(){return PageEvent.requestSubmitComment(t,e)}),t.find(".starredButton").click(function(){return PageEvent.requestChangeStar(t,e)})}}}}.call(this);