# 适合初学者的 gulp+requirejs 的项目模板

虽然，`webpack`已经大行其道。作为初学者，gulp 依然是最快的入门学习前端工作流的工具。本项目本着为中小型团队打造一个基于：gulp+sass+requirejs+es6+eslint+arttemplate 的基本的项目模板。

## gulp 相关应用

* js(用 requirejs 管理模块)
  * 压缩
  * 转码
  * 版本号
  * 自动修改注入 requirejs 的 paths
  * es6 转码
  * eslint 检测
  * 添加版本信息
* style
  * sass
  * 合并
  * 压缩
  * 加前缀
  * 打版本
  * sourcemap
* 图片压缩优化
* html
  * 压缩
  * 修改 url 地址
* 打包前清理
* 打包后拷贝目录

## 编辑器的一致性

* .editorconfig 文件控制编辑器的一致性
* eslint 校验一致性，并配置 vscode 自动修改符合 eslint 校验，可以安装 eslint 插件。

## 本地测试和代理配置

* 运行本地测试

```shell
$ npm run dev
```

本地启动服务器地址： http://localhost:8000

## 打包

```shell
$ npm run build

# 会把最终结果输出到dist目录
```
