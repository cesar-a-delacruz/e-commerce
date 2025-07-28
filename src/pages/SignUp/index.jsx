import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as api from "@utils/api";
import "./SignUp.css";

function SignUp() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (loading) return <h1>Cargando...</h1>;
  return (
    <div className="signup-page">
      <div className="container">
        <div className="form">
          <div className="header">
            <i
              className="fas fa-arrow-circle-left fa-5x"
              onClick={() => history.push("/")}
            ></i>
            <p>Crear Cuenta</p>
          </div>

          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john.smith@email.com"
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

          <Link to="/signin" className="link">
            ¿Ya tienes una cuenta? Inicia Sesión aquí
          </Link>
          <br />

          <input type="submit" value="Registrar" onClick={submitHandler} />
        </div>
      </div>
    </div>
  );

  async function submitHandler() {
    if (name.length > 2 && email.length > 2 && password.length > 2) {
      setLoading(true);
      const { statusCode, data } = await api.postRequest("/api/user/", {
        email,
        name,
        password,
      });
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setLoading(false);
        alert(data);
        return;
      }
      history.replace("/signin");
    }
  }
}

export default SignUp;
