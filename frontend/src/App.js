// Pages
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
// Components
import NavMenu from "./components/NavMenu";
// Hooks
import { useAuth } from "./hooks/useAuth";
// React Router
import { Routes, Route, BrowserRouter } from "react-router-dom";
// CSS
import "./App.css";

function App() {
  const { auth } = useAuth();
  
  return (
    <div>
      <BrowserRouter>
        <NavMenu />
        <div className="set_page_size">
          <Routes>
            <Route path="/" element={auth ? <Dashboard /> : <Login />}></Route>
            <Route
              path="/dashboard"
              element={auth ? <Dashboard /> : <Login />}
            ></Route>
            <Route
              path="/login"
              element={!auth ? <Login /> : <Dashboard />}
            ></Route>
            <Route
              path="/register"
              element={!auth ? <Register /> : <Dashboard />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
