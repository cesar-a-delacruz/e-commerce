import { config } from "./config";

async function getRequest(path) {
  try {
    const params = {
      method: "GET",
    };

    const response = await fetch(config.baseURL + path, params);
    const data = await response.text();

    return { status: response.status, data };
  } catch (e) {
    console.error(`GET Request error (${path}) : `, e);
    return { status: 400, data: null };
  }
}

async function postRequest(path, body) {
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(config.baseURL + path, params);
    const data = await response.text();

    return { status: response.status, data };
  } catch (e) {
    console.log(`POST Request error (${path}) : `, e);
    return { status: 400, data: null };
  }
}

async function putRequest(path, body) {
  try {
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(config.baseURL + path, params);
    const data = await response.text();

    return { status: response.status, data };
  } catch (e) {
    console.log(`PUT Request error (${path}) : `, e);
    return { status: 400, data: null };
  }
}

async function deleteRequest(path) {
  try {
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(config.baseURL + path, params);
    const data = await response.text();

    return { status: response.status, data };
  } catch (e) {
    console.log(`DELETE Request error (${path}) : `, e);
    return { status: 400, data: null };
  }
}

export { getRequest, postRequest, putRequest, deleteRequest };
