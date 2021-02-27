// const { remote } = require('electron');

const prof = document.getElementById('profile');

prof.addEventListener('submit', function (event) {
  event.preventDefault();
  const cont = document.getElementById('content').value;
  if (cont === 'Gru' || cont === 'gru') {
    const main = document.getElementById('main');
    main.remove();
    const myvar = '<img src="../assets/images/insta.jpg">';
    document.getElementById('here').insertAdjacentHTML('beforeend', myvar);
  }
})
;
