import { Link } from "react-router-dom";
import { WipTable } from "../components/WipTable";
function createData(job, car, service, efd) {
  return { job, car, service, efd };
}

const wiprows = [
  createData("job1", "car1", "oil change", "today"),
  createData("job2", "car2", "filter change", "tomorrow"),
  createData("job3", "car3", "oil change", "tomorrow"),
  createData("job4", "car4", "brake repair", "two days later"),
  createData("job5", "car5", "wheel alignment", "three days later"),
];

export function WipPage() {
  return (
    <>
      <h3>Work in progress page</h3>
      <WipTable rows={wiprows} />
      <Link to="/welcome">Back to Welcome Page</Link>
    </>
  );
}
