const ipc = require('electron').ipcRenderer;
const storage = require('electron-json-storage');

const recup = document.getElementById('recup');
const empty = document.getElementById('empty');

recup.addEventListener('click', function () {
  storage.get('os', function (error, data) {
    if (error) throw error;
    if (data.picture === 'disk') {
      data.picture = 'visible';
    }
    if (data.note === 'disk') {
      data.picture = 'visible';
    }
    ipc.send('saveData', data);
    maj();
  });
});

empty.addEventListener('click', function () {
  storage.get('os', function (error, data) {
    if (error) throw error;
    if (data.picture === 'visible') {
      data.picture = 'disk';
    }
    if (data.note === 'empty') {
      data.picture = 'disk';
    }
    ipc.send('saveData', data);
    maj();
  });
});

ipc.on('data', function (event, arg) {
});

function maj () {
  storage.get('os', function (error, data) {
    if (error) throw error;
    // s'occuper de retirer les images avant d'en remettre
    document.getElementById('picture').removeChild();
    if (data.picture === 'visible') {
      const myvar = '<img src = "../assets/images/picture.png" height="200px" class="" style="padding: 0;"/>' +
      '          <h1 class= "text_file" style="padding: 0;">picture.png</h1>';
      document.getElementById('picture').insertAdjacentHTML('beforeend', myvar);
    }
    if (data.note === 'visible') {
      const myvar = '<img src = "../assets/images/document.png" height="200px" class="" style="padding: 0;"/>' +
      '          <h1 class= "text_file" style="padding: 0;">Note.txt</h1>';
      document.getElementById('note').insertAdjacentHTML('beforeend', myvar);
    }
  });
}
maj();
