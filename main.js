/* eslint-disable no-mixed-spaces-and-tabs */
// import "node_modules/bootstrap/dist/css/bootstrap.css";
const { app, BrowserWindow, remote } = require('electron');
const storage = require('electron-json-storage');

const ipc = require('electron').ipcMain;

ipc.on('getData', function (event, arg) {
  if (arg === 'hint') {
    storage.get('hint', function (error, data) {
      if (error) throw error;
      event.sender.send('data', data);
    });
  } else {
    storage.get('os', function (error, data) {
      if (error) throw error;
      event.sender.send('data', data);
    });
  }
});

ipc.on('getData-maj', function (event, arg) {
  if (arg === 'hint') {
    storage.get('hint', function (error, data) {
      if (error) throw error;
      event.sender.send('data-maj', data);
    });
  } else {
    storage.get('os', function (error, data) {
      if (error) throw error;
      event.sender.send('data-maj', data);
    });
  }
});

function saveAppDataos (data) {
  storage.set('os', data, function (error) {
    if (error) throw error;
  });
}
function saveAppData (data) {
  storage.set('hint', data, function (error) {
    if (error) throw error;
  });
}
ipc.on('saveData', function (event, arg) {
  saveAppData(arg);
});
ipc.on('saveDataos', function (event, arg) {
  saveAppDataos(arg);
});

ipc.on('majDesk', function (event, arg) {
  const wins = BrowserWindow.getAllWindows();
  for (let i = 0; i < wins.length; i++) {
    if (wins[i].getTitle() === 'Bureau') {
      wins[i].webContents.send('info', { msg: 'hi' });
    }
  }
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
  win.loadFile('src/mail.html');
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
// open locker page
ipc.on('enter-pc', function (event, arg) {
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
    win.setIcon('assets/images/chrome.png');
  }
});

ipc.on('fb', (event, arg) => {
  const windows = BrowserWindow.getAllWindows();
  if (windows.length === 2) {
    const win = new BrowserWindow({
      width: 1000,
      height: 800,
      frame: true,
      parent: BrowserWindow.getAllWindows()[1],
      modal: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    });
    win.loadFile('src/fb.html');
    win.setIcon('assets/images/chrome.png');
  }
});

ipc.on('insta', (event, arg) => {
  const windows = BrowserWindow.getAllWindows();
  if (windows.length === 2) {
    const win = new BrowserWindow({
      width: 1000,
      height: 800,
      frame: true,
      parent: BrowserWindow.getAllWindows()[1],
      modal: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    });
    win.loadFile('src/insta.html');
    win.setIcon('assets/images/chrome.png');
  }
});

// open folder of pictures
ipc.on('folder', (event, arg) => {
  const windows = BrowserWindow.getAllWindows();
  if (windows.length === 1) {
    storage.get('os', function (error, data) {
      if (error) throw error;
      console.log(data);
      if (data.pictures === 'crypted') {
        const win = new BrowserWindow({
          width: 700,
          height: 500,
          frame: true,
          parent: BrowserWindow.getAllWindows()[0],
          modal: true,
          webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
          }
        });
        win.loadFile('src/folder_crypt.html');
        win.setIcon('assets/images/dossier.png');
        win.setResizable(false);
        console.log('1');
      } else {
        const win = new BrowserWindow({
          width: 1400,
          height: 1000,
          frame: false,
          parent: BrowserWindow.getAllWindows()[0],
          modal: true,
          webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
          }
        });
        win.loadFile('src/folder_decrypt.html');
        win.setIcon('assets/images/dossier.png');
        console.log('2');
      }
    });
  }
});
