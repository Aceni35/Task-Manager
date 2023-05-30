import React from "react";

const Total = ({ totaltasks }) => {
  return (
    <div className="row">
      <div className="col-12 text-center bg-warning">
        <h1 className="display-3 fs-3 ">Total tasks: {totaltasks + 1}</h1>
      </div>
    </div>
  );
};

export default Total;
