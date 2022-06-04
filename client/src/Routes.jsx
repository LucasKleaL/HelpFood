import { BrowserRouter, Route } from "react-router-dom";
import UserRegister from "./pages/UserRegister";
import LandingPage from "./pages/LandingPage";
import CompanyRegister from "./pages/CompanyRegister";
import Donate from "./pages/Donate";
import Admin from "./pages/Admin";

const Routes = () => {
    return (
        <BrowserRouter>
            <Route exact={true} path="/" component={LandingPage} />
            <Route exact={true} path="/user/add" component={UserRegister} />
            <Route exact={true} path="/company/add" component={CompanyRegister} />
            <Route exact={true} path="/donate" component={Donate} />
            <Route exact={true} path="/admin" component={Admin} />
        </BrowserRouter>
    )
}

export default Routes;