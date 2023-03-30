import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./components/Hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);
  const transformTasks = (dataObj) => {
    const loadedTasks = [];

    for (const taskKey in dataObj) {
      loadedTasks.push({ id: taskKey, text: dataObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const { isLoading, error, sendRequest } = useHttp(
    {
      url: "https://simple-react-app-2b7b6-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    },
    transformTasks
  );

  useEffect(() => {
    sendRequest();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
