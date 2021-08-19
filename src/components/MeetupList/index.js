export default function MeetupList({ meetups }) {
  return (
    <>{meetups.length > 0 ? <div>listar</div> : <div>No hay meetups</div>}</>
  );
}
