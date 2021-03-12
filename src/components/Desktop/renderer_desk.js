const { dialog, BrowserWindow } = require('electron').remote;
const ipc = require('electron').ipcRenderer;
const storage = require('electron-json-storage');

const trash = document.getElementById('trash');
const folder = document.getElementById('folder');
const navigator = document.getElementById('navigator');

trash.addEventListener('click', function () {
  storage.get('hint', function (error, data) {
    if (error) throw error;
    if (data.step > 0) {
      ipc.send('trash', 'false');
      ipc.send('getData');
    } else {
      const window = BrowserWindow.getFocusedWindow();
      dialog.showMessageBox(window, {
        title: 'Pas encore',
        buttons: ['D\'accord'],
        type: 'info',
        message: 'Vous n\'avez pas encore assez d\'indice pour venir ici.'
      });
    }
  });
  maj();
});

folder.addEventListener('click', function () {
  ipc.send('folder', 'false');
  maj();
});

navigator.addEventListener('click', function () {
  ipc.send('navigator', 'false');
  maj();
});

ipc.on('info', function (event, arg) {
  maj();
});

function maj () {
  storage.get('hint', function (error, data) {
    if (error) throw error;

    if (data.step === 1) {
      document.getElementById('hint').innerHTML = '<h4>L’attaquant a sûrement mis des fichiers sur l’ordinateur pour faire son attaque. Je ne les vois pas… ils seraient la corbeille ? <a class="blink"><img src="../../../assets/images/idk.png" height="30px"></a> </h4>';
    }
    if (data.step === 2) {
      document.getElementById('hint').innerHTML = '<h4>On se rapproche ! Le hacker a l’air d’être du genre à poster des photos de son chat partout… Vous allez sur instagram? Vous connaissez son <b>pseudo</b>, non ? Pour César là... je m\'en ocuppe pour vous. <a class="blink"><img src="../../../assets/images/eye.png" height="30px"></a></h4>';
    }
    if (data.step === 3) {
      document.getElementById('hint').innerHTML = '<h4>Je crois avoir vu son vrai nom. Il faudrait qu\'il fasse plus attention à son <b>empreinte numérique</b>. <br> J\'ai aussi trouvé quelque chose pour César. Je vous explique après. <a class="blink"><img src="../../../assets/images/great.png" height="30px"></a> </h4>';
    }
    if (data.step === 4) {
      document.getElementById('help').removeAttribute('hidden');
      document.getElementById('hint').innerHTML = '<h4>J\'espère que vous avez tout retenu. <a class="blink"><img src="../../../assets/images/memory.png" height="30px"></a> Pour le chiffrement de César, c\'est un chiffrement basé sur un décalage. <br> Par exemple, avec un décalage de 1: <b>a = b et b = c et 1 = 2 </b>.</h4>';
    }
    if (data.step === 5) {
      document.getElementById('help').hidden = true;
      document.getElementById('hint').remove();
    }
  });
}
maj();

// ipc.on('data', function (event, arg) {
//   const data = prepareHintObject(arg);
//   ipc.send('saveData', data);
// });

// function prepareHintObject (data) {
//   const obj = data;
//   obj.step = obj.step + 1;
//   return obj;
// }
