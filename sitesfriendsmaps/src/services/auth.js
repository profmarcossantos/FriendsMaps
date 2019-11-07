import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyBX2Vu7naENdJUGEzC1NiPfPWn6LVh4Vi4",
    authDomain: "friendsmaps-5198b.firebaseapp.com",
    databaseURL: "https://friendsmaps-5198b.firebaseio.com",
    projectId: "friendsmaps-5198b",
    storageBucket: "friendsmaps-5198b.appspot.com",
    messagingSenderId: "910339080484",
    appId: "1:910339080484:web:2e02ff995f52b42721f3b1",
    measurementId: "G-V4VPNWYBWM"
};

firebase.initializeApp(firebaseConfig);

export const isAuthenticated = () => {
    firebase.auth().onAuthStateChanged(user=>{
        if (user) return true
        else return true
        
    })
    return firebase.auth().currentUser !== null
}

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                resolve()
            })
            .catch((erro) => {
                reject(erro)
            })
    })
}


export const signUp = (email, password) => {

    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve("Usuário criado com sucesso!")
            })
            .catch(error => {
                reject(error)
            })
    })
}



export const logoff = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut()
            .then(() => resolve())

    })


}