import { FC, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
// Components
import ProfilePicture from "./basic/ProfilePicture";
import Card from "./basic/Card";
import OutsideEventHandler from "./OutsideEventHandler";
// Utils
import { defineDate } from "../utils/utils";
import { updateNotificationStateAndUpdate } from "../utils/user";
import { NotificationType } from "../utils/types";

interface NotificationsPanelProps {
  setShown: Dispatch<boolean>;
  shown: boolean;
}

const NotificationsPanel: FC<NotificationsPanelProps> = ({
  setShown,
  shown,
}) => {
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
      <Card
        className={shown ? "right-0" : "-right-[400px]"}
        variant="panel"
        heading="Notifications"
        setShown={setShown}
      >
        {notifications.length > 0 ? (
          <div className="overflow-y-auto flex flex-col h-full">
            {notifications.map(
              (notification: NotificationType, index: number) => (
                <div
                  className={`w-full flex text-sm cursor-pointer py-1 rounded-lg mt-2 first:mt-0`}
                  key={index}
                  onClick={async () => {
                    if (!notification.opened) {
                      await updateNotificationStateAndUpdate(notification._id);
                    }

                    setShown(false);
                  }}
                >
                  {notification.type === "friendRequest" ? (
                    <div
                      className="flex justify-between w-full gap-3"
                      onClick={() => {
                        navigate(`/app/friends/requests/`);
                      }}
                    >
                      <div className="flex gap-5">
                        <div className="w-[35px] h-[35px] flex items-center">
                          <div
                            className={`absolute left-0 w-[2px] h-[15px] rounded-tr-full rounded-br-full aspect-square bg-theme-400 ${
                              !notification.opened ? "flex" : "hidden"
                            }`}
                          >
                            <div className="w-full h-full rounded-full bg-theme-400 animate-ping"></div>
                          </div>
                          <ProfilePicture
                            color={
                              notification.data.settings.profile.profileColor
                            }
                            name={notification.data.fullname}
                            picture={
                              notification.data.settings.profile.profilePicture
                            }
                            id={notification.data._id}
                            size="xs"
                          />
                        </div>
                        <div className="flex flex-col flex-wrap max-w-[300px]">
                          <span>
                            <strong>{notification.data.username}</strong> wants
                            to be your friend!
                          </span>
                          <span className="text-slate-500">
                            {defineDate(notification.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
          <div className="w-full h-[200px] flex items-center justify-center">
            <span className="text-slate-700">No notifications!</span>
          </div>
        )}
      </Card>
    </OutsideEventHandler>
  );
};

export default NotificationsPanel;
