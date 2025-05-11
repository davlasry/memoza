import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    fetch("http://localhost:4000/api/github/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <div>Dashboard</div>;
}

export default Dashboard;
