import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../Hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest } = useHttp();
  const createTask = (taskText, data) => {
    const generatedId = data.name;
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };
  const enterTaskHandler = async (taskText) => {
    sendRequest(
      {
        url: "https://simple-react-app-2b7b6-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
