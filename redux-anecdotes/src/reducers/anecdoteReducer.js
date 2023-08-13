import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";
const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};
const initialState = anecdotesAtStart.map(asObject);
const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    newAnecdote: (state, action) => {
      state.push(action.payload);
      state = sortByVotes(state);
      return state;
    },
    voteAnecdote(state, action) {
      const anecdote = state.find((anecdote) => {
        return anecdote.id === action.payload;
      });
      anecdote.votes = anecdote.votes + 1;
      state = sortByVotes(state);
    },
    setAnecodtes: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const initializeAnecodotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecodtes(anecdotes));
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.createNew(anecdote);
    dispatch(newAnecdote(anecdote));
  };
};
export const vote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.increaseVote(anecdote);
    dispatch(voteAnecdote(anecdote.id));
  };
};
const sortByVotes = (arr) => {
  arr.sort((a, b) => {
    return b.votes > a.votes;
  });
};
export const { voteAnecdote, setAnecodtes, newAnecdote } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
