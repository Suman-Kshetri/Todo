import { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  Id: number;
  username: string;
  password: string;
}

function App() {
  // Type the state properly
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get('/api/signin') // Make sure the endpoint is correct
      .then((res) => {
        setUsers(res.data); // Update state with the response data
      })
      .catch((err) => {
        console.log(err); // Handle error
      });
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <>
      <h1>Users: </h1>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.Id}>
            <h2>{user.username}</h2>
            <p>{user.password}</p>
          </div>
        ))
      ) : (
        <p>No users found.</p> // Optional: Display a message if no users are available
      )}
    </>
  );
}

export default App;
