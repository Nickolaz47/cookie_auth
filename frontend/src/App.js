// Pages
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
// Components
import NavMenu from "./components/NavMenu";
// React Router
import { Routes, Route, BrowserRouter } from "react-router-dom";
// CSS
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavMenu />
        <div className="set_page_size">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
