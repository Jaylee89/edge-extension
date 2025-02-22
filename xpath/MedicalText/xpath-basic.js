/*xpath command*/

// 查找所有 div 元素
    //div

// 查找 class 为 example 的 div 元素。
    //div[@class='example]

// a元素中属性href包含example.com内容的原色
    //a[contains(@href, 'example.com')]：查找 href 包含 example.com 的 a 元素。

// div下完全匹配文本Hello World的元素
    //div[text()='Hello World']

// div下包含Hello的文本
    //div[contains(text(), 'Hello')]

// div下包含Hello的文本并且包含World的文本
    //div[contains(text(), 'Hello') and contains(text(), 'World')]

// 如果文本内容包含空白字符（如换行、空格等），可以使用 normalize-space() 函数去除空白后再匹配。
    //div[normalize-space(text())='Hello World']

// div下的span包含Hello的文本
    //div//span[text()='Hello']

// 匹配所有没有子元素且包含非空白文本的 div 节点。
    //div[not(*) and normalize-space(text())]
