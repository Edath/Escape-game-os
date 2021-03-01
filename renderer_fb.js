// const { remote } = require('electron');
// const { desktopCapturer } = require('electron/common');
// const ipc = require('electron').ipcRenderer;
const ipc = require('electron').ipcRenderer;
const storage = require('electron-json-storage');

const prof = document.getElementById('profile');

prof.addEventListener('submit', function (event) {
  // prevent from reloading
  event.preventDefault();
  const cont = document.getElementById('content').value;
  if (cont === 'John Lundy') {
    const main = document.getElementById('main');
    main.remove();
    const myvar = '<img src="../assets/images/fb profile.png">';
    document.getElementById('here').insertAdjacentHTML('beforeend', myvar);
    storage.get('hint', function (error, data) {
      if (error) throw error;
      if (data.step === 3) {
        data.step = 4;
        storage.set('hint', data, function (error) {
          if (error) throw error;
        });
        ipc.send('majDesk');
      }
    });
  }
});
