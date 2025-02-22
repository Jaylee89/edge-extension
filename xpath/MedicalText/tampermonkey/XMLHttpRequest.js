// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-02-22
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 保存原始的 XMLHttpRequest 方法
    const OriginalXHR = window.XMLHttpRequest;

    // 重写 XMLHttpRequest
    window.XMLHttpRequest = function () {
        const xhr = new OriginalXHR();

        // 保存原始的 open 和 send 方法
        const originalOpen = xhr.open;
        const originalSend = xhr.send;

        let requestUrl = '';

        // 重写 open 方法
        xhr.open = function (method, url) {
            console.log('重写 open 方法')
            requestUrl = url; // 保存请求的 URL
            originalOpen.apply(xhr, arguments);
        };

        // 重写 send 方法
        xhr.send = function (body) {
            // 监听 readystatechange 事件
            console.log('监听 readystatechange 事件')
            xhr.addEventListener('readystatechange', function () {
                console.log('监听 readystatechange 事件 entry')
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log('readyState is ready')
                    console.log('requestUrl:', requestUrl)
                    // 检查是否是目标 URL
                    if (requestUrl.includes('/j/search_tags?type=movie&tag=%E7%83%AD%E9%97%A8&source=index')) {
                        try {
                            // 解析响应数据
                            const responseText = xhr.responseText;
                            const data = JSON.parse(responseText);

                            // 过滤数据
                            const filteredData = filterData(data);

                            console.log('重写后的数据:', filteredData);

                            // 修改响应数据
                            Object.defineProperty(xhr, 'responseText', {
                                writable: true,
                                value: JSON.stringify(filteredData)
                            });
                        } catch (error) {
                            console.error('解析响应数据失败:', error);
                        }
                    }
                }
            });

            // 调用原始的 send 方法
            originalSend.apply(xhr, arguments);
        };

        return xhr;
    };

    // 示例过滤函数
    function filterData(data) {
        return data.tags.filter(item => item == "日本");
    }

    console.log('XMLHttpRequest 已重写');
})();