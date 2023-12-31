import FormSubmission from "./FormSubmission";
import { Link } from "react-router-dom";
import "../Styles/Register.css";

const Register = () => {
    return ( 
        <div className="home">
            <h2> Sign Up</h2>
            <Link to="/signIn">Already have an account?</Link>
            <FormSubmission />
        </div>
    );
}
 
export default Register;   