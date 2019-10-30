import React, { Component } from 'react'
import { logoff } from '../services/auth'
import { saveFriend, getFriends } from '../services/api'
import { css } from '@emotion/core';
import { BarLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default class Menu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nome: '',
            email: '',
            endereco: '',
            errorMessage: '',
            successMessage: '',
            listaAmigos: [],
            loading: false
        }
    }

    componentDidMount() {
        getFriends()
            .then(dados => this.setState({ listaAmigos: dados }))
    }

    limparDados = () => {
        this.setState({
            nome: '',
            email: '',
            endereco: ''
        })
    }

    salvarDados = async () => {
        this.setState({ loading: true })
        await saveFriend(this.state.nome, this.state.email, this.state.endereco)
            .then(msg => this.setState({ successMessage: msg, errorMessage: "" }))
            .catch(msg => this.setState({ errorMessage: msg.message, successMessage: "" }))
        this.setState({ loading: false })
        this.limparDados()
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <button onClick={
                    () => {
                        logoff()
                            .then(() => this.props.history.push("/"))
                    }
                }>LOGOFF</button>
                <h1>Lista de Amigos</h1>
                <input
                    style={{ width: 200 }}
                    value={this.state.nome}
                    placeholder="Nome do Amigo"
                    onChange={(e) => this.setState({ nome: e.target.value })}
                /> &nbsp;
                <input
                    style={{ width: 200 }}
                    value={this.state.email}
                    placeholder="Email do Amigo"
                    onChange={(e) => this.setState({ email: e.target.value })}
                /> <br />
                <input
                    style={{ width: 400 }}
                    value={this.state.endereco}
                    placeholder="Endereço Completo do Amigo"
                    onChange={(e) => this.setState({ endereco: e.target.value })}
                /> <br />
                <button onClick={() => this.salvarDados()}>Salvar Amigo </button>
                <BarLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
                <h4 style={{ color: "red" }} >{this.state.errorMessage}</h4>
                <h4 style={{ color: "green" }} >{this.state.successMessage}</h4>


                <hr />
                {
                    this.state.listaAmigos.map((amigo, i) => {
                        return <div key= {i}>
                            {amigo.nome} - {amigo.email} - {amigo.endereco}
                        </div>
                    })
                }


            </div>
        )
    }
}
