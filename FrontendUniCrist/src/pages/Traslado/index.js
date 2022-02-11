import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { BsFillPersonCheckFill } from "react-icons/bs";

import { NavBarComp } from "../../components/NavBarComp";

import api from "../../services/api";

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Traslado() {
    const [movin, setMovin] = useState([]);

    const history = useHistory();

    const youId = localStorage.getItem('userId');
    const youName = localStorage.getItem('userName');
    const tipUser = localStorage.getItem('userTipUser');

    useEffect(() => {
        api.get('profileuser', {
            headers: {
                Authorization: youId,
            }
        }).then(response => {
            setMovin(response.data);
        })
    }, [youId]);

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }


    return (
        <div className="traslado-container" >
            <header>
                <img src={logoImg} alt="Logo da Unichristus" />
                <span>Bem vindo, {youName}</span>

                <Link className="button" to="/traslado/new">Agende a sua Viagem</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#19385d" />
                </button>

            </header>

            <section>
                <NavBarComp title={tipUser} />
            </section>

            <h1>Viagens já realizadas</h1>

            <ul>
                {movin.map(Movin => (
                    <li key={Movin.id}>
                        <div>
                            <strong>Data: </strong>
                            <p>{Movin.data_ped}</p>
                        </div>
                        <div>
                            <strong>Nome: </strong>
                            <p>{Movin.name}</p>
                        </div>
                        <div>
                            <strong>Turno: </strong>
                            <p>{Movin.turno}</p>
                        </div>

                        <div>
                            <strong>Veiculo: </strong>
                            <p>{Movin.descricao}</p>
                        </div>

                        <div>
                            <strong>Destino: </strong>
                            <p>{Movin.sigla}</p>
                        </div>

                        <button type="button">
                            < BsFillPersonCheckFill size={20} color="#a8a8" />
                        </button>
                    </li>
                ))}

            </ul>
        </div>
    );
}