import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <>
      <header>
        <h1>Car Service Project</h1>
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
