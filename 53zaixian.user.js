// ==UserScript==
// @name         53zaixian
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://res.53zaixian.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=53zaixian.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    async function downloadImage(imageSrc, name) {
        const image = await fetch(imageSrc);
        const imageBlog = await image.blob();
        const imageURL = URL.createObjectURL(imageBlog);

        const link = document.createElement('a');
        link.href = imageURL;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function download(bookid) {
        fetch("https://res.53zaixian.com/api/ebook/book/detail", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,de;q=0.7",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": "https://res.53zaixian.com/ebook/detail?id=" + bookid,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"shelf_id\":\"" + bookid + "\"}",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        }).then(v=>v.json()).then(v=>v.data.book.book_res).then(t=>t.forEach(act=>{
            let name = act.img_thumb_url.split('/');
            name = name[name.length - 1];
            downloadImage(act.img_thumb_url, name);
        }
                                                                            ));
    }
    function downloadAll(){
        var myregexp = /https:\/\/res\.53zaixian\.com\/ebook\/detail\?id=(\d*)/i;
        var match = myregexp.exec(location.href);
        if (match != null) {
            let result = match[1];
            
            download(result);
        } else {
            result = "";
        }
    }
let a = document.createElement('a');
            a.innerText = "下载所有";
            a.style.position = 'fixed';
            a.style.top = '2rem';
            a.style.right = '2rem';
            a.style.zIndex = '2222222';
            document.body.appendChild(a);
            a.href = 'javascript:void(0)';
     a.onclick = downloadAll;

    // Your code here...
})();
