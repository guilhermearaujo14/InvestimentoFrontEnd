import { useState} from 'react'
import NavBar from '../../components/navbar'
import './style.css';

import CarregandoDados from '../../components/CarregandoDados';
import BasicTextField from '../../components/Formulario/TextField';
import { InputLabel, MenuItem, Select } from '@mui/material';

export default function Proventos(){
const [mes, setMes] = useState()
const [ano, setAno] = useState()

    let isCarregando = false
    

const listaMeses = [{id:1, name:'Janeiro'},
    {id:2, name:'Fevereiro'},
    {id:3, name:'Março'},
    {id:4, name:'Abril'},
    {id:5, name:'Maio'},
    {id:6, name:'Junho'},
    {id:7, name:'Julho'},
    {id:8, name:'Agosto'},
    {id:9, name:'Setembro'},
    {id:10, name:'Outubro'},
    {id:11, name:'Novembro'},
    {id:12, name:'Dezembro'}]

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
                    <div className='container-mesRef'>
                        <InputLabel id="MesReferencia" style={{color:'#fff'}}>Mês</InputLabel>
                        <Select
                        style={{width: '100%', marginBottom: '10px', color:'#fff', backgroundColor: '#999'}}
                            labelId='MesReferencia'
                            value={mes}
                            onChange={(e)=>setMes(e.target.value)}>
                            {
                                listaMeses.map((item)=>{
                                    return (
                                        <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                )})
                            }
                            </Select>
                    </div>


                    <BasicTextField label={"Ano de referência"} name={"ano"} required={"required"} type={"number"} value={ano} onChange={(e)=> setAno(e.target.value)} />
                </div>

            </div>
        </div>
    )
}