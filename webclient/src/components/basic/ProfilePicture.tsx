import { FC } from "react";
// Components
import Initials from "./Initials";
// Utils
import { getColors } from "../../utils/utils";

interface ProfilePictureProps {
  color: string;
  name: string;
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

const ProfilePicture: FC<ProfilePictureProps> = ({ color, name, size }) => {
  const tailwindColor = getColors(color)[500];

  return (
    <div
      className={`rounded-full w-10 min-w-10 ${
        size === "xs" ? "!w-8 !min-w-8" : ""
      } ${size === "sm" ? "!w-10 !min-w-10" : ""} ${
        size === "md" ? "!w-14 !min-w-14" : ""
      } ${size === "lg" ? "!w-16 !min-w-16" : ""} ${
        size === "xl" ? "!w-20 !min-w-20" : ""
      } aspect-square flex justify-center items-center`}
      style={{
        backgroundColor: tailwindColor ? tailwindColor : "#f3f3f3",
      }}
    >
      <h1 className={`text-white text-${size}`}>
        <Initials text={name} />
      </h1>
    </div>
  );
};

export default ProfilePicture;
