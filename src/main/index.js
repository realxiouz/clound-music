import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron'

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
  ? `http://localhost:9080/#/main/find`
  : `file://${__dirname}/index.html/#/main/find`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 670,
    useContentSize: true,
    width: 1000,
    frame: false,
    backgroundColor: '#16181C',
    show: false
  })

  // process.mini = false

  mainWindow.loadURL(winURL)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  let trayMenuTemplate = [
    {
        label: '完整模式',
        click: function () {
          mainWindow.show()
        }
    },
    {
      label: '关闭',
      click: function () {
        app.quit()
      }
    },
  ]

  let iconPath = `${__static}/ico.ico`
  appTray = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  appTray.setToolTip('This is my application.')

  appTray.setContextMenu(contextMenu)
}

function createMini () {
  mini = new BrowserWindow({
    height: 74,
    width: 300,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    show: false,
  })
  // process.mini = true
  const winURL1 = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/mini`
  : `file://${__dirname}/index.html/#/mini`
  mini.loadURL(winURL1)
  mini.on('closed', () => {
    mini = null
    mainWindow.webContents.send('miniClose')
  })
}

app.on('ready', _ => {
  createWindow()
  createMini()
})


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

ipcMain.on('mini-done', _ => {
  mini.webContents.send('mainId', mainWindow.id)
  mainWindow.webContents.send('miniId', mini.id)
})

ipcMain.on('min', _ => {
  mainWindow.hide()
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
