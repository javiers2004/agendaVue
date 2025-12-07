// --- 2. CONFIGURACIÓN DE FIREBASE (Tus datos) ---
var firebaseConfig = {
    apiKey: "AIzaSyDEgGGMzqsavr0AjAeJLxvo3cjwDf5ESgM",
    authDomain: "agendavue-6ce8c.firebaseapp.com",
    databaseURL: "https://agendavue-6ce8c-default-rtdb.firebaseio.com",
    projectId: "agendavue-6ce8c",
    storageBucket: "agendavue-6ce8c.firebasestorage.app",
    messagingSenderId: "727675227684",
    appId: "1:727675227684:web:3e77440652a9217cc892b1",
    measurementId: "G-7MTCCWYPH0"
};

// Inicializamos Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database(); // Usamos Realtime Database

// --- 3. APLICACIÓN VUE ---
var app = new Vue({
    el: '#app',
    // Conexión mágica de Vuefire
    firebase: {
        contactos: db.ref('contactos')
    },
    data: {
        // 'contactos' ya no se define aquí, viene de Firebase
        nuevoContacto: {
            nombre: '',
            email: '',
            telefono: ''
        }
    },
    methods: {
        addContacto: function() {
            // Validar
            if (this.nuevoContacto.nombre && this.nuevoContacto.email) {
                // Enviar a Firebase
                this.$firebaseRefs.contactos.push({
                    nombre: this.nuevoContacto.nombre,
                    email: this.nuevoContacto.email,
                    telefono: this.nuevoContacto.telefono
                });
                // Limpiar formulario
                this.nuevoContacto.nombre = '';
                this.nuevoContacto.email = '';
                this.nuevoContacto.telefono = '';
            } else {
                alert("Rellena nombre y email");
            }
        },
        borrarContacto: function(contacto) {
            // Borrar de Firebase usando su ID única (.key)
            this.$firebaseRefs.contactos.child(contacto['.key']).remove();
        }
    }
});