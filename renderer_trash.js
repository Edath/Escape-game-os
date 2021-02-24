const ipc = require('electron').ipcRenderer;
const storage = require('electron-json-storage');

const recup = document.getElementById('recup');
const empty = document.getElementById('empty');
const note = document.getElementById('note');
// popovers enabling
const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

function hinty () {
  storage.get('hint', function (error, data) {
    if (error) throw error;
    console.log('ok');
    if (data.step === 1) {
      document.getElementById('hint').innerHTML = '<h4>Ça ne m’étonne pas, c’est un pro. Pas de problème, vider la corbeille ne supprime pas forcément les données… Nous devrions faire une récupération des données.  </h4>';
    }
  });
}

hinty();
note.addEventListener('click', function () {
  storage.get('hint', function (error, data) {
    if (error) throw error;
    if (data.step === 1) {
      data.step = 2;
      storage.set('hint', data, function (error) {
        if (error) throw error;
      });
      ipc.send('majDesk');
    }
  });
});
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
    document.getElementById('hint').innerHTML = '<h4>Ça ne m’étonne pas, c’est un pro. Pas de problème, vider la corbeille ne supprime pas forcément les données… Nous devrions faire une récupération des données.  </h4>';
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
      '          <h1 class= "text_file" style="padding: 0;">image.png</h1>' +
      '</div>';
        document.getElementById('picture').insertAdjacentHTML('beforeend', myvar);
      }
    }
    if (data.note === 'visible') {
      const myvar = '<div class="" id="not" style=""  type="button"  data-toggle="modal" data-target="#exampleModalCenter">' +
      '<img src = "../assets/images/document.png" height="200px" class="" style="padding: 0;"/>' +
      '          <h1 class= "text_file" style="padding: 0;">Note.txt</h1>' +
      '</div>';
      document.getElementById('hint').innerHTML = '<h4>C\'est sûrement l\'attaquant qui a laissé ça ici! </h4>';
      document.getElementById('note').insertAdjacentHTML('beforeend', myvar);
    }
  });
}
maj();
