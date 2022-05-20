import { useEffect, useState, FC } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { Plus, Cards, Table, X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment, { Moment } from "moment";
// Components
import Card from "../../components/basic/Card";
import Button from "../../components/basic/Button";
import Separator from "../../components/basic/Separator";
import ProfilePicture from "../../components/basic/ProfilePicture";
import Form from "../../components/form/Form";
import TextFormField from "../../components/form/TextFormField";

const PersonalChallangesPage: FC = () => {
  /**
   * Settings state
   * @description Creating UseState variable, so we can change the settings.
   */
  const [settings, setSettings] = useState({
    challanges: {
      personal: {
        activeLayout: "cards",
      },
    },
  });

  /**
   * Active layout state
   * @default "cards"
   * @description Creating a useState variable, so we can set the active layout.
   */
  const [activeLayout, setActiveLayout] = useState("cards");

  /**
   * Expanded panel state
   * @default false
   * @description Creating a useState variable, so we can toggle the add challange panel.
   */
  const [expandedAddPanel, setExpandedAddPanel] = useState(false);

  /**
   * Expanded panel state
   * @default false
   * @description Creating a useState variable, so we can toggle the start date picker container visibility.
   */
  const [shownDatePickerStart, setShownDatePickerStart] = useState(false);

  /**
   * Expanded panel state
   * @default null
   * @description Creating a useState variable, so we can toggle the start date.
   */
  const [startDate, setStartDate] = useState<Moment | null>(null);

  /**
   * Expanded panel state
   * @default false
   * @description Creating a useState variable, so we can toggle the end date picker container visibility.
   */
  const [shownDatePickerEnd, setShownDatePickerEnd] = useState(false);

  /**
   * Expanded panel state
   * @default null
   * @description Creating a useState variable, so we can toggle the end date.
   */
  const [endDate, setEndDate] = useState<Moment | null>(null);

  /**
   * UseForm hook deconstruction
   * @constant
   * @description Deconstructing the useForm hook into variables
   */
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  /**
   * UseForm hook deconstruction
   * @constant
   * @description Getting the logged user from the redux store
   */
  const loggedUser = useSelector((state: RootStateOrAny) => state.user.user);

  /**
   * UseEffect hook
   * @constant
   * @description Getting and setting the localStorage app settings upon component creation
   */
  useEffect(() => {
    // Getting the app settings from the localStorage
    const jsonSettings = localStorage.getItem("si-settings");

    // Checking if the object is not empty
    if (!!jsonSettings) {
      // Settings the settings in the page
      setSettings(JSON.parse(jsonSettings));
      // Settings the active layout
      setActiveLayout(settings.challanges.personal.activeLayout);
    }
  }, [settings.challanges.personal.activeLayout]);

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div
          className="flex gap-5 items-center"
          onClick={() => {
            setExpandedAddPanel(true);
          }}
        >
          <h1>Personal Challanges</h1>
          <Button
            variant="action"
            className="bg-slate-200/70 dark:bg-slate-800 w-[30px] h-[30px] text-sm tooltip"
            tooltip="Add a personal challange"
          >
            <Plus />
          </Button>
        </div>
        <div className="flex gap-3">
          <Button
            variant="action"
            className={`text-sm w-[30px] h-[30px] tooltip ${
              activeLayout === "cards"
                ? "bg-slate-200/60 dark:bg-slate-700 hover:bg-slate-200/60 dark:hover:bg-slate-700"
                : "text-slate-600"
            }`}
            onClick={() => {
              if (settings) {
                settings.challanges.personal.activeLayout = "cards";
                setSettings(settings);
                setActiveLayout("cards");
                localStorage.setItem("si-settings", JSON.stringify(settings));
              }
            }}
            tooltip="Card layout"
          >
            <Cards fill="thin" />
          </Button>
          <Button
            variant="action"
            className={`text-sm w-[30px] h-[30px] tooltip ${
              activeLayout === "table"
                ? "bg-slate-200/60 dark:bg-slate-700 hover:bg-slate-200/60 dark:hover:bg-slate-700"
                : "text-slate-600"
            }`}
            onClick={() => {
              if (settings) {
                settings.challanges.personal.activeLayout = "table";
                setSettings(settings);
                setActiveLayout("table");
                localStorage.setItem("si-settings", JSON.stringify(settings));
              }
            }}
            tooltip="Table layout"
          >
            <Table />
          </Button>
        </div>
      </div>
      <>
        {activeLayout === "cards" ? (
          <div className="flex w-full flex-wrap gap-5 mt-10 mb-20">
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
            <Card width="200px" height="250px" className="px-5 py-3">
              <h1>Challange</h1>
            </Card>
          </div>
        ) : (
          <></>
        )}
        {activeLayout === "table" ? (
          <Card width="full" className="px-5 py-3 mt-10 mb-20">
            <div className="flex w-full flex-col">
              <div className="w-full flex justify-between items-center">
                <div>
                  <h1>spleafy's challange</h1>
                </div>
                <div className="flex flex-col">
                  <span>status: online</span>
                </div>
                <div className="w-[50px] aspect-square">
                  <ProfilePicture
                    color={loggedUser.settings.profile.profileColor}
                    name={loggedUser.fullname}
                    size={"xs"}
                  />
                </div>
              </div>
              <Separator />
              <div className="w-full flex justify-between items-center">
                <div>
                  <h1>spleafy's challange</h1>
                </div>
                <div className="flex flex-col">
                  <span>status: online</span>
                </div>
                <div className="w-[50px] aspect-square">
                  <ProfilePicture
                    color={loggedUser.settings.profile.profileColor}
                    name={loggedUser.fullname}
                    size={"xs"}
                  />
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <></>
        )}
      </>
      {expandedAddPanel ? (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-900/30">
          <div
            className="w-[600px]"
            // onClick={(e) => {
            //   e.preventDefault();
            //   setShownDatePickerStart(false);
            //   setShownDatePickerEnd(false);
            // }}
          >
            <Card variant="popup" width="600px">
              <div className="flex w-full justify-between items-center text-xl">
                <h1>Create new challange</h1>
                <X
                  className="cursor-pointer"
                  onClick={() => {
                    setExpandedAddPanel(false);
                    reset({});
                  }}
                />
              </div>
              <Separator />
              <div className="mb-10"></div>
              <Form
                submit={handleSubmit((values) => {
                  console.log(values);
                })}
              >
                <TextFormField
                  name="challangename"
                  label="Challange name:"
                  placeholder="Enter challange name:"
                  register={register}
                  error={errors.challangename}
                />
                <TextFormField
                  name="collaborators"
                  label="Challange collaborators:"
                  placeholder="Enter challange collaborators:"
                  register={register}
                  error={errors.collaborators}
                />
                <div className="w-full flex items-center gap-5 relative">
                  <div className="flex w-1/2 relative">
                    <TextFormField
                      name="startdate"
                      label="Choose start date:"
                      placeholder="Enter start date:"
                      register={register}
                      error={errors.startdate}
                      onFocus={() => {
                        setShownDatePickerStart(true);
                        setShownDatePickerEnd(false);
                      }}
                    />
                    {shownDatePickerStart ? (
                      <div className="absolute top-[80px] left-0">
                        <DayPickerSingleDateController
                          initialVisibleMonth={null}
                          date={startDate}
                          onDateChange={(date) => {
                            setValue(
                              "startdate",
                              moment(date).format("MM/DD/YYYY")
                            );
                            setStartDate(date);
                            setShownDatePickerStart(false);
                          }}
                          focused={true}
                          onFocusChange={({ focused }) => console.log(focused)}
                          numberOfMonths={1}
                          hideKeyboardShortcutsPanel={true}
                          isOutsideRange={(date) =>
                            date.isBefore(moment(), "day")
                          }
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex w-1/2 relative">
                    <TextFormField
                      name="enddate"
                      label="Choose end date:"
                      placeholder="Enter end date:"
                      register={register}
                      error={errors.enddate}
                      onFocus={() => {
                        setShownDatePickerEnd(true);
                        setShownDatePickerStart(false);
                      }}
                    />
                    {shownDatePickerEnd ? (
                      <div
                        className="absolute top-[80px] right-0"
                        onBlur={() => {
                          console.log("blur");
                        }}
                      >
                        <DayPickerSingleDateController
                          initialVisibleMonth={null}
                          date={endDate}
                          onDateChange={(date: Moment | null) => {
                            setValue(
                              "enddate",
                              moment(date).format("MM/DD/YYYY")
                            );
                            if (date) setEndDate(date);
                            setShownDatePickerEnd(false);
                          }}
                          focused={true}
                          onFocusChange={({ focused }) => console.log(focused)}
                          numberOfMonths={1}
                          hideKeyboardShortcutsPanel={true}
                          isOutsideRange={(date) =>
                            date.isBefore(moment(startDate), "day")
                          }
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <span className="text-slate-600">Visibility*</span>
              </Form>
            </Card>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PersonalChallangesPage;
