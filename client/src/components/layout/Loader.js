import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Loading = () => {
  return (
    <Fragment>
      <div className="all-center">
        <img
          src={spinner}
          style={{ height: "10em", width: "10em" }}
          alt="Loading..."
        />
      </div>
    </Fragment>
  );
};

export default Loading;
