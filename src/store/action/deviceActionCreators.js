const selectDevice = deviceId => (dispatch) => {
  dispatch({
    type: 'SELECT_DEVICE',
    payload: deviceId,
  });
};

const updateDevice = device => (dispatch) => {
  dispatch({
    type: 'UPDATE_DEVICE',
    payload: device,
  });
};

export { selectDevice, updateDevice };
