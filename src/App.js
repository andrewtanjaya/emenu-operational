import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./View/Register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
