const { remote } = require('electron');
const { desktopCapturer } = require('electron/common');
const ipc = require('electron').ipcRenderer;
const storage = require('electron-json-storage');

const trash = document.getElementById('trash');
const folder = document.getElementById('folder');
const navigator = document.getElementById('navigator');

trash.addEventListener('click', function () {
  ipc.send('trash', 'false');
  ipc.send('getData');
});

folder.addEventListener('click', function () {
  ipc.send('folder', 'false');
});

navigator.addEventListener('click', function () {
  ipc.send('navigator', 'false');
});

// ipc.on('data', function (event, arg) {
//   const data = prepareHintObject(arg);
//   ipc.send('saveData', data);
// });

// function prepareHintObject (data) {
//   const obj = data;
//   obj.step = obj.step + 1;
//   return obj;
// }
