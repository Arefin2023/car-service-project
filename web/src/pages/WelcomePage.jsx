import { Link } from "react-router-dom";
import "./WelcomePage.css";
export function WelcomePage() {
  return (
    <>
      <h3>Welcome Page</h3>
      <div className="flex-container">
        <Link to="/appointment">
          <div className="box">
            <h2>View Customers Appointments</h2>
          </div>
        </Link>
        <Link to="/wip">
          <div className="box">
            <h2>Work In Progress</h2>
          </div>
        </Link>
      </div>
      <div className="flex-container">
        <Link to="/message">
          <div className="box">
            <h2>Send Message to Customers</h2>
          </div>
        </Link>
        <Link to="/history">
          <div className="box">
            <h2>Service History</h2>
          </div>
        </Link>
      </div>
      <Link to="/">Login Page</Link>
    </>
  );
}
