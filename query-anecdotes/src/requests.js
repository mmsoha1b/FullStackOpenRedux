import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";
export const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};
export const createNew = (newNote) => {
  return axios.post(baseUrl, newNote).then((res) => res.data);
};
export const updateAnecdote = (updatedAnecdote) => {
  return axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
};
