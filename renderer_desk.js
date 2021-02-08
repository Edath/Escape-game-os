const {remote} = require('electron');
const { desktopCapturer } = require('electron/common');
const ipc = require('electron').ipcRenderer;

const trash = document.getElementById('trash');
const folder = document.getElementById('folder');
const navigator = document.getElementById('folder');

trash.addEventListener('click', function(){
    ipc.send('trash')
})
  
folder.addEventListener('click', function(){
    ipc.send('folder')
})
navigator.addEventListener('click', function(){
    ipc.send('navigator')
})