import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import seloUnichristus from '../../assets/SeloUnichist.png';
import logoImg from '../../assets/logo.png';

export default function Logon() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    function handleLogout() {
        localStorage.clear();
    }

    useEffect(() => {
        handleLogout();
    }, [])

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            login,
            senha,
        };

        try {
            const response = await api.post('session', data);

            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userTipUser', response.data.tip_user);

            history.push('/traslado');

        } catch (err) {
            alert('Erro no login, tente novamente.');
        }
    }


    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logomarca da empresa" />

                <form onSubmit={handleLogin} >
                    <h1>Faça seu logon</h1>
                    <input placeholder="Seu Login" value={login} onChange={e => setLogin(e.target.value)} />
                    <input type="password" placeholder="Sua Senha" value={senha} onChange={e => setSenha(e.target.value)} />
                    <button type='submit' className='button'>Entrar</button>

                    <Link className='back-link' to="/register" >
                        <FiLogIn size={16} color="#19385d" />
                        Não tenho cadastro
                    </Link>
                </form>

            </section>
            <img src={seloUnichristus} alt="Imagem da empresa" />
        </div>
    );
}