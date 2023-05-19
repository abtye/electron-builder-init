// Modules to control application life and create native browser window
// 用于控制应用程序寿命和创建本地浏览器窗口的模块
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  // 并加载应用程序的index.html
  mainWindow.loadFile(path.join(__dirname,'index.html'))

  // Open the DevTools.
  // 打开开发者工具
  mainWindow.webContents.openDevTools()

  // 关闭顶部工具栏
  // mainWindow.setMenu(null)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// 当Electron完成初始化并准备创建浏览器窗口时，将调用此方法。
// 某些API只能在此事件发生后使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // 在macOS上，当点击dock图标且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// 关闭所有窗口后退出，macOS除外。在那里，应用程序及其菜单栏通常会保持活动状态，直到用户使用Cmd+Q明确退出
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// 在此文件中，您可以包含应用程序的其余特定主流程代码。您也可以将它们放在单独的文件中，并在此处要求它们。
