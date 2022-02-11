import React, { useEffect, useState } from 'react';
import { NavBarComp } from "../../components/NavBarComp";

import api from "../../services/api";

import logoImag from '../../assets/logo.png';

import './styles.css';

export default function UsersProfile() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [campus, setCampus] = useState('');
    const [tip_user, setTpUser] = useState('');

    const tipUser = localStorage.getItem('userTipUser');

    useEffect(() => {
        api.get('usersprofiles').then(response => {
            setUsers(response.data);
        })
    }, [])

    async function atualiza() {
        api.get('usersprofiles').then(response => {
            setUsers(response.data);
        })
    }

    async function clickEdit(id) {
        const response = await api.get(`usersprofiles/${id}`);
        localStorage.setItem('EdUserId', response.data.id);

        // setIdUsers(response.data.id);
        setName(response.data.name);
        setEmail(response.data.email);
        setLogin(response.data.login);
        setCampus(response.data.campus);
        setTpUser(response.data.tip_user);

        setIsModalVisible(true)
        atualiza()
    }

    async function clickExcl(id) {
        try {
            await api.delete(`usersprofiles/${id}`);

            alert('Usuário excluído com sucesso!');
            atualiza()

        } catch (err) {
            alert('Erro ao excluir, Tente novamento');
        }
    }

    async function handleUsersProfile(e) {
        e.preventDefault();

        const youId = localStorage.getItem('EdUserId');

        const data = {
            'id': youId,
            name,
            email,
            login,
            campus,
            tip_user
        };

        try {

            await api.put(`usersprofiles`, data)

            alert(`Canfirmado!`);
            setIsModalVisible(false)
            atualiza()

        } catch (err) {
            alert('Edição não foi concluida!');
        }
    }

    return (
        <div className="userprofile-container">
            <header>
                <img src={logoImag} alt="Logomarca da empresa" />

                <NavBarComp title={tipUser} />
            </header>

            <h1>Listagem de Usuarios</h1>

            <div className='userprofile-grid'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Login</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Campos</th>
                            <th scope="col">Tipo User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(Users => (
                            <tr key={Users.id}>
                                <th scope="row">{Users.id}</th>
                                <td>{Users.name}</td>
                                <td>{Users.login}</td>
                                <td>{Users.email}</td>
                                <td>{Users.campus}</td>
                                <td>{Users.tip_user}</td>
                                <td className='td-btn'>
                                    <button type="button" className="button-grid" onClick={() => clickEdit(Users.id)} id='edit'>Editar</button>
                                    <button type="button" className="button-grid" onClick={() => clickExcl(Users.id)} id='excl'>Excluir</button>
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <div className='editUser'>
                {isModalVisible ?
                    <div className='modal-overlay '>
                        <div className='modals'>
                            <div id='form'>
                                <h1>Editi o Cadastro do Usuário</h1>
                                <form onSubmit={handleUsersProfile}>
                                    <input placeholder='Digite seu Nome:' value={name} onChange={e => setName(e.target.value)} />
                                    <input placeholder='Digite seu Email:' id='idEmail' value={email} onChange={e => setEmail(e.target.value)} />
                                    <div className='input-group'>
                                        <input placeholder='Digite seu Login' value={login} onChange={e => setLogin(e.target.value)} />
                                    </div>
                                    <div className='input-group'>
                                        <input placeholder='Qual o Seu campos' value={campus} onChange={e => setCampus(e.target.value)} />
                                        <select name='tipe_user' className='tp-select' value={tip_user} onChange={e => setTpUser(e.target.value)} >
                                            <option value='-' >--Selecione--</option>
                                            <option value="adm">Administrador</option>
                                            <option value="aluno">Aluno</option>
                                        </select>
                                    </div>
                                    <div className="button-form">
                                        <button className='button btnpq' type='submit' >Confirmar</button>
                                        <button type="button" className="button-grid btnpq" id='excl' onClick={() => setIsModalVisible(false)}>Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> : null}

            </div>


        </div >
    );

}