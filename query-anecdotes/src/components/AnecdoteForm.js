import { createNew } from "../requests";
import { useQueryClient, useMutation } from "react-query";
import { useNotifictaionDispatch } from "../context/notificationContext";
const AnecdoteForm = () => {
  const notificationDispatch = useNotifictaionDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
    onError: (e) => {
      notificationDispatch({
        type: "CHANGE_VALUE",
        payload: `too short anecodite must have length 5 or more `,
      });
      notificationDispatch({
        type: "DISPLAY",
      });
      setTimeout(() => {
        notificationDispatch({
          type: "HIDE",
        });
      }, 5000);
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
    notificationDispatch({
      type: "CHANGE_VALUE",
      payload: `you created   ${content}`,
    });
    notificationDispatch({
      type: "DISPLAY",
    });
    setTimeout(() => {
      notificationDispatch({
        type: "HIDE",
      });
    }, 5000);
  };
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
