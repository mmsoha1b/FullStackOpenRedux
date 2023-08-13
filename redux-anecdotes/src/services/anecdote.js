import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const anecodtes = await axios.get(baseUrl);
  return anecodtes.data;
};
const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

export const increaseVote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  return response.data;
};

const anecdoteService = { getAll, createNew, increaseVote };
export default anecdoteService;
