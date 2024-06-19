import { useEffect, useState} from 'react'
import NavBar from '../../components/navbar'
import './style.css';

import CarregandoDados from '../../components/CarregandoDados';
import BasicTextField from '../../components/Formulario/TextField';

export default function Proventos(){
const [mes, setMes] = useState(0)

    let isCarregando = false
    



if(isCarregando){
    return(
        <CarregandoDados />
    )
}


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
                    <BasicTextField label={"Mês"} name={"mes"} required={"required"} type={"number"} value={mes} onChange={""} />
                    
                </div>

            </div>
        </div>
    )
}