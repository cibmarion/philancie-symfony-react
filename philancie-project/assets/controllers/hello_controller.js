import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';
import AuthContext from '../contexts/AuthContext';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SheetPage from '../pages/SheetPage';
import SheetsPage from '../pages/SheetsPage';
import SheetsPageWithPagination from '../pages/SheetsPageWithPagination';
import AuthAPI from '../services/authAPI';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
import RegisterPage from '../pages/RegisterPage';

AuthAPI.setup();

const PrivateRoute = ({path, component}) => {
    const {isAuthenticated} = useContext(AuthContext)
    return isAuthenticated ? ( <Route path={path} component={component} />)
    : (<Redirect to="/login"/>);
}
    const App = () => {

        const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
        const NavBarWithRouter = withRouter(NavBar); 

        return(
        <AuthContext.Provider value = {{
            isAuthenticated,
            setIsAuthenticated
            }}
        >
            <HashRouter>
                <NavBarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path="/sheets/:id" component = {SheetPage}/>
                        <PrivateRoute path="/sheets" component = {SheetsPage}/>
                        <Route path="/" component={HomePage} />
                    </Switch> 
            </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.TOP_CENTER}/>
        </AuthContext.Provider>
        ) 
    };

    const rootElement = document.querySelector('#app');
    ReactDOM.render(<App/>, rootElement);



