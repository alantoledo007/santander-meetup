import moment from "moment";
import axios from "axios";

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

export const getErrorMessage = (code) => {
  const messages = {
    "permission-denied": "No tienes permisos suficientes",
    "resource-exhausted":
      "Accesos denegado temporalmente por comportamientos sospechosos.",
    "auth/user-not-found":
      "El correo electrónico y/o la contraseña son incorrectos.",
  };

  return (
    messages[code] || "Ocurrió un error y estamos trabajando en su solución"
  );
};

export const GETrequestWithRetries = (uri, tries, onError) => {
  return axios.get(uri).catch((error) => {
    if (tries > 0) {
      if (typeof onError === "function") onError(error);
      return GETrequestWithRetries(uri, tries - 1, onError);
    }
    return Promise.reject(error);
  });
};

export const dateOnlyMeetupNormalizer = (datetime) => {
  return moment(datetime, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY");
};

export const dateOnlyWeatherNormalizer = (datetime) => {
  return moment(datetime, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY");
};

export const datesAreEquals = (normalizedMeetupDate, normalizedWeatherDate) => {
  return normalizedWeatherDate === normalizedMeetupDate;
};

export const getDaysMatchesArray = (refDatetime, tempsArray) => {
  return tempsArray.filter((item) =>
    datesAreEquals(
      dateOnlyMeetupNormalizer(refDatetime),
      dateOnlyWeatherNormalizer(item.dt_txt)
    )
  );
};

export const getRoundedHourFromMeetupDatetime = (datetime) => {
  const normalized = moment(datetime, "DD/MM/YYYY HH:mm");
  if (
    parseInt(normalized.startOf("minutes").format("HH")) >
    parseInt(normalized.add(30, "minutes").startOf("hours").format("HH"))
  ) {
    return parseInt(normalized.add(1, "hours").startOf("hours").format("HH"));
  }
  return parseInt(normalized.startOf("hours").format("HH"));
};

export const getHourFromWeatherDatetime = (datetime) => {
  const hour = parseInt(moment(datetime, "YYYY/MM/DD HH:mm:ss").format("HH"));
  if (hour === 0) return 24;
  return hour;
};

export const getTempsOrderedByHourCloser = (refHour, tempsArray) => {
  return tempsArray.sort((a, b) => {
    const hourA = getHourFromWeatherDatetime(a.dt_txt);
    const hourB = getHourFromWeatherDatetime(b.dt_txt);

    let distanceA = refHour - hourA;
    let distanceB = refHour - hourB;

    if (distanceA < 0) distanceA = distanceA * -1;
    if (distanceB < 0) distanceB = distanceB * -1;

    if (distanceA >= distanceB) {
      return 1;
    }
    return -1;
  });
};

export const getMaxTempCloserFromDatetimes = (refDatetime, tempsArray) => {
  const daysMatchesArray = getDaysMatchesArray(refDatetime, tempsArray);
  if (daysMatchesArray.length < 1) return null;

  const refHour = getRoundedHourFromMeetupDatetime(refDatetime);
  const tempsOrderedByHourCloser = getTempsOrderedByHourCloser(
    refHour,
    daysMatchesArray
  );
  return tempsOrderedByHourCloser[0].main.temp_max;
};

export const getBeersQuantity = (temp, inscriptions) => {
  if (temp === null || temp > 24) {
    return inscriptions * 2;
  } else if (temp < 20) {
    return inscriptions * 0.75;
  }
  return inscriptions;
};

export const getBoxesQuantity = (temp, inscriptions) => {
  const beers = getBeersQuantity(temp, inscriptions);
  if (beers > 0 && beers <= 6) {
    return 1;
  } else {
    const boxes = beers / 6;
    return Math.ceil(boxes);
  }
};
