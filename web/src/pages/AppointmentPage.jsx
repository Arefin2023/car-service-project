import { Link } from "react-router-dom";
import { AppointmentTable } from "../components/AppointmentTable";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const url = "/api/appointments";
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    async function loadAppointments() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);
      } catch (error) {
        isError ? console.log(error) : undefined;
      } finally {
        setIsLoading(false);
      }
    }
    loadAppointments();
  }, []);
  return (
    <>
      <div style={{ width: "100vw" }}>
        <h3>Appointments page</h3>

        <AppointmentTable rows={rows} />
        <Link to="/welcome">Back to Welcome Page</Link>
      </div>
    </>
  );
}
