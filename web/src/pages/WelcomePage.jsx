import { Link } from "react-router-dom";
import "./WelcomePage.css";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export function WelcomePage() {
  // const [token, setToken] = useState(null);

  // const { getToken } = useAuth();
  return (
    <>
      <h3>Welcome Page</h3>
      <div className="flex-container">
        {/* {token ? (
          <>
            <p>{token.slice(0, 9) + "..."}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(token);
              }}
            >
              Copy
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                getToken().then((token) => {
                  setToken(token);
                });
              }}
            >
              Get Token
            </button>
          </>
        )}
      </div>
      <div className="flex-container"> */}
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
    </>
  );
}
