const { remote } = require('electron');
const { desktopCapturer } = require('electron/common');
const ipc = require('electron').ipcRenderer;
const storage = require('electron-json-storage');

const mail = document.getElementById('mail');
const object = document.getElementById('object');
const money = document.getElementById('money');
const butt = document.getElementById('butt');

const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

console.log(storage.getDefaultDataPath());
butt.addEventListener('click', function () {
  const win = remote.getCurrentWindow();
  close(win);
});

mail.addEventListener('click', function () {
  const mail = document.getElementById('mail');
  if (!mail.classList.contains('validated')) {
    mail.classList.add('validated');
    const object = document.getElementById('object');
    const money = document.getElementById('money');
    if (object.classList.contains('validated') && money.classList.contains('validated')) {
      const myvar = '<button class="btn btn-dark hidden" id="suite" type="button" style="width:100%;">Commencer l\'escape game</button>';
      document.getElementById('butt').insertAdjacentHTML('beforeend', myvar);
    }
  }
});

object.addEventListener('click', function () {
  const object = document.getElementById('object');
  if (!object.classList.contains('validated')) {
    object.classList.add('validated');
    const mail = document.getElementById('mail');
    const money = document.getElementById('money');
    if (mail.classList.contains('validated') && money.classList.contains('validated')) {
      const myvar = '<button class="btn btn-dark hidden" id="suite" type="button" style="width:100%;">Commencer l\'escape game</button>';
      document.getElementById('butt').insertAdjacentHTML('beforeend', myvar);
    }
  }
});

money.addEventListener('click', function () {
  const money = document.getElementById('money');
  if (!money.classList.contains('validated')) {
    money.classList.add('validated');
    const mail = document.getElementById('mail');
    const object = document.getElementById('object');
    if (mail.classList.contains('validated') && object.classList.contains('validated')) {
      const myvar = '<button class="btn btn-dark hidden" id="suite" type="button" style="width:100%;">Commencer l\'escape game</button>';
      document.getElementById('butt').insertAdjacentHTML('beforeend', myvar);
    }
  }
});

function close (win) {
  ipc.send('enter-pc');
  win.close();
}
