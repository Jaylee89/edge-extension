// 定义 console.save 方法
(function(console) {
    console.save = function(data, filename) {
        if (!data) {
            console.error('No data provided');
            return;
        }
        if (!filename) filename = 'console.json';

        // 创建 Blob 对象
        let blob = new Blob([data], { type: 'text/plain' });

        // 生成下载链接
        let url = URL.createObjectURL(blob);

        // 创建 <a> 标签并触发下载
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();

        // 释放 URL 对象
        URL.revokeObjectURL(url);
    };
})(console);

// 使用 console.save 保存内容

console.save(outputText, '果实菜谷禁忌并治.txt');