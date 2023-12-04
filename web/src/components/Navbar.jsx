import { NavLink } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
export default function Navbar() {
  const { signOut } = useAuth();
  return (
    <>
      <ul className="navigation">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/appointment">Appointment</NavLink>
        </li>
        <li>
          <NavLink to="/wip">Work in progress</NavLink>
        </li>
        <li>
          <NavLink to="/history">Service history</NavLink>
        </li>
        <li>
          <NavLink to="/message">Send message</NavLink>
        </li>
        <li>
          <NavLink onClick={signOut}>Sign Out</NavLink>
        </li>
      </ul>
    </>
  );
}
