export default (state, action) => {
  switch(action.type) {
    case 'DELETE_BUDGET':
      return {
        ...state,
          budgets: state.budgets.filter(budgets => budgets.id !== action.payload)
      }
    case 'ADD_BUDGET':
      return {
        ...state,
          budgets: [action.payload, ...state.budgets]
      }
    default:
      return state;
  }
}