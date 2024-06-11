import './style.css';
import Navbar from '../../components/navbar';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Carregando from '../../components/Modal/Carregando/Carregando'; 
import Contador from '../../components/Contador';
import ChartPie from '../../components/graficos/GraficoPizzaHome';

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
                const result = await api.get(`totalizadores/${UsuarioID}`);
                let [data] = await result.data;
                setDados(data)
            } catch (error) {
                toast.warning(error.message, {position: 'top-center'})
            }finally{
                setIsCarregando(false)
            }}
            console.log(dados);
            CarregarDadosTela(UsuarioID)
    },[])

    return(
        <div className='container-home'>
            <Navbar />
            <div className="container-saudacao">
                <h1 className='titulo-saudacao'>Bem-Vindo, {UsuarioLogado}!</h1>
            </div>
            <div className="container-contadores">
                            <Contador valor={dados.TOTAL_GERAL} titulo='Total' porcentagem={100} />
                            <Contador valor={dados.TOTAL_ACOES} titulo='Ações' porcentagem={(dados.TOTAL_ACOES / dados.TOTAL_GERAL)*100} />
                            <Contador valor={dados.TOTAL_FIIS} titulo='FIIs' porcentagem={(dados.TOTAL_FIIS / dados.TOTAL_GERAL)*100} />
                            <Contador valor={dados.TOTAL_ETFS} titulo='ETFs' porcentagem={(dados.TOTAL_ETFS / dados.TOTAL_GERAL)*100} />
                            <Contador valor={dados.TOTAL_BDRS} titulo='BDRs' porcentagem={(dados.TOTAL_BDRS / dados.TOTAL_GERAL)*100} />
                            <Contador valor={dados.TOTAL_FI_AGRO} titulo='Fundo de investimento' porcentagem={(dados.TOTAL_FI_AGRO / dados.TOTAL_GERAL)*100} />

            </div>
            <div className="container-grafico-pizza">
                <ChartPie dados={dados} />
            </div>
        <Carregando isOpen={isCarregando} mensagem={''} />
       </div>
    )
}

export default Home;

///contadoresByUsuario