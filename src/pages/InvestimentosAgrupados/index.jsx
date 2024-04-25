import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { CiCirclePlus  } from 'react-icons/ci';
import { VscArrowLeft } from 'react-icons/vsc';
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoCloudUpload } from "react-icons/io5";
import ModalAdicionarPapel from '../../components/Modal/ModalAdicionarPapel';
import InvestimentosAgrupadosCard from '../InvestimentosAgrupadosCard';
import CarregandoDados from '../../components/CarregandoDados';

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
        } catch (error) {
            toast.warning(error, {position: 'top-center'})
        }
    }

    function openModal(open){
        setIsOpenModal(open)
    }
    function fechaModal(){
        setIsOpenModal(!open)
        setDados([])
        BuscaInvestimentos()
    }
    


    useEffect(()=>{
        setTicketOpenModal()
        BuscaInvestimentos();
    },[])

    if(!dados){
        return(
            <CarregandoDados />
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
            <div className="container-navbar">
                <Navbar />
            </div>
            <div className="container-header-investimentos-agrupados">
                <div className="container-titulo-invest-agrupados">
                    <h1>Lista de ativos</h1>
                </div>
                <div className="container-actions-investimentos-agrupados">

                    <button className='btn-adicionar-investimento' onClick={()=>{setTicketOpenModal(), openModal(true)}}>
                        <CiCirclePlus size={16} />
                        Adicionar ativo
                    </button>

                    <Link to={'/Venda'}>
                        <button className='btn-adicionar-investimento'>
                            <AiOutlineMinusCircle size={16} />
                            Vender ativo
                        </button>
                    </Link>

                    <Link to={'/ImportacaoPlanilha'}>
                        <button className='btn-adicionar-investimento'>
                            <IoCloudUpload  size={18} />
                            Importar planilha
                        </button>
                    </Link>

                </div>
            </div>
            <div className="container-lista">
                <InvestimentosAgrupadosCard dadosList={dados} />
            </div>
           <ModalAdicionarPapel isOpen={isOpenModal} ticketParamter={ticketOpenModal} fechaModal={()=>fechaModal('')} isEdit={false} investimento={''} />
        </div>
    )

}

export default InvestimentosAgrupados