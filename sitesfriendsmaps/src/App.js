import React, { Component } from 'react'
import firebase from 'firebase'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
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

    
  }
  login() {

  }


  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>LOGIN</h1>
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
