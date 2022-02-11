import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Destino() {
    const [nome, setNome] = useState('');
    const [sigla, setSigla] = useState([]);

    const history = useHistory();


    async function handleNewDestino(e) {
        e.preventDefault();

        const data = {
            nome,
            sigla,
        };

        try {

            await api.post('destinos', data)

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

                    <h1>Cadastro de Destinos</h1>
                    <p>Cadstre os detinos para os Traslado.</p>

                    <Link className='back-link' to="/traslado" >
                        <FiArrowLeft size={16} color="#19385d" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewDestino}>
                    <input type="text" placeholder='Nome do destino:' value={nome} onChange={e => setNome(e.target.value)} />
                    <input type="text" placeholder='Sigla do destino' id='idQTD' value={sigla} onChange={e => setSigla(e.target.value)} />

                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}