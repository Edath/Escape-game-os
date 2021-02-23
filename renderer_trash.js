const ipc = require('electron').ipcRenderer;
const storage = require('electron-json-storage');

const recup = document.getElementById('recup');
const empty = document.getElementById('empty');

// popovers enabling
const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

function getHint () {
  // storage.get()
}

recup.addEventListener('click', function () {
  storage.get('os', function (error, data) {
    if (error) throw error;
    if (data.picture === 'disk') {
      data.picture = 'visible';
    }
    if (data.note === 'disk') {
      data.note = 'visible';
    }
    ipc.send('saveDataos', data);
    maj();
  });
});

empty.addEventListener('click', function () {
  storage.get('os', function (error, data) {
    if (error) throw error;
    if (data.picture === 'visible') {
      data.picture = 'disk';
    }
    if (data.note === 'visible') {
      data.note = 'disk';
    }
    ipc.send('saveDataos', data);
    maj();
  });
});

ipc.on('data', function (event, arg) {
});

function maj () {
  storage.get('os', function (error, data) {
    if (error) throw error;
    // s'occupe de retirer les images avant d'en remettre
    if (document.getElementById('pic') != null) {
      document.getElementById('picture').removeChild(document.getElementById('pic'));
    }
    if (document.getElementById('not') != null) {
      document.getElementById('note').removeChild(document.getElementById('not'));
    }

    // remet les images si besoin
    if (document.getElementById) {
      if (data.picture === 'visible') {
        const myvar = '<div class="" id="pic" style="">' +
                '<img src = "../assets/images/picture.png" height="200px" class="" style="padding: 0;"/>' +
      '          <h1 class= "text_file" style="padding: 0;">picture.png</h1>' +
      '</div>';
        document.getElementById('picture').insertAdjacentHTML('beforeend', myvar);
      }
    }
    if (data.note === 'visible') {
      const myvar = '<div class="" id="not" style=""  type="button"  data-toggle="modal" data-target="#exampleModalCenter">' +
      '<img src = "../assets/images/document.png" height="200px" class="" style="padding: 0;"/>' +
      '          <h1 class= "text_file" style="padding: 0;">Note.txt</h1>' +
      '</div>';
      document.getElementById('note').insertAdjacentHTML('beforeend', myvar);
    }
  });
}
maj();
