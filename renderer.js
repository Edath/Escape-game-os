
const {remote} = require('electron');
const { desktopCapturer } = require('electron/common');
const ipc = require('electron').ipcRenderer;

const password_form = document.getElementById('first-password');
const trash = document.getElementById('trash');
const folder = document.getElementById('folder');
const navigator = document.getElementById('folder');


password_form.addEventListener('submit', function(){
  ipc.send('enter-desktop', document.getElementById('password').value)
})

ipc.on('ok', function(event, arg){
  var win = remote.getCurrentWindow();
  win.close();
})

trash.addEventListener('click', function(){

})

folder.addEventListener('click', function(){

})
navigator.addEventListener('click', function(){
  
})