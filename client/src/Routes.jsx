import { BrowserRouter, Route } from "react-router-dom";
import UserRegister from "./pages/UserRegister";
import LandingPage from "./pages/LandingPage";

const Routes = () => {
    return (
        <BrowserRouter>
            <Route exact={true} path="/" component={LandingPage} />
            <Route exact={true} path="/user/add" component={UserRegister}/>
        </BrowserRouter>
    )
}

export default Routes;