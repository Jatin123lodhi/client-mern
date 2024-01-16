import { useTheme } from "@emotion/react";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "screens/navbar";
import FriendListWidget from "screens/widgets/FriendListWidget";
import MyPostWidget from "screens/widgets/MyPostWidget";
import PostsWidget from "screens/widgets/PostsWidget";
import UserWidget from "screens/widgets/UserWidget";
// import CircularProgress from '@mui/material/CircularProgress';
const ProfilePage = () => {
  const loggedInUser = useSelector((state) => state.user);
  const [user, setUser] = useState(loggedInUser);
  // const {palette} = useTheme();
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const { _id: currentLoggedInUserId } = loggedInUser;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(
      `https://server-mern-5sfq.onrender.com/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    console.log(userId, currentLoggedInUserId);
    if (userId !== currentLoggedInUserId) getUser();
    else setUser(loggedInUser);
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  // currently no need of loader
  // if (!user)
  //   return (
  //     <Box
  //       display={"flex"}
  //       alignItems={"center"}
  //       justifyContent={"center"}
  //       height={"100%"}
  //       color={palette.primary.main}
  //       gap={2}
  //     >
  //       <Box>Loading...</Box> <CircularProgress size={"20px"}/>
  //     </Box>
  //   );

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={user} picturePath={user?.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {userId === currentLoggedInUserId && (
            <>
              <MyPostWidget picturePath={user?.picturePath} />
              <Box m="2rem 0" />
            </>
          )}

          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
