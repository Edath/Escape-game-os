// const myNotification = new Notification('Title', {
//     body: 'Notification from the Renderer process'
//   })
  
//   myNotification.onclick = () => {
//     console.log('Notification cliquée')
//   }
  

const ipc = electron.ipcRenderer;

const enterBtn = document.getElementById('enterBtn');

enterBtn.addEventListener('submit', function(){
  console.log('Prout')
  ipc.send('enter-desktop', document.getElementById('password').value)
})
