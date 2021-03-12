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
    if (data.step >= 1) {
      storage.get('os', function (error, data) {
        if (error) throw error;
        if (data.note === 'visible') {
          document.getElementById('hint').innerHTML = '<h4> Là! Regardez!  <a class="blink"><img src="../../../assets/images/wtf.png" height="25px"></a> </h4>';
        }
        if (data.note === 'disk') {
          document.getElementById('hint').innerHTML = '<h4>Rien. Mais supprimer un fichier n\'efface pas les données… Une récupération, ça vous dit? <a class="blink"><img src="../../../assets/images/glass.png" height="25px"></a></h4>';
        }
      });
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
      maj();
    }
  });
});
recup.addEventListener('click', function () {
  storage.get('os', function (error, data) {
    if (error) throw error;
    if (data.note === 'disk') {
      data.note = 'visible';
    }
    ipc.send('saveDataos', data);
    ipc.send('majDesk');
    maj();
  });
});

empty.addEventListener('click', function () {
  storage.get('os', function (error, data) {
    if (error) throw error;
    if (data.note === 'visible') {
      data.note = 'disk';
    }
    ipc.send('saveDataos', data);
    ipc.send('majDesk');
    maj();
  });
});

function maj () {
  storage.get('os', function (error, data) {
    if (error) throw error;
    // s'occupe de retirer les images avant d'en remettre

    if (document.getElementById('not') != null) {
      document.getElementById('note').removeChild(document.getElementById('not'));
    }
    if (data.note === 'visible') {
      const myvar = '<div class="" id="not" style=""  type="button"  data-toggle="modal" data-target="#exampleModalCenter">' +
      '<img src = "../../../assets/images/document.png" height="200px" class="" style="padding: 0;"/>' +
      '          <h1 class= "text_file" style="padding: 0;">Note.txt</h1>' +
      '</div>';
      document.getElementById('note').insertAdjacentHTML('beforeend', myvar);
    }
  });
  hinty();
}
maj();
