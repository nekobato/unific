!function(){var e,t,n=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};t="undefined"!=typeof exports&&null!==exports?exports:this,t.StreamEvent={syncArticles:function(t){var n,r,d,i,o;for(d=_.sortBy(t,function(e){return Date.parse(e.page.pubDate)}),0!==t.length&&$NoFeed.hide(),n=!1,i=0,o=d.length;o>i;i++)r=d[i],n=e(r);return n?showFade($NewArticle):void 0},requestFindFeed:function(e){return $NoFeedIsFound.hide(),e.emit("find feed",$FindFeedInput.val())},receivedFoundFeed:function(e,t){var n,r,d,i;if(null!=e&&$NoFeedIsFound.show(),null!=t.candidates){for($CandidatesList.html(""),i=t.candidates,r=0,d=i.length;d>r;r++)n=i[r],n.sitetitle=""+n.sitename+" - "+(n.title||"feed"),n.siteurl=t.url,$CandidatesList.append(ViewHelper.candCheckbox(n));return $CandidatesModal.modal()}}},e=function(e){var t,r,d,i,o,a,u,s,c;for(a={title:e.page.title,id:e.page._id,comments:e.page.comments,description:e.page.description,pubDate:e.page.pubDate,url:e.page.url,sitename:e.feed.title,favicon:e.feed.site.match(/http:\/\/.+?\//)+"favicon.ico",siteurl:e.feed.site,starred:e.page.starred},d="",c=e.page.comments,u=0,s=c.length;s>u;u++)r=c[u],d+=ViewHelper.comment(r);return o=a.title,i=n.call(Articles,o)>=0,null!=latestPubDate()&&i?!1:($Articles.prepend(ViewHelper.mediaHead(a)+d+ViewHelper.mediaFoot(a)).hide().fadeIn(500),t=$Articles.find("#"+a.id),router.attachDomEvent(t),Articles.push(o),!0)}}.call(this);