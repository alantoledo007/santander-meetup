import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import NoRecords from "src/components/shared/NoRecords";

const colums = [
  { field: "check_in_code", headerName: "Check-In", width: 140 },
  { field: "datetime", headerName: "Fecha y Hora", width: 160 },
  {
    field: "inscriptions",
    headerName: "Inscriptos",
    width: 160,
    valueGetter: (params) => {
      const inscriptions = params.row.inscriptions;
      return Array.isArray(inscriptions) ? inscriptions.length : 0;
    },
  },
];

export default function MeetupAdminList({ meetups, setSelected, selected }) {
  return (
    <>
      {meetups.length > 0 ? (
        <DataGridCoontainer>
          <DataGrid
            onSelectionModelChange={(arr) => {
              setSelected(Array.isArray(arr) ? arr[0] : undefined);
            }}
            selectionModel={selected}
            rows={meetups}
            columns={colums}
          />
        </DataGridCoontainer>
      ) : (
        <NoRecords message="No se econtraron meetups registradas" />
      )}
    </>
  );
}

const DataGridCoontainer = styled.div`
  height: 70vh;
  padding-bottom: 2em;
`;
