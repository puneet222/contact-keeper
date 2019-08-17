import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
// import AlertContext from "../../context/alert/alertContext";

const Register = props => {
  //   const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { registerUser, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error) {
      console.log("ERROR -> : ", error);
    }
    clearErrors();
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = user;
  //   const { setAlert } = alertContext;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || password2 === "") {
      //   setAlert("Please Fill the inputs...", "danger");
    }
    registerUser({
      name,
      email,
      password
    });
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <h3 className="text-primary text-center">Account Register</h3>
      <div className="form-group">
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={onChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Email:
          <input type="email" name="email" value={email} onChange={onChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Confirm Password:
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </label>
      </div>
      <input
        type="submit"
        className="btn btn-primary btn-block"
        value="Register"
      />
    </form>
  );
};

export default Register;
