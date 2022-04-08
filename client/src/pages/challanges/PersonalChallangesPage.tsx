import { useState } from "react";
import { Plus, Cards, Table } from "phosphor-react";
// Components
import Card from "../../components/Card";
import Separator from "../../components/Separator";

const PersonalChallangesPage = () => {
  const settings: any = localStorage.getItem("si-settings");

  const [activeLayout, setActiveLayout] = useState("cards");

  if (settings && settings.challanges.personal.activeLayout) {
    setActiveLayout(settings.challanges.personal.activeLayout);
  }

  return (
    <div className="flex w-full justify-center flex-col max-w-[1400px] self-center mt-5">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-5">
          <h1>Personal Challanges</h1>
          <div className="bg-slate-200/50 text-slate-500 p-2 rounded-md cursor-pointer">
            <Plus />
          </div>
        </div>
        <div className="flex gap-3">
          <div
            className={`p-2 rounded-md cursor-pointer ${
              activeLayout === "cards"
                ? "text-slate-900 bg-slate-200/60"
                : "text-slate-600"
            }`}
            onClick={() => {
              setActiveLayout("cards");

              if (settings) {
                settings.challanges.personal.activeLayout = "cards";
                localStorage.setItem("si-settings", JSON.stringify(settings));
              }
            }}
          >
            <Cards />
          </div>
          <div
            className={`p-2 rounded-md cursor-pointer ${
              activeLayout === "table"
                ? "text-slate-900 bg-slate-200/60"
                : "text-slate-600"
            }`}
            onClick={() => {
              setActiveLayout("table");

              if (settings) {
                settings.challanges.personal.activeLayout = "table";
                localStorage.setItem("si-settings", JSON.stringify(settings));
              }
            }}
          >
            <Table />
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default PersonalChallangesPage;
