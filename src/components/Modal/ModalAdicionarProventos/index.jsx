import { useState } from 'react';
import MontaListaMeses from '../../../utils/MontaListaMeses';
import './style.css';


function AdicionarProventos({ isOpen }){
    const dataRef = new Date()
    let ano = dataRef.getFullYear();
    let meses = MontaListaMeses();
    const [proventos, setProventos] = useState({mes: '', anoForm: ano, papel: '', valorUnitario: ''})
    
if(isOpen){
   return(
        <div className="container-modal">
            <div className="container-modal-corpo">
                <div className="container-modal-header">
                    <div className="container-modal-titulo">
                        <h3>Adicionar proventos</h3>
                    </div>
                    <div className="contanier-modal-close">
                        X
                    </div>
                </div>
                <div className="container-modal-formulario">
                    <div className="container-modal-input">
                        <label htmlFor="Mes">Mês*</label>
                        <select name="Mes" id="Mes" defaultValue={'-'}>
                            {
                                meses.map((mes)=>{
                                    return(
                                        <option value={mes.mes}>{mes.mes}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="container-modal-input">
                        <label htmlFor="Ano">Ano*</label>
                        <input type="text" name="Ano" id="Ano" value={proventos.anoForm} onChange={(e)=>setProventos({...proventos, anoForm: e.target.value})} />
                    </div>
                    <div className="container-modal-input">
                        <label htmlFor="Papel">Papel*</label>
                        <input type="text" name="Papel" id="Papel" value={proventos.papel} onChange={(e)=>setProventos({...proventos, papel: e.target.value})} />
                    </div>
                    <div className="container-modal-input">
                        <label htmlFor="valor">Valor*</label>
                        <input type="text" name="valor" id="valor" value={proventos.valorUnitario} onChange={(e)=>setProventos({...proventos, valorUnitario: e.target.value})} />
                    </div>
                    <div className="container-modal-btn">
                        <button>Salvar</button>
                    </div>
                    {
                        <div>

                            <span> {proventos.papel} </span>
                            <span> {proventos.anoForm} </span>
                            <span> {proventos.valorUnitario} </span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}else{
    null
}
}

export default AdicionarProventos;