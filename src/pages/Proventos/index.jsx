import { useState} from 'react'
import NavBar from '../../components/navbar'
import './style.css';


export default function Proventos(){
    const [mesRef, setMesRef] = useState();
    const [anoRef, setAnoRef] = useState(0);
    const [dadosProventos, setDadosProventos] = useState([]);
    const [ticket, setTicket] = useState('');
    const [valor, setValor] = useState();

    const meses = [{id: 0, nome:'-'}, {id: 1, nome:'Janeiro'}, {id: 2, nome:'Fevereiro'},{id: 3, nome:'Março'},{id: 4, nome:'Abril'},{id: 5, nome:'Maio'},{id: 6, nome:'Junho'},
    {id: 7, nome:'Julho'},{id: 8, nome:'Agosto'},{id: 9, nome:'Setembro'},{id: 10, nome:'Outubro'},{id: 11, nome:'Novembro'},{id: 12, nome:'Dezembro'}]
    

     const Adicionar = (e)=>{
        e.preventDefault()
        setDadosProventos((prevDadosProventos) => [...prevDadosProventos,{
            mes: mesRef,
            ano: anoRef,
            ticket: ticket,
            valor: valor
        }])

        setTicket('')
        setValor('')
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
                <div className="container-cabecalho">
                        <div className="input-meses">
                            <label htmlFor="mes">Mês referência</label>
                            <select name="mes" id="mes" value={mesRef} onChange={(e)=>setMesRef(e.target.value)}>
                                {
                                    meses.map((mes)=>
                                    <option  key={mes.id} >{mes.nome}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="input-ano">
                            <label htmlFor="ano">Ano referência</label>
                            <input type="number" name="ano" id="ano" placeholder='Informe o ano' value={anoRef} onChange={(e)=> setAnoRef(e.target.value)} />
                        </div>
                        <div className="input-ticket">
                            <label htmlFor="ticket">Ticket</label>
                            <input type="text" name="ticket" id="ticket" value={ticket} onChange={(e)=>setTicket(e.target.value)}/>
                        </div>
                        <div className="input-valor">
                            <label htmlFor="valor">Valor</label>
                            <input type="number" name="valor" id="valor" value={valor} onChange={(e)=>setValor(e.target.value)} />
                        </div>
                    <div className="contaier-btn-adicionar">
                        <button onClick={Adicionar}>ADICIONAR</button>
                    </div>
                </div>
                <div className="container-list-proventos">
                    <ul>
                        {
                            dadosProventos.map((provento, index)=>{
                                return(
                                    <li key={index}>
                                        <span>{provento.ano} </span>
                                        <span>{provento.mes} </span>
                                        <span>{provento.ticket} </span>
                                        <span>{provento.valor} </span>
                                    </li>
                                )})
                            }
                    </ul>
                </div>
            </div>
        </div>
    )
}