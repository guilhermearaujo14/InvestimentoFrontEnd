import './style.css';

// eslint-disable-next-line react/prop-types
function Contador({ valor, titulo, porcentagem}){

    return(

        <div className="container-item-contador">
            <span className='porcentagem-valor'>{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(valor)}</span>
            <span className='porcentagem'>{ porcentagem + '%' }</span>
            <span>{ titulo }</span>
        </div>
    )
}

export default Contador;