import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { CiCirclePlus  } from 'react-icons/ci';
import { VscArrowLeft } from 'react-icons/vsc';
import { AiOutlineMinusCircle } from "react-icons/ai";
import ModalAdicionarPapel from '../../components/Modal/ModalAdicionarPapel';
import InvestimentosAgrupadosCard from '../InvestimentosAgrupadosCard';

import './style.css';

 

function InvestimentosAgrupados(){
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [dados, setDados] = useState()
    const UsuarioLogadoID = sessionStorage.getItem("UsuarioID");
    const [ticketOpenModal, setTicketOpenModal] = useState('')
    
    
    
    async function BuscaInvestimentos(){
        try {
            const response = await api.get(`meusInvestimentos/${UsuarioLogadoID}`);
            setDados(response.data)
            console.log(dados)
        } catch (error) {
            toast.warning(error, {position: 'top-center'})
        }
    }

    function openModal(open){
        setIsOpenModal(open)
    }
    function fechaModal(){
        setIsOpenModal(!open)
    }
    


    useEffect(()=>{
        BuscaInvestimentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(!dados){
        return(
            <div className="container-carregando">
                <h1>Carregando dados</h1>
            </div>
        )
    }

    if(!UsuarioLogadoID){
        return (
            <div className='container-erro-usuarioLogado'>
                <h1>Ops... Parece que você não esta logado!</h1>
                <span>Faça login novamente, clicando <Link to={'/'}>AQUI! <VscArrowLeft className='icon-seta' size={20}/> </Link></span>
            </div>
        )
    }
    return(
        <div className="container-investimentos-agrupados">
            <Navbar />
            <div className="container-header-investimentos-agrupados">
                <div className="container-titulo-invest-agrupados">
                    <h1>Lista de ativos</h1>
                </div>
                <div className="container-actions-investimentos-agrupados">

                    <button className='btn-adicionar-investimento' onClick={()=>{setTicketOpenModal(''), openModal(true, '')}}>
                        <CiCirclePlus size={16} />
                        Adicionar ativo
                    </button>

                    <Link to={'/Venda'}>
                        <button className='btn-adicionar-investimento'>
                            <AiOutlineMinusCircle size={16} />
                            Vender ativo
                        </button>
                    </Link>

                </div>
            </div>
            <div className="container-lista">
                <InvestimentosAgrupadosCard dadosList={dados} />
            </div>
           <ModalAdicionarPapel isOpen={isOpenModal} ticketParamter={ticketOpenModal} fechaModal={fechaModal} isEdit={false} investimento={''} />
        </div>
    )

}

export default InvestimentosAgrupados