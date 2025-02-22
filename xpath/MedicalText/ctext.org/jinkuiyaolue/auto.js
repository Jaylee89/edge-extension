document.addEventListener('DOMContentLoaded', function() {

    clear()

    let titlePattern = "//td//h2"

    let titleResult = document.evaluate(titlePattern, document, null, XPathResult.STRING_TYPE, null).stringValue;

    let pattern = "//td[@class='ctext']"

    // 使用XPath匹配元素
    let result = document.evaluate(pattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    // 将匹配到的元素存储到数组中
    let nodes = [];
    for (let i = 0; i < result.snapshotLength; i++) {
        nodes.push(result.snapshotItem(i));
    }

    // 遍历数组内的文本
    let outputText = [];
    nodes.forEach(node => {
        console.log(node.textContent.trim()); // 输出节点的文本内容
        outputText.push(node.textContent.trim() + "\n")
    });

    console.save(outputText, titleResult.trim() + '.txt');

    console.log(titleResult.trim() + '.txt 导出完成！')
});