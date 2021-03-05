const storage = require('electron-json-storage');
const ipc = require('electron').ipcRenderer;
const backup = document.getElementById('backup');
const mark = document.getElementById('note');

mark.addEventListener('click', function () {
  ipc.send('finish');
});

backup.addEventListener('click', function () {
  ipc.send('pendu');
});

ipc.on('ok', function () {
  storage.get('os', function (error, data) {
    if (error) throw error;
    if (data.marks === false) {
      const myvar = '<div class="" id="pic" style="">' +
                    '<img src = "../../../assets/images/picture.png" height="150px" class="" style="padding: 0;"/>' +
            '          <h1 class= "text_file" style="padding: 0;">bulletins.xls</h1>' +
            '</div>';
      document.getElementById('note').insertAdjacentHTML('beforeend', myvar);
      data.marks = true;
      storage.set('os', data, function (error) {
        if (error) throw error;
      });
    }
  });
});

function maj () {
  storage.get('os', function (error, data) {
    if (error) throw error;
    if (data.marks === true) {
      const myvar = '<div class="" id="pic" style="">' +
            '<img src = "../../../assets/images/picture.png" height="150px" class="" style="padding: 0;"/>' +
    '          <h1 class= "text_file" style="padding: 0;">bulletins.xls</h1>' +
    '</div>';
      document.getElementById('note').insertAdjacentHTML('beforeend', myvar);
    }
  });
}
maj();
