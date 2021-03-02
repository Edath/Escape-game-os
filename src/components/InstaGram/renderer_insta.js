// const { remote } = require('electron');
const ipc = require('electron').ipcRenderer;
const storage = require('electron-json-storage');
const prof = document.getElementById('profile');

prof.addEventListener('submit', function (event) {
  event.preventDefault();
  const cont = document.getElementById('content').value;
  if (cont === 'Gru' || cont === 'gru') {
    const main = document.getElementById('main');
    main.remove();
    const myvar = '<img src="../../../assets/images/insta.jpg">';
    document.getElementById('here').insertAdjacentHTML('beforeend', myvar);

    storage.get('hint', function (error, data) {
      if (error) throw error;
      if (data.step === 2) {
        data.step = 3;
        storage.set('hint', data, function (error) {
          if (error) throw error;
        });
        ipc.send('majDesk');
      }
    });
  } else {
    const input = document.getElementById('content');
    input.classList.add('error');
    input.value = '';
  }
})
;

const removeError = function () { document.getElementById('password').classList.remove('error'); };
