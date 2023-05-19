
# 部分报错信息（3个）
## 1
```
Package "electron-builder" is only allowed in "devDependencies". Please remove it from the "dependencies" section in your package.json
```
## 翻译
```
包“electron-builder”只允许在“devDependencies”（开发依赖项）中使用。请将其从package.json中的“dependencies“（依赖项）部分删除
```
## 解决办法
- 把`electron-builder`从`dependencies`字段中删除
- 如果你的`dependencies`字段只有`electron-builder`，那就删掉整个`dependencies`
- 错误部分：
```json
"dependencies": {
  "electron-builder": "^22.4.1"//删掉
}
```

---
## 2
```
Unknown target: snap appimage  failedTask=build stackTrace=Error: Unknown target: snap appimage
```
## 翻译
```
未知目标：snap appimage 失败任务=构建堆栈跟踪=错误：未知目标：snap appimage
```
## 解决办法
- 这是因为`target`字段配置错误，修改一下就行了  
- `Electron-Builder`支持构建`Snap`和`AppImage`，上面这个错误是因为：
```json
"build": {
  "linux": {
    "target": [
      {
        "target": "Snap AppImage"//只能留一个
      }
    ]
  }
}
```
懂？

---
## 3
```
Invalid configuration object. electron-builder 22.14.13 has been initialized using a configuration object that does not match the API schema.
 - configuration.linux.target[0].target should be a string
```
## 翻译
```
无效的配置对象。使用与API模式不匹配的配置对象初始化了electron-builder
版本：22.14.13。
-configuration.linux.target[0].target应该是一个字符串
```
## 解决办法
- 把最里面的`target`的值改成字符串
- 我出现这个错误是因为：
```json
"build": {
  "linux": {
    "target": [
      {
        "target": ["flatpak","AppImage"]//改这个字符串
      }
    ]
  }
}
```