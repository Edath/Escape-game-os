const { remote } = require('electron');
const { desktopCapturer } = require('electron/common');
const ipc = require('electron').ipcRenderer;

const mail = document.getElementById('mail');
const object = document.getElementById('object');
const money = document.getElementById('money');

const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

mail.addEventListener('click', function () {
  const mail = document.getElementById('mail');
  if (!mail.classList.contains('validated')) {
    mail.classList.add('validated');
    const object = document.getElementById('object');
    const money = document.getElementById('money');
    if (object.classList.contains('validated') && money.classList.contains('validated')) {
      // à changer
      ipc.send('enter-desktop', '1234');
      const win = remote.getCurrentWindow();
      win.close();
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
      // à changer
      ipc.send('enter-desktop', '1234');
      const win = remote.getCurrentWindow();
      win.close();
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
      // à changer
      ipc.send('enter-desktop', '1234');
      const win = remote.getCurrentWindow();
      win.close();
    }
  }
});
