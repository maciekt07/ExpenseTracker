import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const n = useNavigate();
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          amount: amount,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add expense");
      }
      const result = await response.json();
      console.log(result);
      setText("");
      setAmount(0);
      n("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <button onClick={() => n("/")}>Home</button>
      <h1>Add</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
        defaultValue={0}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};
export default Add;
