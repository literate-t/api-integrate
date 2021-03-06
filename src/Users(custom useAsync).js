import React, { useState } from "react";
import axios from "axios";
import { useAsync } from "./useAsync";
import User from "./User";

const getUsers = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

export const Users = () => {
  const [state, refetch] = useAsync(getUsers, [], true);
  const [userId, setUserId] = useState(null);
  const { loading, data: users, error } = state;
  if (loading) return <div>로딩 중....</div>;
  if (error) return <div>에러 발생</div>;
  if (!users) return <button onClick={refetch}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 요청하기</button>
      {userId && <User id={userId} />}
    </>
  );
};
