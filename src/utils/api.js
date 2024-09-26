import { config } from "./config";
import { getToken } from "./localstorage";

const getRequest = async (path) => {
  console.log("   getRequest()")

  const params = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include' // This ensures that cookies are included in the request
  };
  try {
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();

    console.log(data);
    return { statusCode: res.status, data };
  } catch (error) {
    console.log(`error in post Request (${path}) :- `, error);
    if (error.response && error.response.status === 401) {
      // Refresh token if unauthorized
      try {
          await fetch(config.baseURL + '/api/auth/refresh-token');
          const retryResponse = await fetch(config.baseURL + path, params);
          const data = await retryResponse.json();
          return { statusCode: retryResponse.status, data };
      } catch (refreshError) {
      }
    } else {
          console.error(error);
          return { statusCode: 400, data: [] };
    }
  }
};

const postRequest = async (path, body) => {
  console.log("     postRequest()....");
  console.log(path);
  console.log(body);
  console.log('-----------------------------')
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
    const data = await res.json();

    console.log(config.baseURL + path);
    console.log(res.status);
    console.log(data);
    console.log("     postRequest() ran successfully...")

    return { statusCode: res.status, data };
  } catch (error) {
    console.log(`error in post Request (${path}) :- `, error);

    if (error.response && error.response.status === 401) {
      // Refresh token if unauthorized
      try {
          await fetch(config.baseURL + '/api/auth/refresh-token');
          const retryResponse = await fetch(config.baseURL + path, params);
          const data = await retryResponse.json();
          return { statusCode: retryResponse.status, data };
      } catch (refreshError) {
      }
    } else {
          console.error(error);
          return { statusCode: 400, data: [] };
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

    if (res.status === 204) {
      return { statusCode: res.status, data: null };
    }

    const data = await res.json();
    return { statusCode: res.status, data };
    
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Refresh token if unauthorized
      try {
          await fetch(config.baseURL + '/api/auth/refresh-token');
          const retryResponse = await fetch(config.baseURL + path, params);
          const data = await retryResponse.json();
          alert('deleteRequest successfully after token refresh');
          return { statusCode: retryResponse.status, data };
      } catch (refreshError) {
          console.error(refreshError);
          alert('deleteRequest failed after token refresh');
      }
    } else {
          console.error(error);
          alert('deleteRequest failed');
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
    const data = await res.json();
    return { statusCode: res.status, data };
  } catch (error) {
      console.log(`error in post Request (${path}) :- `, error);
      if (error.response && error.response.status === 401) {
        // Refresh token if unauthorized
        try {
            await fetch(config.baseURL + '/api/auth/refresh-token');
            const retryResponse = await fetch(config.baseURL + path, params);
            const data = await retryResponse.json();
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
    const data = await res.json();
    return { statusCode: res.status, data };
  } catch (error) {
    console.log(`error in post Request (${path}) :- `, error);
    if (error.response && error.response.status === 401) {
      // Refresh token if unauthorized
      try {
          await fetch(config.baseURL + '/api/auth/refresh-token');
          const retryResponse = await fetch(config.baseURL + path, params);
          const data = await retryResponse.json();
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
  