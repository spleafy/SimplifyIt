// Utils
import { getColors } from "../utils/utils";

interface ProfilePictureProps {
  user: any;
  size: string;
}

const ProfilePicture = ({ user, size }: ProfilePictureProps) => {
  return (
    <div
      className="rounded-full w-full aspect-square flex justify-center items-center"
      style={{
        backgroundColor: user.settings
          ? getColors(user.settings.profileColor)[500]
          : "#f3f3f3",
      }}
    >
      {user.fullname ? (
        <h1 className={`text-white text-${size}`}>
          {user.fullname.split(" ")[0].charAt(0)}
          {user.fullname.split(" ")[1].charAt(0)}
        </h1>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfilePicture;
