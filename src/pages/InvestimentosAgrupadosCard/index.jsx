import { FaList, FaRegPlusSquare } from "react-icons/fa"
import './style.css'
import { useEffect, useState } from "react"
import ModalAdicionarPapel from '../../components/Modal/ModalAdicionarPapel';
import MovimentacaoAtivo from '../../components/Modal/MovimentacaoAtivo';
import FormataMoeda from "../../utils/FormataMoeda";


// eslint-disable-next-line react/prop-types
function InvestimentosAgrupadosCard({ dadosList }){
    const [dados, setDados] = useState();
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [ticketOpenModal, setTicketOpenModal] = useState('')
    const [isOpenModalRelatorio, setIsOpenModalRelatorio] = useState(false)

    
    useEffect(()=>{
        setDados(dadosList) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function openModal(open){
        setIsOpenModal(open)
    }
    function fechaModal(){
        setIsOpenModal(!open)
        setIsOpenModalRelatorio(false)
    }
    
    
    function novaAdicionaPapelExistente(ticket){
        setTicketOpenModal(ticket)
            openModal(true)
        
        //console.log(ticketOpenModal)
}


function AbrirRelatorioComprasAtivo(ticket){
    setTicketOpenModal(ticket)
    setIsOpenModalRelatorio(true)
    console.log(isOpenModalRelatorio)

}

    if(!dados){
        return(
            <h1>carregando...</h1>
        )
    }

    return(
        <div className="container-investimentos-agrupados-card">
            <div className="container-investimentos-agrupados-card-main">
                <div className="container-investimentos-agrupados-card-filtros">

                </div>
                <div className="container-investimentos-agrupados-card-list">
                    <ul className="investimentos-agrupados-card-list">
                        {
                            dados.map((item)=>{
                            return(
                                <li className="investimentos-agrupados-card-list-item" key={item.PAPEL}>
                                    <div className="item-papel" 
                                    style={{
                                        backgroundColor: item.DESCRICAO === "Fundo Imobiliario" ?  "#00945a" : 
                                        item.DESCRICAO === "Ação" ? "#88abc2" : 
                                        item.DESCRICAO === "ETF" ? "#317F8F": "#2000FF", borderRadius: '4px'}}>
                                    
                                        {item.PAPEL} 
                                        <div className="item-descricao">
                                            ( {item.DESCRICAO} )
                                        </div>
                                    </div>
                                    <div className="item-valor-atual">
                                        Preço { FormataMoeda(item.COTACAO)}
                                    </div>
                                    <div className="item-preco-medio">
                                        Quantidade {item.QUANTIDADE}
                                    </div>
                                    <div className="item-descricao">
                                        Preço médio {FormataMoeda(item.PRECO_MEDIO)}
                                    </div>
                                    <div className="item-descricao">
                                        Valor investido {FormataMoeda(item.TOTAL_INVESTIDO)}
                                    </div>
                                    <div className="item-descricao">
                                        Valor investido atual {FormataMoeda(item.TOTAL_ATUAL)}
                                    </div>
                                    <div className={item.PERDA_LUCRO >= 0 ? "item-lucro" : "item-perda"}>
                                       Lucro/Perda R$ {FormataMoeda(item.PERDA_LUCRO)}
                                    </div>
                                    <div className="item-acoes">
                                        <div className='item-acao-especifico' title={`Listar compras ${item.PAPEL}`} onClick={()=> AbrirRelatorioComprasAtivo(item.PAPEL)}>
                                            <FaList size={17} />
                                        </div>
                                        <div className='item-acao-especifico' title='Adicionar ativo' onClick={()=> novaAdicionaPapelExistente(item.PAPEL)}>
                                            <FaRegPlusSquare size={17} />
                                        </div>
                                    </div>
                                </li>        
                            )})
                        }
                    </ul>
                </div>
            </div>
            <ModalAdicionarPapel isOpen={isOpenModal} ticketParamter={ticketOpenModal} fechaModal={fechaModal} isEdit={false} investimento={''} />
            <MovimentacaoAtivo isEnable={isOpenModalRelatorio} ticket={ticketOpenModal} fechaModal={fechaModal}/>
        </div>
    )   
}
export default InvestimentosAgrupadosCard