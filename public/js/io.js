!function(){var e=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};$(function(){var t,n,i,r,o,s,a;return $(".alert").hide(),$("button.close").click(function(e){return e.currentTarget.parentElement.style.display="none"}),a=io.connect(),s=window.location.pathname.substr(1),r=!0,n=[],t=$("#Articles"),a.on("connect",function(){var e;return o()?(a.emit("connect stream",s),r&&(a.emit("sync stream",s),""===t.html()&&$("#NoFeedIsAdded").show(),r=!1),setInterval(function(){return console.log("sync"),a.emit("sync stream",s)},6e4),$("#FindFeedButton").click(function(){var e;return $("#NoFeedIsFound").hide(),e=$("#FindFeedInput").val(),a.emit("find feed",e)}),a.on("found feed",function(e,t){var n,i,r,o;if(null!=e&&$("#NoFeedIsFound").show(),null!=t.candidates){for($("#CandidatesModalWindow").find("#CandidatesList").html(""),o=t.candidates,i=0,r=o.length;r>i;i++)n=o[i],n.sitetitle=""+n.sitename+" - "+(n.title||"feed"),n.siteurl=t.url,$("#CandidatesList").append(ViewHelper.candCheckbox(n));return $("#CandidatesModalWindow").modal()}}),a.on("sync completed",function(t){var n,r,o,s;for(r=_.sortBy(t,function(e){return Date.parse(e.page.pubDate)}),0!==t.length&&$("#NoFeedIsAdded").hide(),o=0,s=r.length;s>o;o++)n=r[o],i(n);return e(),r.length>0?$("#NewArticleIsAdded").show().fadeIn(500):void 0}),$("#EditFeedButton").click(function(){return a.emit("get feed_list",s)}),a.on("got feed_list",function(e){var t,n,i;if(null!=e){for($("#EditFeedModalWindow").find("#FeedList").html(""),n=0,i=e.length;i>n;n++)t=e[n],$("#FeedList").append(ViewHelper.feedList(t));return $("#EditFeedModalWindow").modal()}}),$("#ApplyEditFeedButton").click(function(){var e;return e=[],$("#EditFeedModalWindow").find("#FeedList").find(":checkbox:checked").each(function(){return e.push($(this).attr("url"))}),a.emit("edit feed_list",{urls:e,stream:s})}),a.on("edit completed",function(){return $("#FeedListIsEditted").show(),n=[],t.html(""),console.log("sync by feed_list editted"),a.emit("sync stream",s)}),$("#AddFeedButton").click(function(){var e;return e=[],$("#CandidatesList").find(":checkbox:checked").each(function(){return e.push({url:$(this).val(),title:$(this).attr("title"),siteurl:$(this).attr("siteurl")})}),0!==e.length?a.emit("add feed",{urls:e,stream:s}):void 0}),a.on("add-feed succeed",function(){return $("#NewFeedIsAdded").show(),console.log("sync"),a.emit("sync stream",s)}),e=function(){return $(".fancy").fancybox({fitToView:!1,width:"70%",height:"100%",autoSize:!0,closeClick:!0,openEffect:"none",closeEffect:"none"}),$(".read-more").click(function(){var e;return e=$(this).parent(),e.find("a.fancy").click()}),$(".starredButton").click(function(){var e,t;return e=$(this).parent().parent(),t=$(this).attr("value"),"star"===t?a.emit("add star",{domid:e.attr("id")}):"unstar"===t?a.emit("delete star",{domid:e.attr("id"),stream:s}):void 0}),a.on("star added",function(e){var t;return t=$(document).find("#"+e.domid),t.find("span.starred").html(ViewHelper.starredIcon(!0)),t.find("span.starButton").html(ViewHelper.starredButton(!0))}),a.on("star deleted",function(e){var t;return t=$(document).find("#"+e.domid),t.find("span.starred").html(ViewHelper.starredIcon(!1)),t.find("span.starButton").html(ViewHelper.starredButton(!1))}),$(".submitComment").click(function(){var e,t;return e=$(this).parent(),t=e.find(".inputComment").val(),null!=t?a.emit("add comment",{domid:e.attr("id"),comment:t,stream:s}):void 0}),a.on("comment added",function(e){var t,n,i,r,o;for(t=$(document).find("#"+e.domid),t.find(".comments").html(""),o=e.comments,i=0,r=o.length;r>i;i++)n=o[i],t.find(".comments").append("<blockquote>"+n+"</blockquote>");return t.find(".commentsLength").text(e.comments.length)}),a.on("error",function(){return $("#SomethingWrong").show()})}):$("#GoButton").click(function(){return window.location.href=$("#GoInput").val()})}),o=function(){return""===s?!1:!0},i=function(i){var r,o,s,a,d,c,l,u,m,f,p,h;for(m={title:i.page.title,id:i.page._id,comments:i.page.comments,description:i.page.description,pubDate:i.page.pubDate,url:i.page.url,sitename:i.feed.title,siteurl:i.feed.site,starred:i.page.starred},o="",h=i.page.comments,f=0,p=h.length;p>f;f++)r=h[f],o+=ViewHelper.comment(r);return u=t.find("li:first").attr("pubDate"),c=Date.parse(m.pubDate),d=c>=u,a=void 0===u,l=m.title,s=e.call(n,l)>=0,d&&!s||a?(t.prepend(ViewHelper.mediaHead(m)+o+ViewHelper.mediaFoot(m)).hide().fadeIn(500),n.push(l)):void 0}})}.call(this);