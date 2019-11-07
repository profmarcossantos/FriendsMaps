import firebase from 'firebase'
import { getLatLongFromAddress } from './maps'

export const saveFriend = async (nome, email, endereco) => {
    let posicao = await getLatLongFromAddress(endereco)

    let dados = {
        nome,
        email,
        endereco,
        posicao
    }

    console.log(dados)

    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser
        firebase
            .database()
            .ref(`/amigos/${user.uid}`)
            .push(dados)
            .then(() => resolve("Dados Salvos!"))
            .catch((erro) => reject(erro))
    })
}


export const deleteFriend = (chave) => {

    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser
        firebase
            .database()
            .ref(`/amigos/${user.uid}/${chave}`)
            .remove()
            .then(() => resolve())
            .catch((erro) => reject(erro))
    })
}


export const getFriends = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase
                    .database()
                .ref(`/amigos/${user.uid}`)
                .on('value', snapchot => {
                    let dados = snapchot.val()
                    if (dados) {
                        const keys = Object.keys(dados)
                        const amigosLista = keys.map(id => {
                            return { ...dados[id], id }
                        })
                        resolve(amigosLista)
                    } else {
                        resolve([])
                    }
                })
            } else reject()

        })

    })
}