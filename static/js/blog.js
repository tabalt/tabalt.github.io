window.onload = function () {
    //新窗口打开站外链接
    var links = document.links;
    for (var i = 0, linksLength = links.length; i < linksLength; i++) {
       if (links[i].hostname != window.location.hostname) {
           links[i].target = '_blank';
           links[i].rel = 'nofollow';
       } 
    }

    //生成文章索引
    buildArticleIndex();
}

function buildArticleIndex() {
    
    var ai = $(".article-index");
    if (ai.length > 0) {
        atl = ai.parent();
        hs = atl.children('h1,h2,h3,h4,h5,h6');

        var lh = 0, ulc = 0;
        var s = "";
        for (var i = 0; i < hs.length; i++) {
            var h = parseInt(hs[i].tagName.substr(1), 10);
            if (!lh) {
                lh = h;
            }

            if (h > lh) {
                s += '\n\t<ul>\n\t';
                ulc++;
            } else if (h < lh && ulc > 0) {
                s += '</ul>\n';
                ulc--;
            }

            if (h == 1) {
                while (ulc > 0) {
                    s += '</ul>';
                    ulc--;
                }
            }
            lh = h;

            ch = hs.eq(i);
            s += '<li><a href="#' + ch.attr('id') + '">' + ch.text() + '</a></li>\n';
        }

        if (s != "") {
            //<span><a href="">[-]</a></span>
            //<p>文章目录</p>
            s = '<ul>' + s + '</ul>';

            ai.append(s);
            ai.show();
        }          
    }
}