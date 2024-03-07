

import { useState } from 'react';
import './style.css';

export default function MovimentacaoAtivo({ isEnable, ticket }){
if(isEnable){
    const [dado, setDados] = useState([]);

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
                    </table>
                </div>
            </div>
        </div>
    )}else{
        return null;
    }

}