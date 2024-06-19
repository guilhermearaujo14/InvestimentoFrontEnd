import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import api from '../../services/api';

import './style.css';
import BasicTextField from '../../components/Formulario/TextField';


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
            if(response.data.isSucesso){
                console.log(response.data)
                toast.success('Cadastrado realizado com sucesso!', {position: 'top-center'})
                navigate('/')
            }else{
                console.log(response.data)
                toast.warning(response.data.message, {position: 'top-center'})
            }
        } catch (error) {
            console.log(error.response.data.message)
            toast.warning(error.response.data.message, {position: 'top-center'})
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
                    {/* <label htmlFor="nome">Nome*</label>
                    <input type="text" required={"required"} placeholder="Digite seu nome..." name="nome" required value={usuario.nome} onChange={(e)=> setUsuario({...usuario, nome: e.target.value})}/> */}
                    {/* <TextField style={{width: '100%'}}  id="outlined-basic" label="Nome" variant="outlined" name="nome" required value={usuario.nome} onChange={(e)=> setUsuario({...usuario, nome: e.target.value})} /> */}
                    <BasicTextField label={"Nome"} name={"nome"} type={"text"} required={"required"} value={usuario.nome} onChange={(e)=> setUsuario({...usuario, nome: e.target.value})}/>
                    
                    <BasicTextField label={"CPF"} name={"cpf"} type={"text"} required={"required"} value={usuario.cpf} onChange={(e)=>setUsuario({...usuario, cpf: e.target.value})}/>

                    <label htmlFor="dataNascimento">Data de Nascimento</label>
                    <BasicTextField label={""} name={"dataNascimento"} type={"Date"} required={"required"} value={usuario.dataNascimento} onChange={(e)=> setUsuario({...usuario, dataNascimento: e.target.value})}/>

                    <BasicTextField label={"E-mail"} name={"email"} type={"email"} required={"required"} value={usuario.email} onChange={(e)=> setUsuario({...usuario, email: e.target.value})}/>

                    <BasicTextField label={"Telefone"} name={"telefone"} type={"text"} required={""} value={usuario.telefone} onChange={(e)=> setUsuario({...usuario, telefone: e.target.value})}/>

                    <BasicTextField label={"Senha"} name={"senha"} type={"password"} required={"required"} value={usuario.senha} onChange={(e)=> setUsuario({...usuario, senha: e.target.value})}/>

                    <BasicTextField label={"Confirma senha"} name={"confirmaSenha"} type={"password"} required={"required"} value={usuario.confirmaSenha} onChange={(e)=> setUsuario({...usuario, confirmaSenha: e.target.value})}/>
                    
                    {/* <label htmlFor="cpf">CPF*</label>
                    <input type="text" required={"required"} placeholder="Digite seu CPF..."  name="cpf" required value={usuario.cpf} onChange={(e)=>setUsuario({...usuario, cpf: e.target.value})} maxLength={11}/>

                    <label htmlFor="dataNascimento">Data de Nascimento</label>
                    <input type="date" required={"required"} name="dataNascimento" value={usuario.dataNascimento} onChange={(e)=>setUsuario({...usuario, dataNascimento: e.target.value})}/>

                    <label htmlFor="email">E-mail*</label>
                    <input type="email" required={"required"} placeholder="Digite seu E-mail..."  name="email" required value={usuario.email} onChange={(e)=>setUsuario({...usuario, email: e.target.value})}/>

                    <label htmlFor="telefone">Telefone</label>
                    <input type="number" required={"required"} placeholder="Digite seu telefone..."  name="telefone"  value={usuario.telefone} onChange={(e)=>setUsuario({...usuario, telefone: e.target.value})}/>

                    <label htmlFor="senha">Senha*</label>
                    <input type="password" required={"required"} placeholder="Digite sua senha..."  name="senha" value={usuario.senha} onChange={(e)=>setUsuario({...usuario, senha: e.target.value})}/>

                    <label htmlFor="confirmaSenha">Confirma Senha*</label>
                    <input type="password" required={"required"} placeholder="Digite a confirmação da sua senha..."  name="confirmaSenha" value={usuario.confirmaSenha} onChange={(e)=>setUsuario({...usuario, confirmaSenha: e.target.value})}/> */}
                    
                    <div className="container-botao-form">
                        {/* <button className="btn-novo-usuario">Cadastrar</button>  */}
                        <Button variant="contained" color='success' endIcon={<SaveOutlinedIcon />}>
                            Cadastrar
                        </Button>
                    </div>
                    
                </form>
                <div className="container-info">
                    <span>Todos os campos que possuem * são de preenchimento obrigatório.</span>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CadastroUsuario;