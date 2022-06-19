import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserRegister from "./pages/UserRegister";
import LandingPage from "./pages/LandingPage";
import CompanyRegister from "./pages/CompanyRegister";
import Donate from "./pages/Donate";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import MyDonations from "./pages/MyDonations";
import DetailsDonation from "./pages/DetailsDonation";
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
                <Route exact={true} path="/myDonations" component={MyDonations} />
                <Route exact={true} path="/Details" component={DetailsDonation} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;