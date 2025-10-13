import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import BattlePage from "./pages/BattlePage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyRosterPage from "./pages/MyRosterPage";
import LeaderboardPage from "./pages/LeaderboardPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* public */}
          <Route index element={<HomePage />} />
          <Route path="pokemon/:id" element={<PokemonDetailsPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/battle" element={<BattlePage />} />

          {/* protected */}
          <Route
            path="my-roster"
            element={
              <ProtectedRoute>
                <MyRosterPage />
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
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
