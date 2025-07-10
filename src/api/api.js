import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/vibes",
});

export const fetchVibes = (city, category) =>
  API.get(`/?city=${city}&category=${category}`);

export const fetchSummary = (placeId, customPrompt) =>
  API.get(`/summary?placeId=${placeId}&customPrompt=${customPrompt}`);
