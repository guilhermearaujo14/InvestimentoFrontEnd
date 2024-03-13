import './style.css';
import Navbar from '../../components/navbar';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Carregando from '../../components/Modal/Carregando/Carregando'; 
import Contador from '../../components/Contador';


function Home(){
    const UsuarioLogado = sessionStorage.getItem('UserName');
    const UsuarioID = sessionStorage.getItem('UsuarioID')
     const [dados, setDados] = useState({})
     const [isCarregando, setIsCarregando] = useState(false)

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
            setIsCarregando(true)
            try {
                const result = await api.get(`Totalizadores/${UsuarioID}`);
                let [data] = await result.data;
                setDados(data)
                //console.log(dados);
            } catch (error) {
                toast.warning(error.message, {position: 'top-center'})
            }finally{
                setIsCarregando(false)
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
                            <Contador valor={dados.TotalGeral} titulo='Total' porcentagem={100} />
                            <Contador valor={dados.TotalAcoes} titulo='Ações' porcentagem={dados.PorcentagemAcoes} />
                            <Contador valor={dados.TotalFiis} titulo='FIIs' porcentagem={dados.PorcentagemFiis} />
                            <Contador valor={dados.TotalETF} titulo='ETFs' porcentagem={dados.PorcentagemETF} />
                            <Contador valor={dados.TotalBDR} titulo='BDRs' porcentagem={dados.PorcentagemBDR} />

            </div>
        <Carregando isOpen={isCarregando} mensagem={''} />
       </div>
    )
}

export default Home;

///contadoresByUsuario