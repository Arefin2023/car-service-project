import { Link } from "react-router-dom";
import "./MessagePage.css";
export function MessagePage() {
  return (
    <>
      <h3>Message page</h3>
      <div className="container-box">
        <ul>
          <li>
            <p>customer1</p>
            <p>oil change</p>
            <p>car1</p>
            <p>finished today</p>
          </li>
          <button>Send Message</button>
          <li>
            <p>customer2</p>
            <p>filter change</p>
            <p>car2</p>
            <p>finished today</p>
          </li>
          <button>Send Message</button>
          <li>
            <p>customer3</p>
            <p>wheel alignment</p>
            <p>car3</p>
            <p>finished yesterday</p>
          </li>
          <button>Send Message</button>
        </ul>
      </div>
      <Link to="/welcome">Back to Welcome Page</Link>
    </>
  );
}
