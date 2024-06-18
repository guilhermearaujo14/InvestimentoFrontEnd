import { useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import apiLogin from '../../services/api';
import { toast } from 'react-toastify';

import './style.css';
import Carregando from '../../components/Modal/Carregando/Carregando';

import Proventos from '../../components/Modal/ModalAdicionarProventos';

function Login(){

    const [isCarregando, setIsCarregando] = useState(false)
    const navigate = useNavigate();
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')

function ValidaDados(){
    if(!cpf){
        return {isSucesso: false, Message: 'Ops.. CPF não informado!'}
    }else if(!senha){
        return {isSucesso: false, Message: 'Ops.. Senha não informada!'}
    }
        return {isSucesso: true};
}


async function Logar(e){
    e.preventDefault();
    setIsCarregando(true)
    let isValidados = false;
    isValidados = ValidaDados();
    if(isValidados.isSucesso){
try {
        const result = await apiLogin.post('Login',{
            "CPF": cpf, 
            "SENHA": senha
        })

        if(result.data.isSucesso){
            console.log(result)
            toast.success(`${result.data.message}!`, {position: 'top-center'})
            sessionStorage.setItem('UsuarioID', result.data.usuario_id );
            sessionStorage.setItem('UserName', result.data.usuario);
            navigate("/home")
        }else{
            toast.warning(`${result.data.message}!`, {position: 'top-center'})
        }

        
        } catch (error) {
            console.log(error)
            setIsCarregando(false)
            toast.warning(error.response.data.Message, {position: 'top-center'})
        }
    }else{
        toast.warning(isValidados.Message, {position: 'top-center'})
    }
    setIsCarregando(false)
    }

    return(
        <div className="container">
            <div className="container-central">
                <div className="container-titulo-login">
                    <h2>Olá investidor!</h2>
                    <h3>Entre com seus dados para realizar o login.</h3>
                </div>
                <div className="container-formulario">
                    <form className='formulario-login'>
                        <label htmlFor="cpf">CPF</label>
                        <input type="number" required placeholder='Digite seu CPF... ' value={cpf} onChange={(e)=> setCpf(e.target.value)}/>
                        <label htmlFor="senha">Senha</label>
                        <input type="password" required placeholder='Digite sua senha... ' value={senha} onChange={(e)=> setSenha(e.target.value)}/>
                        <div className="container-btn-entrar">
                            <button className='btn-entrar' onClick={Logar}>ENTRAR</button>
                        </div>
                        <p><Link to={'/cadastroUsuario'}>Não tem cadastro?</Link></p>
                    </form>
                </div>
                 <Link to={'/Proventos'}> Proventos</Link>
            </div>
            <Carregando isOpen={isCarregando} mensagem={''}/>
            <Proventos isOpen={false} />
        </div>
    )
}
export default Login