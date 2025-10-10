import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pokemon/:id"
          element={
            <ProtectedRoute>
              <PokemonDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-roster"
          element={
            <ProtectedRoute>
              <MyRosterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/battle"
          element={
            <ProtectedRoute>
              <BattlePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
