import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserType } from "../utils/types";
// Components
import Button from "./basic/Button";
import Card from "./basic/Card";
import Separator from "./basic/Separator";
import ProfilePicture from "./basic/ProfilePicture";

const FriendsPanel = () => {
  const navigate = useNavigate();

  const friends = useSelector((state: RootStateOrAny) => state.friends.friends);

  return (
    <Card width="100%" className="p-4">
      <h1>Friends</h1>
      <Separator />
      {friends && friends.length > 0 ? (
        <>
          {friends.map((friend: UserType, index: number) => (
            <div
              className="flex w-full gap-5 items-center py-1 cursor-pointer"
              onClick={() => {
                navigate(`/app/u/${friend.username}`);
              }}
              key={index}
            >
              <ProfilePicture
                color={friend.settings.profile.profileColor}
                name={friend.fullname}
                size="sm"
              />
              <div className="flex flex-col">
                <h4>{friend.fullname}</h4>
                <span className="text-sm text-slate-500">
                  @{friend.username}
                </span>
              </div>
            </div>
          ))}
        </>
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
    </Card>
  );
};

export default FriendsPanel;
