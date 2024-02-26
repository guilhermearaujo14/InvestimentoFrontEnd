import { useState } from 'react';
import Navbar from '../../components/navbar'
import papa from 'papaparse';
import './style.css';
import api from '../../services/api';

function ImportacaoPlanilha(){
    const [dados, setDados] = useState([]);
    return(
        <div className='container'>
            <div className="container-navbar">
                <Navbar />
            </div>
            <div className="container-corpo">
                <div className="container-titulo">
                    <h1>Importação de planilha</h1>
                </div>
                <div className="container-orientacoes">
                    <span>Para importar as compras de ativos baixe AQUI a planilha</span>
                    <p>
                        O preenchimento da planilha deve ser feito corretamente, para não haver erros com o processo de Importação.
                    </p>
                    <h5>Obs: Não altere o cabeçalho</h5>
                    <p>A coluna <strong>PAPEL</strong> deve ser preenchida com o ticket da Ação, FII, BDR ou ETF (exemplo: VALE3).</p>
                    <p>A coluna <strong>QUANTIDADE</strong> deve ser preenchida com a quantidade da compra realizada.</p>
                    <p>A coluna <strong>PREÇO</strong> deve ser preechido com o preço pago sem informar o R$.</p>
                    <p>A coluna <strong>DATA</strong> deve ser preenchida com a data da compra realizada no formato DIA/MÊS/ANO (exemplo: 01/01/2024).</p>
                    <p>A coluna <strong>TIPO</strong> deve ser preenchida com NÚMEROS sendo 1 - AÇÃO, 2 - Fundo Imobiliário, 3 - ETF, 4 - BDR.</p>
                </div>
                <div className="container-input-importacao">
                    <label htmlFor="arquivo">Selecione o arquivo (csv)</label>
                    <input type="file" name="arquivo" accept='.csv' id="arquivo" onChange={importarArquivo}/>
                </div>
                <div className="container-btn-importacao">
                    <button onClick={importarPlanilha}>Importar dados</button>
                </div>
                <div className="container-table-arquivo-importado">
                    <table className='table-importacao-arquivo' style={{display:  dados =='' ? 'none' : '' }}>
                        <thead>
                            <tr>
                                <td>Papel</td>
                                <td>Quantidade</td>
                                <td>Preço</td>
                                <td>Total</td>
                                <td>Data</td>
                                <td>Tipo</td>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    dados.map((dado)=>{
                                        let valorPago = dado.preco.replace(",",".")
                                        let total = parseFloat(valorPago) * parseInt(dado.quantidade)
                                        return(
                                            <tr key={dado.papel}>
                                                <td>{dado.papel.toUpperCase()}</td>
                                                <td>{dado.quantidade}</td>
                                                <td>{dado.preco}</td>
                                                <td>{total}</td>
                                                <td>{dado.data}</td>
                                                <td>{dado.tipo}</td>
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>
                    </table> 
                </div>
            </div>
            
        </div>
    )

    function importarArquivo(e){
        console.log(e.target.files[0])
        papa.parse(e.target.files[0],{
            header: true, 
            skipEmptyLines: true,
            complete:(result)=>{
                setDados(result.data)
            }
        })
}

async function importarPlanilha(){
    await api.post('/RegistrarInvestimentoByPlanilha',{
        dados
    })
}

}



export default ImportacaoPlanilha;