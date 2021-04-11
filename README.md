# Debug LeetCode

> Solve LeetCode problems in VS Code and enjoy debugging

-   English Document | [中文文档](https://github.com/wangtao0101/vscode-debug-leetcode/blob/master/docs/README_zh-CN.md)

# Attention

> This extension should work with [vscode-leetcode](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-leetcode)

## Debug a Problem

![debug](https://raw.githubusercontent.com/wangtao0101/vscode-debug-leetcode/master/docs/gifs/debug.gif)

> Currently debug-leetcode only support Python3, Javascript and cpp language and in the future we will support more lanuages which support vscode debug protocal. Welcome to get PR for another language. My next plan is to support c and java.

> Not all problems are supported(most free problems are supported) and only supported problems have debug option.

> If you have any issue about the debug feature, you can [create a issue](https://github.com/wangtao0101/vscode-debug-leetcode/issues/new?template=bug.md) with detail information

## Python3 debug

### Requirement

-   Step 1. Install the [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) for Visual Studio Code.

-   Step 2. Install a supported version of Python3 on your system (note: that the system install of Python on macOS is not supported) and add python command to your environment.

## Cpp debug

### gdb

#### Requirement

-   Step 1. Install the [C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) for Visual Studio Code.

-   Step 2. Install [MinGW](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win32/Personal%20Builds/mingw-builds/installer/mingw-w64-install.exe/download) Windows or `sudo apt-get install build-essential gdb` for linux on your system and add gcc and gdb command to your environment.

-   Step 3. You'd better read the [document](https://code.visualstudio.com/docs/cpp/config-mingw) on vscode website about the example and how to debug cpp on corresponding system.

### MacOS clang

-   Step 1. Install the [C/C++ Clang Command Adapter](https://marketplace.visualstudio.com/items?itemName=mitaki28.vscode-clang) for Visual Studio Code.

-   Step 2. Install [CLang][document](https://code.visualstudio.com/docs/cpp/config-clang-mac) on vscode website.

-   Step 3. Set debug-leetcode.cppCompiler to clang

![clang](https://raw.githubusercontent.com/wangtao0101/vscode-debug-leetcode/master/docs/gifs/compiler.png)

## Javasript debug

Nothing just vscode

## Be careful ❗️

Extention will generate some stub code in your current file like:

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

If you delete some stub code and forget to restore, you can delete all the stub code and the extension will generate again in next debug.

---
