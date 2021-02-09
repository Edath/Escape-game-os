const {remote} = require('electron');
const { desktopCapturer } = require('electron/common');
const ipc = require('electron').ipcRenderer;

const trash = document.getElementById('trash');
const folder = document.getElementById('folder');
const navigator = document.getElementById('navigator');

trash.addEventListener('click', function(){
    ipc.send('trash', 'false')
})
  
folder.addEventListener('click', function(){
    ipc.send('folder', 'false')
})
navigator.addEventListener('click', function(){
    ipc.send('navigator', 'false')
})