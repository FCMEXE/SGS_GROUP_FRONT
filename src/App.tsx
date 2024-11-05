import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Loading from './pages/LoadingPage';
import LoginForm from './pages/EnterpriseLogin';
import HomePage from './pages/firtsPage';
import Registers from './pages/Registers';
import VigiRoutes from './pages/VigiRoutes';
import ElectronicPointPage from './pages/eletronicPointPage';



const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginForm/>}></Route>
                <Route path='loading' element={<Loading/>}></Route>
                <Route path='FirstPage' element={<HomePage/>}></Route>
                <Route path='registers' element={<Registers/>}></Route>
                <Route path='rotas' element={< VigiRoutes/>}></Route>
                <Route path='point' element={< ElectronicPointPage/>}></Route>
                
                
                

                

            </Routes>        
        </BrowserRouter>
    );
};

export default App;
