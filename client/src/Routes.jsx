import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserRegister from "./pages/UserRegister";
import LandingPage from "./pages/LandingPage";
import CompanyRegister from "./pages/CompanyRegister";
import Donate from "./pages/Donate";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={LandingPage} />
                <Route exact={true} path="/user/add" component={UserRegister} />
                <Route exact={true} path="/company/add" component={CompanyRegister} />
                <Route exact={true} path="/donate" component={Donate} />
                <Route exact={true} path="/admin" component={Admin} />
                <Route exact={true} path="/dashboard" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;