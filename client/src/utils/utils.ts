const colors = require("tailwindcss/colors");

delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];
delete colors["lightBlue"];
delete colors["gray"];
delete colors["zinc"];
delete colors["neutral"];
delete colors["stone"];

export const getColors = (color: string) => {
  if (color === "all") {
    return colors;
  } else {
    return colors[color];
  }
};

export const defineDate = (date: number) => {
  if ((Date.now() - date) / 60000 < 1) {
    return "< 1m";
  } else if ((Date.now() - date) / 3600000 < 1) {
    return "< 1h";
  } else if (
    (Date.now() - date) / 3600000 > 1 &&
    (Date.now() - date) / 86400000 < 1
  ) {
    return `${Number((Date.now() - date) / 3600000)}h`;
  } else if (
    (Date.now() - date) / 86400000 > 1 &&
    (Date.now() - date) / 2629800000 < 1
  ) {
    return `${Number((Date.now() - date) / 86400000)}d`;
  } else if (
    (Date.now() - date) / 2629800000 > 1 &&
    (Date.now() - date) / 31557600000 < 1
  ) {
    return `${Number((Date.now() - date) / 2629800000)}m`;
  } else {
    return `${Number((Date.now() - date) / 31557600000)}y`;
  }
};
