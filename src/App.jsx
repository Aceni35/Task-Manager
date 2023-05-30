import React, { useEffect, useReducer, useState } from "react";
import EnterTask from "./components/enter-task";
import Heading from "./components/Heading";
import Task from "./components/Task";
import Total from "./components/Total";
import Modal from "./components/modal";
import Novaluemodal from "./components/novaluemodal";

const initialState = {
  tasks: [],
  isEditModal: false,
  isNoValueModal: false,
  newtext: "",
  saveId: 0,
  totaltasks: 0,
};

const reducer = (state, action) => {
  if (action.type === "ADD_TASK") {
    let newtask = {
      task: action.payload,
      id: new Date().getTime().toString(),
    };
    let number = state.tasks.length;
    localStorage.setItem("tasks", JSON.stringify([...state.tasks, newtask]));
    return {
      ...state,
      tasks: [...state.tasks, newtask],
      totaltasks: number,
    };
  } else if (action.type === "REMOVE_TASK") {
    const newtasks = state.tasks.filter((task) => {
      return task.id !== action.payload;
    });
    let number = newtasks.length - 1;
    localStorage.setItem("tasks", JSON.stringify(newtasks));
    return {
      ...state,
      tasks: newtasks,
      totaltasks: number,
    };
  } else if (action.type === "SAVE_ID") {
    return {
      ...state,
      isEditModal: true,
      saveId: action.payload,
    };
  } else if (action.type === "COMPLETE_CHNAGE") {
    const newtasks = state.tasks.map((t) => {
      if (state.saveId === t.id) {
        t.task = action.payload;
      }
      return t;
    });
    localStorage.setItem("tasks", JSON.stringify(newtasks));
    return {
      ...state,
      isEditModal: false,
      tasks: newtasks,
    };
  } else if (action.type === "MODULE_ON") {
    return {
      ...state,
      isEditModal: true,
    };
  } else if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isEditModal: false,
    };
  } else if (action.type === "NO_VALUE") {
    return {
      ...state,
      isNoValueModal: true,
    };
  } else if (action.type === "NO_VALUE_OFF") {
    return {
      ...state,
      isNoValueModal: false,
    };
  } else if (action.type === "SAVE_DATA") {
    const { number, parsedStorage } = action.payload;
    console.log(number);
    return {
      ...state,
      tasks: parsedStorage,
      totaltasks: number - 1,
    };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setinput] = useState("");
  const [modalinput, setModalinput] = useState("");

  const turnoffmodal = () => {
    setTimeout(() => {
      dispatch({ type: "NO_VALUE_OFF" });
    }, 3000);
  };

  useEffect(() => {
    const storage = localStorage.getItem("tasks");
    const parsedStorage = JSON.parse(storage);
    if (parsedStorage) {
      let number = parsedStorage.length;
      let payload = { parsedStorage, number };
      dispatch({ type: "SAVE_DATA", payload });
    }
  }, []);

  return (
    <>
      {state.isNoValueModal && <Novaluemodal />}
      {state.isEditModal && (
        <Modal
          modalinput={modalinput}
          setModalinput={setModalinput}
          dispatch={dispatch}
          turnoffmodal={turnoffmodal}
        />
      )}
      <div className="container-md my-md-1">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-10 col-lg-8 bg-primary border border-4">
            <Heading />
            <EnterTask
              dispatch={dispatch}
              input={input}
              setinput={setinput}
              turnoffmodal={turnoffmodal}
            />
            {state.tasks.map((task) => {
              return (
                <Task
                  id={task.id}
                  action={task.task}
                  key={task.id}
                  dispatch={dispatch}
                  modalinput={modalinput}
                  setModalinput={setModalinput}
                />
              );
            })}
            <Total totaltasks={state.totaltasks} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
