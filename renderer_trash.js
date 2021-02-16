function showFiles () {
  const myvar = '<img src = "../assets/images/document.png" height="200px" class="" style="padding: 0;"/>' +
'          <h1 class= "text_file" style="padding: 0;">Note.txt</h1>';
  document.getElementById('after').insertAdjacentHTML('afterend', myvar);
}
showFiles();
