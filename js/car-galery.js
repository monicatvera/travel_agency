window.onload = initialize;
var products = [];
var productoLS= [];
let productosLS=[];
const form = document.forms['login-form'];
const listaCompra = document.querySelector("#lista-compra tbody");
function initialize() {
  initializeFirebase();
  downloadPackages();
  const form = document.forms['login-form'];
  form.addEventListener("submit",signUp);
  firebase.auth().onAuthStateChanged(handleAuthState);
  document.getElementById("btnLogout").addEventListener("click", signoutUser);
  document.getElementById("my-tbody").addEventListener("click", savedDate);
}

function downloadPackages() {
  var packages = firebase.database().ref("/Packages/pack/");

  packages.on("value", showPackages);
}
function showPackages(snap) {

  var data = snap.val();

  var rows = "";
  for (var key in data) {
    event.preventDefault();
    rows += '<div class="col-md-6 col-lg-4">' +
      '<div class="card border-0 transform-on-hover">' +
      '<a class="lightbox" href="' + data[key].image + '"><img src="' + data[key].image + '" class="card-img-top"></a>' +
      '<div class="card-body">' +
      '<h6>' + data[key].destination + '</h6>' +
      '<h7>' + data[key].continent + '</h7>' +
      '<p class="text-muted card-text">' + data[key].hotel + '</p>' +
      '<p class="text-muted card-text">' + data[key].description + '</p>' +
      '<p class="text-muted card-text">Para ' + data[key].persons + '</p>' +
      '<p class="text-muted card-text pricee"> Desde: ' + data[key].price + ' € </p>' +
      '<button type="button" class="btn game btn-danger" id="add-shopping" data-id="'+key+'" data-toggle="modal" data-target="#myModal">Añadir al carrito</button>' +
      '</div>' +
      '</div>' + 
      '</div>'+
      '<div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog">'+
      '<div class="modal-content"><div class="modal-header">'+
      '<h4 class="modal-title">Cesta de compra</h4></div>'+
      '<div class="modal-body"><p>El articulo se añadio correctamente a la cesta. Cuando termines de elegir lo que quieres comprar puedes consultarlo todo en el carrito de la barrar de navegacion</p></div>'+
      '<div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal">Close</button></div>'+
      '</div></div></div></div>';
  }

  var myTBody = document.getElementById("my-tbody");
  myTBody.innerHTML = rows;
}


function signUp(event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;
  const isLoginOrSignup = event.target.isLoginOrSignup.value;

  if (isLoginOrSignup === 'isLogin') {
    return loginUser({ email, password });
  }

  return createUser({ email, password });
}

function createUser({ email, password }) {
  console.log('Creating user ' + email);

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (user) {
      var refPackages = firebase.database().ref("/Packages/users/");
            refPackages.push({
                email: email,
                password: password
            });
      console.log('¡Creamos el user, bro! Huepaje!');
    })
    .catch(function (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Ya existe el usuario');
        const soLogin = confirm(
          `Ya te habias registrado con este email, bro 😝.
          ¿Quieres iniciar sesión ✨?`
        );
        return !!soLogin ? loginUser({ email, password }) : alertTryAgain(error);;
      }

      return alertTryAgain(error);
    });
}

function loginUser({ email, password }) {
  console.log('Loging user ' + email);

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log('Credenciales correctas, bienvenido.');
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

function savedDate(){
    var keyproduct = event.target.parentElement.parentElement.querySelector('button').getAttribute('data-id');
   var product;
   var packages = firebase.database().ref("/Packages/pack/");
    packages.on("value", function(snap) {
    var data = snap.val();
    product={
      image: data[keyproduct].image,
      destination: data[keyproduct].destination,
      price: data[keyproduct].price,
      quantity: 1,
      id: keyproduct
    }
    let productosLS;
    let productoLS;
     if(localStorage.getItem('productos') === null){
      productoLS = [];
       }
     else {
      productoLS = JSON.parse(localStorage.getItem('productos'));
      }
    productosLS = productoLS;

    productosLS.forEach(function (productoLS){
    if(productoLS.id === product.id){
          productosLS = productoLS.id;
            }
        });
    
    if(productosLS === product.id){
       console.log("producto ya añadido");
      }

    products.push(product);
});
localStorage.setItem('productos', JSON.stringify(products));

productosLS = JSON.parse(localStorage.getItem('productos'));
}

function handleAuthState(user) {
  if (user) {
      document.getElementById("btnLogout").style.display = "block";
      document.getElementById("login-user").style.display = "none";
      document.getElementById("content").style.display = "block";
      document.getElementById("last-shopping").style.display = "block";
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