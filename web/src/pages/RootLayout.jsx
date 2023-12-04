import { Outlet } from "react-router-dom";
import "./RootLayout.css";

import Navbar from "../components/Navbar";
export function RootLayout() {
  return (
    <>
      <Navbar />
      <header>
        <h1>Car Service Project</h1>

        <div className="car-movement">
          <div className="car">🚙</div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Copyright Arefin</p>
      </footer>
    </>
  );
}
