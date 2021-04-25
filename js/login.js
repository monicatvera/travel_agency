window.onload = initialize;
const form = document.forms['login-form'];
var user;
var email;

function initialize() {
  initializeFirebase();
  const form = document.forms['login-form'];
  firebase.auth().onAuthStateChanged(handleAuthState);
  form.addEventListener("submit", signUp);
  document.getElementById("btnLogout").addEventListener("click", signoutUser);
}

function handleAuthState(user) {
  if (user) {
    document.getElementById("btnLogout").style.display = "block";
    document.getElementById("user").style.display = "block";
    user = firebase.auth().currentUser;
    if (user != null) {
      email = user.email;
    }
    console.log(email);
    if(email == 'admin@gmail.com'){
      showPrivateInfo();
    }
  }
  var infoUser = document.getElementById("user");
    infoUser.innerHTML = email;
  return console.log('No encontamos un usuario administrador 😭 prueba con esto email: admin@gmail.com  psw:123456');
}

function signUp(event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  return loginUser({ email, password });
}

function loginUser({ email, password }) {
  console.log('Loging user ' + email);

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log('Credenciales correctas, bienvenido.');
      location.reload();
    })
    .catch(function (error) {
      console.log(error);
      alertTryAgain(error);
    });
}

function alertTryAgain(error) {
  event.preventDefault();
  console.log(error);
  document.getElementById("error-name").style.display = "block";
}

function showPrivateInfo(user) {
  window.location = "admin.html";
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
