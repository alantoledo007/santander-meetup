import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Spinner from "../shared/Spinner";
import { ListItemIcon } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import {
  getBoxesQuantity,
  getMaxTempCloserFromDatetimes,
  GETrequestWithRetries,
} from "src/core/utils";
import moment from "moment";
import { meetupEdit } from "src/firebase/meetups";

const { REACT_APP_WEATHER_URI: WEATHER_URI } = process.env;

export default function MeetupDetails({ meetup }) {
  const [beerBoxes, setBeerBoxes] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isLoading = beerBoxes === undefined || beerBoxes === null;

  const inscriptions = Array.isArray(meetup.inscriptions)
    ? meetup.inscriptions.length
    : 0;

  const daysDiff = moment(meetup.datetime, "DD/MM/YYYY HH:mm")
    .startOf("day")
    .diff(moment(Date.now()).startOf("day"), "days");

  useEffect(() => {
    if (
      meetup.cancelled ||
      daysDiff < 0 ||
      (daysDiff <= 1 && typeof meetup.temperature === "number") ||
      (inscriptions === 0 && typeof meetup.temperature === "number")
    ) {
      return;
    }
    GETrequestWithRetries(WEATHER_URI)
      .then((res) => res.data)
      .then((res) => {
        meetupEdit(meetup.id, {
          temperature: getMaxTempCloserFromDatetimes(meetup.datetime, res.list),
        }).catch((error) => {
          console.log("fff", error);
        });
      })
      .catch((error) => {
        console.log("outPromise", JSON.stringify(error));
      });
  }, [daysDiff]);

  useEffect(() => {
    setBeerBoxes(getBoxesQuantity(meetup.temperature, inscriptions));
  }, [meetup.temperature, inscriptions]);

  return (
    <>
      <Card>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText
                primary="Codigo para hacer Check-In"
                secondary={`${meetup.check_in_code} (compartilo en la meetup)`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Fecha y Hora"
                secondary={meetup.datetime + " hs"}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Inscriptos" secondary={inscriptions} />
            </ListItem>
            {daysDiff < 0 || meetup.cancelled ? null : isLoading ? (
              <Spinner />
            ) : (
              <>
                <ListItem>
                  <ListItemText
                    primary="Temperatura"
                    secondary={
                      meetup.temperature
                        ? `${meetup.temperature}ºc`
                        : "No disponible"
                    }
                  />
                  {!meetup.temperature && (
                    <>
                      <ListItemIcon
                        component={Button}
                        aria-describedby={idPopover}
                        variant="contained"
                        color="primary"
                        onClick={handleClickPopover}
                      >
                        <InfoIcon color="secondary" />
                      </ListItemIcon>

                      <Popover
                        id={idPopover}
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Box p={1} maxWidth={200}>
                          <Box mb={1}>
                            <Typography variant="body2">
                              <strong>
                                De momento no hay una temperatura prevista para
                                la meetup
                              </strong>
                              , sin embargo, calculamos 2 birras por persona,
                              como medida de precaución.
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            Aproximadamente, se puede predecir la temeratura con
                            5 días de anticipación.
                          </Typography>
                        </Box>
                      </Popover>
                    </>
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Hay que comprar"
                    secondary={`${beerBoxes} cajas de birra`}
                  />
                </ListItem>
              </>
            )}
          </List>
        </CardContent>
      </Card>
    </>
  );
}
