import './style.css';
import Navbar from '../../components/navbar';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import api from '../../services/api';
 
import Contador from '../../components/Contador';


function Home(){
    const UsuarioLogado = sessionStorage.getItem('UserName');
    const UsuarioID = sessionStorage.getItem('UsuarioID')
     const [dados, setDados] = useState({})

    if(!UsuarioID){
        return(
            <div className="container-erro-sem-logar">
                <h3>Ops.. É necessário logar para acessar essa página!</h3>
            </div>
        )
    }

    if(!dados){
        return(
            <h1>Loading...</h1>
        )
    }
   
 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        async function CarregarDadosTela(UsuarioID){
            try {
                const result = await api.get(`contadoresByUsuario/${UsuarioID}`);
                let [data] = await result.data;
                setDados(data)
                //console.log(dados);
            } catch (error) {
                toast.warning(error.message, {position: 'top-center'})
            }}
            CarregarDadosTela(UsuarioID)
    },[])

    return(
        <div className='container-home'>
            <Navbar />
            <div className="container-saudacao">
                <h1 className='titulo-saudacao'>Bem-Vindo, {UsuarioLogado}!</h1>
            </div>
            <div className="container-contadores">
                            <Contador valor={dados.TOTAL} titulo='Total' porcentagem={100} />
                            <Contador valor={dados.TOTAL_ACOES} titulo='Ações' porcentagem={dados.PORCENTAGEM_ACOES} />
                            <Contador valor={dados.TOTAL_FIIS} titulo='FIIs' porcentagem={dados.PORCENTAGEM_FIIS} />
                            <Contador valor={dados.TOTAL_ETFS} titulo='ETFs' porcentagem={dados.PORCENTAGEM_ETFS} />
                            <Contador valor={dados.TOTAL_BDRS} titulo='BDRs' porcentagem={dados.PORCENTAGEM_BDRS} />

            </div>

       </div>
    )
}

export default Home;

///contadoresByUsuario