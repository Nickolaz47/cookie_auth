// Pages
import Register from "./pages/Register/Register";
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
      <NavMenu/>
        <div className="set_page_size">
          <Routes>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
