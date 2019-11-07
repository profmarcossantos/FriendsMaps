import React, { Component } from 'react'
import { logoff } from '../services/auth'
import { saveFriend, getFriends, deleteFriend } from '../services/api'
import { css } from '@emotion/core';
import { BarLoader } from 'react-spinners';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export class Menu extends Component {

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

    componentDidMount = async () => {
        this.atualizarDados()
    }

    atualizarDados() {
        getFriends()
            .then(dados => this.setState({ listaAmigos: dados }))
            .catch(erro => this.props.history.push("/"))

    }

    limparDados = () => {
        this.setState({
            nome: '',
            email: '',
            endereco: ''
        })
    }


    deleteAmigo(chave) {
        deleteFriend(chave)
            .then(() => this.atualizarDados())
    }

    salvarDados = async () => {
        this.setState({ loading: true })
        await saveFriend(this.state.nome, this.state.email, this.state.endereco)
            .then(msg => this.setState({ successMessage: msg, errorMessage: "" }))
            .catch(msg => this.setState({ errorMessage: msg.message, successMessage: "" }))
        this.setState({ loading: false })
        this.atualizarDados()
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
                        return <div key={i}>
                            {amigo.nome} - {amigo.email} - {amigo.endereco}
                            - <button
                                onClick={() => {
                                    var agree = window.confirm("deseja deletar os dados??");
                                    if (agree)
                                        this.deleteAmigo(amigo.id)
                                    else
                                        return false;
                                    
                                }}

                            >Excluir</button>
                        </div>
                    })
                }
                <hr />
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    initialCenter={{ lat: -28.2649459, lng: -52.3973581 }}
                >
                    {
                        this.state.listaAmigos.map((amigo, i) => {
                            return <Marker key={i}
                                title={amigo.nome}
                                position={amigo.posicao} />
                        })
                    }

                </Map>


            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDFpCCXIx9aPrjOrae7Laa_a1MCryxnjKc'
})(Menu);