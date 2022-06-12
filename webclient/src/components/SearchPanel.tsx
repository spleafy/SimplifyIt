import { useEffect, useState, useRef, FC, Dispatch, RefObject } from "react";
import { X } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// Components
import ProfilePicture from "./basic/ProfilePicture";
import Card from "./basic/Card";
import OutsideEventHandler from "./OutsideEventHandler";
// Utils
import { searchData } from "../utils/api";
import { UserType } from "../utils/types";
// Lodash
import _ from "lodash";

interface SearchPanelProps {
  setShown: Dispatch<boolean>;
  shown: boolean;
}

/**
 * SearchPanel Params
 * @param {Object} props
 * @param {boolean} props.shown The boolean for toggling the state of the search panel
 * @param {any} props.setShown The useState hook for toggling the shown state
 * @returns Element
 */

const SearchPanel: FC<SearchPanelProps> = ({
  setShown,
  shown,
}: SearchPanelProps) => {
  /**
   * Navigate Method
   * @constant
   * @description Creating a navigate method, so we can navigate through the application.
   */

  const navigate = useNavigate();

  /**
   * Search params State
   * @default All
   * @description Creating a useState variable, so we can have filtered search, based on the user choice.
   */

  const [searchParams, setSearchParams] = useState("All");

  /**
   * Search response state
   * @default []
   * @description Creating a useState variable, so we can set the response.
   */

  const [searchResponse, setSearchResponse] = useState([]);

  const input: RefObject<HTMLInputElement> = useRef(null);

  /**
   * Search options array
   * @constant
   * @description Search options array, which will be displayed in the search panel.
   */

  const searchOptions = ["All", "Workspaces", "Tasks", "People", "Chats"];

  /**
   * UseForm hook deconstruction
   * @constant
   * @description Deconstructing the useForm hook into variables
   */

  const { register } = useForm({
    mode: "all",
  });

  /**
   * UseEffect hook
   * @description Focuses the search input upon component creation.
   */

  useEffect(() => {
    input?.current?.focus();
  }, []);

  return (
    <>
      {shown ? (
        <div
          className={`fixed w-full h-full flex justify-center items-center bg-gray-900/50 z-20 top-0 left-0`}
        >
          <OutsideEventHandler
            onEvent={() => {
              setShown(false);
            }}
          >
            <Card
              variant="dropdown"
              className={`w-[650px] bg-white !px-7 !py-6 rounded-lg flex items-start flex-col`}
            >
              <div className="flex justify-between w-full items-center gap-5">
                <form
                  onChange={_.debounce(async () => {
                    const response = await searchData(
                      input.current?.value as string,
                      "all"
                    );
                    setSearchResponse(response.data.user);
                  }, 300)}
                >
                  <input
                    {...register("search")}
                    type="text"
                    className="text-2xl w-full"
                    placeholder="Search..."
                    autoComplete={"off"}
                    ref={input}
                  />
                </form>

                <X
                  size={32}
                  className="cursor-pointer text-slate-700 dark:text-white rotate"
                  onClick={() => {
                    setShown(false);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-5 items-center">
                  {searchOptions.map((message, index) => (
                    <div
                      className={`px-5 py-1 rounded-lg mt-5 cursor-pointer transition-colors dark:text-white ${
                        searchParams === message
                          ? "bg-theme-500 text-white"
                          : "text-slate-800 hover:bg-theme-100 dark:hover:bg-theme-900/20 dark:hover:text-theme-500"
                      }`}
                      onClick={() => {
                        setSearchParams(message);
                      }}
                      key={index}
                    >
                      {message}
                    </div>
                  ))}
                </div>
              </div>
              {searchResponse.length > 0 ? (
                <div className="flex w-full mt-5 flex-col">
                  {searchResponse.map((user: UserType, index: number) => (
                    <div
                      className="flex w-full hover:bg-theme-100 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors cursor-pointer gap-5 items-center mt-2"
                      key={index}
                      onClick={() => {
                        setShown(false);
                        navigate(`/app/u/${user.username}`);
                      }}
                    >
                      <div className="w-8">
                        <ProfilePicture
                          color={user.settings.profile.profileColor}
                          name={user.fullname}
                          size="xs"
                        />
                      </div>
                      <span>{user.username}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </Card>
          </OutsideEventHandler>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchPanel;
