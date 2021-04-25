window.onload = initialize;
const ADD = "add";
const UPDATE = "update";
var operation = ADD;
var keyPackToEdit;
var thisRef;

function initialize() {
    initializeFirebase();
    var formTest = document.getElementById("form-packages");
    formTest.addEventListener("submit", validateAndSend);
    document.getElementById("cancel-button").addEventListener("click", resetForm);
    downloadPackages();
    document.getElementById("img-file").addEventListener("change", uploadImage);
    firebase.auth().onAuthStateChanged(handleAuthState);
    document.getElementById("btnLogout").addEventListener("click", signoutUser);
}

function resetForm() {
    document.getElementById("update-button").style.display = "none";
    document.getElementById("cancel-button").style.display = "none";
    document.getElementById("add-button").style.display = "block";
    operation = ADD;
}

function validateAndSend(event) {
    var cmbSelector = document.getElementById('selector').value;
    var txtDestination = document.getElementById('destination').value;
    var txtHotel = document.getElementById('hotel').value;
    var txtDescription = document.getElementById('description').value;
    var txtPrice = document.getElementById('price').value;
    var image = document.getElementById('img-file').files;
    var rbtStatus = document.getElementsByName('radiobutton');


    var banderaRBTN = false;

    //Test selector
    if (cmbSelector == null || cmbSelector == 0) {
        //alert('ERROR: Debe seleccionar una opcion');
        document.getElementById("error-selector").style.display = "block";
        event.preventDefault();
        return false;
    } else {
        document.getElementById("error-selector").style.display = "none";
    }

    if (txtDestination == null || txtDestination.length == 0 || /^\s+$/.test(txtDestination)) {
        console.log("destino requerido");
        document.getElementById("error-destino").style.display = "block";
        event.preventDefault();
        return false;
    } else {
        document.getElementById("error-destino").style.display = "none";
    }

    if (txtHotel == null || txtHotel.length == 0 || /^\s+$/.test(txtHotel)) {
        console.log("Hotel requerido");
        document.getElementById("error-hotel").style.display = "block";
        event.preventDefault();
        return false;
    } else {
        document.getElementById("error-hotel").style.display = "none";
    }

    if (txtDescription == null || txtDescription.length == 0 || /^\s+$/.test(txtDescription)) {
        //alert('ERROR: El campo mensaje no debe ir vacío o lleno de solamente espacios en blanco');
        document.getElementById("error-description").style.display = "block";
        event.preventDefault();
        return false;
    } else {
        document.getElementById("error-description").style.display = "none";
    }

    if (txtPrice == null || txtPrice.length == 0 || txtPrice.length == 5 || isNaN(txtPrice)) {
        console.log("precio requerido");
        document.getElementById("error-price").style.display = "block";
        event.preventDefault();
        return false;
    } else {
        document.getElementById("error-price").style.display = "none";
    }

    if (image.length == 0) {
        console.log("imagen requerida");
        document.getElementById("error-photo").style.display = "block";
        event.preventDefault();
        return false;
    } else {
        document.getElementById("error-photo").style.display = "none";
    }
    //Test RadioButtons
    for (var i = 0; i < rbtStatus.length; i++) {
        if (rbtStatus[i].checked) {
            banderaRBTN = true;
            break;
        }
    }
    if (!banderaRBTN) {
        document.getElementById("error-conf").style.display = "block";
        event.preventDefault();
        return false;
    } else {
        document.getElementById("error-conf").style.display = "none";
    }

    event.preventDefault();

    thisRef.getDownloadURL().then(function (url) {
        var formPack = event.target;
        if (operation == ADD) {
            var refPackages = firebase.database().ref("/Packages/pack/");
            refPackages.push({
                continent: formPack.selector.value,
                destination: formPack.destination.value,
                hotel: formPack.hotel.value,
                description: formPack.description.value,
                price: formPack.price.value,
                image: url,
                persons: formPack.radiobutton.value
            });
        } else {
            var refPackages = firebase.database().ref("/Packages/pack/" + keyPackToEdit);
            refPackages.update({
                continent: formPack.selector.value,
                destination: formPack.destination.value,
                hotel: formPack.hotel.value,
                description: formPack.description.value,
                price: formPack.price.value,
                image: url,
                persons: formPack.radiobutton.value
            });

            document.getElementById("update-button").style.display = "none";
            document.getElementById("cancel-button").style.display = "none";
            document.getElementById("add-button").style.display = "block";
            operation = ADD;
        }
        formPack.reset();
    return true;
    })
}


function downloadPackages() {
    var packages = firebase.database().ref("/Packages/pack/");

    packages.on("value", showPackages);
}

function showPackages(snap) {

    var data = snap.val();

    var rows = "";
    for (var key in data) {
        rows += '<tr>' +
            '<td>' + data[key].continent + '</td>' +
            '<td>' + data[key].destination + '</td>' +
            '<td>' + data[key].hotel + '</td>' +
            '<td>' + data[key].description + '</td>' +
            '<td>' + data[key].persons + '</td>' +
            '<td>' + data[key].price + '</td>' +
            '<td>' +
            '<i class="fas fa-trash-alt delete" data-packages="' + key + '"></i>' +
            '<i class="fas fa-edit edit" data-packages="' + key + '"></i>' +
            '</td>' +
            '</tr>';
    }

    var myTBody = document.getElementById("my-tbody");
    myTBody.innerHTML = rows;

    var editButtons = document.getElementsByClassName("edit");
    var deleteButtons = document.getElementsByClassName("delete");
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deletePack);
        editButtons[i].addEventListener("click", editPack);
    }
}

function editPack(event) {
    document.getElementById("update-button").style.display = "block";
    document.getElementById("cancel-button").style.display = "block";
    document.getElementById("add-button").style.display = "none";
    operation = UPDATE;

    var buttonClicked = event.target;

    var formPack = document.getElementById("form-packages");

    keyPackToEdit = buttonClicked.getAttribute("data-packages");
    var refPackToEdit = firebase.database().ref("/Packages/pack/" + keyPackToEdit);

    refPackToEdit.once("value", function (snap) {
        var data = snap.val();
        formPack.selector.value = data.selector;
        formPack.destination.value = data.destination;
        formPack.hotel.value = data.hotel;
        formPack.description.value = data.description;
        formPack.price.value = data.price;
        formPack.persons.value = data.persons;

    });


}

function deletePack(event) {
    var buttonClicked = event.target;

    var keyPackToDelete = buttonClicked.getAttribute("data-packages");
    var refPackToDelete = firebase.database().ref("/Packages/pack/" + keyPackToDelete);
    refPackToDelete.remove();
}


function uploadImage() {
    var file = document.getElementById("img-file").files[0];
    console.log(file);
    var storageRef = firebase.storage().ref("/images/");
    thisRef = storageRef.child(file.name);
    thisRef.put(file).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
    });

    thisRef.getDownloadURL().then(function (url) {
        console.log(url);
    })

    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("photo").src = e.target.result;
        }
        file = event.target.files;
        reader.readAsDataURL(event.target.files[0]);
    }
}

function handleAuthState(user) {
    if (user) {
        document.getElementById("btnLogout").style.display = "block";
        document.getElementById("user").style.display = "block";
        user = firebase.auth().currentUser;
    if (user != null) {
      email = user.email;
    }
    var infoUser = document.getElementById("user");
    infoUser.innerHTML = email;
  }
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
