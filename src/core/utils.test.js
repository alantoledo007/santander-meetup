import * as utils from "./utils";

describe("getUsernameFromEmail()", () => {
  test("Retorna el nombre de usuario correctamente", () => {
    const email = "fff=ss.hola@gmail.com";
    const username = utils.getUsernameFromEmail(email);
    expect(username).toBe("fff=ss.hola");
  });
});

describe("getDateFromDatetime()", () => {
  test("devuelve la fecha correctamente", () => {
    expect(utils.getDateFromDatetime("26/05/2021 20:15")).toBe("26/05");
    expect(utils.getDateFromDatetime("30/11/2021 00:00")).toBe("30/11");
  });
});

describe("getTimeFromDatetime()", () => {
  test("devuelve la hora correctamente", () => {
    expect(utils.getTimeFromDatetime("26/05/2021 20:15")).toBe("20:15 hs");
    expect(utils.getTimeFromDatetime("30/11/2021 00:00")).toBe("00:00 hs");
  });
});

describe("createDocObject()", () => {
  test("Construye correctamente el objeto", () => {
    const doc1Data = {
      name: "Doc 1",
    };
    const doc1 = {
      id: "doc1uid",
      data: () => doc1Data,
    };
    const doc1Expect = {
      id: doc1.id,
      name: "Doc 1",
    };

    const doc2Data = {
      name: "Doc 2",
    };
    const doc2 = {
      id: "doc2uid",
      data: () => doc2Data,
    };
    const doc2Expect = {
      id: doc2.id,
      name: "Doc 2",
    };

    expect(utils.createDocObject(doc1)).toEqual(doc1Expect);
    expect(utils.createDocObject(doc2)).toEqual(doc2Expect);
  });
});

describe("getErrorMessage()", () => {
  test("Devuelve el mensaje de error correcto", () => {
    expect(utils.getErrorMessage("permission-denied")).toBe(
      "No tienes permisos suficientes"
    );
    expect(utils.getErrorMessage("resource-exhausted")).toBe(
      "Accesos denegado temporalmente por comportamientos sospechosos."
    );
  });

  test("Si el codigo de error no existe, returna un mensaje por defecto", () => {
    expect(utils.getErrorMessage("asdasd")).toBe(
      "Ocurrió un error y estamos trabajando en su solución"
    );
  });
});

describe("GETrequestWithRetries()", () => {
  test("Retorna una promesa", () => {
    const isPromise = (value) => {
      return Boolean(
        value &&
          typeof value.then === "function" &&
          typeof value.catch === "function"
      );
    };
    const getRequest = utils.GETrequestWithRetries("https://google.com", 0);
    expect(isPromise(getRequest)).toBe(true);
  });

  test("Ejecuta los reintentos correctamente", () => {
    const onErrorMock = jest.fn(() => {});
    utils.GETrequestWithRetries("errorurlss--", 2, onErrorMock).catch(() => {
      expect(onErrorMock.mock.calls.length).toBe(2);
    });
  });
});

describe("dateOnlyMeetupNormalizer()", () => {
  test("recibe una fecha y hora de una meetup y retorna solo la fecha", () => {
    expect(utils.dateOnlyMeetupNormalizer("15/11/2021 08:30")).toBe(
      "15/11/2021"
    );
    expect(utils.dateOnlyMeetupNormalizer("13/01/2021 08:30")).toBe(
      "13/01/2021"
    );
  });
});

describe("dateOnlyWeatherNormalizer()", () => {
  test("recibe una fecha y hora de AppWeather (api del clima) y retorna solo la fecha normalizada", () => {
    expect(utils.dateOnlyWeatherNormalizer("2021-08-21 00:00:00")).toBe(
      "21/08/2021"
    );
    expect(utils.dateOnlyWeatherNormalizer("2021-08-22 18:00:00")).toBe(
      "22/08/2021"
    );
  });
});

