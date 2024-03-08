

import { useState } from 'react';
import './style.css';
import { tr } from 'date-fns/locale';

export default function MovimentacaoAtivo({ isEnable, ticket }){
if(isEnable){
    const [dados, setDados] = useState(
        [{"DATA_COMPRA": '07/03/2024', "QUANTIDADE": 100, "VALOR": 66.70, "TOTAL_INVESTIDO":66500.87, "TIPO_MOVIMENTACAO": "Compra"}])
        
        let valorFormatado = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});

    return(
        <div className="container-modal">
            <div className="container-corpo-modal">

                <div className="container-modal-cabecalho">
                    <div className="container-titulo-modal">
                        <h3>Movimentação ativo</h3>
                    </div>
                    <div className="container-modal-fechamento">
                        <span>fechar</span>
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
                                            <td>{dado.DATA_COMPRA}</td>
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