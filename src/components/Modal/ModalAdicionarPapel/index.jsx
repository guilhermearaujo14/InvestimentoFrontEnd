/* eslint-disable react/prop-types */
import {  useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import './style.css';
import api from '../../../services/api';
import Carregando from '../Carregando/Carregando';

// import { format } from 'date-fns';
import FormataData from '../../../utils/FormataData';

// eslint-disable-next-line react/prop-types
function ModalAdicionarPapel({ isOpen, ticketParamter, fechaModal, isEdit, investimento}){
    const [isCarregando, setIsCarregando] = useState(false)
    const UsuarioID = sessionStorage.getItem("UsuarioID");
    let isModalAberto = isOpen;
    let isEditar = isEdit;
    const [papel, setPapel] = useState({
        movimentacaoId: 0,
        ticket: ticketParamter,
        quantidade: '',
        valor: '',
        total: '',
        nomeEmpresa: '',
        setor: '',
        dataCompra: '',
        usuarioID: UsuarioID
    })

   const CalculaTotal  = (quantidade, valor) => {
        const resultado = quantidade * valor;
        setPapel({...papel, quantidade: quantidade, valor: valor, total: resultado});
    }

    function ValidaFormulario(e){
        e.preventDefault();
        setIsCarregando(true)
        console.log(papel)

        if(!papel.ticket){
            toast.warning('Ops.. Ticket deve ser preenchido, verifique!', {position: 'top-center'})
        }else if(papel.quantidade == 0 || papel.quantidade === undefined ){
            toast.warning('Ops.. Quantidade deve ser preenchida, verifique!', {position: 'top-center'})
        }else if(!papel.valor){
            toast.warning('Ops.. Valor deve ser preenchido, verifique!', {position: 'top-center'})
        }else if(!papel.total){
            toast.warning('Ops.. Total deve ser preenchido, verifique!', {position: 'top-center'})
        }else if(!papel.dataCompra){
            toast.warning('Ops.. A data da compra deve ser preenchido, verifique!', {position: 'top-center'})
        }else if(!UsuarioID){
            toast.warning('Ops.. Usuário deve estar logado, verifique!', {position: 'top-center'})
        }else{
            if(!isEditar){
                salvar();
            }else{
                editar()
            }
        }
        setIsCarregando(false)
    }

    async function salvar(){
        setIsCarregando(false)
        let result = []
        try {
            if(isEdit === false){
                    result = await api.post(`/cadastraInvestimento/${UsuarioID}`,{
                    "PAPEL": papel.ticket.toUpperCase(),
                    "SETOR": papel.setor, 
                    "QUANTIDADE_MOVIMENTACAO":papel.quantidade, 
                    "PRECO": papel.valor,
                    "DATA_COMPRA": papel.dataCompra,
                    "isCOMPRA": 1,
                    "isVENDA": 0
                });
            }
            if(result.data.isSucesso){
                toast.success(result.data.message, {position: 'top-center'});
                setPapel({        
                    ticket: '',
                    quantidade: '',
                    valor: '',
                    total: '',
                    setor: '',
                    dataCompra: '',
                    usuarioID: UsuarioID})
            }else{
                toast.warning(result.data.message, {position: 'top-center'});
            }

        } catch (error) {
            toast.warning(error.data)
        }
        setIsCarregando(false)
    }

    async function editar(){
        setIsCarregando(true)
        try {
            const result = await api.put(`/AtualizaMovimentacao/${UsuarioID}`,{
                "MOVIMENTACAO_ID": investimento.ID,
                "PAPEL": papel.ticket,
                "SETOR": papel.setor, 
                "QUANTIDADE_MOVIMENTACAO":papel.quantidade, 
                "PRECO": papel.valor,
                "DATA_COMPRA": papel.dataCompra,
                "isCOMPRA": 1,
                "isVENDA": 0
            });
            toast.success(result.data.message, {position: 'top-center'});
        } catch (error) {
            toast.warning(error.data)
        }
        setIsCarregando(false)
    }

    //Criação de um novo papel
    useEffect(()=>{
        if(isEdit && investimento){
            //const date = new Date(investimento.DATA_COMPRA)
            const data = FormataData(investimento.DATA_MOVIMENTACAO)
            console.log(data)
            setPapel({
                ticket: investimento.PAPEL,
                quantidade: investimento.QUANTIDADE ,
                valor: investimento.PRECO,
                total: investimento.TOTAL,
                setor: investimento.SETOR,
                dataCompra: data,
                usuarioID: UsuarioID
            })
        }else{
            setPapel({
                ticket: ticketParamter,
                quantidade: '',
                valor: '',
                total: '',
                setor: '',
                dataCompra: '',
                tipoAtivoId: '',
                usuarioID: UsuarioID
            })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ticketParamter, investimento])





    if(isModalAberto && UsuarioID){


    return(
        
        <div className="container-modal">
            <div className="container-modal-corpo">
                <div className="container-header">
                    <div className="container-titulo-modal">
                        <h2>Cadastrar papel</h2>
                    </div>
                    <div className="container-close-modal">
                        <div className="btn-close" onClick={fechaModal}>X</div>
                    </div>
                </div>
                <div className="container-main">
                    <div className="container-formulario">
                        <form>
                        <div className='container-input-modal'>
                        </div>
                            <div className='container-input-modal'>
                                <label htmlFor="ticket">Ticket</label>
                                <input type='text' placeholder= 'Informe o ticket' value={papel.ticket} onChange={(e)=> setPapel({...papel, ticket: e.target.value})}   disabled = {isEdit === true ? true : false} style={{cursor: isEdit === true ? 'not-allowed' :''}}/>
                            </div>
                            <div style={{display:'flex', flexDirection: 'row', gap:'5px'}}>
                                <div className='container-input-modal' style={{width: '30%' }}>
                                    <label htmlFor="quantidade">Quantidade</label>
                                    <input type='number' placeholder='Quantidade' value={papel.quantidade} onChange={(e)=> CalculaTotal(e.target.value, papel.valor)}/>
                                </div>
                                <div className='container-input-modal' style={{width: '40%' }}>
                                    <label htmlFor="valor">Valor</label>
                                    <input type='number' placeholder='Valor' value={papel.valor} onChange={(e)=>  CalculaTotal(papel.quantidade, e.target.value) } />
                                </div>
                                <div className='container-input-modal' style={{width: '30%' }}>
                                    <label htmlFor="total">Total</label>
                                    <input type='number' placeholder='Total' value={papel.total} disabled/>
                                </div>
                            </div>

                            <div className='container-input-modal'>
                                <label htmlFor="setor">Setor</label>
                                <input type='text' placeholder= 'Informe o setor' value={papel.setor} onChange={(e)=> setPapel({...papel, setor: e.target.value})}/>
                            </div>

                            <div className='container-input-modal'>
                                <label htmlFor="dataCompra">Data da Compra</label>
                                <input type='date' value={papel.dataCompra} onChange={(e)=> setPapel({...papel, dataCompra: e.target.value})}/>
                            </div>
                            <div className="container-btn-cadastrar-papel">
                                <button className='btn-cadastrar-papel' onClick={ValidaFormulario}>CADASTRAR</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Carregando isOpen={isCarregando} />
        </div>
    )}else{
        return null
    }       
}

export default ModalAdicionarPapel;
