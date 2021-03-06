
const { remote } = require('electron');
const ipc = require('electron').ipcRenderer;
const storage = require('electron-json-storage');
// Initialising the canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const keyForm = document.getElementById('keyForm');

function opening () {
  storage.get('hint', function (error, data) {
    if (error) throw error;
    if (data.step === 0) {
      data.step = 1;

      storage.set('hint', data, function (error) {
        if (error) throw error;
      });
      ipc.send('majDesk');
    }
  });
}
opening();

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
let letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

// Setting up the columns
const fontSize = 10;
const columns = canvas.width / fontSize;

// Setting up the drops
const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

// Setting up the draw function
function draw () {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0f0';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    }
  }
}
// Loop the animation
setInterval(draw, 33);

keyForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const element = document.getElementById('loading');
  element.classList.add('loader');

  const regex = /^njopv(.){0,1}23456$/i;
  if (regex.test(document.getElementById('key').value)) {
    document.getElementById('msg').innerHTML = 'Mot de passe correct';
    await storage.get('os', async function (error, data) {
      if (error) throw error;
      data.pictures = 'decrypted';
      await storage.set('os', data, function (error) {
        if (error) throw error;
      });
    });
    await storage.get('hint', async function (error, data) {
      if (error) throw error;
      data.step = 5;
      await storage.set('hint', data, function (error) {
        if (error) throw error;
      });
    });
  } else {
    document.getElementById('msg').innerHTML = 'Nombre d\'erreurs: ' + levenshtein(document.getElementById('key').value, 'njopv23456');
  }

  setTimeout(function () {
    console.log('fin');
    ipc.send('folder');
    ipc.send('majDesk');
    const win = remote.getCurrentWindow();
    win.close();
  }, 2000);

  //
});

const levenshtein = function (a, b) {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  // swap to save some memory O(min(a,b)) instead of O(a)
  if (a.length > b.length) {
    const tmp = a;
    a = b;
    b = tmp;
  }

  const row = [];
  // init the row
  for (let i = 0; i <= a.length; i++) {
    row[i] = i;
  }

  // fill in the rest
  for (let i = 1; i <= b.length; i++) {
    let prev = i;
    for (let j = 1; j <= a.length; j++) {
      var val;
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        val = row[j - 1]; // match
      } else {
        val = Math.min(row[j - 1] + 1, // substitution
          prev + 1, // insertion
          row[j] + 1); // deletion
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }

  return row[a.length];
}
;
