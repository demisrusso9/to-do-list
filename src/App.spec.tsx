import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
  it('renders correctly', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: /criar plus icon/i })).toBeInTheDocument()
  })

  it('shows empty todo list', () => {
    render(<App />)

    expect(screen.getByText('Você ainda não tem tarefas cadastradas')).toBeInTheDocument()
    expect(screen.getByText('Crie tarefas e organize seus itens a fazer')).toBeInTheDocument()
  })

  it('does not add a new todo when user types only spaces', () => {
    render(<App />)

    const createButton = screen.getByRole('button', { name: /criar plus icon/i })
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(createButton)

    expect(screen.getByText('Você ainda não tem tarefas cadastradas')).toBeInTheDocument()
  })

  it('should change the input placeholder text on focus', () => {
    render(<App />)

    const input = screen.getByRole('textbox')

    expect(input).toHaveProperty('placeholder', 'Adicione uma nova tarefa')

    fireEvent.focus(input)

    expect(input).toHaveProperty('placeholder', 'Descrição da tarefa |')
  })

  describe('Todo-List CRUD', () => {
    beforeEach(() => {
      render(<App />)

      const createButton = screen.getByRole('button', { name: /criar plus icon/i })
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'fake-todo-test-1' } })
      fireEvent.click(createButton)
    })

    it('adds a new todo', () => {
      expect(screen.getByText('fake-todo-test-1')).toBeInTheDocument()
    })

    it('completes a created todo', () => {
      const completeButton = screen.getByRole('button', { name: /uncheck icon/i })

      fireEvent.click(completeButton)

      expect(screen.getByText('1 de 1')).toBeInTheDocument()
    })

    it('deletes a created todo', () => {
      const deleteButton = screen.getByRole('img', { name: /trash icon/i })

      fireEvent.click(deleteButton)

      expect(screen.queryByText('fake-todo-test-1')).not.toBeInTheDocument()
    })
  })
})
