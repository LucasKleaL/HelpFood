import { BrowserRouter, Route } from "react-router-dom";
import UserRegister from "./pages/UserRegister";

const Routes = () => {
    return (
        <BrowserRouter>
            <Route exact={true} path="/user/add" component={UserRegister}/>
        </BrowserRouter>
    )
}

export default Routes;