import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CadastroUsuario from './pages/CadastroUsuario';
import Home from '../src/pages/Home/index';
import InvestimentosAgrupados from './pages/InvestimentosAgrupados';
import RelatorioCompras from './pages/RelatorioCompras';
import ImportacaoPlanilha from './pages/ImportacaoPlanilha';

import InvestimentosAgrupadosCard from './pages/InvestimentosAgrupadosCard';

import Venda from './pages/Venda'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Proventos from './pages/Proventos';

function Rotas(){
    return(
    <BrowserRouter>
        <Routes>
                <Route exact path='/' element={<Login />} />
                <Route path='/cadastroUsuario' element={<CadastroUsuario />} />
                <Route path='/home' element={ <Home /> } />
                <Route path='/InvestimentosAgrupados' element ={ <InvestimentosAgrupados /> } />
                <Route path='/InvestimentosAgrupadosCard' element ={ <InvestimentosAgrupadosCard /> } />
                <Route path='/RelatorioCompras' element ={ <RelatorioCompras /> } />
                <Route path='/Venda' element ={ <Venda /> } />
                <Route path='/ImportacaoPlanilha' element={<ImportacaoPlanilha />} />
                <Route path='/Proventos' element={<Proventos />} />

        </Routes>
        <ToastContainer />
    </BrowserRouter>
    )
}
export default Rotas;