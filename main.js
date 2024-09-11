//firebase para guardar datos en backend
const firebaseConfig = {
  // utiliza la confituración proporcionada por firebase
}

//inicializar firebase
firebase.initializeApp(firebaseConfig);

// Inicializar cloub Firestire
const db = firebase.firestore()

// capturar formulario
const form = document.getElementById('formulario')

//evento de formulario

form.addEventListener('submit', (e)=> {
    e.preventDefault()

    // validar nombre
    let inputNombre = document.getElementById('name')
    let nameErr = document.getElementById('nameErr')

    if(inputNombre.value.trim() == '' || inputNombre.value.trim().length < 3){
        nameErr.textContent = 'Debe introducir un nombre válido de más de 3 caracteres'
        nameErr.classList.add('error-msg')
    }else{
        nameErr.textContent = ''
        nameErr.classList.remove('error-msg')
    }

    //validar email
    let inputEmail = document.getElementById('email')
    let emailErr = document.getElementById('emailErr')
    let emailPatron = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 

    if(!emailPatron.test(inputEmail.value)) {
        emailErr.textContent = 'Debe introducir un correo electrónico válido'
        emailErr.classList.add('error-msg')

    }else{
        emailErr.textContent = ''
        emailErr.classList.remove('error-msg')
    }

    //validar constraseña
    let inputPassword = document.getElementById('password')
    let passwordErr = document.getElementById('passwordErr')
    let passwordPatron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}/

    if(!passwordPatron.test(inputPassword.value)){
        passwordErr.textContent = 'Debe introducir una contraseña que contenga al menos una letra mayúscula, una minúscula, un número y un caracter especial. '
        passwordErr.classList.add('error-msg')
    }else{
        passwordErr.textContent = ''
        passwordErr.classList.remove('error-msg')
    }

    //todo los campos son válidos

    if(!nameErr.textContent && !emailErr.textContent && !passwordErr.textContent){

        //información para el backend
        db.collection("users").add({
        name: inputNombre.value,
        email: inputEmail.value,
        password: inputPassword.value
        })
        .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
        console.error("Error adding document: ", error);
        });

    //confirmación de envío y reset formulario
    alert('El formulario se ha enviado correctamente')
    form.reset()
    }
})