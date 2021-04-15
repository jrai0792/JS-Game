import axios from 'axios';
import { enableFetchMocks } from 'jest-fetch-mock';
import { getScore, sendScore } from '../leader-api';

enableFetchMocks();

jest.mock('axios');

describe('Get API', () => {
  it('Will get the array of the player name and corresponding score', async () => {
    axios.get.mockResolvedValue();
    const res = await getScore();
    expect(res).not.toBeNull();
  });
});

describe('Post API', () => {
  it('Will post the score', async () => {
    axios.post.mockResolvedValue(
      {
        data:
     { result: 'Leaderboard score created correctly.' },
      },
    );
    const res = await sendScore('test', 30);
    expect(res.result).toEqual('Leaderboard score created correctly.');
  });


  it('Won\'t post the score to score API because score equals 0', async () => {
    axios.post.mockResolvedValue(
      {
        data:
      { message: 'You need to provide a valid score for the leaderboard' },
      },
    );
    const res = await sendScore('test', 0);
    expect(res.message).toEqual('You need to provide a valid score for the leaderboard');
  });
});
