import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initialize as initUser } from "@actions/userActions";
import { initialize as initCart } from "@actions/cartActions";
import { getUser, setUser, logout } from "@utils/localstorage";
import * as api from "@utils/api";
import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const user = getUser();
  if (user.type !== "customer") {
    history.replace("/products");
  }

  const history = useHistory();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <div className="profile-page">
      <div className="container">
        <div className="form">
          <div className="header">
            <i
              className="fas fa-arrow-circle-left fa-5x"
              onClick={() => history.push("/")}
            ></i>
            <p>Información Personal</p>
          </div>

          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />

          <input type="submit" value="Actualizar" onClick={updateHandler} />
          <input type="submit" value="Eliminar" onClick={deleteHandler} />
        </div>
      </div>
    </div>
  );

  async function updateHandler() {
    if (name.length > 2 && email.length > 2) {
      const { statusCode, data } = await api.putRequest(
        `/api/user/${user.id}`,
        {
          email,
          name,
        }
      );

      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        alert(data);
        return;
      }

      const newUser = { ...user, name, email };
      setUser(JSON.stringify(newUser));
      history.replace("/profile");
    }
  }
  async function deleteHandler() {
    const { statusCode, data } = await api.deleteRequest(
      `/api/user/${user.id}`
    );
    if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
      alert(data);
      return;
    }
    dispatch(initCart());
    dispatch(initUser());
    logout()
    history.replace("/");
  }
}

export default Profile;
