import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Veiculos() {
    const [descricao, setDesc] = useState('');
    const [capmax, setCapmax] = useState('');

    const history = useHistory();

    async function handleNewVeiculos(e) {
        e.preventDefault();

        const data = {
            descricao,
            capmax
        };

        try {
            await api.post('veiculos', data)

            alert(`Seu Cadastro foi realizado com sucesso! `);

            history.push('/traslado');
        } catch (err) {
            alert('Algo deu arrado, tente novamente!');
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logomarca da empresa" />

                    <h1>Cadastro de Vaículos</h1>
                    <p>Faça seu cadastro de Veículos para sua rota</p>

                    <Link className='back-link' to="/traslado" >
                        <FiArrowLeft size={16} color="#19385d" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewVeiculos}>
                    <input placeholder='Nada insda' value={descricao} onChange={e => setDesc(e.target.value)} />
                    <input type='number' placeholder='Capacidade maxima!' id='idQTD' value={capmax} onChange={e => setCapmax(e.target.value)} />

                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}