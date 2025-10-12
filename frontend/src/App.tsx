import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import MyRosterPage from "./pages/MyRosterPage";
import BattlePage from "./pages/BattlePage";
import LeaderboardPage from "./pages/LeaderboardPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="pokemon/:id" element={<PokemonDetailsPage />} />
          <Route path="my-roster" element={<MyRosterPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/battle" element={<BattlePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
