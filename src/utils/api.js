import { config } from "./config";
import { getToken } from "./localstorage";

const getRequest = async (path) => {
  
  const params = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include' // This ensures that cookies are included in the request
  };

  try {
    const res = await fetch(config.baseURL + path, params);
    console.log(res.status);
    const data = await res.json();
    return { statusCode: res.status, data };

  } catch (e) {
    console.error(`error in get Request (${path}) :- `, e);
    return { statusCode: 400, data: [] };
  }
};

const postRequest = async (path, body) => {

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: 'include' // This ensures that cookies are included in the request
  };

  try {
    const res = await fetch(config.baseURL + path, params);
    const data = await res.text();

    return { statusCode: res.status, data };
  } catch (error) {
    console.log(`error in post Request (${path}) :- `, error);
    if (error.response && error.response.status === 401) {
      // Refresh token if unauthorized
      try {
          await fetch(config.baseURL + '/api/auth/refresh-token');
          const retryResponse = await fetch(config.baseURL + path, params);
          const data = await retryResponse.text();
          return { statusCode: retryResponse.status, data };
      } catch (refreshError) {
      }
    } else {
          console.error(error);
    }
  }

};

const deleteRequest = async (path, body) => {
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: 'include' // This ensures that cookies are included in the request
  };
  try {
    const res = await fetch(config.baseURL + path, params);
    const data = await res.text();
    return { statusCode: res.status, data };
    
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Refresh token if unauthorized
      try {
          await fetch(config.baseURL + '/api/auth/refresh-token');
          const retryResponse = await fetch(config.baseURL + path, params);
          const data = await retryResponse.text();
          alert('Product posted successfully after token refresh');
          return { statusCode: retryResponse.status, data };
      } catch (refreshError) {
          console.error(refreshError);
          alert('Posting product failed after token refresh');
      }
    } else {
          console.error(error);
          alert('Posting product failed');
    }
  }
};

const patchRequest = async (path, body) => {
  console.log("   patchRequest()")
  
  const params = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: 'include' // This ensures that cookies are included in the request
  };

  try {
    const res = await fetch(config.baseURL + path, params);
    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (error) {
      console.log(`error in post Request (${path}) :- `, error);
      if (error.response && error.response.status === 401) {
        // Refresh token if unauthorized
        try {
            await fetch(config.baseURL + '/api/auth/refresh-token');
            const retryResponse = await fetch(config.baseURL + path, params);
            const data = await retryResponse.text();
            alert('Product posted successfully after token refresh');
            return { statusCode: retryResponse.status, data };
        } catch (refreshError) {
            console.error(refreshError);
            alert('Posting product failed after token refresh');
        }
      } else {
            console.error(error);
            alert('Posting product failed');
      }
  }
};

const putRequest = async (path, body) => {
  console.log('   putRequest() called....')
  console.log(body)
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(body),
  };
  try {
    const res = await fetch(config.baseURL + path, params);
    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (error) {
    console.log(`error in post Request (${path}) :- `, error);
    if (error.response && error.response.status === 401) {
      // Refresh token if unauthorized
      try {
          await fetch(config.baseURL + '/api/auth/refresh-token');
          const retryResponse = await fetch(config.baseURL + path, params);
          const data = await retryResponse.text();
          alert('Product posted successfully after token refresh');
          return { statusCode: retryResponse.status, data };
      } catch (refreshError) {
          console.error(refreshError);
          alert('Posting product failed after token refresh');
      }
    } else {
          console.error(error);
          alert('Posting product failed');
    }
  }
};

export const api = {
    getRequest,
    postRequest,
    deleteRequest,
    putRequest,
    patchRequest
};
  