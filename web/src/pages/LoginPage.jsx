import { Link } from "react-router-dom";
import SignIn from "../components/SignIn";
export function LoginPage() {
  return (
    <>
      <SignIn />
      <div className="flex-container">
        <Link to="/welcome">Click here to Login</Link>
      </div>
    </>
  );
}
