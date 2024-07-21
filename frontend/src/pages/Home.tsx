import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/strore";
import { useEffect } from "react";

function Home() {
  const n = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      n("/login");
    }
  }, [user, n]);

  return (
    <div>
      <h3>Hello {user && user.name}</h3>
      <p>Welcome to your dashboard</p>
    </div>
  );
}

export default Home;
