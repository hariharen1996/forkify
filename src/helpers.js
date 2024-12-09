import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";

const timeout = (sec) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(`Request took too long! Timeout after ${sec} second`);
    }, sec * 1000);
  });
};

export const getJSON = async (url) => {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} ${response.status}`);

    return data;
  } catch (err) {
    //console.log(err)
    throw err;
  }
};
