import ".//assets/css/styles.scss";
import ".//assets/css/login.scss";
import ".//assets/css/usuario.scss";
import ".//assets/css/header.scss";
import ".//assets/css/menu.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./pages";
import Login from "./pages/login";
import Endereco from "./pages/endereco";
import Trabalho from "./pages/trabalho";
import Cartao from "./pages/cartao";

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/endereco" element={<Endereco />} />
            <Route path="/trabalho" element={<Trabalho />} />
            <Route path="/cartao" element={<Cartao />} />
        </Routes>
    </Router>
  );
}

export default App;
