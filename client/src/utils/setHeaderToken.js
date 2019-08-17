import axios from "axios";

const setHeaderToken = token => {
  if (token) {
    axios.defaults.headers.common["x-path-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-path-token"];
  }
};

export default setHeaderToken;
