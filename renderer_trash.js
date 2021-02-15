function showFiles () {
  const myvar = '<img src = "../assets/images/document.png" id="trash" height= "200px" class="pb-2 img-responsive" style="padding: 0;"/>' +
'          <h1 class= "text_file" style="padding: 0;">Corbeille</h1>';
  document.getElementById('after').insertAdjacentHTML('afterend', myvar);
}
showFiles();
