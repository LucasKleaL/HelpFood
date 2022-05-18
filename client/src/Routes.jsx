import { BrowserRouter, Route } from "react-router-dom";
import UserRegister from "./pages/UserRegister";
import LandingPage from "./pages/LandingPage";
import CompanyRegister from "./pages/CompanyRegister";
import DonationDashboard from "./pages/DonationDashboard";

const Routes = () => {
    return (
        <BrowserRouter>
            <Route exact={true} path="/" component={LandingPage} />
            <Route exact={true} path="/user/add" component={UserRegister} />
            <Route exact={true} path="/company/add" component={CompanyRegister} />
            <Route exact={true} path="/dashboard" component={DonationDashboard} />
        </BrowserRouter>
    )
}

export default Routes;