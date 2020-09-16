import React, { useState, useContext } from "react";
import "./Login.css";
import { CTX } from "../../Utils/Store";

const Login = ({ history }) => {
  const [handle, setHandle] = useState("");
  const { dispatch } = useContext(CTX);

  return (
    <div className="login__wrapper">
      <div>
        <div className="card">
          <div>
            <input
              className="card__input"
              type="text"
              placeholder=""
              value={handle}
              onChange={e => setHandle(e.currentTarget.value)}
            />
          </div>
          <div className="card__submit">
            <img
              className="submit__img"
              src={require("../../assets/login.svg")}
              alt="submit"
              onClick={() => {
                dispatch({
                  type: "SET_HANDLE",
                  payload: { handle }
                });
                history.push("/chat");
              }}
            />
          </div>
        </div>
        <div className="handle">
          <h2 className="handle__info">Enter your handle.</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
