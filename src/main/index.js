import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron'

const path = require('path')


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let appTray = null
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 670,
    useContentSize: true,
    width: 1000,
    frame: false,
  })

  process.mini = false

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // let trayMenuTemplate = [
  //   {
  //       label: '设置',
  //       click: function () {}
  //   },
  // ]

  // appTray = new Tray('ico.ico')

  // const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  // //设置此托盘图标的悬停提示内容
  // appTray.setToolTip('This is my application.')

  // //设置此图标的上下文菜单
  // appTray.setContextMenu(contextMenu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

let mini
ipcMain.on('mini', () => {
  mini = new BrowserWindow({
    height: 74,
    width: 300,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
  })
  process.mini = true
  // const winURL1 = process.env.NODE_ENV === 'development'
  // ? `http://localhost:9080/#/mini`
  // : `file://${__dirname}/index.html/#/mini`
  mini.loadURL(winURL)
  mini.on('closed', () => {
    mini = null
    mainWindow.webContents.send('miniClose')
  })
})

ipcMain.on('mini-done', _ => {
  process.mini = false
  mini.webContents.send('mainId', mainWindow.id)
  mainWindow.webContents.send('miniId', mini.id)
})

ipcMain.on('min', _ => {
  mainWindow.minimize()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
