window.onload = initialize;
var user;
var email;
var productosLS;
var total;

function initialize() {
  initializeFirebase();
  readLocalStorageCompra();
  document.getElementById("empty").addEventListener("click", emptyLocalStorage);
  firebase.auth().onAuthStateChanged(handleAuthState);
  document.getElementById("delete-product").addEventListener("click", deleteProductLocalStorage);
  document.getElementById("process-purchase").addEventListener("click", uploadPurchase);
  calculateTotal();
  document.getElementById("btnLogout").addEventListener("click", signoutUser);
}

function readLocalStorageCompra() {
  productosLS = JSON.parse(localStorage.getItem('productos'));
  var rows = "";
  for (var i = 0; i < productosLS.length; i++) {
    rows += '<tr><td>' +
      '<img src="' + productosLS[i].image + '" width=100>' +
      '</td>' +
      '<td>' + productosLS[i].destination + '</td>' +
      '<td>' + productosLS[i].price + '</td>' +
      '<td>' + productosLS[i].quantity + '</td>' +
      '<td>' +
      '<a href="#" class="fas fa-times-circle" id="delete-product" style="font-size:30px" data-id="' + productosLS[i].id + '"></a>' +
      '</td></tr>';
  }

  var myTBody = document.getElementById("shopping-list");
  myTBody.innerHTML = rows;
}

function emptyLocalStorage() {
  localStorage.clear();
  location.reload();
}

function deleteProductLocalStorage() {
  var keyproduct = event.target.parentElement.parentElement.querySelector('a').getAttribute('data-id');
  let productosLS;
  let productoLS;
  if (localStorage.getItem('productos') === null) {
    productoLS = [];
  }
  else {
    productoLS = JSON.parse(localStorage.getItem('productos'));
  }
  productosLS = productoLS;
  productosLS.forEach(function (productoLS, index) {
    if (productoLS.id === keyproduct) {
      productosLS.splice(index, 1);
    }
  });
  localStorage.setItem('productos', JSON.stringify(productosLS));
  location.reload();
}

function calculateTotal() {
  productosLS = JSON.parse(localStorage.getItem('productos'));
  var total = 0;
  for (var i = 0; i < productosLS.length; i++) {
    var element = Number(productosLS[i].price * productosLS[i].quantity);
    total = total + element;

  }
  document.getElementById('total').innerHTML = total.toFixed(2) + " €";
}

function handleAuthState(user) {
  if (user) {
    document.getElementById("btnLogout").style.display = "block";
    user = firebase.auth().currentUser;
    if (user != null) {
      email = user.email;
    }
  }
}

function signoutUser() {
  firebase.auth().signOut();
  window.location = "index.html";
}


function uploadPurchase() {
  var f = new Date();
  var refPackages = firebase.database().ref("/Packages/purchases/");
  productosLS = JSON.parse(localStorage.getItem('productos'));
  for (var i = 0; i < productosLS.length; i++) {
    refPackages.push({
      email: email,
      destination: productosLS[i].destination,
      price: productosLS[i].price,
      datebuy: f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
  });
  }
  
    document.getElementById("loaders").style.display = "block";
    setTimeout(() => {
      document.getElementById("loaders").style.display = "none";
      document.getElementById("check").style.display = "block";
      document.getElementById("cart").style.display = "none";
      localStorage.clear();
    }, 4000);
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