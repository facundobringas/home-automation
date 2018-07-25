import lightAPI from './lightAPI';

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls /api/v1/device and returns data to me', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    // assert on the response
    lightAPI.getDevices().then((res) => {
      expect(res.data).toEqual('12345');
    });

    // assert on the times called and arguments given to fetch
    expect(fetch.mock.calls).toHaveLength(1);
    expect(fetch.mock.calls[0][0]).toEqual(`${process.env.REACT_APP_SERVER_URL}/device`);
  });
});
