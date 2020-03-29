import React, {useState, useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import { FiPower,FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Profile () {
    const [incidents, setincidents] = useState([]);
    const history = useHistory('');
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile',{
            headers:{
                authorization:ongId,
            }
        }).then(response => {
            setincidents(response.data);
        })
    }, [ongId] );

    async function handleDeleteIncident (id){
        try{
            await api.delete(`incidents/${id}`, {
                headers:{
                    authorization:ongId,
                }
            })
            setincidents(incidents.filter(incident=> incident.id !== id));

        }catch (err) {
            alert('Erro ao deletar.')

        }
    }
    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (  
    <div className="profile-container">
        <header>
            <img src={logoImg} alt="Be The Hero"/>
        
    <span>Bem vinda,{ ongName }</span>
        <Link className="button" to="/incidents/new"  >
            Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="submit">
        <FiPower size={18} color="#E02041" />
        </button>
        
        </header>
        <h1>Casos cadastrados</h1>
        <ul>
         {incidents.map( incident => (
                <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>

                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>

                <strong>Valor:</strong>
                <p>{Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(incident.value)}</p>
                <button type="button" onClick={() => handleDeleteIncident(incident.id)} >
                <FiTrash2 size={20} color="#a8a8b3" />
                </button>
            </li>

         ) ) }
               
        </ul>
    </div>
    )
}

