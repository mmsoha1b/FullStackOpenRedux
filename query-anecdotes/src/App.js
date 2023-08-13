import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getAll, updateAnecdote } from "./requests";
import { useNotifictaionDispatch } from "./context/notificationContext";

const App = () => {
  const notificationDispatch = useNotifictaionDispatch();
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });
  const handleVote = (anecdote) => {
    notificationDispatch({
      type: "CHANGE_VALUE",
      payload: `you voted for  ${anecdote.content}`,
    });
    notificationDispatch({
      type: "DISPLAY",
    });
    setTimeout(() => {
      notificationDispatch({
        type: "HIDE",
      });
    }, 5000);
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    console.log("vote");
  };
  const result = useQuery("anecdotes", getAll, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (result.isLoading) {
    return <div> Is loading ...</div>;
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
