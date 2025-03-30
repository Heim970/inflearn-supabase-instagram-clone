"use client";

import {
  selectedUserIdState,
  selectedUserIndexState,
} from "utils/recoil/atoms";
import Person from "./Person";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "actions/chatActions";

export default function ChatPeopleList({ loggedInUser }) {
  const [selectedUserId, setSelectedUserId] =
    useRecoilState(selectedUserIdState);
  const [selectedUserIndex, setSelectedUserIndex] = useRecoilState(
    selectedUserIndexState
  );

  // getAllUsers
  const getAllUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const allUsers = await getAllUsers();
      console.log(allUsers);
      return allUsers.filter((user) => user.id !== loggedInUser.id);
    },
  });

  return (
    <div className="h-screen min-w-60 flex flex-col bg-gray-50">
      {getAllUsersQuery.data?.map((user, index) => (
        <Person
          onClick={() => {
            setSelectedUserId(user.id);
            setSelectedUserIndex(index);
          }}
          index={index}
          isActive={selectedUserIndex === user.id}
          name={user.email.split("@")[0]}
          onChatScreen={false}
          onlineAt={new Date().toISOString()}
          userId={user.id}
        />
      ))}
    </div>
  );
}
