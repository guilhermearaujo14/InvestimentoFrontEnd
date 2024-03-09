

import { useEffect, useState } from 'react';
import './style.css';
import { tr } from 'date-fns/locale';
import api from '../../../services/api';
import FormataData from '../../../utils/FormataData';

export default function MovimentacaoAtivo({ isEnable, ticket, fechaModal }){
if(isEnable){
    const usuarioLogadoId = sessionStorage.getItem("UsuarioID");
    const [dados, setDados] = useState([])

        async function GetDadosbyTicket(){
            const response = await api.get(`/movimentacoesByPapel/${usuarioLogadoId}/${ticket}`)
            console.log(response.data)
            setDados(response.data)
        }

        useEffect(()=>{
            GetDadosbyTicket()
        },[])
        
        let valorFormatado = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});

    return(
        <div className="container-modal">
            <div className="container-corpo-modal">
                <div className="container-modal-cabecalho">
                    <div className="container-titulo-modal">
                        <h3>Movimentações do ativo - {ticket} </h3>
                    </div>
                    <div className="container-modal-fechamento">
                        <span onClick={fechaModal}>fechar</span>
                    </div>
                </div>

                <div className="container-table-movimentacao-ativo">
                    <table className='table-movimentacoes-ativo'>
                        <thead>
                            <tr>
                                <td>Data da compra</td>
                                <td>Quantidade</td>
                                <td>Valor</td>
                                <td>Total investido</td>
                                <td>Tipo de movimentação</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dados.map((dado)=>{
                                    return(
                                        <tr>
                                            <td>{FormataData(dado.DATA_COMPRA)}</td>
                                            <td>{dado.QUANTIDADE}</td>
                                            <td>{valorFormatado.format(dado.VALOR)}</td>
                                            <td>{valorFormatado.format(dado.TOTAL_INVESTIDO)}</td>
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