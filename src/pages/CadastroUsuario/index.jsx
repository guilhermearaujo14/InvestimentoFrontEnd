import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import './style.css';


function CadastroUsuario(){
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nome:'',
        cpf:'',
        dataNascimento:'',
        email:'',
        telefone: '',
        senha:'', 
        confirmaSenha:'',
    })

    function validaDados(e){
        e.preventDefault()
        if(!usuario.nome || !usuario.cpf || !usuario.dataNascimento || !usuario.email || !usuario.telefone || !usuario.senha || !usuario.confirmaSenha){
            toast.warning('Ops.. Todos os campos devem ser preechidos, verifique!',{position: 'top-center'})
        }else if(usuario.senha === usuario.confirmaSenha){
            cadastrar()
        }else{
            toast.warning('Ops.. Senhas digitadas não são iguais, verifique!', {position: 'top-center'})
        }
    }

    async function cadastrar(){
        try {
            
            const response = await api.post('/Usuario',{
                "NOME": usuario.nome,
                "CPF": usuario.cpf,
                "DATA_NASCIMENTO": usuario.dataNascimento,
                "TELEFONE": usuario.telefone,
                "EMAIL": usuario.email,
                "SENHA": usuario.senha,
            })
            console.log(response.data)
            navigate('/')
        } catch (error) {
            console.log(error.response)
        }
        
    }

    return(
        <div className="container">
            <div className="container-cabecalho">
                <div className="container-titulo">
                    <h1>Cadastro de usuário</h1>
                </div>
                <div className="container-btn-voltar">
                    <Link to='/' ><button className='btn-voltar'>Voltar</button></Link>
                </div>
            </div>
            <div className="container-form-cadastro">
                <form className="formulario-cadastro" onSubmit={validaDados} method="post">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" placeholder="Digite seu nome..." name="nome" required value={usuario.nome} onChange={(e)=> setUsuario({...usuario, nome: e.target.value})}/>

                    <label htmlFor="cpf">CPF</label>
                    <input type="text" placeholder="Digite seu CPF..."  name="cpf" value={usuario.cpf} onChange={(e)=>setUsuario({...usuario, cpf: e.target.value})}/>

                    <label htmlFor="dataNascimento">Data de Nascimento</label>
                    <input type="date" name="dataNascimento" value={usuario.dataNascimento} onChange={(e)=>setUsuario({...usuario, dataNascimento: e.target.value})}/>

                    <label htmlFor="email">E-mail</label>
                    <input type="email" placeholder="Digite seu E-mail..."  name="email" value={usuario.email} onChange={(e)=>setUsuario({...usuario, email: e.target.value})}/>

                    <label htmlFor="telefone">Telefone</label>
                    <input type="number" placeholder="Digite seu telefone..."  name="telefone" value={usuario.telefone} onChange={(e)=>setUsuario({...usuario, telefone: e.target.value})}/>

                    <label htmlFor="senha">Senha</label>
                    <input type="password" placeholder="Digite sua senha..."  name="senha" value={usuario.senha} onChange={(e)=>setUsuario({...usuario, senha: e.target.value})}/>

                    <label htmlFor="confirmaSenha">Confirma Senha</label>
                    <input type="password" placeholder="Digite a confirmação da sua senha..."  name="confirmaSenha" value={usuario.confirmaSenha} onChange={(e)=>setUsuario({...usuario, confirmaSenha: e.target.value})}/>
                    
                    <div className="container-botao-form">
                        <button className="btn-novo-usuario">Cadastrar</button> 
                    </div>
                    
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CadastroUsuario;