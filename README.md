# 初始化

## 搭建环境

> 强烈推荐用[GitPod](https://gitpod.io)

### Arch Linux

```sh
sudo pacman -Sy
sudo pacman -S nodejs npm git fakeroot dpkg libxcrypt-compat fuse
```

> 只能在Arch Linux上这么安装Node.js和npm

### Ubuntu

```sh
sudo apt update
sudo apt install git fakeroot snapd dpkg rpm fuse
```

---

## npm

```sh
npm i electron electron-builder --save-dev
```

## yarn

```sh
yarn add --dev electron electron-builder
```

# 介绍

[Electron-Builder 官网](https://electron.build)  
[Electron-Builder 中文网](http://electron.org.cn/builder/index.html)

本次我们使用`Electron-Builder`  
它除了`deb`和`rpm`包，还可以构建其他一些兼容的包，比如`AppImage`、`Snap`

- 据说`Snap`运行速度慢，包很臃肿，权限问题不好解决 ~~（根据我在 Armbian 上的体验，确实如此）~~
- `Electron-Forge`也可以构建`Snap`。但我试了，失败了，报错信息和官方文档都没什么用
- 其实[还不止这些](https://www.electron.build/configuration/linux)，但是`Flatpak`和`apk`都会出 bug
- 也许可以有Arch Linux的软件包`tar.zst`，[Nix](https://nixos.org/manual/nix/stable/)，国产Deepin的玲珑[uab](https://linglong.dev)，等我有空再研究

## 注

- `Flatpak`类似于`Snap`
- `apk`是安卓`Android`的软件包格式
  可以正常构建，但是无法安装，[GitHub 上](https://github.com/electron-userland/electron-builder/issues?q=apk)有人提过`Issues`了，一直没人解决，官方估计也不管了，反正我也有出过[apk 的教程](https://www.bilibili.com/video/BV1x84y1n7b5)，期待`Electron-Forge`吧
- 我是在 `Android x86` 上测试的，没准 `ARM` 架构的手机可以运行

## 它支持构建

### Windows

| 格式 | 备注                 |
| ---- | -------------------- |
| msi  | Node.js 就是这个格式 |
| appx | 微软商店             |
| nsis |                     |

### Mac

| 格式 | 备注                 |
| ---- | -------------------- |
| dmg  | 经典格式             |
| pkg  | Node.js 就是这个格式 |
| mas  |                     |

### Linux

| 格式                              | 备注                     |
| --------------------------------- | ------------------------ |
| deb                               | 适用于 Debian，Ubuntu 等 |
| rpm                               | 适用于 Fedora，RedHat 等 |
| [Snap](https://snapcraft.io/)     |                          |
| [AppImage](https://appimage.org/) |                          |

## 其他

打包可以尝试用`Bun.js`（一个新的 JS 运行时，速度比 Node.js 快）  
[Bun.js 官网](https://bun.sh/)  
似乎可以快一点？

> 还有一个 JS 的运行时——`Deno.js`  
> [Deno.js 官网](https://deno.land/)  
> [Deno.js 中文网](https://deno.cn/)

# 初始化项目

官方的都多少有点问题，我就自己整合了一下  
[GitHub 项目地址](https://github.com/abtye/electron-builder-init)

```sh
git clone https://github.com/abtye/electron-builder-init.git
npm install
```

# 系统依赖

因为 Linux 发行版众多，具体我不是非常清楚

| 依赖           | 备注                 |
| -------------- | ------------------- |
| dpkg           | 用于构建`deb`包      |
| rpm            | 用于构建`rpm`包      |
| snap           | 用于构建`snap`包     |
| FUSE           | `AppImage`的运行依赖 |

[FUSE 安装方法](https://github.com/AppImage/AppImageKit/wiki/FUSE)

# 构建配置和参数

[官方文档](https://www.electron.build/cli)~~（写的很烂，不如不看）~~

# Snap

[Snap 官网的 Electron 文档](https://snapcraft.io/docs/electron-apps)

## 安装

由于没有给软件签名，所以要加上`--dangerous`属性

```sh
snap install 应用名称.snap --dangerous
```

## 怎么签名

不知道，等有空了我再研究

# Flatpak

- `Electron-Forge`和`Electron-Builder`原本都支持构建`Flatpak`，但我都出 bug 了
- Flatpak 官方也有[文档](https://docs.flatpak.org/en/latest/electron.html)，但我按文档的做却失败了

# 运行 AppImage

1. 打开终端
2. 运行`./应用名称.AppImage`
3. 如果提示权限不够，就运行`chmod +x 应用名称.AppImage`
4. 缺什么包就装什么，顺便跟我说一声

# 跨芯片架构

- 可以在`x86`架构上构建[ARM](https://www.arm.com/)架构的包
- 支持的芯片架构：`x64` `ia32` `armv7l` `arm64`
- 用法：加上芯片架构参数，如：
  `electron-builder --linux deb --arm64`
- **不能跨操作系统构建**

# 图标

[官方的文档](https://www.electron.build/icons)非常难看懂

- Mac 至少要 512x512 像素
- Windows 至少要 256x256 像素

# 测试

- `Node.js`和`Bun.js`都可以正常构建
- 如果你想测试一下`ARM`的程序能否运行，可以使用[qemu](https://qemu.org)来测试  
  网上有教程，我懒得折腾，没有具体研究
