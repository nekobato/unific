!function(){$(function(){var t,e,n,i,o,d;return $(".alert").hide(),$("button.close").click(function(t){return t.currentTarget.parentElement.style.display="none"}),d=io.connect(),o=window.location.pathname.substr(1),t=[],d.on("connect",function(){var s;return i()?(d.emit("connect stream",o),d.emit("sync stream",o),0===t.length&&$("#NoFeedIsAdded").show(),setInterval(function(){return console.log("sync"),d.emit("sync stream",o)},6e4),$("#FindFeedButton").click(function(){var t;return $("#NoFeedIsFound").hide(),t=$("#FindFeedInput").val(),d.emit("find feed",t)}),d.on("found feed",function(t,e){var n,i,o,d,s;if(null!=t&&$("#NoFeedIsFound").show(),null!=e.candidates){for($("#CandidatesModalWindow").find("#CandidatesList").html(""),s=e.candidates,o=0,d=s.length;d>o;o++)i=s[o],i.sitetitle=""+i.sitename+" - "+(i.title||"feed"),n="<li><input type='checkbox' siteurl="+e.url+" title= '"+i.sitetitle+"' value='"+i.url+"'>  "+i.sitetitle+"</li>",$("#CandidatesList").append(n);return $("#CandidatesModalWindow").modal()}}),d.on("sync completed",function(i){return n(t,i,function(n){var i,o,d;for(n.length>0?console.log("new article added"):console.log("no article added"),t=t.concat(n),t=_.uniq(t,function(t){return t.page._id}),0!==t.length&&$("#NoFeedIsAdded").hide(),o=0,d=n.length;d>o;o++)i=n[o],e(i);return s(),n.length>0?$("#NewArticleIsAdded").show().fadeIn(500):void 0})}),$("#AddFeedButton").click(function(){var t;return t=[],$("#CandidatesList").find(":checkbox:checked").each(function(){return t.push({url:$(this).val(),title:$(this).attr("title"),siteurl:$(this).attr("siteurl")})}),0!==t.length?d.emit("add feed",{urls:t,stream:o}):void 0}),d.on("add-feed succeed",function(){return $("#NewFeedIsAdded").show(),console.log("sync"),d.emit("sync stream",o)}),s=function(){return $(".btn-toggle").click(function(){var t;return t=$(this).parent(),"Close"===$(this).text()?(t.find("p.desc").show(),t.find("p.contents").hide(),$(this).text("Read More")):""!==t.find("p.contents").text()?(t.find("p.desc").hide(),t.find("p.contents").show(),t.find(".btn-toggle").text("Close")):d.emit("get page",{domid:t.attr("id"),url:t.find("a").attr("href")})}),d.on("got page",function(t){var e,n;return n=decodeURIComponent(t.res.content),e=$(document).find("#"+t.domid),e.find("p.desc").hide(),e.find("p.contents").show(),e.find("p.contents").html(n),e.find(".btn-toggle").text("Close")}),$(".submitComment").click(function(){var t,e;return t=$(this).parent(),e=t.find(".inputComment").val(),null!=e?d.emit("add comment",{domid:t.attr("id"),comment:e}):void 0}),d.on("comment added",function(t){var e,n;return e=$(document).find("#"+t.domid),e.find(".comments").append("<div class= 'well well-small'>"+t.comment+"</div><br>"),n=Number(e.find(".commentsLength").text()),e.find(".commentsLength").text(n+1)}),d.on("error",function(){return $("#SomethingWrong").show()})}):$("#GoButton").click(function(){return window.location.href=$("#GoInput").val()})}),i=function(){return""===o?!1:!0},n=function(t,e,n){var i,o;return o=_.map(t,function(t){return t.page._id}),i=_.filter(e,function(t){return _.contains(o,t.page._id)?!1:!0}),n(i)},e=function(t){var e,n,i,o,d,s,c,a,l,r,u,m,f;for(l=t.page.title,d=t.page._id,i=t.page.comments,o=t.page.description,s=moment(t.page.pubDate,"YYYYMMDD").fromNow(),r=t.page.url,c=t.feed.title,a=t.feed.site,n="",f=t.page.comments,u=0,m=f.length;m>u;u++)e=f[u],n+="        <div class= 'well well-small'>"+e+"</div>";return $("#Articles").prepend("    <li class='media well'>      <div class='media-body' id='"+d+"'>        <a href="+r+">          <h4 class='media-heading'>"+l+"               <a href='"+a+"''>               <small>"+c+"</small>            </a>          </h4>        </a>        <i class='icon-pencil'> "+s+"</i>        <i class='icon-comments-alt'>  Comments(<num class='commentsLength'>"+i.length+"</num>) </i>        <span class= 'starred'>          <i class='icon-star-empty'> starred</i>        </span>        <br><br>        <p class ='desc'>"+o+"</p>        <p class='contents'></p>        <div class='comments'>        "+n+"        </div>        <input type='text' placeholder='Comment...' class='inputComment input-medium search-query'>        <button  class='btn submitComment'><i class='icon-comment-alt'></i>  Comment</button>        <button class='btn btn-toggle'><i class='icon-hand-right'></i>  Read More</button>        <button class='btn btn-info'><i class='icon-star'></i>  Star</button>      </div>    </li>").hide().fadeIn(500)}})}.call(this);