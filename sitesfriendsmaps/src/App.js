import React, { Component } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      successMessage: ""
    }

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
  }

  salvarUsuario() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(usuario => {
        this.setState({ successMessage: "Usuário criado com sucesso!" })
        this.setState({ errorMessage: "" })
        sessionStorage.setItem("uid", usuario.user.uid)
      })
      .catch(error => {
        this.setState({ errorMessage: error.message })
        this.setState({ successMessage: "" })
      })


  }
  login() {

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((usuario) => {
        sessionStorage.setItem("uid", usuario.user.uid)
        this.props.history.push("/menu")

      })
      .catch(() => {
        this.setState({ errorMessage: "Usuário ou senha incorretos!", successMessage: "" })
      })


  }


  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>LOGIN</h1>
        <h4 style={{ color: "red" }} >{this.state.errorMessage}</h4>
        <h4 style={{ color: "green" }} >{this.state.successMessage}</h4>
        <input
          placeholder="Informe o seu e-mail"
          type="email"
          value={this.state.email}
          onChange={
            (e) => this.setState({ email: e.target.value })
          }
        />
        <br />
        <input
          placeholder="Informe sua senha"
          type="password"
          value={this.state.password}
          onChange={
            (e) => this.setState({ password: e.target.value })
          }

        />
        <br />
        <button onClick={() => this.login()}>ENTRAR</button>
        <button onClick={() => this.salvarUsuario()}>NOVO USUÁRIO</button>

      </div>
    )
  }
}
