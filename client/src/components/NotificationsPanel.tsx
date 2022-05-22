import { FC, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import { Trash } from "phosphor-react";
// Components
import Card from "./basic/Card";
import ProfilePicture from "./basic/ProfilePicture";
import OutsideEventHandler from "./OutsideEventHandler";
// Utils
import { defineDate } from "../utils/utils";
import { updateNotificationStateAndUpdate } from "../utils/user";
import { NotificationType } from "../utils/types";

interface NotificationsPanelProps {
  setShown: Dispatch<boolean>;
}

const NotificationsPanel: FC<NotificationsPanelProps> = ({ setShown }) => {
  const navigate = useNavigate();

  /**
   * Notification state
   * @description Getting the notifications from the redux store
   */
  const notifications = useSelector(
    (state: RootStateOrAny) => state.notifications.notifications
  );

  return (
    <OutsideEventHandler
      onEvent={() => {
        setShown(false);
      }}
    >
      <div>
        <Card variant="panel" width="400px">
          {notifications.length > 0 ? (
            <>
              {notifications.map(
                (notification: NotificationType, index: number) => (
                  <div
                    className={`w-full flex items-center text-sm cursor-pointer px-3 py-1 rounded-lg mt-2 first:mt-0 relative`}
                    key={index}
                    onClick={async () => {
                      if (!notification.opened) {
                        await updateNotificationStateAndUpdate(
                          notification._id
                        );
                      }

                      setShown(false);
                    }}
                  >
                    <div
                      className={`absolute left-0 top-50 w-[5px] h-[5px] rounded-full aspect-square bg-theme-400 ${
                        !notification.opened ? "flex" : "hidden"
                      }`}
                    >
                      <div className="w-full h-full rounded-full bg-theme-400 animate-ping"></div>
                    </div>
                    {notification.type === "friendRequest" ? (
                      <div
                        className="flex justify-between items-center w-full"
                        onClick={() => {
                          navigate(`/app/friends/requests/`);
                        }}
                      >
                        <div className="flex gap-5 items-center">
                          <div className="w-[35px]">
                            <ProfilePicture
                              color={
                                notification.data.settings.profile.profileColor
                              }
                              name={notification.data.fullname}
                              size="xs"
                            />
                          </div>
                          <div>
                            <strong>{notification.data.username}</strong> wants
                            to be your friend!
                          </div>
                        </div>
                        <span className="text-slate-500 whitespace-nowrap">
                          {defineDate(notification.date)}
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="ml-2 text-base hover:text-red-500 hover:bg-slate-100/50 dark:hover:bg-slate-700 p-1 rounded-lg transition-colors">
                      <Trash />
                    </div>
                  </div>
                )
              )}
            </>
          ) : (
            <div className="w-full h-[200px] flex items-center justify-center">
              <span className="text-slate-700">No notifications!</span>
            </div>
          )}
        </Card>
      </div>
    </OutsideEventHandler>
  );
};

export default NotificationsPanel;
