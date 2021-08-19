import moment from "moment";

export default function MeetupDetails({ meetup, onRegistering }) {
  const getDate = (subtract = 0) => {
    return moment(meetup.datetime, "DD/MM/YYYY")
      .subtract(subtract, "days")
      .format("DD [de] MMMM");
  };
  return (
    <div>
      <h1>Meetup</h1>
      <p>Tienes hasta el {getDate(1)} para decidirte</p>
      <div>
        <div>
          <h2>{getDate()}</h2>
          <p>18:30 hs</p>
        </div>
        <div>
          <button onClick={onRegistering}>Confirmar asistencia</button>
          <p>Al presionar el botón te inscribiras a la meetup</p>
        </div>
      </div>
    </div>
  );
}
