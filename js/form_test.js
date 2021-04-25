window.onload = initialize;


function initialize() {
  initializeFirebase();
  firebase.auth().onAuthStateChanged(handleAuthState);
  document.getElementById("btnLogout").addEventListener("click", signoutUser);
  var formTest = document.getElementById("form-test");
  formTest.addEventListener("submit", validateAndSend);
  document.getElementById("btnLogout").addEventListener("click", signoutUser);
}

function validateAndSend(event) {

  var txtName = document.getElementById('name').value;
  var txtAge = document.getElementById('age').value;
  var txtEmail = document.getElementById('email').value;
  var cmbSelector = document.getElementById('selector').selectedIndex;
  var rbtStatus = document.getElementsByName('radiobutton');
  var txtMensaje = document.getElementById('mensaje').value;
  var chkStatus = document.getElementById('checkbox');

  var banderaRBTN = false;

  //Test nome
  if (txtName == null || txtName.length == 0 || /^\s+$/.test(txtName)) {
    //alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco');
    console.log("nombre requerido");
    document.getElementById("error-name").style.display = "block";
    event.preventDefault();
    return false;
  } else {
    document.getElementById("error-name").style.display = "none";
  }

  //Test age
  if (txtAge == null || txtAge.length == 0 || txtAge.length == 3 || isNaN(txtAge)) {
    //alert('ERROR: Debe ingresar una edad');
    console.log("nombre requerido");
    document.getElementById("error-age").style.display = "block";
    event.preventDefault();
    return false;
  } else {
    document.getElementById("error-age").style.display = "none";
  }

  //Test email
  if (!(/\S+@\S+\.\S+/.test(txtEmail))) {
    //alert('ERROR: Debe escribir un correo válido');
    document.getElementById("error-email").style.display = "block";
    event.preventDefault();
    return false;
  } else {
    document.getElementById("error-email").style.display = "none";
  }


  //Test selector
  if (cmbSelector == null || cmbSelector == 0) {
    //alert('ERROR: Debe seleccionar una opcion del asunto');
    document.getElementById("error-selector").style.display = "block";
    event.preventDefault();
    return false;
  } else {
    document.getElementById("error-selector").style.display = "none";
  }

  //Test Message
  if (txtMensaje == null || txtMensaje.length == 0 || /^\s+$/.test(txtMensaje)) {
    //alert('ERROR: El campo mensaje no debe ir vacío o lleno de solamente espacios en blanco');
    document.getElementById("error-mensaje").style.display = "block";
    event.preventDefault();
    return false;
  } else {
    document.getElementById("error-mensaje").style.display = "none";
  }
  //Test checkBox
  if (!chkStatus.checked) {
    //alert('ERROR: Debe seleccionar el checkbox');
    document.getElementById("error-checkbox").style.display = "block";
    event.preventDefault();
    return false;
  } else {
    document.getElementById("error-checkbox").style.display = "none";
  }

  //Test RadioButtons
  for (var i = 0; i < rbtStatus.length; i++) {
    if (rbtStatus[i].checked) {
      banderaRBTN = true;
      break;
    }
  }
  if (!banderaRBTN) {
    //alert('ERROR: Debe elegir una opción de sexo');
    document.getElementById("error-sexo").style.display = "block";
    event.preventDefault();
    return false;
  } else {
    document.getElementById("error-sexo").style.display = "none";
  }


  return true;
}

function handleAuthState(user) {
  if (user) {
      document.getElementById("btnLogout").style.display = "block";
      document.getElementById("user").style.display = "block";
      user = firebase.auth().currentUser;
      if (user != null) {
        email = user.email;
      }
      }
      var infoUser = document.getElementById("user");
      infoUser.innerHTML = email;
}

function signoutUser() {
  firebase.auth().signOut();
  window.location="index.html";
}

function initializeFirebase() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}