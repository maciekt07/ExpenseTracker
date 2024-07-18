import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

type Expense = {
  _id: string;
  text: string;
  amount: number;
};

export const Home = () => {
  const n = useNavigate();
  const [data, setData] = useState<Expense[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/expenses");
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/expenses/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete expense");
      }
      setData(data.filter((item: Expense) => item._id !== id));
    } catch (error) {
      alert(error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/expenses/${id}`, {
        method: "PUT",
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
        throw new Error(errorData.message || "Failed to edit expense");
      }
      const updatedExpense = await response.json();
      setData(data.map((item) => (item._id === id ? updatedExpense : item)));
      setText("");
      setAmount(0);
      setIsEditing(null);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container">
      <button className="add-button" onClick={() => n("/add")}>
        Add
      </button>
      <div className="expenses-list">
        {data.map((item: Expense) => (
          <div key={item._id} className="expense-item">
            {isEditing === item._id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="input-text"
                />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="input-number"
                />
              </div>
            ) : (
              <p className="expense-text">
                {item.text}, ${item.amount.toFixed(2)}
              </p>
            )}
            <div className="buttons">
              <button
                className="delete-button"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
              <button
                className="edit-button"
                onClick={() => {
                  if (isEditing === item._id) {
                    handleEdit(item._id);
                  } else {
                    setText(item.text);
                    setAmount(item.amount);
                    setIsEditing(item._id);
                  }
                }}
              >
                {isEditing === item._id ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
