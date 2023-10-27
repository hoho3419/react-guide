import React, {useState} from 'react';
import AddUsers from './componets/Users/AddUsers';
import UserList from './componets/Users/UserList';
function App() {
  const [usersList, setUsersList] = useState([])

  const addUserHandler = (uName,uAge) =>{
    setUsersList((prevUsersList) => {
      return [...prevUsersList, {name:uName,age: uAge,id:Math.random().toString()}]
    })
  }
  console.log(Math.random())
  return (
    <>
      <AddUsers onAddUser={addUserHandler} />
      <UserList users={usersList} />
    </>
  );
}

export default App;
