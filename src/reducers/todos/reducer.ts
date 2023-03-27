import { ActionTypes, ActionTypesProps } from './actions'
import { produce } from 'immer'

export interface Todos {
  id: number
  description: string
  status: boolean
}

interface TodosState {
  todos: Todos[]
  todoText: string
  activePlaceholder: boolean
}

export function todosReducer(
  state: TodosState,
  action: ActionTypesProps,
): TodosState {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_TODO: {
      return produce(state, (draft) => {
        draft.todos.push(action.payload.newTodo)
        draft.todoText = ''
      })
    }

    case ActionTypes.COMPLETE_TODO: {
      return produce(state, (draft) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id,
        )

        draft.todos[index].status = !draft.todos[index].status
      })
    }

    case ActionTypes.DELETE_TODO: {
      return produce(state, (draft) => {
        const newTodos = draft.todos.filter(
          (todo) => todo.id !== action.payload.id,
        )
        draft.todos = newTodos
      })
    }

    case ActionTypes.CHANGE_PLACEHOLDER: {
      return produce(state, (draft) => {
        draft.activePlaceholder = !draft.activePlaceholder
      })
    }

    case ActionTypes.CHANGE_TODO_TEXT: {
      return produce(state, (draft) => {
        draft.todoText = action.payload.text
      })
    }

    default:
      return state
  }
}
