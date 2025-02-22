if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker 注册成功'))
        .catch(error => console.error('Service Worker 注册失败:', error));
}

// service-worker.js

const urlPattern = /^https:\/\/api\.example\.com\/data(\/.*)?(\?.*)?$/;
// url.includes('https://api.example.com/data')

// 监听 fetch 事件
self.addEventListener('fetch', (event) => {
    const url = event.request.url;

    // 检查是否是目标 URL
    if (urlPattern.test(url)) {
        // 拦截请求
        event.respondWith(
            fetch(event.request) // 发起原始请求
                .then(response => {
                    // 确保响应是 JSON 格式
                    if (response.headers.get('Content-Type').includes('application/json')) {
                        return response.json().then(data => {
                            // 过滤数据
                            const filteredData = filterData(data);

                            // 返回新的响应
                            return new Response(JSON.stringify(filteredData), {
                                headers: { 'Content-Type': 'application/json' }
                            });
                        });
                    }
                    // 如果不是 JSON 格式，返回原始响应
                    return response;
                })
                .catch(error => {
                    console.error('Fetch 失败:', error);
                    return new Response(JSON.stringify({ error: '请求失败' }), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                })
        );
    }
});

// 示例过滤函数
function filterData(data) {
    // 这里实现你的过滤逻辑
    return data.filter(item => item.someCondition);
}