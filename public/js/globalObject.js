!function(){var e;e="undefined"!=typeof exports&&null!==exports?exports:this,e.Articles=[],e.showFade=function(e){return e.stop(!0,!0),e.toggle("fade",500).delay(3e3).toggle("fade",500)},e.latestPubDate=function(){return $Articles.find("li:first").attr("pubDate")},e.configureFancyBox=function(e){return e.find(".fancy").fancybox({fitToView:!1,width:"70%",height:"100%",autoSize:!0,closeClick:!0,openEffect:"none",closeEffect:"none"})}}.call(this);