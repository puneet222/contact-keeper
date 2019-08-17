import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const Login = props => {
  const authContext = useContext(AuthContext);

  const { authenticateUser, isAuthenticated, error, clearErrors } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error) {
      console.log("ERROR -> : ", error);
    }
    clearErrors();
    // eslint-disable-next-line
  }, [isAuthenticated, props.history, error]);

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const onChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    authenticateUser(login);
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <h2 className="text-primary text-center">Account Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={login.email}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={onChange}
        />
      </div>
      <input
        type="submit"
        className="btn btn-primary btn-block"
        value="Login"
      />
    </form>
  );
};

export default Login;
