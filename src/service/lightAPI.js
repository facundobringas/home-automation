const lightAPI = {
  getDevices: () =>
    fetch(`${process.env.REACT_APP_SERVER_URL}/device`).then((response) => {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      throw new TypeError('Unexpected response content-type');
    }),
  updateDevice: device =>
    fetch(`${process.env.REACT_APP_SERVER_URL}/device/${device.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        data: device,
      }),
    }).then((response) => {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      throw new TypeError('Unexpected response content-type');
    }),
};

export default lightAPI;
