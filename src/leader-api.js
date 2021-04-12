import axios from 'axios';

const sendScore = async(playername, playerscore) => {

  const submit = {
    user: playername,
    score: playerscore
  };

  const post = JSON.stringify(submit);
  const address = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/xTVFvAfVG5VCFv4QzqQf/scores/';

  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: post,
  };
  const response = await fetch(address, settings);
  const answer = await response.json();
  return answer; 
};


const getScore = async () => {
  const address = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/xTVFvAfVG5VCFv4QzqQf/scores/';
  const settings = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(address, settings);
  const answer = await response.json();

  return sorting(answer.result);
};
  
const sorting = (obj) => {
  const array = [];
  for (let i = 0; i < obj.length; i += 1) {
    array.push([obj[i].score, obj[i].user]);
  }
  return Array.from(array).sort((a, b) => b[0] - a[0]);
};

  

export {sendScore, getScore};