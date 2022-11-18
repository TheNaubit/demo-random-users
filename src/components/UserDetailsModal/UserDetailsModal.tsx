import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Avatar,
  Box,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { IUser } from "types/user";
import React, { useCallback, useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import { useUsers } from "@hooks/usersContext";
import CloseIcon from "@mui/icons-material/Close";

interface IUserDetailsModal {
  isOpen: boolean;
  onClose?: () => void;
  user: IUser;
}

/**
 * It's a modal that displays a user's details and allows the user to edit them
 */
export function UserDetailsModal({ isOpen, onClose, user }: IUserDetailsModal) {
  const [isEditModeDisabled, setIsEditModeDisabled] = useState(true);
  const [userFirstName, setUserFirstName] = useState(user.name.first);
  const [userLastName, setUserLastName] = useState(user.name.last);
  const [userPhone, setUserPhone] = useState(user.phone);

  const { updateUser } = useUsers();

  const { enqueueSnackbar } = useSnackbar();

  /**
   * _handleOnClickClose() is a function that calls the onClose prop if it exists and it is a function.
   */
  function _handleOnClickClose() {
    if (typeof onClose === "function") onClose();
  }

  /**
   * _handleOnClickEdit() is a function that sets the state of isEditModeDisabled to false.
   */
  function _handleOnClickEdit() {
    setIsEditModeDisabled(false);
  }

  /**
   * _handleOnChangeUserFirstNameInput is a function that takes an event as an argument and sets the
   * userFirstName state to the value of the event target.
   * @param e - React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   */
  function _handleOnChangeUserFirstNameInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setUserFirstName(e.target.value);
  }

  /**
   * _handleOnChangeUserLastNameInput is a function that takes an event as an argument and sets the
   * userLastName state to the value of the event target
   * @param e - React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   */
  function _handleOnChangeUserLastNameInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setUserLastName(e.target.value);
  }

  /**
   * _handleOnChangeUserPhoneInput is a function that takes an event as an argument and sets the
   * userPhone state to the value of the event target.
   * @param e - React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   */
  function _handleOnChangeUserPhoneInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setUserPhone(e.target.value);
  }

  /** _handleOnClickSave is a function wrapped inside a useCallback hook (to memoize it so it can work without issues inside the actionButton memoized function)
   * and it handles saving the edited user fields into the users' context.
   */
  const _handleOnClickSave = useCallback(() => {
    setIsEditModeDisabled(true);

    if (
      userFirstName.trim() === "" ||
      userLastName.trim() === "" ||
      userPhone.trim() === ""
    ) {
      enqueueSnackbar("Fields can not be empty!", {
        variant: "error",
        preventDuplicate: true,
      });
    } else {
      const _updatedUser: IUser = {
        ...user,
        name: {
          title: user.name.title,
          first: userFirstName,
          last: userLastName,
        },
        phone: userPhone,
      };

      updateUser(user.email, _updatedUser);

      enqueueSnackbar("Changes saved!", {
        variant: "success",
        preventDuplicate: true,
      });
    }
  }, [
    enqueueSnackbar,
    updateUser,
    user,
    userFirstName,
    userLastName,
    userPhone,
  ]);

  const userFullName = useMemo(
    () => `${user.name.title} ${user.name.first} ${user.name.last}`,
    [user.name.first, user.name.last, user.name.title]
  );
  const userChar = useMemo(() => user.name.first.charAt(0), [user.name.first]);

  /* A memoized function that returns a button based on the state of isEditModeDisabled. */
  const actionButton = useMemo(() => {
    if (isEditModeDisabled) {
      return <Button onClick={_handleOnClickEdit}>Edit</Button>;
    } else {
      return <Button onClick={_handleOnClickSave}>Save</Button>;
    }
  }, [isEditModeDisabled, _handleOnClickSave]);

  return (
    <Dialog open={isOpen} onClose={_handleOnClickClose} maxWidth="lg">
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={_handleOnClickClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            my: 3,
            mx: 3,
            minWidth: 500,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "fit-content",
          }}
        >
          <Avatar
            alt={userFullName}
            src={user.picture.large}
            sx={{ width: 240, height: 240 }}
          >
            {userChar}
          </Avatar>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "fit-content",
              rowGap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                columnGap: 2,
              }}
            >
              <TextField
                disabled={isEditModeDisabled}
                onChange={_handleOnChangeUserFirstNameInput}
                size="small"
                label="First Name"
                value={userFirstName}
              />
              <TextField
                disabled={isEditModeDisabled}
                onChange={_handleOnChangeUserLastNameInput}
                size="small"
                label="Last Name"
                value={userLastName}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                columnGap: 2,
                width: "100%",
              }}
            >
              <TextField
                disabled={isEditModeDisabled}
                onChange={_handleOnChangeUserPhoneInput}
                size="small"
                label="Phone"
                value={userPhone}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>{actionButton}</DialogActions>
    </Dialog>
  );
}
