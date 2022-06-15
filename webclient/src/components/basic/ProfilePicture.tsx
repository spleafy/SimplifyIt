import { FC } from "react";
// Components
import Initials from "./Initials";
// Utils
import { getColors } from "../../utils/utils";

interface ProfilePictureProps {
  color: string;
  name: string;
  picture?: boolean;
  id?: string;
  size?: string;
}

/**
 * ProfilePicture Params
 * @param {Object} props
 * @param {Object} props.color The user object
 * @param {Object} props.name The user object
 * @param {string=} props.size The size of the text for the component
 * @returns Element
 */

const ProfilePicture: FC<ProfilePictureProps> = ({
  color,
  name,
  picture,
  id,
  size,
}) => {
  const tailwindColor = getColors(color)[500];

  return (
    <div
      className={`rounded-full w-10 min-w-10 ${
        size === "xs" ? "!w-8 !min-w-8" : ""
      } ${size === "sm" ? "!w-10 !min-w-10" : ""} ${
        size === "md" ? "!w-14 !min-w-14" : ""
      } ${size === "lg" ? "!w-16 !min-w-16" : ""} ${
        size === "xl" ? "!w-20 !min-w-20" : ""
      } ${size === "2xl" ? "!w-[120px] !min-w-[100px]" : ""} ${
        size === "3xl" ? "!w-[200px] !min-w-[200px]" : ""
      } aspect-square flex justify-center items-center bg-no-repeat bg-contain`}
      style={{
        backgroundColor: tailwindColor && !picture ? tailwindColor : "#f3f3f3",
        backgroundImage: picture
          ? `url(${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/files/${id}.png)`
          : "",
      }}
    >
      {!picture ? (
        <h1 className={`text-white text-${size}`}>
          <Initials text={name} />
        </h1>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfilePicture;
