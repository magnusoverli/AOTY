import "./index.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export function App() {
  return window.location.pathname === '/admin' ? <Admin /> : <Home />;
}

export default App;
