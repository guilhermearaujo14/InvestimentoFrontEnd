
import FormataMoeda from '../../utils/FormataMoeda';
import './style.css';

// eslint-disable-next-line react/prop-types
function Contador({ valor, titulo, porcentagem}){

    return(

        <div className="container-item-contador" style={{display:  valor > 0 ? "" : "none"}}>
            <span className='porcentagem-valor'>{ FormataMoeda(valor)}</span>
            <span className='porcentagem'>{ porcentagem.toFixed(2) + '%' }</span>
            <span>{ titulo }</span>
        </div>
    )
}

export default Contador;