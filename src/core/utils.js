import moment from "moment";

export const getUsernameFromEmail = (email) => {
  return email.split("@")[0];
};

export const getDateFromDatetime = (datetime) => {
  return moment(datetime, "DD/MM/YYYY HH:mm").format("DD/MM");
};

export const getTimeFromDatetime = (datetime) => {
  return moment(datetime, "DD/MM/YYYY HH:mm").format("HH:mm [hs]");
};

export const createDocObject = (doc) => {
  return {
    id: doc.id,
    ...doc.data(),
  };
};
