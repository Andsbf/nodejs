let nextTodoId = 0
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

export const addField = (type) => {
  return {
    type: 'ADD_FIELD',
    fieldType: type
  }
}

export const toggleEditField = (id) => {
  return {
    type:'TOGGLE_FIELD_EDIT',
    field_id: id
  }
}
