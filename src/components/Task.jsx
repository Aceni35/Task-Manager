import React from "react";
import Remove from "../assets/remove";
import Edit from "../assets/edit";

const Task = ({ id, action, dispatch }) => {
  return (
    <>
      <div className="row border p-2">
        <div className="col-10 fs-5">{action}</div>
        <div className="col-1">
          <button
            className="btn btn-info"
            onClick={() => {
              dispatch({ type: "SAVE_ID", payload: id });
            }}
          >
            <Edit />
          </button>
        </div>
        <div className="col-1">
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch({ type: "REMOVE_TASK", payload: id });
            }}
          >
            {" "}
            <Remove />
          </button>
        </div>
      </div>
    </>
  );
};

export default Task;
