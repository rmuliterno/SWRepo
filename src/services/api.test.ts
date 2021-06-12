import axios, { AxiosResponse } from 'axios';
import api from './api';

jest.mock('./api');
const mockedAxios = api as jest.Mocked<typeof axios>;

afterEach(() => {
  mockedAxios.get.mockClear();
});

test('should be able to create an axios instance', async () => {
  const mockedResponse = [
    {
      id: 1,
      name: 'Test',
    },
    {
      id: 2,
      name: 'Test2',
    },
  ];

  const axiosResponse: AxiosResponse = {
    data: mockedResponse,
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
  };

  mockedAxios.get.mockResolvedValue(axiosResponse);
  mockedAxios.create = jest.fn(() => mockedAxios);

  const { get } = api;

  const testResponse = await api.get('/test');

  expect(get).toBeTruthy();
  expect(get).toHaveBeenCalledWith('/test');
  expect(testResponse.data).toBe(mockedResponse);
})
