import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IUser } from "types/user";
import { useMapCenter, useMapZoom } from "@hooks/mapContext";
import { useUsers } from "@hooks/usersContext";
import { useEffect, useMemo, useState } from "react";
import { AlertDialog } from "@components/AlertDialog";
import { UserDetailsModal } from "@components/UserDetailsModal";

interface IUserCard {
  user: IUser;
  onClickEditButton?: (user: IUser) => void;
  onClickDeleteButton?: (user: IUser) => void;
}

/**
 * It's a function that returns a card that displays a user's information and has buttons that allow
 * you to edit and delete the user
 * @param {IUserCard}  - IUserCard
 * @returns A card component that displays a user's information.
 */
export function UserCard({
  user,
  onClickEditButton,
  onClickDeleteButton,
}: IUserCard) {
  const { setZoom: setMapZoom } = useMapZoom();
  const { setCenter: setMapCenter } = useMapCenter();
  const { setUserSelected, selectedUsers } = useUsers();

  const [isOpenDeleteAlert, setStateDeleteAlert] = useState(false);
  const [isOpenUserDetailsModal, setStateUserDetailsModal] = useState(false);
  const [isEnteringCard, setIsEnteringCard] = useState(false);
  const [isLeavingCard, setIsLeavingCard] = useState(false);

  /**
   * _handleOnClickEditButton() is a function that calls the onClickEditButton() function that was
   * passed in as a prop to the UserDetailsModal component (if it exists), and then sets the state of the
   * UserDetailsModal component to true
   */
  function _handleOnClickEditButton() {
    if (typeof onClickEditButton === "function") onClickEditButton(user);
    setStateUserDetailsModal(true);
  }

  /**
   * _handleOnClickDeleteButton() is a function that sets the state of the delete alert to true
   */
  function _handleOnClickDeleteButton() {
    setStateDeleteAlert(true);
  }

  /**
   * _handleOnClickCancelDeleteAlert() is a function that sets the state of the delete alert to false
   * and calls the _handleOnMouseLeave() function
   */
  function _handleOnClickCancelDeleteAlert() {
    setStateDeleteAlert(false);
    _handleOnMouseLeave();
  }

  /**
   * _handleOnClickContinueDeleteAlert() is a function that calls _handleOnClickCancelDeleteAlert()
   * and then calls onClickDeleteButton() if it's a function
   */
  function _handleOnClickContinueDeleteAlert() {
    _handleOnClickCancelDeleteAlert();
    if (typeof onClickDeleteButton === "function") onClickDeleteButton(user);
  }

  /**
   * _handleOnClickCloseUserDetailsModal() is a function that sets the state of the user details
   * modal to false
   */
  function _handleOnClickCloseUserDetailsModal() {
    setStateUserDetailsModal(false);
  }

  /**
   * _handleOnMouseEnter() is a function that sets the state of isEnteringCard to true
   */
  function _handleOnMouseEnter() {
    setIsEnteringCard(true);
  }

  /**
   * _handleOnMouseLeave() is a function that sets the state of isLeavingCard to true
   */
  function _handleOnMouseLeave() {
    setIsLeavingCard(true);
  }

  /* This is a useEffect hook that is used to set the map center and zoom when a user card is hovered
    over. */
  useEffect(() => {
    let onEnterTimeout: NodeJS.Timeout | null;

    if (isEnteringCard === false) return;
    onEnterTimeout = setTimeout(() => {
      if (selectedUsers.some((_user) => _user.email === user.email) === false) {
        setUserSelected(user.email);
        setMapCenter([
          parseFloat(user.location.coordinates.longitude),
          parseFloat(user.location.coordinates.latitude),
        ]);
        setMapZoom(3);
      }

      setIsEnteringCard(false);
    }, 600);

    return () => {
      if (onEnterTimeout) clearTimeout(onEnterTimeout);
    };
  }, [
    selectedUsers,
    isEnteringCard,
    user.email,
    user.location.coordinates.longitude,
    user.location.coordinates.latitude,
    setUserSelected,
    setMapCenter,
    setMapZoom,
  ]);

  /* This is a useEffect hook that is used to set the map center and zoom when a user card is hovered
    over. */
  useEffect(() => {
    let onLeaveTimeout: NodeJS.Timeout | null;

    if (user.isSelected || isLeavingCard === false) return;
    onLeaveTimeout = setTimeout(() => {
      if (selectedUsers.some((_user) => _user.email === user.email)) {
        setUserSelected(null);
        setMapZoom(1);
      }
      setIsLeavingCard(false);
    }, 100);

    return () => {
      if (onLeaveTimeout) clearTimeout(onLeaveTimeout);
    };
  }, [
    isLeavingCard,
    selectedUsers,
    setMapZoom,
    setUserSelected,
    user.email,
    user.isSelected,
  ]);

  const cardOpacity = useMemo(
    () => (selectedUsers.length > 0 && user.isSelected === false ? 0.4 : 1),
    [selectedUsers.length, user.isSelected]
  );
  const userFullName = useMemo(
    () => `${user.name.first} ${user.name.last}`,
    [user.name.first, user.name.last]
  );
  const userAddress = useMemo(
    () =>
      `${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}`,
    [
      user.location.city,
      user.location.postcode,
      user.location.state,
      user.location.street.name,
      user.location.street.number,
    ]
  );

  return (
    <>
      <Card
        sx={{
          width: 345,
          borderRadius: 4,
          cursor: "pointer",
          opacity: cardOpacity,
          transition: "opacity .2s ease-in-out",
          "&:hover": {
            opacity: 1,
            "& .actionBar": {
              opacity: 1,
            },
          },
        }}
        onMouseEnter={_handleOnMouseEnter}
        onMouseLeave={_handleOnMouseLeave}
      >
        <CardMedia
          component="img"
          height="194"
          image={user.picture.large}
          alt={userFullName}
        />
        <CardContent>
          <Typography variant="h6" component="p">
            {userFullName}
          </Typography>
          <Typography variant="body1" component="p">
            {userAddress}
          </Typography>
        </CardContent>
        <CardActions
          className="actionBar"
          disableSpacing
          sx={{
            opacity: 0,
            transition: "opacity .2s ease-in-out",
          }}
        >
          <IconButton
            aria-label="view and edit user"
            onClick={_handleOnClickEditButton}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete user"
            onClick={_handleOnClickDeleteButton}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <AlertDialog
        text="Are you sure you want to delete this user? This action can not be
                        undone!"
        isOpen={isOpenDeleteAlert}
        onCancel={_handleOnClickCancelDeleteAlert}
        onContinue={_handleOnClickContinueDeleteAlert}
      />
      {isOpenUserDetailsModal && (
        <UserDetailsModal
          isOpen={isOpenUserDetailsModal}
          user={user}
          onClose={_handleOnClickCloseUserDetailsModal}
        />
      )}
    </>
  );
}