describe("datesAreEquals()", () => {
  test("returna true si las 2 fechas son iguales", () => {
    expect(utils.datesAreEquals("20/11/2021", "20/11/2021")).toBe(true);
  });
  test("returna false si las 2 fechas no son iguales", () => {
    expect(utils.datesAreEquals("20/11/2021", "20/11/2020")).toBe(false);
  });
});

describe("getDaysMatchesArray()", () => {
  const arrayTemps = [
    {
      dt_txt: "2021-08-21 00:00:00",
    },
    {
      dt_txt: "2021-08-23 06:00:00",
    },
    {
      dt_txt: "2021-08-25 06:00:00",
    },
    { dt_txt: "2021-08-23 12:00:00" },
  ];

  test("retorna un array de temperaturas con fechas que coinciden", () => {
    const refDate = "23/08/2021 15:30";

    expect(utils.getDaysMatchesArray(refDate, arrayTemps)).toEqual([
      { dt_txt: "2021-08-23 06:00:00" },
      { dt_txt: "2021-08-23 12:00:00" },
    ]);
  });

  test("Si no hay coincidencias retorna un array vacío", () => {
    const refDate = "24/08/2021 15:30";

    expect(utils.getDaysMatchesArray(refDate, arrayTemps)).toEqual([]);
  });
});

describe("getRoundedHourFromMeetupDatetime()", () => {
  test("Si la hora tiene 30 minutos o más, retorna la próxima hora", () => {
    expect(utils.getRoundedHourFromMeetupDatetime("24/08/2021 15:30")).toBe(16);
    expect(utils.getRoundedHourFromMeetupDatetime("24/08/2021 15:55")).toBe(16);
  });
  test("Si la hora tiene 29 minutos o menos, retorna la hora actual", () => {
    expect(utils.getRoundedHourFromMeetupDatetime("24/08/2021 15:29")).toBe(15);
    expect(utils.getRoundedHourFromMeetupDatetime("24/08/2021 15:15")).toBe(15);
  });
});

describe("getHourFromWeatherDatetime()", () => {
  test("Retorna la hora de un datetime de AppWeather", () => {
    expect(utils.getHourFromWeatherDatetime("2021-08-23 06:00:00")).toBe(6);
    expect(utils.getHourFromWeatherDatetime("2021-08-23 18:00:00")).toBe(18);
    expect(utils.getHourFromWeatherDatetime("2021-08-23 00:00:00")).toBe(24);
  });
});

describe("getTempsOrderedByHourCloser()", () => {
  test("retorna un array de Weathers ordenados por el horario más proximo al horario de la meetup", () => {
    const arrayTemps = [
      { dt_txt: "2021-08-23 03:00:00" },
      { dt_txt: "2021-08-23 06:00:00" },
      { dt_txt: "2021-08-23 09:00:00" },
      { dt_txt: "2021-08-23 12:00:00" },
      { dt_txt: "2021-08-23 15:00:00" },
      { dt_txt: "2021-08-23 18:00:00" },
      { dt_txt: "2021-08-23 21:00:00" },
      { dt_txt: "2021-08-23 00:00:00" },
    ];

    expect(utils.getTempsOrderedByHourCloser(7, arrayTemps)).toEqual([
      { dt_txt: "2021-08-23 06:00:00" },
      { dt_txt: "2021-08-23 09:00:00" },
      { dt_txt: "2021-08-23 03:00:00" },
      { dt_txt: "2021-08-23 12:00:00" },
      { dt_txt: "2021-08-23 15:00:00" },
      { dt_txt: "2021-08-23 18:00:00" },
      { dt_txt: "2021-08-23 21:00:00" },
      { dt_txt: "2021-08-23 00:00:00" },
    ]);

    expect(utils.getTempsOrderedByHourCloser(20, arrayTemps)).toEqual([
      { dt_txt: "2021-08-23 21:00:00" },
      { dt_txt: "2021-08-23 18:00:00" },
      { dt_txt: "2021-08-23 00:00:00" },
      { dt_txt: "2021-08-23 15:00:00" },
      { dt_txt: "2021-08-23 12:00:00" },
      { dt_txt: "2021-08-23 09:00:00" },
      { dt_txt: "2021-08-23 06:00:00" },
      { dt_txt: "2021-08-23 03:00:00" },
    ]);
  });
});

