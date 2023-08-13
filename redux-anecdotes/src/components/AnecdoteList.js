import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { flashNotification } from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = anecdotes.filter((anecdote) => {
      filter = filter || "";
      return anecdote.content.includes(filter);
    });
    return filteredAnecdotes;
  });
  const dispatch = useDispatch();

  const voteHandler = (anecdote) => {
    dispatch(vote(anecdote));
  };
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={(e) => {
                dispatch(
                  flashNotification(`you voted for ${anecdote.content}`, 5)
                );
                voteHandler(anecdote);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
export default AnecdoteList;
