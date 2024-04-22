import * as React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

export default function InventoryTable(props) {
  console.log("Inventory table props", props);

  function handleRowClick(params) {
    if (props.setSelectedItem) {
      props.setSelectedItem(params.row);
    }
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <DataGrid
        key={props.key1}
        rows={props.rows}
        columns={props.columns}
        autoHeight={true}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={handleRowClick}
        disableSelectionOnClick
      />
    </Paper>
  );
}
