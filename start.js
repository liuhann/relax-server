process.env.DEBUG = 'wind:*'
const { app, BrowserWindow } = require('electron')
const WindBoot = require('wind-boot')
const WindCoreHttp = require('wind-core-http')

const windboot = new WindBoot({
  packages: [WindCoreHttp]
})
windboot.start()

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('public/index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})