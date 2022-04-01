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
// Utils
import { fecthUserData } from "../utils/api";
import { followUserAndUpdate, unfollowUserAndUpdate } from "../utils/user";
import { getColors } from "../utils/utils";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { username } = useParams();

  const loggedUser = useSelector((state: any) => state.user.user);

  const [loading, setLoading]: any = useState(false);

  const [user, setUser]: any = useState({});

  const [personalProfile, setPersonalProfile] = useState(false);

  useEffect(() => {
    const effect = async () => {
      setLoading(true);
      if (loggedUser.username === username) {
        setUser(loggedUser);
        setPersonalProfile(true);
      } else {
        const response = await fecthUserData(username);
        setUser(response.data.user);
        setPersonalProfile(false);
      }
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
                <h1>Profile Page</h1>
                <div className="flex flex-col w-full">
                  <div
                    className={`w-[100px] aspect-square rounded-full mt-10 flex justify-center items-center`}
                    style={{
                      backgroundColor: user.settings
                        ? getColors(user.settings.profileColor)[500]
                        : "#f3f3f3",
                    }}
                  >
                    {user.fullname ? (
                      <h1 className="text-white">
                        {user.fullname.split(" ")[0].charAt(0)}
                        {user.fullname.split(" ")[1].charAt(0)}
                      </h1>
                    ) : (
                      <></>
                    )}
                  </div>
                  <h1 className="mt-3">{user ? user.fullname : ""}</h1>
                  <h3 className="text-lg text-slate-600 dark:text-slate-300">
                    @{user.username ? user.username : ""}
                  </h3>
                  <span className="text-lg text-slate-500 dark:text-slate-200">
                    {user.email ? user.email.toLowerCase() : ""}
                  </span>
                  <div className="flex mt-2">
                    <span
                      className="flex mr-5 cursor-pointer"
                      onClick={() => {
                        navigate("followers");
                      }}
                    >
                      Followers:
                      <h3 className="ml-2">
                        {user.followers ? user.followers.length : 0}
                      </h3>
                    </span>
                    <span
                      className="flex mr-5 cursor-pointer"
                      onClick={() => {
                        navigate("following");
                      }}
                    >
                      Following:
                      <h3 className="ml-2">
                        {user.following ? user.following.length : 0}
                      </h3>
                    </span>
                    <span className="flex mr-5 cursor-pointer">
                      Friends:
                      <h3 className="ml-2">
                        {user.friends ? user.friends.length : 0}
                      </h3>
                    </span>
                  </div>
                  <div className="mt-5 flex gap-5 items-center">
                    {personalProfile ? (
                      <>
                        <div className="w-[120px]">
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
                        <div className="w-[120px]">
                          {user.followers ? (
                            user.followers.includes(loggedUser._id) ? (
                              <SecondaryButton
                                click={async () => {
                                  const response: any =
                                    await unfollowUserAndUpdate(user.username);

                                  if (response.status === 200) {
                                    setUser(response.data.user);
                                  }
                                }}
                              >
                                Following
                              </SecondaryButton>
                            ) : (
                              <PrimaryButton
                                click={async () => {
                                  const response: any =
                                    await followUserAndUpdate(user.username);

                                  if (response.status === 200) {
                                    setUser(response.data.user);
                                  }
                                }}
                              >
                                Follow
                              </PrimaryButton>
                            )
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="w-[120px]">
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
                <h1>Friends</h1>
                {loggedUser.friends && loggedUser.friends.length > 0 ? (
                  <h1>Has Friends</h1>
                ) : (
                  <div className="h-full flex flex-col justify-center items-center w-[90%] self-center">
                    <span className="pb-2">Looks kind of lonely...</span>
                    <div className="w-auto">
                      <SecondaryButton
                        click={() => {
                          navigate("/app/discover");
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
