import React, { ChangeEvent, FormEvent, useState } from 'react'

import plusIcon from './assets/plus.svg'
import clipboardIcon from './assets/clipboard.svg'
import trashIcon from './assets/trash.svg'
import checkIcon from './assets/check.svg'
import uncheckIcon from './assets/uncheck.svg'
import logoIcon from './assets/logo.svg'

import styles from './App.module.scss'

interface TodoProps {
  id: number
  description: string
  status: boolean
}

function App() {
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState<TodoProps[]>([])
  const [activePlaceholder, setActivePlaceholder] = useState(false)

  function handleCreateNewTodo(e: FormEvent) {
    e.preventDefault()

    if (!todoText.trim()) return

    const newTodo = {
      id: todos.length + 1,
      description: todoText,
      status: false
    }

    setTodos([newTodo, ...todos])
    setTodoText('')
  }

  function handleDeleteTodo(id: number) {
    setTodos([...todos.filter(todo => todo.id !== id)])
  }

  function handleCompletedTodo(id: number) {
    let auxTodos = todos

    auxTodos.forEach(todo => {
      if (todo.id === id) {
        todo.status = !todo.status
      }
    })

    setTodos([...auxTodos])
  }

  function handleTodoTextChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoText(e.target.value)
  }

  function handleChangePlaceholderText() {
    setActivePlaceholder(state => !state)
  }

  const isTodoListEmpty = todos.length === 0
  const createdTodos = todos.length
  const completedTodos = todos.filter(todo => todo.status).length

  return (
    <>
      <header className={styles.header}>
        <img src={logoIcon} alt='Logo icon' />
      </header>

      <main className={styles.content}>
        <form onSubmit={handleCreateNewTodo}>
          <input
            type='text'
            placeholder={activePlaceholder ? 'Descrição da tarefa |' : 'Adicione uma nova tarefa'}
            value={todoText}
            onChange={handleTodoTextChange}
            onFocus={handleChangePlaceholderText}
            onBlur={handleChangePlaceholderText}
          />

          <button type='submit'>
            Criar
            <img src={plusIcon} alt='Plus icon' />
          </button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.taskStatus}>
            <p>
              Tarefas criadas <span>{createdTodos}</span>
            </p>
            <p>
              Concluídas
              <span>{createdTodos === 0 ? createdTodos : `${completedTodos} de ${createdTodos}`}</span>
            </p>
          </div>
        </div>

        {isTodoListEmpty ? (
          <div className={styles.empty}>
            <img src={clipboardIcon} alt='Clipboard icon' />

            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          <ul className={styles.todoslist}>
            {todos.map(todo => (
              <li key={todo.id}>
                <button onClick={() => handleCompletedTodo(todo.id)}>
                  {todo.status ? (
                    <img className={styles.checkedIcon} src={checkIcon} alt='Check icon' />
                  ) : (
                    <img className={styles.uncheckedIcon} src={uncheckIcon} alt='Uncheck icon' />
                  )}
                </button>

                <p className={todo.status ? styles.lineThrough : ''}>{todo.description}</p>

                <img
                  className={styles.trashIcon}
                  src={trashIcon}
                  alt='Trash icon'
                  onClick={() => handleDeleteTodo(todo.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}

export default App
