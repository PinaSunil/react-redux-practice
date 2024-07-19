import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo, fetchTodos, } from "../store/slice/todoSlice";

const TodoList = () => {
  const [currentTodo, setCurrentTodo] = useState("");
  const [currentEditedTodoId, setCurrentEditedTodoId] = useState(null);
  console.log(currentTodo);

  const dispatch = useDispatch();
  const { todoList,todosFromApi, loading } = useSelector((state) => state.todo);


  function handleAddTodo() {
    dispatch(addTodo(currentTodo));
    setCurrentTodo("");
  }

  
  function handleEditTodo() {
    dispatch(editTodo({currentEditedTodoId,currentTodo}));
    setCurrentTodo("");
    setCurrentEditedTodoId(null)

  }

  function handleDeleteTodo(getTodoItemId) {
    dispatch(deleteTodo(getTodoItemId));
  }

  function handleUpdateTodo(getTodoItem) {
    setCurrentEditedTodoId(getTodoItem.id)
    setCurrentTodo(getTodoItem.title)
  }

  function handleApiTodos() {
    dispatch(fetchTodos())
  }

  if(loading){
    return <h1> Todos Loading From Api please Wait......</h1>
  }

  return (
    <div>
      <input
        type="text"
        value={currentTodo}
        onChange={(event) => setCurrentTodo(event.target.value)}
        name="todo"
        placeholder="Enter your Todo"
      />
      <button onClick={currentEditedTodoId !== null ? handleEditTodo : handleAddTodo} disabled={currentTodo === ""}>
        {currentEditedTodoId !== null ? "Update Todo " : "Add Todo"}
      </button>

      <ul>
        {todoList && todoList.length > 0
          ? todoList.map((todoItem) => (
              <li key={todoItem.id}>
                <p> <input type="checkbox" value={todoItem.title} /> {todoItem.title} </p>
                <button onClick={() => handleDeleteTodo(todoItem.id)}>
                  Delete
                </button>

                <button onClick={() => handleUpdateTodo(todoItem)}>
                  Update Todo
                </button>
              </li>
            ))
          : null}
      </ul>


      <button onClick={handleApiTodos}> Fetch Todos From API</button>
      {
        todosFromApi && todosFromApi.length > 0 ? 
         todosFromApi.map(todoItem => <li key={todoItem.id}>
               {todoItem.title}
         </li>)
        
        : null
      }

    </div>
  );
};

export default TodoList;
