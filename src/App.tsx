import { Outlet } from "react-router";
import "./App.scss";
import { Header } from "./layouts/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
