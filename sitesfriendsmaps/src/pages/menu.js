import React, { Component } from 'react'
import { logoff } from '../services/auth'

export default class Menu extends Component {
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

            </div>
        )
    }
}
