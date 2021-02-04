// import "node_modules/bootstrap/dist/css/bootstrap.css";
const { app, BrowserWindow, remote } = require('electron')
const ipc = require('electron').ipcMain

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame:false,
    webPreferences: {
      nodeIntegration: true,
      fullscreen:true,
      closable:false,
      enableRemoteModule: true
    }
  })
  win.maximize();

  win.loadFile('src/index.html')
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
    event.sender.send('ok',arg)
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      frame:false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })
    win.maximize();
    win.loadFile('src/desktop.html')
  }
  
})