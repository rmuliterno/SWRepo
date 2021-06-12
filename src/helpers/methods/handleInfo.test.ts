import { handleInfo } from './handleInfo';

window.alert = jest.fn();

const testCases = [
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

test('should return film info', async () => {
  const test0 = handleInfo(testCases[0]);
  const test1 = handleInfo(testCases[1]);
  const test2 = handleInfo(testCases[2]);

  expect(window.alert).toHaveBeenCalledTimes(3);

  expect(test0).toStrictEqual(testCases[0]);
  expect(test1).toStrictEqual(testCases[1]);
  expect(test2).toStrictEqual(testCases[2]);
});
