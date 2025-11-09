import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
