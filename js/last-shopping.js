window.onload = initialize;
var user;
var email;

function initialize() {
    initializeFirebase();
    downloadPackages();
    firebase.auth().onAuthStateChanged(handleAuthState);
    document.getElementById("btnLogout").addEventListener("click", signoutUser);
}



  function downloadPackages() {
    var packages = firebase.database().ref("/Packages/purchases/");
  
    packages.on("value", showPackages);
  }
  function showPackages(snap) {
  
    var data = snap.val();
  
    var rows = "";
    for (var key in data) {
        if(data[key].email == email){
      rows += '<tr>' +
      '<td>' + data[key].destination + '</td>' +
      '<td>' + data[key].price + '</td>' +
      '<td>' + data[key].datebuy + '</td>' +
      '</tr>';
        }
    }

  
    var myTBody = document.getElementById("my-tbody");
    myTBody.innerHTML = rows;
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
    }
    var infoUser = document.getElementById("user");
    infoUser.innerHTML = email;
  }
  function signoutUser() {
    firebase.auth().signOut();
    window.location="index.html";
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