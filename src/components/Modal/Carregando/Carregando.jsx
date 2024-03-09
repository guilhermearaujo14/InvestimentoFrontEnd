import { ImSpinner9 } from 'react-icons/im';
import './style.css';

// eslint-disable-next-line react/prop-types
function Carregando({ isOpen, mensagem}){
    if(isOpen){
        return(
        <div className="container-modal">
            <div className="container-modal-estrutura-carregando">
                <div className="container-header-modal">
                    <div className="container-titulo-modal">
                        <div className="container-spinner">
                            <ImSpinner9 size={30} />
                        </div>
                        <span>Carregando...</span>
                        <div className="container-msg">
                            <span>{mensagem}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
} 
return null;  
}


export default Carregando;