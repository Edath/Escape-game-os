const myNotification = new Notification('Title', {
    body: 'Notification from the Renderer process'
  })
  
  myNotification.onclick = () => {
    console.log('Notification cliquée')
  }
  