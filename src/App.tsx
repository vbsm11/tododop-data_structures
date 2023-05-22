import React from 'react';
import {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

type TodolistType = { id: string, title: string}

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TasksStateElementType = {
  data: TaskType[]
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: TasksStateElementType
}

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: "What to learn"},
    {id: todolistId2, title: "What to buy"}
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: {
      data: [
        {id: v1(), title: "HTML&CSS1111", isDone: true},
        {id: v1(), title: "JS1111", isDone: true}
      ],
      filter: "all"
    },
    [todolistId2]: {
      data: [
        {id: v1(), title: "HTML&CSS22222", isDone: true},
        {id: v1(), title: "JS2222", isDone: true}
      ],
      filter: "all"
    }
  });


  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(el => el.id !== todolistId))
    setTasks(() => {
      const newTasks = {...tasks}
      delete newTasks[todolistId]
      return newTasks
    })

  }


  function removeTask(todolistId: string, taskId: string) {
    setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.filter(e => e.id !== taskId)}})
  }

  function addTask(todolistId: string, title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: [...tasks[todolistId].data, newTask]}})
  }

  function changeStatus(todolistId: string, taskId: string, newIsDone: boolean) {
    setTasks({
      ...tasks,
      [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)}
    })
  }

  function changeFilter(todolistId: string, value: FilterValuesType) {
    setTasks({...tasks, [todolistId]: {...tasks[todolistId], filter: value}})
  }

  return (
      <div className="App">
        {todolists.map((el) => {
          let tasksForTodolist = tasks[el.id].data;
          if (tasks[el.id].filter === "active") {
            tasksForTodolist = tasks[el.id].data.filter(t => !t.isDone);
          }
          if (tasks[el.id].filter === "completed") {
            tasksForTodolist = tasks[el.id].data.filter(t => t.isDone);
          }
          return (
              <Todolist
                  todolistId={el.id}
                  title={el.title}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  filter={tasks[el.id].filter}
                  removeTodolist={removeTodolist}
              />
          )
        })}


      </div>
  );
}

export default App