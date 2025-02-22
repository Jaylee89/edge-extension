// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-02-22
// @description  try to take over the world!
// @author       You
// @match        https://movie.douban.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douban.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

        // 保存原始的 fetch 方法
    const originalFetch = window.fetch;

    // 重写 fetch 方法
    window.fetch = async function (url, options) {
        const response = await originalFetch(url, options);

        // 检查是否是目标 URL
        if (url.includes('https://movie.douban.com/j/search_tags?type=tv&source=index')) {
            const clonedResponse = response.clone();
            const data = await clonedResponse.json();

            // 过滤数据
            const filteredData = data.tags.filter(item => item == "国产剧");

            console.log("拦截后的数据："+filteredData);

            // 返回新的响应
            return new Response(JSON.stringify(filteredData), {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            });
        }

        // 如果不是目标 URL，返回原始响应
        return response;
    };

    console.log('fetch 方法已重写');
})();