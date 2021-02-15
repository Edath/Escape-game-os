/* eslint-disable no-mixed-spaces-and-tabs */
// import "node_modules/bootstrap/dist/css/bootstrap.css";
const { app, BrowserWindow, remote } = require('electron');
const storage = require('electron-json-storage');

const ipc = require('electron').ipcMain;

ipc.on('getData', function (event, arg) {
  storage.get('hint', function (error, data) {
    if (error) throw error;
    event.sender.send('data', data);
  });
});

function saveAppData (data) {
  storage.set('hint', data, function (error) {
    if (error) throw error;
  });
}

ipc.on('saveData', function (event, arg) {
  saveAppData(arg);
});

// ouverture de base
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
// ouvre le bureau
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
// ouvre la corbeille
ipc.on('trash', (event, arg) => {
  const windows = BrowserWindow.getAllWindows();
  //   const titles = windows.map(element => element.getTitle());
  if (windows.length === 1) {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: true,
      // parent: BrowserWindow.getAllWindows()[0],
      modal: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    });
    win.removeMenu();
    win.webContents.openDevTools();
    win.loadFile('src/trash.html');
    win.setIcon('assets/images/corbeille.png');
  }
});

// ouvre le navigateur
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
