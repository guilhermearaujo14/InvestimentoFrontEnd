import './style.css';
import Navbar from '../../components/navbar';
import ModalAdicionarPapel from '../../components/Modal/ModalAdicionarPapel';
import { toast } from 'react-toastify';
import { FaTrashCan } from 'react-icons/fa6'
import { FaRegEdit, FaSearch, FaEraser  } from "react-icons/fa";
import {  useEffect, useState } from 'react';

import api from '../../services/api';

import { format } from 'date-fns'
import FormataMoeda from '../../utils/FormataMoeda';

export default function RelatorioCompras(){
    const UsuarioLogadoID = sessionStorage.getItem('UsuarioID');
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [searchPapel, setSearchPapel] = useState('');
    const [dados, setDados] = useState([])
    const [investimento, setInvestimento] = useState([])
    const [isEditar, setIsEditar] = useState(false)
    const [tipoAtivoId, setTipoAtivoId] = useState('')
    const [isSomenteVenda, setIsSomenteVenda] = useState(true)
    const [dataInicio, setDataInicio] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [tiposList, setTiposList] = useState([])

    function openModal(open){
        setIsOpenModal(open)
    }
    function fechaModal(){
        setIsOpenModal(!open)
        setIsEditar(false)
    }

    async function carregaDados(){
        try {
            const response = await api.get(`/movimentacoes/${UsuarioLogadoID}?dataInicio=${dataInicio}&dataFinal=${dataFinal}&papel=${searchPapel}&tipo_ativo_id=${tipoAtivoId}`);
            setDados(response.data)

        } catch (error) {
            console.log(error)
        }

    }

    if(!UsuarioLogadoID){
        return(
            <div className="container-user-nao-logado">
                <h1>Tente fazer o login novamente para carregar seus dados...</h1>
            </div>
        )
    } 

    const filtrar = async ()=>{
        searchPapel.toLowerCase()
        await carregaDados()
    }

    const limparFiltro = async ()=>{
        PreencheTiposList();
        await carregaDados();
    }

    async function refreshTable(){
        setTiposList([])
        setSearchPapel('')
        setTipoAtivoId('')
        setIsSomenteVenda(true)
        setDataInicio('')
        setDataFinal('')
        limparFiltro()
        
    }

    const editar = async (ID)=>{
        const result = await api.get(`/investimentoByID/${ID}`)
        setInvestimento(result.data)
        console.log(investimento)
        setIsEditar(true)
        openModal(true)
    }

    const remover = async (ID)=>{
        const result = await api.delete(`/excluirMovimentacao/${UsuarioLogadoID}/${ID}`)
        toast.success(result.data.message,{position: 'top-center' })
        carregaDados()
    }




    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        PreencheTiposList()
        carregaDados()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    if(!dados){
        <div className="carregando-dados">
            <h2>Aguarde, estamos preparando tudo para você!</h2>
        </div>
    }

    const flagSomenteVenda = () =>{
        setIsSomenteVenda(!isSomenteVenda)
        if(isSomenteVenda == true){
            let filterSomenteVenda = dados.filter((dado)=> dado.TIPO == 'Venda' || dado.DESCRICAO === searchPapel)
            setDados(filterSomenteVenda)
        }else{
            carregaDados()
        }
    }

    function PreencheTiposList(){
        setTiposList([ {"ID": 0, "DESCRICAO": '-' },
        {"ID": 1, "DESCRICAO": 'Ações' },
        {"ID": 2, "DESCRICAO": 'Fundos Imobiliarios' },
        {"ID": 3, "DESCRICAO": 'ETF' },
        {"ID": 4, "DESCRICAO": 'BDR' },
        {"ID": 5, "DESCRICAO": 'Fundo de investimentos' }])
    }
    

    return(
        <div className="container-relatorio-compras">
            <div className="container-navbar">
                <Navbar />
            </div>
            <div className="container-main-relatorio-compras">
                <div className="container-titulo-relatorio-compras">
                    <h1>Movimentações</h1>
                </div>
                <div className="container-filtros">
                <div className="container-filtros-linha">

                    <div className='container-filtro-item'>
                            <label htmlFor="papel">Data início</label>
                            <input type="date"  value={dataInicio} onChange={(e)=> setDataInicio(e.target.value)} />
                    </div>
                    <div className='container-filtro-item'>
                            <label htmlFor="papel">Data final</label>
                            <input type="date"  value={dataFinal} onChange={(e)=> setDataFinal(e.target.value)} />
                    </div>
                    
                    <div className='container-filtro-item'>
                        <label htmlFor="papel">Papel</label>
                        <input type="text" placeholder='Digite o papel' value={searchPapel} onChange={(e)=> setSearchPapel(e.target.value)} />
                    </div>
                    
                    <div className='container-filtro-item'>
                        <label htmlFor="tipo">Tipo</label>
                            <select className='dropdown' onChange={(e)=> setTipoAtivoId(e.target.value) }>
                                {/* <option value={tipoAtivoId}>{tipoAtivoNome}</option> */}
                            {
                                tiposList.map((tipo)=>{
                                    return (
                                        <option value={tipo.ID} key={tipo.ID}>{tipo.DESCRICAO}</option>   
                                    )})
                                }
                            </select>
                    </div>

                    <div className='container-filtro-item-checkbox'>
                        <input className='checkbox' type="checkbox" checked={!isSomenteVenda} onChange={flagSomenteVenda} /> <span>Mostrar somente vendas</span>
                    </div>

                </div>

                    <div className="container-filtro-botoes">
                    <button onClick={refreshTable} className='btn-limpar'>
                            <FaEraser  className='icone-pesquisa' size={14} />
                            LIMPAR
                        </button>

                        <button onClick={filtrar} className='btn-filtar'>
                            <FaSearch className='icone-pesquisa' size={14} />
                            FILTRAR
                        </button>
                    </div>
                </div>
                <div className="container-table-relatorio-compras">
                    <table className='table-relatorio-compras'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Papel</th>
                                <th>Quantidade</th>
                                <th>Valor de compra</th>
                                <th>Valor total</th>
                                <th>Data da compra</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dados.map((dado)=>{
                                    let data = new Date(dado.DATA_MOVIMENTACAO)
                                    let dataFormatada = format(data, 'dd/MM/yyyy');
                                    return(
                                            <tr key={dado.ID}>
                                                <td className='col-acoes'>
                                                    <div className="btn-acao-excluir" onClick={()=> remover(dado.ID)} title={`Excluir ${dado.PAPEL}`}>
                                                        <FaTrashCan size={16} />
                                                    </div>
                                                    <div className="btn-acao-editar" onClick={()=>editar(dado.ID)} title={`Editar ${dado.PAPEL}`}>
                                                        <FaRegEdit size={16}/>
                                                    </div>
                                                </td>
                                                <td>{dado.PAPEL}</td>
                                                <td>{dado.QUANTIDADE}</td>
                                                <td>{FormataMoeda(dado.PRECO)}</td>
                                                <td>{FormataMoeda(dado.TOTAL)}</td>
                                                <td> {dataFormatada} </td>
                                                <td>{dado.TIPO}</td>
                                            </tr>
                                        )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalAdicionarPapel isOpen={isOpenModal} ticketParamter={''} fechaModal={fechaModal} isEdit={isEditar} investimento={investimento[0]} />

        </div>
    )
}


//compras