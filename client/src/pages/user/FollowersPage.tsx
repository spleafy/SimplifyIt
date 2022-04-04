import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiArrowLeft } from "react-icons/fi";
// Pages
import NotFoundPage from "../NotFoundPage";
//Components
import Column from "../../components/Column";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import ProfilePicture from "../../components/ProfilePicture";
// Utils
import { fecthUserData, fetchUserFollowers } from "../../utils/api";
import { followUserAndUpdate, unfollowUserAndUpdate } from "../../utils/user";

const FollowersPage = () => {
  const navigate = useNavigate();

  const { username } = useParams();

  const loggedUser = useSelector((state: any) => state.user.user);

  const [followers, setFollowers]: any[] = useState([]);

  useEffect(() => {
    const effect = async () => {
      if (loggedUser.username === username) {
        const fetchedFollowers = await fetchUserFollowers(loggedUser._id);
        setFollowers(fetchedFollowers.data.followers);
      } else {
        const response = await fecthUserData(username);
        const fetchedFollowers = await fetchUserFollowers(
          response.data.user._id
        );
        setFollowers(fetchedFollowers.data.followers);
      }
    };

    effect();
  }, [loggedUser, username]);

  return (
    <>
      {followers ? (
        <>
          <Column>
            <div className="flex items-center gap-5">
              <FiArrowLeft
                size={24}
                className="cursor-pointer stroke-slate-700 dark:stroke-slate-300"
                onClick={() => {
                  navigate(-1);
                }}
              />
              <h1>Followers</h1>
            </div>
            <div className="mt-10 h-full">
              {followers.length > 0 ? (
                followers.map((singleUser: any, index: number) => (
                  <div
                    className="flex justify-between items-center w-full mt-2 mb-4 cursor-pointer"
                    key={index}
                  >
                    <Link to={`/app/u/${singleUser.username}`}>
                      <div className="flex">
                        <div className={`w-[50px] h-[50px] mr-5`}>
                          <ProfilePicture user={singleUser} size="lg" />
                        </div>
                        <div>
                          <h1 className="text-base">
                            {singleUser ? singleUser.fullname : ""}
                          </h1>
                          <h3 className="text-slate-600 dark:text-slate-300">
                            @{singleUser.username ? singleUser.username : ""}
                          </h3>
                          <span className="text-slate-500 dark:text-slate-200">
                            {singleUser.email
                              ? singleUser.email.toLowerCase()
                              : ""}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="w-[120px]">
                      {singleUser.followers ? (
                        singleUser.username !== loggedUser.username ? (
                          <>
                            {singleUser.followers.includes(loggedUser._id) ? (
                              <SecondaryButton
                                click={async () => {
                                  await unfollowUserAndUpdate(
                                    singleUser.username
                                  );
                                }}
                              >
                                Following
                              </SecondaryButton>
                            ) : (
                              <PrimaryButton
                                click={async () => {
                                  await followUserAndUpdate(
                                    singleUser.username
                                  );
                                }}
                              >
                                Follow
                              </PrimaryButton>
                            )}
                          </>
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex w-full h-full justify-center items-center flex-col">
                  <h1 className="text-slate-500 text-lg">
                    This user has no followers!
                  </h1>
                </div>
              )}
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
        <Column>
          <NotFoundPage />
        </Column>
      )}
    </>
  );
};

export default FollowersPage;
