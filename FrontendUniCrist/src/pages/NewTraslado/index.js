import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';


export default function NewTraslado() {
    const [data_ped, setDataPed] = useState('');
    const [turno, setIdTurno] = useState('-');
    const [id_destino, setIdDestino] = useState('-');
    const [id_veiculo, setIdVeiculo] = useState('-');
    const [ativo, setAtivo] = useState(true);
    const [veiculo, setVeiculo] = useState([]);
    const [destino, setDestino] = useState([]);

    const history = useHistory();

    const youId = localStorage.getItem('userId');
    const youName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('veiculos').then(response => {
            setVeiculo(response.data);
        })
    }, []);

    useEffect(() => {
        api.get('destinos').then(response => {
            setDestino(response.data);
        })
    }, []);

    async function handleNewTraslado(e) {
        e.preventDefault();

        const data = {
            data_ped,
            turno,
            id_destino,
            id_veiculo,
            ativo
        };

        try {

            await api.post('traslado', data, {
                headers: {
                    Authorization: youId,
                }
            })
            alert(`Seu Cadastro foi realizado com sucesso! `);

            history.push('/traslado');

        } catch (err) {
            alert('Capacidade do veículo excedida!');
        }
    }

    return (
        <div className="register-container" >
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logomarca da empresa" />

                    <h1>Agendar Novo Traslado</h1>
                    <p>Solicite novo viagem.</p>

                    <Link className='back-link' to="/traslado" >
                        <FiArrowLeft size={16} color="#19385d" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewTraslado}>
                    <input type="date" defaultValue='Escolha uma data' value={data_ped} onChange={e => setDataPed(e.target.value)} />
                    <input type="text" defaultValue='Digite seu Nome:' id='idnome' value={youName} />
                    <div className='div-select'>
                        <select name='tipe_turnor' className='tp-select' value={turno} onChange={e => setIdTurno(e.target.value)}>
                            <option value='-' >--Selecione--</option>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </select>
                        <select name='tipe_veiculo' className='tp-select' value={id_veiculo} onChange={e => setIdVeiculo(e.target.value)} >
                            <option value='-' >--Selecione--</option>
                            {veiculo.map((Veiculos, index) => (
                                <option key={index} value={Veiculos.id}>{Veiculos.descricao}</option>
                            ))}
                        </select>
                        <select name='tipe_destino' className='tp-select' value={id_destino} onChange={e => setIdDestino(e.target.value)} >
                            <option value='-' >--Selecione--</option>
                            {destino.map((Destinos, index) => (
                                <option key={index} value={Destinos.id}>{Destinos.sigla}</option>
                            ))}
                        </select>
                    </div>
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}