import { Link } from "react-router-dom";
import SignIn from "../components/SignIn";
export function LoginPage() {
  return (
    <>
      <h1>Login Page</h1>
      <SignIn />
      <Link to="./sign-in">Welcome</Link>
    </>
  );
}
