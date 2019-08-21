import axios from 'axios'

let base = 'http://120.77.176.55/api/';
export const postRequest = (url, data, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: data,
    params: params,
    transformRequest: [function (data) {
      data = JSON.stringify(data);
      return data
    }],
    headers: {
      'Content-Type': 'application/json',
      'token': sessionStorage.getItem("token"),
    }
  });
};
export const putRequest = (url, data, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: data,
    params: params,
    transformRequest: [function (data) {
      data = JSON.stringify(data);
      return data;
    }],
    headers: {
      'Content-Type': 'application/json',
      'token': sessionStorage.getItem("token"),
    }
  });
};
export const getRequest = (url,params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': sessionStorage.getItem("token"),
    }
  });
};
