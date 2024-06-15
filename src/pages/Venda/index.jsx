import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar/index'
import { VscArrowLeft } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import  Carregando  from '../../components/Modal/Carregando/Carregando';
import FormataMoeda from '../../utils/FormataMoeda';


import api from '../../services/api'; 
import './style.css';


export default function Venda(){
    const UsuarioLogadoID = sessionStorage.getItem("UsuarioID")
    const [searchPapel, setSearchPapel] = useState('');
    const [isExibeDados, setIsExibeDados] = useState(false)
    const [dados, setDados] = useState([])
    const [isCarregando, setIsCarregando] = useState(false)
    const [quantidadeVenda, setQuantidadeVenda] = useState(0)
    const [valorVenda, setvalorVenda] = useState(0)
    const [dataVenda, setDataVenda] = useState(new Date())

    const BuscaDadosAtivo = async ()=>{
        setIsCarregando(true)
        if(!searchPapel){
            toast.warning('Ops... Campo de pesquisa não foi preenchido, verifique!',{position: 'top-center'})
        }
        const response = await api.get(`investimento/${UsuarioLogadoID}?PAPEL=${searchPapel}`)
        const result = response.data;
        if(result.length === 0){
            toast.warning('Ops... Registro não encontrado, verifique!',{position: 'top-center'})
            setIsCarregando(false)
            return
        }
        setQuantidadeVenda(result[0].QUANTIDADE)
        setvalorVenda(result[0].COTACAO)
        setSearchPapel(result[0].PAPEL)
        setDados(result)

        setIsExibeDados(true)
        setIsCarregando(false)
    }

    if(!UsuarioLogadoID){
        return (
            <div className='container-erro-usuarioLogado'>
                <h1>Ops... Parece que você não esta logado!</h1>
                <span>Faça login novamente, clicando <Link to={'/'}>AQUI! <VscArrowLeft className='icon-seta' size={20}/> </Link></span>
            </div>
        )
    }


    function ValidaForm(){
        
   
        if(!searchPapel){
            toast.warning('Ops... Campo papel não informado, verifique!',{position: 'top-center'})
            return false
        }
        if(!quantidadeVenda){
            toast.warning('Ops... Campo quantidade não informado, verifique!',{position: 'top-center'})
            return false
        }
        if(!valorVenda){
            toast.warning('Ops... Campo valor não informado, verifique!',{position: 'top-center'})
            return false
        }
        if(!dataVenda){
            toast.warning('Ops... Campo data da venda não informado, verifique!',{position: 'top-center'})
            return false
        }
        return true
    }


    async function RegistrarVenda(e){
        e.preventDefault();
        const isFormValido = ValidaForm()
        if(isFormValido){
            const response = await api.post(`cadastraInvestimento/${UsuarioLogadoID}`,{
                "PAPEL": searchPapel,
                "SETOR": dados.SETOR,
                "QUANTIDADE_MOVIMENTACAO": quantidadeVenda,
                "PRECO": valorVenda,
                "DATA_COMPRA": dataVenda,
                "isCOMPRA": 0,
                "isVENDA": 1
            })
            if(response.data.isSucesso){
                toast.success(response.data.message ,{position: 'top-center'})
                setSearchPapel('')
                setDados([])
            }else{
                toast.warning(response.data.message ,{position: 'top-center'})
            }
        }else{
            toast.error('Ops... Não foi possível registrar a venda!',{position: 'top-center'})
        }
        setIsCarregando(false)
    }

    return(
        <div className="container-venda">
            <NavBar />
            <div className="container-venda-body">
                <div className="container-form">
                    <h2>Venda de ativo</h2>
                    <div className="container-input-search">

                        <label htmlFor="papel">Papel</label>
                        <div className="container-search">
                            <div className="container-btn-pesquisar">
                                <input type="text" name="papel" id="papel" value={searchPapel} onChange={(e)=> setSearchPapel(e.target.value)} />
                                <button style={{cursor: 'pointer'}} onClick={BuscaDadosAtivo}>Pesquisar</button>
                            </div>
                        </div>

                    </div>
                            <div>
                                {
                                    dados.map((dado)=>{
                                        return(
                                            <div style={{display: isExibeDados == false ? 'none' : ''}} key={dado.PAPEL}>
                                                <form onSubmit={RegistrarVenda} className="container-venda-resultado-pesquisa">
                                                    <span>Tipo: {dado.DESCRICAO}</span>
                                                    <span>Setor: {dado.SETOR}</span>
                                                    <span>Preço médio: {FormataMoeda(dado.PRECO_MEDIO)}</span>
                                                    <span>Total investido: {FormataMoeda(dado.TOTAL_INVESTIDO)}</span>
                                                    <span>Total atual:{FormataMoeda(dado.TOTAL_INVESTIDO_ATUAL)}</span>    

                                                    <div className="container-input-quantidade-valor" style={{display: isExibeDados == false ? 'none' : ''}}>
                                                        <label htmlFor="quantidade">Quantidade</label>
                                                        <input type="number" name="quantidade" id="quantidade" value={quantidadeVenda} onChange={(e)=> setQuantidadeVenda(e.target.value)} />
                                                        
                                                        <label htmlFor="valor">Valor</label>
                                                        <input type="number" name="valor" id="valor" value={valorVenda} onChange={(e)=> setvalorVenda(e.target.value)} />

                                                        <label htmlFor="dataVenda">Data da venda</label>
                                                        <input type="date" name="dataVenda" id="dataVenda" value={dataVenda} onChange={(e)=> setDataVenda(e.target.value)} />

                                                        <button className='btn-venda'>REGISTRAR VENDA</button>
                                                    </div>
                                                </form>
                                        </div>

                                        )
                                    })
                                }

                                
                                
                                
                            </div>
                    
                </div>

            </div>
            <Carregando isOpen={isCarregando} />
        </div>
    )
}