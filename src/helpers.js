import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";

const timeout = (sec) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(`Request took too long! Timeout after ${sec} second`);
    }, sec * 1000);
  });
};


export const AJAX = async (url,uploadData = undefined) => {
  try {
    const fetchPromise = uploadData ? fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    })
    : fetch(url)

    const response = await Promise.race([fetchPromise,timeout(TIMEOUT_SEC)])
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} ${response.status}`);

    return data;
  } catch (err) {
    //console.log(err)
    throw err;
  }
}

