import "./App.css";
import { Routes, Route } from "react-router-dom";
import Form from "./page/Form";
import SuccessPage from "./page/SuccessPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
  );
}

export default App;
