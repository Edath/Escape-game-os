
const { remote } = require('electron');
// const { desktopCapturer } = require('electron/common');
const ipc = require('electron').ipcRenderer;

const passwordForm = document.getElementById('first-password');

passwordForm.addEventListener('submit', function () {
  ipc.send('enter-desktop', document.getElementById('password').value);
});

ipc.on('ok', function (event, arg) {
  const win = remote.getCurrentWindow();
  win.close();
});
