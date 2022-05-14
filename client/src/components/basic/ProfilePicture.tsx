import { FC } from "react";
// Utils
import { getColors } from "../../utils/utils";

interface ProfilePictureProps {
  color: string;
  name: string;
  size: string;
}

/**
 * ProfilePicture Params
 * @param {Object} props
 * @param {Object} props.color The user object
 * @param {Object} props.name The user object
 * @param {string} props.size The size of the text for the component
 * @returns Element
 */

const ProfilePicture: FC<ProfilePictureProps> = ({ color, name, size }) => {
  const tailwindColor = getColors(color)[500];

  return (
    <div
      className="rounded-full w-full aspect-square flex justify-center items-center"
      style={{
        backgroundColor: tailwindColor ? tailwindColor : "#f3f3f3",
      }}
    >
      <h1 className={`text-white text-${size}`}>
        {name.split(" ")[0].charAt(0)}
        {name.split(" ")[1].charAt(0)}
      </h1>
    </div>
  );
};

export default ProfilePicture;
