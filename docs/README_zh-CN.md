# Debug LeetCode

# 注意

> Debug LeetCode 可以和 (vscode-leetcode)[https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-leetcode]一起工作。

### 调试题目

![debug](https://raw.githubusercontent.com/jdneo/vscode-debug-leetcode/master/docs/gifs/debug.gif)

> 当前 debug-leetcode 仅仅支持 Python3 和 Javascript 语言，未来我们会支持更多支持 vscode debug protocal 的语言, 欢迎大家踊跃 PR 其他语言，我的下一步计划是支持 c 和 c++

> 不是所有的题目都支持（支持大部分免费题目），只有支持的题目才有调试选项

> 如果你有关于调试功能的任何问题，欢迎[创建 issue](https://github.com/wangtao0101/vscode-debug-leetcode/issues/new?template=bug.md)

-   Python3 调试的必要条件

    -   步骤 1. 在系统上安装对应版本的 python3 (注意: 系统安装的 Python 不支持)。

    -   Step 2. 安装 vscode 的 Python 插件。

-   Javasript 调试的必要条件

    无

# 小心 ❗️

插件会在当前文件中生成一些桩代码，例如：

For python:

```python
# @before-stub-for-debug-begin
from python3problem1 import *
from typing import *
# @before-stub-for-debug-end
```

For javascript

```js
// @after-stub-for-debug-begin
module.exports = twoSum;
// @after-stub-for-debug-end
```

如果你一不小心删除了一些桩代码并且忘记还原了，你可以彻底删除所有的桩代码，插件会在下次 debug 的时候重新生成.

---
