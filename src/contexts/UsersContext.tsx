import { INITIAL_USERS_STATE } from "@constants";
import { IUsersState } from "@types";
import { useState } from "react";
import { createContext } from "react";
import { IUser } from "types/user";

export const UsersContext = createContext<IUsersState>(INITIAL_USERS_STATE);

/**
 * It's a React component that provides a Users context to its children
 * @param  - `children`: The children of the component.
 */
export function UsersProvider({ children }: { children: JSX.Element }) {
  const [users, _setUsers] = useState<Array<IUser>>([]);
  const [selectedUsers, _setSelectedUsers] = useState<Array<IUser>>([]);

  /**
   * It sets the users. Probably you are wondering why not calling directly _setUsers.
   * I like to wrap those setters "most of the time" in case I want to do later some extra
   * action (like printing a console.log with the param)
   * @param newUsers - Array<IUser>
   */
  function setUsers(newUsers: Array<IUser>) {
    _setUsers(newUsers);
  }

  /**
   * We iterate every user and if the current user's email matches the userEmail argument,
   * then we set the newValue to that user data, otherwise
   * we keep the user data as it was.
   * @param {string} userEmail - string - the email of the user we want to update
   * @param {IUser} newValue - IUser - this is the new value that we want to update the matching user(s) with.
   */
  function updateUser(userEmail: string, newValue: IUser) {
    const _newUsersArr = users.map((user) =>
      user.email === userEmail ? newValue : user
    );
    setUsers(_newUsersArr);
  }

  /**
   * It takes a userEmail as a parameter, and then loops through the users array, and if the
   * userEmail matches the user's email, it sets the user's isSelected property to true, and pushes
   * the user to the selectedUsers array
   * @param {string | null} userEmail - string | null
   */
  function setUserSelected(userEmail: string | null) {
    const _newSelectedUsers: Array<IUser> = [];

    const _newUsersArr = users.map((user) => {
      const _isSelected = userEmail !== null && user.email === userEmail;

      let _returnedUser: IUser;

      if (_isSelected) {
        _returnedUser = {
          ...user,
          isSelected: true,
        };
        _newSelectedUsers.push(_returnedUser);
      } else {
        _returnedUser = {
          ...user,
          isSelected: false,
        };
      }

      return _returnedUser;
    });
    setUsers(_newUsersArr);
    _setSelectedUsers(_newSelectedUsers);
  }

  /**
   * We filter the users' array removing every item whose email matches the given userEmail.
   * After that, we set the users' array value as this new filtered array.
   * @param {string} userEmail - string - this is the email for matching the items to delete.
   */
  function deleteUser(userEmail: string) {
    const _newUsersArr = users.filter((user) => user.email !== userEmail);
    setUsers(_newUsersArr);
  }

  const _value: IUsersState = {
    users,
    setUsers,
    updateUser,
    deleteUser,
    setUserSelected,
    selectedUsers,
  };

  return (
    <UsersContext.Provider value={_value}>{children}</UsersContext.Provider>
  );
}
