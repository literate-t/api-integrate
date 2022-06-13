import React, { useState } from "react";
import axios from "axios";
import { useAsync } from "react-async";
import User from "./User";

const getUsers = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

export const Users = () => {
  const [userId, setUserId] = useState(null);

  // useAsync 라이브러리를 사용하면
  // 개발 모드에서는 제대로 동작을 안 함
  // build를 하고 실행해야 제대로 동작함
  // 아직 이유를 모름
  const {
    data: users,
    error,
    isLoading,
    reload,
    run,
  } = useAsync({
    deferFn: getUsers,
  });

  if (isLoading) return <div>로딩 중....</div>;
  if (error) return <div>에러 발생</div>;
  if (!users) return <button onClick={run}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={reload}>다시 요청하기</button>
      {userId && <User id={userId} />}
    </>
  );
};
