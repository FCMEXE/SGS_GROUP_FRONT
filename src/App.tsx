import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomePage from './pages/firtsPage';
import Registers from './pages/Registers';
import VigiRoutes from './pages/VigiRoutes';
import ElectronicPointPage from './pages/eletronicPointPage';
import LandingPage from './pages/landingpage/landingpage';
import LoginPageCollaborator from './pages/collaboratorLogin.tsx';
import LoginPage from './pages/AdminLogin.tsx';




const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path='/login/admin' element={<LoginPage/>}></Route>  
            <Route path='/login/collaborator' element={<LoginPageCollaborator/>}></Route>  
       
                <Route path='FirstPage' element={<HomePage/>}></Route>
                <Route path='registers' element={<Registers/>}></Route>
                <Route path='rotas' element={< VigiRoutes/>}></Route>
                <Route path='point' element={< ElectronicPointPage/>}></Route>
                <Route path='/' element={< LandingPage/>}></Route>
                
                
                

                

            </Routes>        
        </BrowserRouter>
    );
};

export default App;
