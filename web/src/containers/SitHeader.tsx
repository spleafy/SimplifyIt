import { useState } from "react";
import { Link } from "react-router-dom";
// Components
import { Dropdown, ScopeHandler, Separator } from "@prismane/core";

const SitNavTop = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex items-center justify-between w-full h-14 bg-primary-500 px-5">
      <h1 className="text-2xl text-white font-semibold">SimplifyIt</h1>
      <div className="flex gap-5 items-center">
        <div
          className="flex h-[36px] aspect-square rounded-full bg-base-200 cursor-pointer"
          onClick={() => setExpanded(true)}
        ></div>
        {expanded && (
          <div className="absolute top-16 right-5 z-10 w-[200px]">
            <ScopeHandler
              onEvent={() => {
                setExpanded(false);
              }}
              className="!w-full"
            >
              <Dropdown
                items={[
                  <Link
                    to={"/app/profile"}
                    className="grow"
                    onClick={() => setExpanded(false)}
                  >
                    Profile
                  </Link>,
                  <Link
                    to={"/app/settings"}
                    className="grow"
                    onClick={() => setExpanded(false)}
                  >
                    Settings
                  </Link>,
                  <Link
                    to={"/app/notifications"}
                    className="grow"
                    onClick={() => setExpanded(false)}
                  >
                    Notifications
                  </Link>,
                  <div
                    className="grow text-red-500"
                    onClick={() => setExpanded(false)}
                  >
                    Log Out
                  </div>,
                ]}
              />
            </ScopeHandler>
          </div>
        )}
      </div>
    </div>
  );
};

export default SitNavTop;
