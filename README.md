# 前言
[Electron-Builder官网](https://electron.build)  
[Electron-Builder中文网]()  
本次我们使用`Electron-Builder`。这个比官方推荐的`Electron-Forge`好用。  
它除了`deb`和`rpm`包，还可以构建其他一些兼容的包，比如`AppImage`、`Snap`
- 但是大众好像不太喜欢这些格式，建议像`Node.js`一样，把源文件压缩到`tar.xz`里发布  
据说`Snap`运行速度慢，包很臃肿，权限问题不好解决
- `Electron-Forge`也可以构建`Snap`。但我试了，失败了，报错信息和官方文档都没什么用
- 其实[还不止这些](https://www.electron.build/configuration/linux)，但是`Flatpak`和`apk`都会出bug  

## 注：  
- `Flatpak`类似于`Snap`  
- `apk`是安卓`Android`的软件包格式  
可以正常构建，但是无法安装，[GitHub上](https://github.com/electron-userland/electron-builder/issues?q=apk)有人提过`Issues`了，一直没人解决，官方估计也不管了，反正我也有出过[apk的教程](https://www.bilibili.com/video/BV1x84y1n7b5)，期待`Electron-Forge`吧

## 它支持构建：

### Windows  
1. `msi` `Node.js就是这个格式`
2. `appx` `微软商店`
3. `nsis`

### MacOS
1. `dmg` `经典格式`
2. `pkg` `Node.js就是这个格式`
3. `mas`

### Linux
1. `deb` `适用于Debian，Ubuntu等`
2. `rpm` `适用于Fedora，RedHat等`
3. [Snap](https://snapcraft.io/)
4. [AppImage](https://appimage.org/)

## 其他
打包可以尝试用`Bun.js`（一个新的JS运行时，速度比Node.js快）  
[Bun.js官网](https://bun.sh/)  
似乎可以快一点？

# 初始化项目
官方的都多少有点问题，我就自己整合了一下  
[GitHub项目地址](https://github.com/abtye/electron-builder-init)
```sh
git clone https://github.com/abtye/electron-builder-init.git
cnpm install
```

# 系统依赖
因为Linux发行版众多，具体我不是非常清楚  
- `dpkg` 用于构建`deb`包
- `rpm` 用于构建`rpm`包
- `snapcraft` 用于构建`snap`包
- `FUSE` `AppImage`的运行依赖
[安装方法](https://github.com/AppImage/AppImageKit/wiki/FUSE)

# 构建配置和参数
[官方文档](https://www.electron.build/cli)

# Snap
[Snap官网的Electron文档](https://snapcraft.io/docs/electron-apps)
## 安装
由于没有给软件签名，所以要加上`--dangerous`属性
```sh
snap install 应用名称.snap --dangerous
```
## 怎么签名
不知道，等有空了我再研究

# Flatpak
- `Electron-Forge`和`Electron-Builder`原本都支持构建`Flatpak`，但我都出bug了
- Flatpak官方也有[文档](https://docs.flatpak.org/en/latest/electron.html)，但我按文档的做却失败了

# 运行AppImage
1. 打开终端  
2. 运行`./应用名称.AppImage`
3. 如果提示权限不够，就运行`chmod +x 应用名称.AppImage`
4. 缺什么包就装什么，顺便跟我说一声

# 跨芯片架构和平台
- 可以在`x86`架构上构建[ARM](https://www.arm.com/)架构的包  
支持的芯片架构：`x64` `ia32` `armv7l` `arm64`  
用法：加上芯片架构参数，如：  
`electron-builder --linux deb --arm64`
- 也可以在`Windows`上构建`Linux`包，在`Linux`上构建`Windows`包  
但是实际跨平台构建的感受非常糟糕，`Linux`上要安装[Wine](https://www.winehq.org/)，`Windows`上估计要`WSL`  
我尝试在`Linux`上构建`Windows`包，失败了

# 图标
[官方的文档](https://www.electron.build/icons)非常难看懂
- MacOS至少要512x512像素
- Windows至少要256x256像素

# 测试
- `Node.js`和`Bun.js`都可以正常构建
- 如果你想测试一下`ARM`的程序能否运行，可以使用[qemu](https://qemu.org)来测试  
网上有教程，我懒得折腾，没有具体研究