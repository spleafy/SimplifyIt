import { FC } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { Check, X } from "phosphor-react";
// Components
import Card from "../../components/basic/Card";
// Utils
import { getColors } from "../../utils/utils";
import {
  acceptFriendRequestAndUpdate,
  cancelFriendRequestAndUpdate,
  rejectFriendRequestAndUpdate,
} from "../../utils/user";
import { FriendRequestType } from "../../utils/types";

interface FriendRequestsPageProps {
  type: string;
}

const FriendRequestsPage: FC<FriendRequestsPageProps> = ({ type }) => {
  /**
   * Friend Requests State
   * @description Getting the friend requests state from the redux store
   */
  const friendRequests = useSelector(
    (state: RootStateOrAny) => state.friendRequests.friendRequests[type]
  );

  /**
   * User Type
   * @description Creating a variable so we define, based on the type passed to the page, which user to show on the request card
   */
  const userType = type === "received" ? "userFrom" : "userTo";

  return (
    <div className="flex flex-wrap gap-5 h-full">
      {friendRequests.length > 0 ? (
        friendRequests.map(
          (friendRequest: FriendRequestType, index: number) => (
            <Card width="200px" height="250px" key={index}>
              <div className="relative w-full h-full group">
                <div
                  className="absolute w-full h-full flex justify-center items-center opacity-80 bg-gradient-to-t from-black/50 to-transparent cursor-pointer"
                  style={{
                    backgroundColor: getColors(
                      friendRequest[userType].settings.profile.profileColor
                    )[500],
                  }}
                >
                  <h1 className="text-white select-none">
                    {friendRequest[userType].fullname.split(" ")[0].charAt(0)}
                    {friendRequest[userType].fullname.split(" ")[1].charAt(0)}
                  </h1>
                </div>
                <div className="px-5 py-3 absolute bottom-0 w-full">
                  <h1 className="text-white">
                    {friendRequest[userType].username}
                  </h1>
                  <div className="mt-3 h-0 opacity-0 group-hover:h-10 group-hover:opacity-100 transition-all">
                    <div className="flex w-full justify-between items-center">
                      {type === "received" ? (
                        <div
                          className="w-10 h-10 bg-slate-400/30 rounded-full flex justify-center items-center text-white cursor-pointer tooltip"
                          onClick={() => {
                            acceptFriendRequestAndUpdate(friendRequest);
                          }}
                        >
                          <Check />
                        </div>
                      ) : (
                        <></>
                      )}
                      <div
                        className="w-10 h-10 bg-slate-400/30 rounded-full flex justify-center items-center text-white cursor-pointer"
                        onClick={() => {
                          if (type === "received") {
                            rejectFriendRequestAndUpdate(friendRequest.from);
                          } else {
                            cancelFriendRequestAndUpdate(friendRequest.to);
                          }
                        }}
                      >
                        <X />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        )
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <h1>No requests here...</h1>
        </div>
      )}
    </div>
  );
};

export default FriendRequestsPage;
