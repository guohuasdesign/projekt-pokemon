import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// import HomePage from "./pages/HomePage";
// import PokemonDetailsPage from "./pages/PokemonDetailsPage";
// import MyRosterPage from "./pages/MyRosterPage";
// import BattlePage from "./pages/BattlePage";
// import LeaderboardPage from "./pages/LeaderboardPage";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
