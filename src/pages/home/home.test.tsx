import axios, { AxiosResponse } from 'axios';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Home from './index';
import api from '../../services/api'
import { handleInfo } from '../../helpers/methods/handleInfo';

jest.mock('../../services/api');
jest.mock('../../helpers/methods/handleInfo', () => ({ handleInfo: jest.fn() }));
const mockedAxios = api as jest.Mocked<typeof axios>;

const mockedResponse = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      episode_id: 1,
      title: 'The Phantom Menace',
      release_date: '1999-05-19'
    },
    {
      episode_id: 2,
      title: 'Attack of the Clones',
      release_date: '2002-05-16'
    },
    {
      episode_id: 3,
      title: 'Revenge of the Sith',
      release_date: '2005-05-19'
    },
  ]
}


const axiosSuccessResponse: AxiosResponse = {
  data: mockedResponse,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

beforeEach(() => {
  mockedAxios.create = jest.fn(() => mockedAxios);
});

afterEach(() => {
  mockedAxios.get.mockClear();
});

test('should be able to render main component (title)', async () => {
  mockedAxios.get.mockResolvedValue(axiosSuccessResponse);
  const { findByText } = render(
    <Home />
  );

  const homeText = await findByText('Star Wars Movies');

  expect(homeText).toBeTruthy();
});

test('should be able to render movies', async () => {
  mockedAxios.get.mockResolvedValue(axiosSuccessResponse);
  const { findByText } = render(
    <Home />
  );

  const theOneWithMaul = await findByText('The Phantom Menace');
  const theOneWithSandTalk = await findByText('Attack of the Clones');
  const theOneWithHelloThere = await findByText('Revenge of the Sith');

  expect(theOneWithMaul).toBeTruthy();
  expect(theOneWithSandTalk).toBeTruthy();
  expect(theOneWithHelloThere).toBeTruthy();
});

test('should be able to see more info of a movie', async () => {
  mockedAxios.get.mockResolvedValue(axiosSuccessResponse);
  const { findAllByText } = render(
    <Home />
  );

  const movieToTest1 = {
    episode_id: 1,
    title: 'The Phantom Menace',
    release_date: '1999-05-19'
  }

  const buttons = await findAllByText('More info');
  fireEvent.click(buttons[0]);

  expect(handleInfo).toHaveBeenCalledWith(movieToTest1);
});

test('should be able to render try again info on no movies found', async () => {
  const mockedNotFoundResponse = {
    count: 0,
    next: null,
    previous: null,
    results: []
  }
  
  const axiosNotFoundSuccessResponse: AxiosResponse = {
    data: mockedNotFoundResponse,
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
  };

  mockedAxios.get.mockResolvedValue(axiosNotFoundSuccessResponse);

  const { getByText } = render(
    <Home />
  );

  await waitFor(() => {
    return expect(getByText('I find this lack of movies disturbing :(')).toBeTruthy();
  }, { timeout: 1000})
});

test('should be able to render try again info on error', async () => {
  const axiosErrorResponse: AxiosResponse = {
    data: { message: "Oops! Something's not right here" },
    status: 500,
    statusText: 'Error',
    config: {},
    headers: {},
  };

  mockedAxios.get.mockRejectedValue(axiosErrorResponse)

  const { getByText } = render(
    <Home />
  );

  await waitFor(() => {
    return expect(getByText('An error occurred :(')).toBeTruthy();
  }, { timeout: 1000})
});

test('should be able to make another request after clicking try again button', async () => {
  const axiosErrorResponse: AxiosResponse = {
    data: { message: "Oops! Something's not right here" },
    status: 500,
    statusText: 'Error',
    config: {},
    headers: {},
  };

  mockedAxios.get.mockRejectedValue(axiosErrorResponse)

  const { getByText } = render(
    <Home />
  );

  await waitFor(() => {
    const button = getByText('Try again!');
    fireEvent.click(button);

    return expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  }, { timeout: 1000})
});
