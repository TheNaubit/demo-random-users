import { OLMap } from "@components/OLMap";
import { useMapUserPoints, useMapZoom } from "@hooks/mapContext";
import { Grid } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRandomUsers } from "@api";
import { useUsers } from "@hooks/usersContext";

import { UserCard } from "@components/UserCard";
import { useSnackbar } from "notistack";
import { grey } from "@mui/material/colors";

/** HomePage is a function that returns the Home page of this SPA.
 * @returns A React component.
 */
export function HomePage() {
  const { setUserPoints: setMapUserPoints } = useMapUserPoints();
  const { setZoom: setMapZoom } = useMapZoom();

  const { enqueueSnackbar } = useSnackbar();

  const { users, setUsers, setUserSelected, selectedUsers, deleteUser } =
    useUsers();

  /* Using the `useQuery` hook to fetch a random users' list from the API. */
  const { data: queriedRandomUsers, isError: isErrorQueryingRandomUsers } =
    useQuery({
      queryKey: ["random-users-query"],
      queryFn: () => getRandomUsers({ results: 50 }),
    });

  /* This effect will update the users state when the value of the API query for a random
   * list of users is returned. */
  useEffect(() => {
    if (
      queriedRandomUsers &&
      queriedRandomUsers.results.length > 0 &&
      users.length < 1
    ) {
      setUsers(queriedRandomUsers.results);
    }
  }, [queriedRandomUsers, setUsers, users]);

  /* This effect will update the map points representing the users' locations
   * when the users array is updated. */
  useEffect(() => {
    setMapUserPoints(
      users.map((user) => ({
        isSelected: user.isSelected,
        position: [
          parseFloat(user.location.coordinates.longitude),
          parseFloat(user.location.coordinates.latitude),
        ],
        refUser: user.id.value,
      }))
    );
  }, [setMapUserPoints, users]);

  useEffect(() => {
    if (isErrorQueryingRandomUsers) {
      enqueueSnackbar(
        "We had some issue loading the users, please try again later!",
        {
          variant: "error",
          preventDuplicate: true,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorQueryingRandomUsers]);

  /* A memoized version of the user cards. */
  const userCards = useMemo(
    () =>
      users.map((user, index) => (
        <UserCard
          key={`user-${index}`}
          user={user}
          onClickDeleteButton={() => deleteUser(user.email)}
        />
      )),
    [deleteUser, users]
  );

  /**
   * This function handles the event of the user's mouse entering the grid item with user cards.
   * When triggered, if there is any user selected, we remove the selection and reset the map zoom.
   */
  function _handleOnMouseEnterCardGrid() {
    if (selectedUsers.length > 0) {
      setUserSelected(null);
      setMapZoom(1);
    }
  }

  /**
   * This function handles the event of the user's mouse leaving the grid item with user cards.
   * When triggered, if there is any user selected,we remove the selection and reset the map zoom.
   */
  function _handleOnMouseLeaveCardGrid() {
    if (selectedUsers.length > 0) {
      setUserSelected(null);
      setMapZoom(1);
    }
  }

  return (
    <Grid container spacing={0} width="100vw" height="100%">
      <Grid
        item
        bgcolor={grey[100]}
        xs
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        overflow="auto"
        maxHeight="100vh"
        alignContent="flex-start"
        justifyContent="center"
        columnGap="20px"
        rowGap="20px"
        paddingY="20px"
        onMouseEnter={_handleOnMouseEnterCardGrid}
        onMouseLeave={_handleOnMouseLeaveCardGrid}
      >
        {userCards}
      </Grid>
      <Grid item bgcolor={grey[100]} xs overflow="hidden" height="100vh">
        <OLMap />
      </Grid>
    </Grid>
  );
}
