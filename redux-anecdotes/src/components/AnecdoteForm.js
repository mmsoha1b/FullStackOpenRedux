import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

import { flashNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h2>create new</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          dispatch(
            flashNotification(`You created ${e.target.content.value}`, 5)
          );
          const anecdote = {
            content: e.target.content.value,
            votes: 0,
          };
          return dispatch(createAnecdote(anecdote));
        }}
      >
        <div>
          <input name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
