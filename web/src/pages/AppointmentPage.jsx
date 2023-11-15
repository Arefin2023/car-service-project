import { Link } from "react-router-dom";
import { AppointmentTable } from "../components/AppointmentTable";
import { useEffect, useState } from "react";
import axios from "axios";

export function AppointmentPage() {
  const url = "/api/appointments";
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);
        setData(data);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAppointments();
  }, []);

  function formatDate(dateString) {
    const myDate = new Date(dateString);
    return myDate.toLocaleDateString("de-DE");
  }

  const rows = data.map((item) => {
    console.log(item);
    return {
      date: formatDate(item.start),
      customer: item.customer.name,
      car: item.id,
      service: item.service,
    };
  });

  return (
    <>
      <div style={{ width: "100vw" }}>
        <h3>Appointments page</h3>
        {isError && <p>We have an error</p>}
        {isLoading && <p>Loading...</p>}

        <AppointmentTable rows={rows} />
        <Link to="/welcome">Back to Welcome Page</Link>
      </div>
    </>
  );
}
