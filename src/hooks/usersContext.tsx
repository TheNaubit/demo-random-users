import { useContext } from "react";
import { useLogger } from "@hooks/logger";
import { UsersContext } from "@contexts/UsersContext";

/**
 * It returns an object with the users, setUsers, updateUser, deleteUser, setUserSelected, and
 * selectedUsers functions
 * @returns An object with the following properties:
 *   users: context.users,
 *   setUsers: context.setUsers,
 *   updateUser: context.updateUser,
 *   deleteUser: context.deleteUser,
 *   setUserSelected: context.setUserSelected,
 *   selectedUsers: context.selectedUsers,
 */
export function useUsers() {
  const { error } = useLogger({ tag: "useUsers" });

  const context = useContext(UsersContext);

  if (!context) {
    const _err = new Error("useUsers must be used within UsersProvider");
    error(_err);
    throw _err;
  }

  return {
    users: context.users,
    setUsers: context.setUsers,
    updateUser: context.updateUser,
    deleteUser: context.deleteUser,
    setUserSelected: context.setUserSelected,
    selectedUsers: context.selectedUsers,
  };
}
