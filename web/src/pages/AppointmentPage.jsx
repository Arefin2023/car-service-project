import { Link } from "react-router-dom";
import { AppointmentTable } from "../components/AppointmentTable";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export function AppointmentPage() {
  const url = "/api/admin/appointments";
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);
        console.log(data);
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
    return dayjs(dateString).format("DD.MM.YYYY");
  }

  const rows = data.map((item) => {
    console.log(item);
    return {
      date: formatDate(item.startTime),
      customer: "item.customer.name",
      car: "item.customer.vehicleId",
      service: item.service,
    };
  });

  return (
    <>
      <div style={{ width: "100%" }}>
        <h3>Appointments page</h3>
        {isError && <p>We have an error</p>}
        {isLoading && <p>Loading...</p>}

        <AppointmentTable rows={rows} />
        <Link to="/welcome">Back to Welcome Page</Link>
      </div>
    </>
  );
}
