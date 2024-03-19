import { useEffect, useState} from 'react'
import NavBar from '../../components/navbar'
import './style.css';

import dados from './dados';
import FormataMoeda from '../../utils/FormataMoeda'

export default function Proventos(){
    const dadosProventos = dados;
    const [totalPeriodo, setTotalPeriodo] = useState(0)
console.log(dados)
    
function somaTotal(){
    const totalPeriodo = dados.reduce((total, item) => total + item.VALOR,0)
   setTotalPeriodo(totalPeriodo)
}
useEffect(()=>{
    somaTotal()
},[])
        return(
        <div className="container-proventos">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="container-proventos-corpo">
                <div className="container-proventos-titulo">
                    <h1>Tela Proventos</h1>
                </div>
                <div className="container-proventos-filtros">

                </div>
                <div className="container-proventos-table">
                    
                        <table>
                            <thead>
                                <tr>
                                    <td>TICKET</td>
                                    <td>MÊS</td>
                                    <td>VALOR</td>
                                </tr>
                            </thead>
                            <tbody>
                                
                                    {
                                        
                                        dadosProventos.map((item)=>{
                                            return(
                                                <tr key={item.ID}>
                                                    <td>{item.PAPEL}</td>
                                                    <td>{item.MES}</td>
                                                    <td>{FormataMoeda(item.VALOR)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                <tr>
                                    <td><span>Total Periodo</span>{FormataMoeda(totalPeriodo)}</td>
                                </tr>
                            </tbody>
                        </table>
                    
                </div>

            </div>
        </div>
    )
}