
const ipc = require('electron').ipcRenderer;
const storage = require('electron-json-storage');

const trash = document.getElementById('trash');
const folder = document.getElementById('folder');
const navigator = document.getElementById('navigator');

trash.addEventListener('click', function () {
  ipc.send('trash', 'false');
  ipc.send('getData');
});

folder.addEventListener('click', function () {
  ipc.send('folder', 'false');
});

navigator.addEventListener('click', function () {
  ipc.send('navigator', 'false');
});

ipc.on('info', function (event, arg) {
  maj();
});

function maj () {
  storage.get('hint', function (error, data) {
    if (error) throw error;

    if (data.step === 1) {
      document.getElementById('hint').innerHTML = '<h4>L’attaquant a sûrement placé des fichiers sur l’ordinateur pour faire son attaque. Je ne les vois pas… il les aurait mis dans la corbeille ?  </h4>';
    }
    if (data.step === 2) {
      document.getElementById('hint').innerHTML = '<h4>On se rapproche ! Ce type m’a l’air d’être du genre à poster des photos de son chat partout… J’irais d\'abord vérifier sur instagram. Vous connaissez son pseudo, non ? Pour César là... je vais chercher sur Google. <a class="blink">|</a></h4>';
    }
    if (data.step === 3) {
      document.getElementById('hint').innerHTML = '<h4>Je crois avoir vu son vrai nom. Faudrait qu\'il fasse plus attention à son empreinte numérique. On peut sûrement en faire quelque chose? J\'ai trouvé quelque chose pour César. Je vous explique après. <a class="blink">|</a>  </h4>';
    }
    if (data.step === 4) {
      document.getElementById('hint').innerHTML = '<h4>J\'espère que vous avez tout retenu. Pour le chiffrement de César, c\'est un chiffrement basé sur un décalage. Par exemple, avec un décalage de 1, a = b et b = c. Pour les chiffres, 1 = 2 dans ce cas. <a class="blink">|</a> </h4>';
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
