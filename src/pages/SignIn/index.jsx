import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCart } from "@actions/cartActions";
import { setUser as set } from "@actions/userActions";
import * as api from "@utils/api";
import { setUser } from "@utils/localstorage";
import "./SignIn.css";

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (loading) return <h1>Cargando.....</h1>;
  return (
    <div className="signin-page">
      <div className="container">
        <div className="form">
          <div className="header">
            <i
              className="fas fa-arrow-circle-left fa-5x"
              onClick={() => history.push("/")}
            ></i>
            <p>Inciar Sesión</p>
          </div>

          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/signup" className="link">
            ¿No tienes una cuenta? Registrate aquí
          </Link>
          <br />

          <input type="submit" value="Entrar" onClick={submitHandler} />
        </div>
      </div>
    </div>
  );

  async function submitHandler() {
    if (email.length > 2 && password.length > 2) {
      setLoading(true);
      const { statusCode, data } = await api.postRequest("/api/user/signin", {
        email,
        password,
      });
      setLoading(false);
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setLoading(false);
        alert(data);
        return;
      }
      setUser(data);
      dispatch(set());
      dispatch(fetchCart());
      history.replace("/");
    }
  }
}

export default SignIn;
