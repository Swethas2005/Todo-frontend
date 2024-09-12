//Packages
import { Navigate } from "react-router-dom";
import { useContext } from "react";

//Local imports
import { AuthContext } from "../contexts/AuthContextProvider";


export default function PrivateRoute({ children }) {

    let { login } = useContext(AuthContext);
    return login ? children : <Navigate to="/login" />
}