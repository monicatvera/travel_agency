window.onload = initialize;
var user;
var email;
function initialize() {
    initializeFirebase();
    firebase.auth().onAuthStateChanged(handleAuthState);
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