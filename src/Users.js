import React, { useState } from "react";
import User from "./User(custom useAsync)";
import { getUsers, useUsersDispatch, useUsersState } from "./UsersContext";

export const Users = () => {
  const [userId, setUserId] = useState(null);

  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { loading, data: users, error } = state.users;

  const fetchData = () => {
    getUsers(dispatch);
  };

  if (loading) return <div>로딩 중....</div>;
  if (error) return <div>에러 발생</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 요청하기</button>
      {userId && <User id={userId} />}
    </>
  );
};