describe("getMaxTempCloserFromDatetimes()", () => {
  test("retorna la temperatura máxima la fecha correspondiente en el horario más cercano a la meetup", () => {
    const arrayTemps = [
      { dt_txt: "2021-08-23 03:00:00" },
      {
        dt_txt: "2021-08-23 06:00:00",
        main: {
          temp: 10.97,
          temp_min: 9.77,
          temp_max: 13.66,
        },
      },
      { dt_txt: "2021-08-23 09:00:00" },
      { dt_txt: "2021-08-23 12:00:00" },
      { dt_txt: "2021-08-23 15:00:00" },
      { dt_txt: "2021-08-23 18:00:00" },
      {
        dt_txt: "2021-08-23 21:00:00",
        main: {
          temp: 18.2,
          temp_min: 17.98,
          temp_max: 25.03,
        },
      },
      { dt_txt: "2021-08-23 00:00:00" },
    ];

    expect(
      utils.getMaxTempCloserFromDatetimes("23/08/21 07:15", arrayTemps)
    ).toBe(13.66);

    expect(
      utils.getMaxTempCloserFromDatetimes("23/08/21 19:31", arrayTemps)
    ).toBe(25.03);
  });
});

describe("getBeersQuantity()", () => {
  test("Cuando la temperatura es menor a 20ºC se consume 0.75 birras por persona", () => {
    expect(utils.getBeersQuantity(15, 100)).toBe(75);
  });

  test("Cuando la temperatura es entre 20ºC y 24ºC se consume 1 birra por persona", () => {
    expect(utils.getBeersQuantity(22, 100)).toBe(100);
  });

  test("Cuando la temperatura es mayor a 24ºC se consume 2 birras por persona", () => {
    expect(utils.getBeersQuantity(26, 100)).toBe(200);
  });

  test("Cuando no se sabe la temperatura, se calculan 2 birras por persona (para que nunca falte)", () => {
    expect(utils.getBeersQuantity(null, 100)).toBe(200);
  });

  test("Cuando no hay personas, se consumen 0 birras", () => {
    expect(utils.getBeersQuantity(26, 0)).toBe(0);
    expect(utils.getBeersQuantity(2, 0)).toBe(0);
    expect(utils.getBeersQuantity(20, 0)).toBe(0);
  });

  test("Funciona con temperaturas negativas", () => {
    expect(utils.getBeersQuantity(-15, 100)).toBe(75);
  });
});

describe("getBoxesQuantity()", () => {
  test("Sabiendo que cada caja trae 6 birras, se calculan las suficientes para que nunca falten birras", () => {
    expect(utils.getBoxesQuantity(5, 100)).toBe(13);
    expect(utils.getBoxesQuantity(21, 100)).toBe(17);
    expect(utils.getBoxesQuantity(24.5, 100)).toBe(34);
  });

  test("Si no hay personas, no hace falta comprar nada", () => {
    expect(utils.getBoxesQuantity(25, 0)).toBe(0);
    expect(utils.getBoxesQuantity(20, 0)).toBe(0);
    expect(utils.getBoxesQuantity(19, 0)).toBe(0);
  });

  test("Funciona con temperaturas negativas", () => {
    expect(utils.getBoxesQuantity(-3.77, 100)).toBe(13);
  });

  test("Si no se sabe la temperatura, se calculan 2 birras por persona, por las dudas", () => {
    expect(utils.getBoxesQuantity(null, 100)).toBe(34);
  });
});
