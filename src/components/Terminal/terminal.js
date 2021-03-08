const { remote } = require('electron');
const ipc = require('electron').ipcRenderer;

const command = document.getElementById('commandf');

const mdp = document.getElementById('mdp');

mdp.addEventListener('submit', function (e) {
  e.preventDefault();
  const mdp1 = document.getElementById('mdp1').value;
  const mdp2 = document.getElementById('mdp2').value;
  const mdp3 = document.getElementById('mdp3').value;

  if (mdp1 && mdp2 && mdp3) {
    if (mdp1.length < 8 && mdp2.length < 8 && mdp3.length < 8) {
      console.error('wrong password length');
      document.getElementById('msg').innerHTML = 'Veuillez choisir de nouveaux mots de passe plus longs.';
    } else {
      if (mdp1 !== mdp2 && mdp1 !== mdp3 && mdp2 !== mdp3) {
        console.log(mdp1, mdp2, mdp3);
        document.getElementById('1').removeAttribute('hidden');
        document.getElementById('mdp').setAttribute('hidden', true);
        document.getElementById('command').removeAttribute('disabled');
        if (isGameEnded()) {
          console.log('the game has ended');
        }
      } else {
        console.error('all the password are the same');

        document.getElementById('msg').innerHTML = 'Veuillez choisir de nouveaux mots de passe différents pour chaque champs.';
      }
    }
  } else {
    console.error(mdp1, mdp2, mdp3);

    document.getElementById('msg').innerHTML = 'Veuillez choisir de nouveaux mots de passe pour chacun des champs.';
  }
});

command.addEventListener('submit', function (event) {
  event.preventDefault();
  //   ipc.send('enter-desktop', document.getElementById('password').value);
  document.getElementById('nonunderstood').setAttribute('hidden', true);
  document.getElementById('viru').setAttribute('hidden', true);
  const regex = /change mdp/i;
  const regex1 = /backup/i;
  const regex2 = /analyse complete/i;
  const regex3 = /exit/i;
  if (regex.test(document.getElementById('command').value)) {
    if (document.getElementById('1').hasAttribute('hidden')) {
      document.getElementById('mdp').removeAttribute('hidden');
      document.getElementById('command').setAttribute('disabled', true);
      document.getElementById('command').value = '';
    }
  } else if (regex1.test(document.getElementById('command').value)) {
    if (document.getElementById('2').hasAttribute('hidden')) {
      document.getElementById('loader').removeAttribute('hidden');
      document.getElementById('command').value = '';
      document.getElementById('command').setAttribute('disabled', true);
      setTimeout(function () {
        document.getElementById('loader').setAttribute('hidden', true);
        document.getElementById('2').removeAttribute('hidden');
        document.getElementById('command').removeAttribute('disabled');
        if (isGameEnded()) {
          console.log('the game has ended');
        }
      }, 12000);
    }
  } else if (regex2.test(document.getElementById('command').value)) {
    if (document.getElementById('3').hasAttribute('hidden')) {
      document.getElementById('loader').removeAttribute('hidden');
      document.getElementById('command').value = '';
      document.getElementById('command').setAttribute('disabled', true);
      setTimeout(function () {
        document.getElementById('viru').removeAttribute('hidden');
        console.log('viru trouvé');
        setTimeout(function () {
          document.getElementById('loader').setAttribute('hidden', true);
          document.getElementById('3').removeAttribute('hidden');
          document.getElementById('command').removeAttribute('disabled');
          console.log('analysis ended');
          if (isGameEnded()) {
            console.log('the game has ended');
          }
        }, 6000);
      }, 6000);
    }
  } else if (regex3.test(document.getElementById('command').value)) {
    ipc.send('finish');
    const win = remote.getCurrentWindow();
    win.close();
  } else {
    document.getElementById('nonunderstood').removeAttribute('hidden');
    document.getElementById('coucou').innerHTML = document.getElementById('command').value;
    document.getElementById('command').value = '';
  }
});

function isGameEnded () {
  if (!document.getElementById('1').hasAttribute('hidden') && !document.getElementById('2').hasAttribute('hidden') && !document.getElementById('3').hasAttribute('hidden')) {
    console.log(true);
    document.getElementById('exit').removeAttribute('hidden');
    return true;
  }
  console.log(false);
  return false;
}

function startTimer (duration, display) {
  let timer = duration; let minutes; let seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      // là c'est quand c'est fini
      ipc.send('failed');
      const win = remote.getCurrentWindow();
      close(win);
    }
  }, 1000);
}

window.onload = function () {
  const fiveMinutes = 60 * 2;
  const display = document.querySelector('#time');
  startTimer(fiveMinutes, display);
};
