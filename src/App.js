import React from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Link to="/invoices/1">Invoices1</Link> |{" "}
      <Link to="/invoices/2">Invoices2</Link>
      <Outlet />
    </div>
  );
}

export default App;
