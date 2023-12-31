import "./style.scss";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const currentUser = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };
  console.log(currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path={"login"} element={<Login />} />
          <Route path={"register"} element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
