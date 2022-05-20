import { useEffect, useState, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";
// Pages
import NotFoundPage from "./NotFoundPage";
//Components
import Column from "../components/basic/Column";
import Button from "../components/basic/Button";
import Loading from "../components/basic/Loading";
import ProfilePicture from "../components/basic/ProfilePicture";
// Utils
import { fecthUserData } from "../utils/api";
import {
  sendFriendRequestAndUpdate,
  cancelFriendRequestAndUpdate,
  removeFriendAndUpdate,
} from "../utils/user";
import { FriendRequestType, UserType } from "../utils/types";

const ProfilePage: FC = () => {
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
  const loggedUser = useSelector((state: RootStateOrAny) => state.user.user);

  /**
   * Friend Requests State
   * @description Getting the friend requests state from the redux store
   */
  const friendRequests = useSelector(
    (state: RootStateOrAny) => state.friendRequests.friendRequests
  );

  /**
   * Loading state
   * @description Creating a useState variable, so we can toggle the loading state of the page
   */
  const [loading, setLoading] = useState(true);

  /**
   * Processing state
   * @description Creating a useState variable, so we can trigger the loading animation on the buttons
   */
  const [processing, setProcessing] = useState(false);

  /**
   * User state
   * @description Creating a useState variable, so we can toggle the user, if the wanted username is the same as the logged user's username, then we set the user to be the logged user
   */
  const [user, setUser] = useState<UserType | null>(null);

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
                    <ProfilePicture
                      color={user.settings.profile.profileColor}
                      name={user.fullname}
                      size="xl"
                    />
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
                          <Button
                            variant="secondary"
                            onClick={() => {
                              navigate("/app/settings/account");
                            }}
                          >
                            Edit Profile
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-[150px]">
                          {loggedUser.friends ? (
                            loggedUser.friends.includes(user._id) ? (
                              <Button
                                variant="secondary"
                                onClick={async () => {
                                  setProcessing(true);
                                  await removeFriendAndUpdate(user._id);
                                  setProcessing(false);
                                }}
                                loading={processing}
                              >
                                Friends
                              </Button>
                            ) : (
                              <>
                                {friendRequests.sent &&
                                friendRequests.sent.some(
                                  ({ to }: FriendRequestType) => to === user._id
                                ) ? (
                                  <Button
                                    variant="primary"
                                    onClick={async () => {
                                      setProcessing(true);
                                      await cancelFriendRequestAndUpdate(
                                        user._id
                                      );
                                      setProcessing(false);
                                    }}
                                    loading={processing}
                                  >
                                    Cancel Request
                                  </Button>
                                ) : (
                                  <Button
                                    variant="primary"
                                    onClick={async () => {
                                      setProcessing(true);
                                      await sendFriendRequestAndUpdate(
                                        user._id
                                      );
                                      setProcessing(false);
                                    }}
                                    loading={processing}
                                  >
                                    Add Friend
                                  </Button>
                                )}
                              </>
                            )
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="w-[150px]">
                          <Button variant="secondary">More</Button>
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
                        user.posts.map((post: string) => <div>{post}</div>)
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
                      <Button
                        variant="secondary"
                        onClick={() => {
                          navigate("/app/friends");
                        }}
                      >
                        Discover More
                      </Button>
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
          <div className="w-10 h-10">
            <Loading />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
