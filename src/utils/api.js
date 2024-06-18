import { config } from "./config";
import { getToken } from "./localstorage";

const getRequest = async (path) => {
  try {
    const params = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
    console.log('   getRequest() called....')
    console.log(getToken())
    console.log(config.baseURL + path)
    console.log("----------------------------")

    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log(data);
    return { statusCode: res.status, data };
  } catch (e) {
    console.error(`error in get Request (${path}) :- `, e);
    return { statusCode: 400, data: [
    ] };
  }
};

const postRequest = async (path, body) => {
  console.log('   postRequest() called....')
  console.log(body)
  console.log(getToken())
  console.log(config.baseURL + path)
  console.log(JSON.stringify(body))
  console.log("----------------------------")
  try {
    console.log(" try()")
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(config.baseURL + path, params);
    console.log(res)
    const data = await res.text();
    console.log('wtf')
    return { statusCode: res.status, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};

const deleteRequest = async (path, body) => {
  console.log('   deleteRequest() called....')
  console.log(body)
  try {
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.text();
    
    console.log(data)

    return { statusCode: res.status, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};


const putRequest = async (path, body) => {
  console.log('   putRequest() called....')
  console.log(body)
  try {
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};

export const api = {
    getRequest,
    postRequest,
    deleteRequest,
    putRequest
};
  