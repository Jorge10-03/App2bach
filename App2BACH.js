window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

/*var login = function(fecha, descripcion) {
  var fecha = document.getElementById('Fecha de Finalización').value;
  var descripcion = document.getElementById('Descripción').value;
  var URL = Fecha + "fecha" + nombre + "&descripcion" + pais;

    ons.notification.alert(fecha, descripcion, URL);
};*/

var login = function() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (username === 'bob' && password === 'secret') {
    ons.notification.alert('Congratulations!');
  } else {
    ons.notification.alert('Incorrect username or password.');
  }
};

function editSelects(event) {
  document.getElementById('choose-sel').removeAttribute('modifier');
  if (event.target.value == 'material' || event.target.value == 'underbar') {
    document.getElementById('choose-sel').setAttribute('modifier', event.target.value);
  }
}

function addOption(event) {
  const option = document.createElement('option');
  var text = document.getElementById('optionLabel').value;
  option.innerText = text;
  text = '';
  document.getElementById('dynamic-sel').appendChild(option);
}


