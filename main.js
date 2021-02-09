/* eslint-disable no-mixed-spaces-and-tabs */
// import "node_modules/bootstrap/dist/css/bootstrap.css";
const { app, BrowserWindow } = require('electron');

const ipc = require('electron').ipcMain;

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    title: 'App',
    webPreferences: {
      nodeIntegration: true,
      fullscreen: true,
      closable: false,
      enableRemoteModule: true
    }
  });

  win.maximize();

  win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipc.on('enter-desktop', function (event, arg) {
  if (arg === '1234') {
    event.sender.send('ok', arg);
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    });

    win.maximize();
    win.loadFile('src/desktop.html');
  }
});

ipc.on('trash', (event, arg) => {
  const windows = BrowserWindow.getAllWindows();
  //   const titles = windows.map(element => element.getTitle());
  if (windows.length === 1) {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: true,
      parent: BrowserWindow.getAllWindows()[0],
      modal: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    });
    win.removeMenu();
    win.loadFile('src/trash.html');
    win.setIcon('assets/images/corbeille.png');
  }
});

ipc.on('navigator', (event, arg) => {
  const windows = BrowserWindow.getAllWindows();
  if (windows.length === 1) {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: true,
      parent: BrowserWindow.getAllWindows()[0],
      modal: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    });
    win.loadFile('src/navigator.html');
    win.setIcon('assets/images/navigator.png');
  }
});
