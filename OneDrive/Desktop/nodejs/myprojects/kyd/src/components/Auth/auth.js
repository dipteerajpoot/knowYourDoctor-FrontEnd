import { Navigate } from "react-router-dom";
    
export const isUserExit = () =>{
return !!sessionStorage.getItem("current-user");
}

const Auth = ({children}) => {
    console.log("Auth exicuted")
    // console.log("childern ;" + {Children})
    return isUserExit() ? children : <Navigate to="/find"/>
}
export default Auth;