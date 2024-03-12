import { useEffect, useState } from 'react';
import api from '../../../services/api';
import FormataData from '../../../utils/FormataData';
import FormataMoeda from '../../../utils/FormataMoeda';
import './style.css';

// eslint-disable-next-line react/prop-types
function MovimentacaoAtivo({ isEnable, ticket, fechaModal }){
if(isEnable){
    const usuarioLogadoId = sessionStorage.getItem("UsuarioID");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [dados, setDados] = useState([])

        // eslint-disable-next-line no-inner-declarations
        async function GetDadosbyTicket(){
            const response = await api.get(`/movimentacoesByPapel/${usuarioLogadoId}/${ticket}`)
            console.log(response.data)
            setDados(response.data)
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(()=>{
            GetDadosbyTicket()
        },[])
        

    return(
        <div className="container-modal">
            <div className="container-corpo-modal">
                <div className="container-modal-cabecalho">
                    <div className="container-titulo-modal">
                        <h3>Movimentações do ativo - {ticket} </h3>
                    </div>
                    <div className="container-modal-fechamento">
                        <span onClick={fechaModal}>X</span>
                    </div>
                </div>

                <div className="container-table-movimentacao-ativo">
                    <table className='table-movimentacoes-ativo'>
                        <thead>
                            <tr>
                                <td>Data</td>
                                <td>Qtd.</td>
                                <td>Valor</td>
                                <td>Total investido</td>
                                <td>Tipo</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dados.map((dado, index)=>{
                                    
                                    return(
                                        <tr key={index}>
                                            <td>{FormataData(dado.DATA_COMPRA)}</td>
                                            <td>{dado.QUANTIDADE}</td>
                                            <td>{FormataMoeda(dado.VALOR)}</td>
                                            <td>{FormataMoeda(dado.TOTAL_INVESTIDO)}</td>
                                            <td>{dado.TIPO_MOVIMENTACAO}</td>
                                        </tr>

                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )}else{
        return null;
    }

}
export default MovimentacaoAtivo;