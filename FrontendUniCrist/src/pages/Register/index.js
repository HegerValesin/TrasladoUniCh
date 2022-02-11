import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [campus, setCampus] = useState('');
    const [tip_user, setTpUser] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            login,
            senha,
            campus,
            tip_user
        };

        try {

            const response = await api.post('users', data)

            alert(`Seu Cadastro foi realizado com sucesso! ${response.data.id} - ${response.data.name}`);

            history.push('/');

        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logomarca da empresa" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e agende seu traslado com
                        segurança para um de nossos campos.
                    </p>

                    <Link className='back-link' to="/" >
                        <FiArrowLeft size={16} color="#19385d" />
                        Voltar para o Logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder='Digite seu Nome:' value={name} onChange={e => setName(e.target.value)} />
                    <input placeholder='Digite seu Email:' id='idEmail' value={email} onChange={e => setEmail(e.target.value)} />
                    <div className='input-group'>
                        <input placeholder='Digite seu Login' value={login} onChange={e => setLogin(e.target.value)} />
                        <input placeholder='Digite seu Senha' value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>
                    <div className='input-group'>
                        <input placeholder='Qual o Seu campos' value={campus} onChange={e => setCampus(e.target.value)} />
                        <select name='tipe_user' className='tp-select' value={tip_user} onChange={e => setTpUser(e.target.value)} >
                            <option value='-' >--Selecione--</option>
                            <option value="adm">Administrador</option>
                            <option value="aluno">Aluno</option>
                        </select>
                    </div>
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}