import ApiLink from './ApiLink';
import axios from 'axios';

const ApiCall = {
  getAPICall,
  postApiCall,
  getDataFromServer,
};

async function getAPICall(args) {
  let returnVal = '';
  await axios({
    method: 'get',
    url: args.apiLink,
  })
    .then(response => {
      returnVal = response;
    })
    .catch(error => {
      returnVal = error.response;
    });
  return await returnVal;
}

async function postApiCall(args) {
  let returnVal = '';
  await axios({
    method: 'post',
    url: args.apiLink,
    data: args.data,
  })
    .then(response => {
      returnVal = response;
    })
    .catch(error => {
      returnVal = error.response;
    });
  return await returnVal;
}

async function getDataFromServer(args) {
  let returnVal = '';
  await axios({
    method: args.method,
    url: args.apiLink,
    data: args.data,
    headers: args.header,
  })
    .then(response => {
      returnVal = response;
    })
    .catch(error => {
      returnVal = error.response;
    });
  return await returnVal;
}

export default ApiCall;
