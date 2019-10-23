import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
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
        <button>ENTRAR</button>
        <button>NOVO USUÁRIO</button>

      </div>
    )
  }
}
