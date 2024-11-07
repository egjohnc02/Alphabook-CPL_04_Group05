import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Customer() {
    const navigate = useNavigate();

    const logout = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            navigate('/login');

        }).catch((error) => {
            window.alert('Something wrong: ' + error);
        });
    }

    return (
        <button onClick={logout}>Logout</button>
    );
}
