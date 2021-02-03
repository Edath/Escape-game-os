// import "node_modules/bootstrap/dist/css/bootstrap.css";
const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('src/index.html')
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

ipc.on('enter-desktop', function(event, arg){
  if (arg == '1234'){
    win.loadFile('src/desktop.html')
  }
})