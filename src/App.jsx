import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Página de Inicio</h1>} />
      <Route path="/dashboard" element={<h1>Panel de Control</h1>} />
    </Routes>
  );
}

export default App;
