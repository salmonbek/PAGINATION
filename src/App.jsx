import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import YupPage from "./pages/YupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import { TOKEN } from "./constants";

function App() {
  let [isLogin, setIsLogin] = useState(
    localStorage.getItem(TOKEN) ? true : false
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={isLogin ? <HomePage /> : <Navigate to="/login" />}
        ></Route>
        <Route path="yup" element={<YupPage />}></Route>
        <Route
          path="login"
          element={<LoginPage setIsLogin={setIsLogin} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
