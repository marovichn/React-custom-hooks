import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./components/Hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);
  const transformTasks = useCallback((dataObj) => {
    const loadedTasks = [];

    for (const taskKey in dataObj) {
      loadedTasks.push({ id: taskKey, text: dataObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp(transformTasks);

  useEffect(() => {
    fetchTasks({
      url: "https://simple-react-app-2b7b6-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    });
  }, [fetchTasks]);

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
        onFetch={() => {
          fetchTasks({
            url: "https://simple-react-app-2b7b6-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
          });
        }}
      />
    </React.Fragment>
  );
}

export default App;
