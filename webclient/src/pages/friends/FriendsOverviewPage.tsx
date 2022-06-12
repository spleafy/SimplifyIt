import { FC } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
// Components
import Card from "../../components/basic/Card";
import Initials from "../../components/basic/Initials";
// Utils
import { getColors } from "../../utils/utils";
import { UserType } from "../../utils/types";

const OveviewFriendsPage: FC = () => {
  const navigate = useNavigate();

  /**
   * Friends State
   * @description Getting the friends state from the redux store
   */
  const friends = useSelector((state: RootStateOrAny) => state.friends.friends);

  return (
    <div className="flex flex-wrap gap-5">
      {friends ? (
        friends.map((friend: UserType, index: number) => (
          <Card width="200px" height="250px" key={index}>
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => {
                navigate(`/app/u/${friend.username}`);
              }}
            >
              <div
                className="absolute w-full h-full flex justify-center items-center opacity-80 bg-gradient-to-t from-black/50 to-transparent cursor-pointer"
                style={{
                  backgroundColor: getColors(
                    friend.settings.profile.profileColor
                  )[500],
                }}
              >
                <h1 className="text-white select-none">
                  <Initials text={friend.fullname} />
                </h1>
              </div>
              {/* <div className="px-3 py-1 absolute right-3 top-3 bg-slate-900/20 rounded-lg text-white text-sm">
                  You
                </div> */}
              <div className="px-5 py-3 absolute bottom-0">
                <h1 className="text-white">{friend.username}</h1>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default OveviewFriendsPage;
