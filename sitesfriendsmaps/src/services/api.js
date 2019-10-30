import firebase from 'firebase'

export const saveFriend = (nome, email, endereco) => {
    let dados = {
        nome,
        email,
        endereco
    }

    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref(`/amigos/${sessionStorage.getItem("UID")}`)
            .push(dados)
            .then(() => resolve("Dados Salvos!"))
            .catch((erro) => reject(erro))
    })
}



export const getFriends = () => {
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref(`/amigos/${sessionStorage.getItem("UID")}`)
            .on('value', snapchot => {
                let dados = snapchot.val()
                if (dados) {
                    const keys = Object.keys(dados)
                    const amigosLista = keys.map(id => {
                        return { ...dados[id], id }
                    })
                    resolve(amigosLista)
                }
            })
    })
}