import { useState } from "react";

function Add() {
  const [text, setText] = useState("");

  // const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(createExpense({ text }));
    setText("");
  };

  return (
    <div>
      <h2>Add</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="text" />
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Add;
