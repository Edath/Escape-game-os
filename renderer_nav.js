const { remote } = require('electron');
const { desktopCapturer } = require('electron/common');
const ipc = require('electron').ipcRenderer;

const fb = document.getElementById('fb');
const insta = document.getElementById('insta');

fb.addEventListener('click', function () {
  console.log('bite');
  ipc.send('fb');
});

insta.addEventListener('click', function () {
  console.log('prout');
  ipc.send('insta');
});
