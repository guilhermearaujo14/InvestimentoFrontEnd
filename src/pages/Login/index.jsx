import { useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import apiLogin from '../../services/api';
import { toast } from 'react-toastify';

import Button from '@mui/material/Button'

import './style.css';
import Carregando from '../../components/Modal/Carregando/Carregando';

import Proventos from '../../components/Modal/ModalAdicionarProventos';
import BasicTextField from '../../components/Formulario/TextField';




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
                        <BasicTextField label={"CPF"} name={"cpf"} required={"required"} type={"number"} value={cpf} onChange={(e)=> setCpf(e.target.value)} />
                        
                        <BasicTextField label={"Senha"} name={"senha"} required={"required"} type={"password"} value={senha} onChange={(e)=> setSenha(e.target.value)} />
                        
                        <div className="container-btn-entrar">
                            <Button variant='contained' color='success' size='large' onClick={Logar}> 
                                ENTRAR
                            </Button>
                        </div>
                        <p><Link to={'/cadastroUsuario'}>Não tem cadastro?</Link></p>
                    </form>
                </div>
                 {/* <Link to={'/Proventos'}> Proventos</Link> */}
            </div>
            <Carregando isOpen={isCarregando} mensagem={''}/>
            <Proventos isOpen={false} />
        </div>
    )
}
export default Login