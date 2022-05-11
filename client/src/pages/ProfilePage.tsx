import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// Pages
import NotFoundPage from "./NotFoundPage";
//Components
import Column from "../components/Column";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import Loading from "../components/Loading";
import ProfilePicture from "../components/ProfilePicture";
// Utils
import { fecthUserData } from "../utils/api";
import {
  sendFriendRequestAndUpdate,
  cancelFriendRequestAndUpdate,
  removeFriendAndUpdate,
} from "../utils/user";

const ProfilePage = () => {
  /**
   * Navigate method
   * @description Creating a navigate method, so we can navigate through the app
   */
  const navigate = useNavigate();

  /**
   * Username
   * @description Getting the username query param
   */
  const { username } = useParams();

  /**
   * Logged user
   * @description Getting the logged user from the redux store
   */
  const loggedUser = useSelector((state: any) => state.user.user);

  /**
   * Friend Requests State
   * @description Getting the friend requests state from the redux store
   */
  const friendRequests = useSelector(
    (state: any) => state.friendRequests.friendRequests
  );

  /**
   * Loading state
   * @description Creating a useState variable, so we can toggle the loading state of the page
   */
  const [loading, setLoading]: any = useState(false);

  /**
   * Processing state
   * @description Creating a useState variable, so we can trigger the loading animation on the buttons
   */
  const [processing, setProcessing] = useState(false);

  /**
   * User state
   * @description Creating a useState variable, so we can toggle the user, if the wanted username is the same as the logged user's username, then we set the user to be the logged user
   */
  const [user, setUser]: any = useState({});

  /**
   * Personal profile state
   * @description Creating a useState variable, so we can toggle between a personal profile page and a non personal page
   */
  const [personalProfile, setPersonalProfile] = useState(false);

  /**
   * UseEffect hook
   * @description Creating a useEffect hook
   */
  useEffect(() => {
    const effect = async () => {
      // Setting the loading state to true
      setLoading(true);
      // Checking to see if the logged user's username is the same as the wanted username
      if (loggedUser.username === username) {
        // Setting the user to the logged user from the store
        setUser(loggedUser);
        // Setting the personal profile state to true, because the wanted user is the logged user
        setPersonalProfile(true);
      } else {
        // Fetch the wanted user from the backend
        const response = await fecthUserData(username);
        // Set the user state to the fetched user
        setUser(response.data.user);
        // Setting the personal profile state to false, because the wanted user is not the logged user
        setPersonalProfile(false);
      }
      // Setting the loading state to false
      setLoading(false);
    };

    effect();
  }, [loggedUser, username]);

  return (
    <>
      {!loading ? (
        <>
          {user ? (
            <>
              <Column>
                <div className="flex flex-col w-full">
                  <div className={`w-[100px]`}>
                    <ProfilePicture user={user} size="xl" />
                  </div>
                  <h1 className="mt-3">{user ? user.fullname : ""}</h1>
                  <h3 className="text-lg text-slate-600 dark:text-slate-300">
                    @{user.username ? user.username : ""}
                  </h3>
                  <span className="text-lg text-slate-500 dark:text-slate-200">
                    {user.email ? user.email.toLowerCase() : ""}
                  </span>
                  <div className="flex mt-2">
                    <span className="flex mr-5">
                      Friends:
                      <h3 className="ml-2">
                        {user.friends ? user.friends.length : 0}
                      </h3>
                    </span>
                  </div>
                  <div className="mt-5 flex gap-5 items-center">
                    {personalProfile ? (
                      <>
                        <div className="w-[150px]">
                          <SecondaryButton
                            click={() => {
                              navigate("/app/settings/account");
                            }}
                          >
                            Edit Profile
                          </SecondaryButton>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-[150px]">
                          {loggedUser.friends ? (
                            loggedUser.friends.includes(user._id) ? (
                              <SecondaryButton
                                click={async () => {
                                  setProcessing(true);
                                  await removeFriendAndUpdate(user._id);
                                  setProcessing(false);
                                }}
                                loading={processing}
                              >
                                Friends
                              </SecondaryButton>
                            ) : (
                              <>
                                {friendRequests.sent &&
                                friendRequests.sent.some(
                                  ({ to }: any) => to === user._id
                                ) ? (
                                  <PrimaryButton
                                    click={async () => {
                                      setProcessing(true);
                                      await cancelFriendRequestAndUpdate(
                                        user._id
                                      );
                                      setProcessing(false);
                                    }}
                                    loading={processing}
                                  >
                                    Cancel Request
                                  </PrimaryButton>
                                ) : (
                                  <PrimaryButton
                                    click={async () => {
                                      setProcessing(true);
                                      await sendFriendRequestAndUpdate(
                                        user._id
                                      );
                                      setProcessing(false);
                                    }}
                                    loading={processing}
                                  >
                                    Add Friend
                                  </PrimaryButton>
                                )}
                              </>
                            )
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="w-[150px]">
                          <SecondaryButton>More</SecondaryButton>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col h-full mt-10">
                  <h1>Posts</h1>
                  <div className="flex flex-wrap h-full overflow-y-auto">
                    {user.posts ? (
                      user.posts.length > 0 ? (
                        user.posts.map((post: any) => <div>{post.heading}</div>)
                      ) : (
                        <div className="w-full h-full flex justify-center items-center">
                          <h2 className="text-slate-600">
                            This user has no posts!
                          </h2>
                        </div>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </Column>
              <Column width="[400px]" minWidth="[400px]">
                {loggedUser.friends && loggedUser.friends.length > 0 ? (
                  <h1>Has Friends</h1>
                ) : (
                  <div className="h-full flex flex-col justify-center items-center w-[90%] self-center">
                    <span className="pb-2">Looks kind of lonely...</span>
                    <div className="w-auto">
                      <SecondaryButton
                        click={() => {
                          navigate("/app/friends");
                        }}
                      >
                        Discover More
                      </SecondaryButton>
                    </div>
                  </div>
                )}
              </Column>
            </>
          ) : (
            <NotFoundPage />
          )}
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-6 h-6">
            <Loading />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
