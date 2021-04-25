window.onload = initialize;
//JSON 
var images = [
    {
        url: 'img/image_1.jpg',
        title:'Beijing,China',
        description: 'Pekín, la enorme capital de China, tiene una historia que se remonta a 3 milenios. Aun así, es conocida tanto por su arquitectura moderna como por sus sitios antiguos, como el complejo de la Ciudad Prohibida, el palacio imperial durante las dinastías Ming y Qing. Cerca, en la enorme plaza peatonal de Tiananmén, se encuentra el mausoleo de Mao Zedong y el Museo Nacional de China, que exhibe una amplia colección de reliquias culturales.'
    },
    {
        url: 'img/image_2.jpg',
        title:'Estambul,Turquía',
        description: 'Estambul es una ciudad importante en Turquía, que se ubica en Europa y Asia a lo largo del estrecho de Bósforo. La Ciudad Antigua refleja las influencias culturales de los distintos imperios que gobernaron la región. En el distrito Sultanahmet, el Hipódromo al aire libre de la era romana fue por siglos un lugar de carreras de carros, y los obeliscos egipcios también permanecen en el lugar. La icónica basílica bizantina Santa Sofía tiene una elevada cúpula del siglo VI y mosaicos cristianos poco comunes.'
    },
    {
        url: 'img/image_3.jpg',
        title:'Kioto,Japan',
        description: 'Kioto, que alguna vez fue la capital de Japón, es una ciudad de la isla de Honshu. Es famosa por sus numerosos templos budistas clásicos y sus jardines, palacios imperiales, santuarios Shinto y casas de madera tradicionales. También es conocida por tradiciones formales, como las comidas kaiseki, que constan de varios platos de preparaciones distintivas, y las geishas, artistas femeninas que se encuentran comúnmente en el distrito Gion.'
    },
    {
        url: 'img/image_4.jpg',
        title:'Lisboa,Portugal',
        description: 'Lisboa es la capital costera y montañosa de Portugal. Desde el imponente castillo de San Jorge, la vista abarca los edificios de colores pastel en la ciudad antigua, el estuario del Tajo y el puente colgante 25 de Abril. Cerca, el Museo Nacional del Azulejo exhibe 5 siglos de azulejos de cerámica decorativos. Justo fuera de Lisboa hay una franja de playas en el Atlántico, desde Cascaes hasta Estoril.'
    },
    {
        url: 'img/image_5.jpg',
        title:'Sevilla,España',
        description: 'Sevilla es la capital de la región Andalucía, en el sur de España. Es famosa por su danza flamenco, particularmente en su barrio de Triana. Los principales sitios icónicos incluyen el complejo de castillos adornados del Alcázar, construido durante el imperio almohade morisco, y la Plaza de los Toros de la Maestranza, del siglo XVIII. En la catedral gótica de Sevilla, está la tumba de Cristóbal Colón y un minarete transformado en campanario, el Giraldo.'
    },
    {
        url: 'img/image_6.jpg',
        title:'Londres,Inglaterra',
        description: 'Londres, la capital de Inglaterra y del Reino Unido, es una ciudad del siglo XXI con una historia que se remonta a la época romana. En su centro se alzan el imponente Palacio del Parlamento, la torre del icónico reloj "Big Ben" y la Abadía de Westminster, lugar de las coronaciones monárquicas británicas. Al otro lado del río Támesis, la rueda de observación London Eye ofrece vistas panorámicas del complejo cultural South Bank y de toda la ciudad.'
    },
    {
        url: 'img/image_7.jpg',
        title:'Marrakech,Marruecos',
        description: 'Marrakech es una antigua ciudad imperial en el oeste de Marruecos y un importante centro económico con mezquitas, palacios y jardines. La medina es una ciudad medieval amurallada y densamente poblada que data del período del Imperio Bereber, con pasajes que parecen laberintos y animados zocos (mercados) que venden cerámicas, joyas y tejidos tradicionales. El minarete morisco de la mezquita Kutubía del siglo XII es un símbolo de la ciudad visible desde millas de distancia.'
    },
    {
        url: 'img/image_8.jpg',
        title:'NuevaYork,EEUU',
        description: 'Nueva York incluye 5 distritos que se ubican donde el río Hudson desemboca en el océano Atlántico. En su centro se encuentra Manhattan, un distrito densamente poblado que se encuentra entre los principales centros comerciales, financieros y culturales del mundo. Sus sitios icónicos incluyen rascacielos, como el Empire State Building, y el amplio Central Park. El teatro Broadway se ubica en la zona del Times Square iluminada con neones.'
    },
    {
        url: 'img/image_9.jpg',
        title:'París,Francia',
        description: 'París, la capital de Francia, es una importante ciudad europea y un centro mundial del arte, la moda, la gastronomía y la cultura. Su paisaje urbano del siglo XIX está entrecruzado por amplios bulevares y el río Sena. Aparte de estos hitos, como la Torre Eiffel y la catedral gótica de Notre Dame del siglo XII, la ciudad es famosa por su cultura del café y las tiendas de moda de diseñador a lo largo de la calle Rue du Faubourg Saint-Honoré.'
    },
    {
        url: 'img/image_10.jpg',
        title:'Praga,RepúblicaCheca',
        description: 'Praga, la capital de la República Checa, está dividida por el río Moldava. Recibe el apodo de la “Ciudad de las Cien Torres” y es conocida por la Plaza de la Ciudad Vieja, el núcleo de su centro histórico, con coloridos edificios barrocos, iglesias góticas y el Reloj Astronómico medieval, que muestra un espectáculo animado cada hora. El puente peatonal de Carlos se completó en 1402 y está bordeado de estatuas de santos católicos.'
    },
    {
        url: 'img/image_11.jpg',
        title:'Zanzíbar,Tanzania',
        description: 'Zanzíbar es un archipiélago de Tanzania frente a la costa de África Oriental. En su isla principal, Unguja, familiarmente llamada Zanzíbar, se encuentra la Ciudad de piedra, un centro comercial histórico con influencia suajili e islámica. Sus carreteras serpenteantes muestran minaretes, portales tallados y monumentos del siglo XIX, como la Casa de las Maravillas, un antiguo palacio del sultán. Las villas del norte Nungwi y Kendwa tienen amplias playas bordeadas de hoteles.'
    },
    {
        url: 'img/image_12.jpg',
        title:'Sydney,Australia',
        description: 'Sídney, capital de Nueva Gales del Sur y una de las ciudades más grandes de Australia, es famosa por su Casa de la Ópera de Sídney junto al puerto, con un característico diseño con forma de velas. El enorme Puerto Darling y el puerto Circular Quay más pequeño son núcleos de la vida ribereña, con el arqueado puente de la bahía de Sídney y el reconocido Real Jardín Botánico que se encuentra cerca. La plataforma exterior de la Sydney Tower, el Skywalk, ofrece vistas en 360 grados de la ciudad y los suburbios.'
    },
];
//console.log(images[i])
function initialize() {
    var myImages = document.getElementById("my-images")
    for (var i = 1; i <= images.length; i++) {
        myImages.innerHTML += '<div class="col-lg-4 col-md-12 mb-4">' + '<div class="modal fade" id="modal' + i + '" tabindex="-1" role="dialog" aria-hidden="true">' +
            '<div class="modal-dialog modal-lg" role="document">' + '<div class="modal-content text-center">' + '<h1>'+images[i-1].title+'</h1>'+ '<div class="modal-body mb-0 p-0">' +
            '<div class="embed-responsive embed-responsive-16by9 z-depth-1-half">' + '<img class="embed-responsive-item" src="img/image_' + i + '.jpg" alt='+images[i-1].title+'>' +
            '</div>' + '</div>' + '<div class="modal-footer justify-content-center">'+'<p>'+images[i-1].description+'</p>'+'<button type="button" class="btn btn-outline-primary btn-rounded btn-md ml-4"data-dismiss="modal">Close</button>' +
            '</div>' + '</div>' + '</div>' + '</div>' + '<a>' + '<img class="img-fluid z-depth-1 galery" src="img/image_' + i + '.jpg" alt='+images[i-1].title+' data-toggle="modal" data-target="#modal' + i + '">' + '</a>' +
            '</div>' + '</div>'
    }
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

