import { Outlet } from "react-router-dom";
import "./RootLayout.css";

export function RootLayout() {
  return (
    <>
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
