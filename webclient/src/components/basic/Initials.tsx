import { FC } from "react";

interface InitialsProps {
  text: string;
}

const Initials: FC<InitialsProps> = ({ text }) => {
  const arr = text.split(" ");

  const first = arr[0].charAt(0).toUpperCase();

  const last = arr[arr.length - 1].charAt(0).toUpperCase();

  return (
    <>
      {first ? first : ""}
      {last && arr.length - 1 !== 0 ? last : ""}
    </>
  );
};

export default Initials;
