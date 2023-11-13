import { Link } from "react-router-dom";
import "./AppointmentPage.css";
import { CustomizedTable } from "../components/CustomizedTable";
function createData(date, customer, car, service) {
  return { date, customer, car, service };
}

const rows = [
  createData("Today", "customer1", "car1", "oil change"),
  createData("Today", "customer2", "car2", "filter change"),
  createData("Today", "customer3", "car3", "oil change"),
  createData("Tomorrow", "customer4", "car4", "brake repair"),
  createData("Tomorrow", "customer5", "car5", "wheel alignment"),
];
export function AppointmentPage() {
  return (
    <>
      <div style={{ width: "100vw" }}>
        <h3>Appointments page</h3>
        <div className="car-movement">
          <div className="car">🚙</div>
        </div>
        <CustomizedTable rows={rows} />
        <Link to="/welcome">Back to Welcome Page</Link>
      </div>
    </>
  );
}
