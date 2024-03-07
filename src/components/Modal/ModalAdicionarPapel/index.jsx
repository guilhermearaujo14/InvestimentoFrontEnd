/* eslint-disable react/prop-types */
import {  useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import './style.css';
import api from '../../../services/api';
import Carregando from '../Carregando/Carregando';

import { format } from 'date-fns';

// eslint-disable-next-line react/prop-types
function ModalAdicionarPapel({ isOpen, ticketParamter, fechaModal, isEdit, investimento}){
    const [isCarregando, setIsCarregando] = useState(false)
    const [tipoAtivosDados, setTipoAtivosDados] = useState('') 
    const UsuarioID = sessionStorage.getItem("UsuarioID");
    let isModalAberto = isOpen;
    let isEditar = isEdit;
    const [selectName, setSelectName] = useState('')
    const [papel, setPapel] = useState({
        ticket: ticketParamter,
        quantidade: '',
        valor: '',
        total: '',
        nomeEmpresa: '',
        setor: '',
        dataCompra: '',
        tipoAtivoId: '',
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
        }else if(!papel.tipoAtivoId){
            toast.warning('Ops.. O tipo do ativo deve ser selecionado, verifique!', {position: 'top-center'})
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

    async function listaTipoAtivos(){
        try {
            const resultTipoAtivos = await api.get('tipoAtivos/');
            setTipoAtivosDados(resultTipoAtivos.data);
        } catch (error) {
            console.log(error)
        }
    }

    function preencheSelect(e){
        if(isEdit){
            const tipoAtivo = e.target.value;
            setPapel((papelAnterior)=>({
                ...papelAnterior, tipoAtivoId: tipoAtivo
            }))        
        }else{
            setPapel({...papel, tipoAtivoId: e.target.value})
        }
    }


    async function salvar(){
        setIsCarregando(false)
        try {
            if(isEdit === false){

                const result = await api.post('/investimento/',{
                    "PAPEL": papel.ticket,
                    "QUANTIDADE":papel.quantidade, 
                    "VALOR": papel.valor, 
                    "TIPO_ATIVO_ID": parseInt(papel.tipoAtivoId),  
                    "NOME_EMPRESA": papel.nomeEmpresa, 
                    "SETOR": papel.setor, 
                    "DATA_COMPRA": papel.dataCompra,
                    "USUARIO_ID": UsuarioID,
                    "isCOMPRA": 1,
                    "isVENDA": 0
                });
                console.log(result.data)
                await toast.success(result.data.message, {position: 'top-center'});
            }else{
                console.log('Aqui vai no editar')
            }
        } catch (error) {
            toast.warning(error.data)
        }
        setIsCarregando(false)
    }

    async function editar(){
        setIsCarregando(false)
        try {
            console.log(papel)
            const result = await api.post('/investimento/',{
                "ID": '',
                "PAPEL": papel.ticket,
                "QUANTIDADE":papel.quantidade, 
                "VALOR": papel.valor, 
                "TIPO_ATIVO_ID": parseInt(papel.tipoAtivoId),  
                "NOME_EMPRESA": papel.nomeEmpresa, 
                "SETOR": papel.setor, 
                "DATA_COMPRA": papel.dataCompra,
                "USUARIO_ID": UsuarioID, 
                "isCOMPRA": papel.isCOMPRA,
                "isVENDA": papel.isVENDA
            });
            console.log(result.data)
            await toast.success(result.data.message, {position: 'top-center'});
        } catch (error) {
            toast.warning(error.data)
        }
        setIsCarregando(false)
    }

    //Criação de um novo papel
    useEffect(()=>{
        listaTipoAtivos()
        if(isEdit && investimento){
            const date = new Date(investimento.DATA_COMPRA)
            const tipoSelecionado = tipoAtivosDados.filter((tipoAtivo)=> tipoAtivo.ID === investimento.TIPO_ATIVO_ID)
            setSelectName(tipoSelecionado[0].DESCRICAO)

            setPapel({
                ticket: investimento.PAPEL,
                quantidade: investimento.QUANTIDADE ,
                valor: investimento.VALOR,
                total: investimento.TOTAL_INVESTIDO,
                nomeEmpresa: investimento.NOME_EMPRESA,
                setor: investimento.SETOR,
                dataCompra: format(date, 'yyyy-MM-dd'),
                tipoAtivoId: investimento.TIPO_ATIVO_ID,
                usuarioID: UsuarioID
            })
        }else{
            setSelectName('-')
            setPapel({
                ticket: ticketParamter,
                quantidade: '',
                valor: '',
                total: '',
                nomeEmpresa: '',
                setor: '',
                dataCompra: '',
                tipoAtivoId: '',
                usuarioID: UsuarioID
            })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ticketParamter, investimento])

    //Preenche dropDown
    useEffect(()=>{
        listaTipoAtivos();
        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    if(isModalAberto && listaTipoAtivos && UsuarioID){


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
                                <label htmlFor="tipoAtivo">Tipo de ativo</label>
                                    <select className='dropdown-tipo-ativo' name="select" onChange={preencheSelect} >
                                    <option  value={papel.tipoAtivoId}>{selectName}</option>
                                        {
                                            tipoAtivosDados.map((item)=>{
                                                return(                                       
                                                        <option value={item.ID} key={item.ID}>{item.DESCRICAO}</option>                                        
                                                )                                   
                                            })
                                        }
                                    </select> 
                        </div>
                            <div className='container-input-modal'>
                                <label htmlFor="ticket">Ticket</label>
                                <input type='text' placeholder= 'Informe o ticket' value={papel.ticket} onChange={(e)=> setPapel({...papel, ticket: e.target.value})}/>
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
                                <label htmlFor="nomeEmpesa">Nome da Empesa</label>
                                <input type='text' placeholder= 'Informe o nome da empresa' value={papel.nomeEmpresa} onChange={(e)=> setPapel({...papel, nomeEmpresa: e.target.value})}/>
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
