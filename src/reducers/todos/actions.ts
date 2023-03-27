import { Todos } from './reducer'

export enum ActionTypes {
  CREATE_NEW_TODO = 'CREATE_NEW_TODO',
  COMPLETE_TODO = 'COMPLETE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  CHANGE_PLACEHOLDER = 'CHANGE_PLACEHOLDER',
  CHANGE_TODO_TEXT = 'CHANGE_TODO_TEXT',
}

export type ActionTypesProps =
  | { type: ActionTypes.CREATE_NEW_TODO; payload: { newTodo: Todos } }
  | { type: ActionTypes.COMPLETE_TODO; payload: { id: number } }
  | { type: ActionTypes.DELETE_TODO; payload: { id: number } }
  | { type: ActionTypes.CHANGE_PLACEHOLDER }
  | { type: ActionTypes.CHANGE_TODO_TEXT; payload: { text: string } }

export function createNewTodoAction(newTodo: Todos): ActionTypesProps {
  return {
    type: ActionTypes.CREATE_NEW_TODO,
    payload: { newTodo },
  }
}

export function completeTodoAction(id: number): ActionTypesProps {
  return {
    type: ActionTypes.COMPLETE_TODO,
    payload: { id },
  }
}

export function deleteTodoAction(id: number): ActionTypesProps {
  return {
    type: ActionTypes.DELETE_TODO,
    payload: { id },
  }
}

export function changePlaceholderAction(): ActionTypesProps {
  return {
    type: ActionTypes.CHANGE_PLACEHOLDER,
  }
}

export function changeTodoTextAction(text: string): ActionTypesProps {
  return {
    type: ActionTypes.CHANGE_TODO_TEXT,
    payload: { text },
  }
}
