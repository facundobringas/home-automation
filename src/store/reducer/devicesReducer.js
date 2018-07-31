import initialState from '../initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DEVICE':
      return {
        ...state,
        data: state.data.map(device => (device.id === action.payload.id ? action.payload : device)),
      };
    case 'SELECT_DEVICE':
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};
