import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}

//volta ao estado inicial do usuário
const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '' },
    list: []
}

// componente de classe 
export default class UserCrud extends Component {
    state = { ...initialState }

    componentWillMount() {
        {  /*obter lista back */ }
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        //clonar objeto, semm alterar diretamente
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        //resolve uma string, [metodo], função
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdateList(resp.data) //usuário retornado back
                this.setState({ user: initialState.user, list }) //alterar/inserir user, atualizar lista
            })
    }

    getUpdateList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)//remove usuário da lista, gerar nova lista com filter
        list.unshift(user) //usuário na primeira posição
        return list
    }

    //atualizar  campos
    updateField(event) {
        const user = { ...this.state.user } //clonar usuário
        user[event.target.name] = event.target.value //valor dos input
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary ml-3"
                                onClick={e => this.save(e)}>
                                Salvar
                            </button>
                            <button className="btn btn-secondary ml-2"
                                onClick={e => this.clear(e)}> {/*amarrar o this*/}
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== user)  /*atualizar o usuário */
            this.setState({ list }) /* retorna lista atualizado com usuário já deletado */
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>

                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        /**mapear lista de usuário do objeto  */
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        console.log(this.state.list)
        return (
            <Main {...headerProps} >
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}