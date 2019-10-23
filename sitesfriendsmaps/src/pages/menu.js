import React, { Component } from 'react'

export default class Menu extends Component {
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <h1>Lista de Amigos</h1>
                <table border="true" >
                    <tr>
                        <td>NOME</td>
                        <td>ENDEREÇO</td>
                        <td>E-MAIL</td>
                    </tr>
                    <tr>
                        <td>Pedro</td>
                        <td>Rua Prudente de Morais, 296 Carazinho</td>
                        <td>pedroca@gmail.com</td>
                    </tr>
                    
                </table>
            </div>
        )
    }
}
