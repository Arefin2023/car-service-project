import { AppointmentTable } from "../components/AppointmentTable";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

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

const rows = data
  .filter((item) => {
    return dayjs(item.startTime).filter(dayjs());
  })
  .map((item) => {
    console.log(item);
    return {
      date: formatDate(item.startTime),
      customer: item.customer.name,
      car: item.customer.vehicleId,
      service: item.service,
      rating: item.rating,
    };
  });

// function createData(job, car, service, efd) {
//   return { job, car, service, efd };
// }

// const wiprows = [
//   createData("job1", "car1", "oil change", "today"),
//   createData("job2", "car2", "filter change", "tomorrow"),
//   createData("job3", "car3", "oil change", "tomorrow"),
//   createData("job4", "car4", "brake repair", "two days later"),
//   createData("job5", "car5", "wheel alignment", "three days later"),
// ];

export function WipPage() {
  return (
    <>
      <h3>Work in progress page</h3>
      {isError && <p>We have an error</p>}
      {isLoading && <p>Loading...</p>}

      <AppointmentTable rows={rows} />
    </>
  );
}
