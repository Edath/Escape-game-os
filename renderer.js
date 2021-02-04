// const myNotification = new Notification('Title', {
//     body: 'Notification from the Renderer process'
//   })
  
//   myNotification.onclick = () => {
//     console.log('Notification cliquée')
//   }
  
// const {electron} = require('electron');
const {remote} = require('electron');
const { desktopCapturer } = require('electron/common');
const ipc = require('electron').ipcRenderer;

const password_form = document.getElementById('first-password');


password_form.addEventListener('submit', function(){

  ipc.send('enter-desktop', document.getElementById('password').value)
})

ipc.on('ok', function(event, arg){
  console.log('b')
  var win = remote.getCurrentWindow();
  win.close();

})