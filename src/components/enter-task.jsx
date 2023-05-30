import React from "react";
import Plus from "../assets/plus";

const EnterTask = ({ dispatch, input, setinput, turnoffmodal }) => {
  return (
    <div className="row ">
      <div className="col-12 d-flex justify-content-center align-items-center">
        <p className="d-inline display-5 fs-3 ali mt-1">Enter your task</p>
        <input
          type="text"
          value={input}
          className="rounded mx-3"
          onChange={(e) => {
            return setinput(e.target.value);
          }}
        />
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          className="btn btn-success"
          onClick={() => {
            if (input) {
              dispatch({ type: "ADD_TASK", payload: input });
              setinput("");
            } else {
              dispatch({ type: "NO_VALUE" });
              turnoffmodal();
            }
          }}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default EnterTask;
