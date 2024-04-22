import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Chip, Grid, LinearProgress } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import FailIcon from "@mui/icons-material/Close";
const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    width: 180,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 220,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "paymentMode",
    headerName: "Payment Mode",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    type: "number",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
  //   {
  //     field: "storeName",
  //     headerName: "Store Name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     headerAlign: "center",
  //     align: "center",
  //     width: 200,
  //     // valueGetter: (params) =>
  //     //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  //   },
  {
    field: "jobStatus",
    headerName: "Payement Status",
    align: "center",
    headerAlign: "center",
    description: "This column is not sortable.",
    sortable: false,
    width: 220,
    renderCell: (params) => {
      //const jobStatus = this.state.execution_status[params.id - 1];
      const job_statuses = ["completed", "failed", "pending"];
      const random = Math.floor(Math.random() * job_statuses.length);
      const jobStatus = job_statuses[random];
      return (
        <Grid container direction="row" justifyContent="center" spacing={2}>
          {jobStatus === "completed" ? (
            <Chip
              icon={<DoneIcon fontSize="small" style={{ color: "#388e3c" }} />}
              variant="outlined"
              size="small"
              style={{ borderColor: "#388e3c", color: "#388e3c" }}
              label="Success"
            />
          ) : jobStatus === "failed" ? (
            <Chip
              icon={<FailIcon fontSize="small" style={{ color: "#d32f2f" }} />}
              variant="outlined"
              size="small"
              style={{
                borderColor: "#d32f2f",
                color: "#d32f2f",
                paddingLeft: "5px",
              }}
              label="Failed"
            />
          ) : (
            <Chip
              icon={
                <Box sx={{ width: "20%", padding: 0 }}>
                  <LinearProgress />
                </Box>
              }
              variant="outlined"
              size="small"
              style={{
                borderColor: "#0076ce",
                color: "#0076ce",
                paddingLeft: "5px",
                width: "50%",
              }}
              label="Pending"
            />
          )}
        </Grid>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    customerName: "Alice Johnson",
    quantity: 3,
    paymentMode: "Credit Card",
    totalPrice: 35,
    storeName: "SuperMart",
  },
  {
    id: 2,
    customerName: "Bob Williams",
    quantity: 2,
    paymentMode: "Cash",
    totalPrice: 25,
    storeName: "MegaStore",
  },
  {
    id: 3,
    customerName: "Charlie Brown",
    quantity: 1,
    paymentMode: "Debit Card",
    totalPrice: 15,
    storeName: "Grocery Haven",
  },
  {
    id: 4,
    customerName: "Diana Miller",
    quantity: 4,
    paymentMode: "Cash",
    totalPrice: 45,
    storeName: "QuickMart",
  },
  {
    id: 5,
    customerName: "Edward Davis",
    quantity: 2,
    paymentMode: "Credit Card",
    totalPrice: 30,
    storeName: "Corner Shop",
  },
  {
    id: 6,
    customerName: "Fiona Smith",
    quantity: 1,
    paymentMode: "Cash",
    totalPrice: 10,
    storeName: "City Market",
  },
  {
    id: 7,
    customerName: "George Wilson",
    quantity: 3,
    paymentMode: "Debit Card",
    totalPrice: 40,
    storeName: "Fresh Foods",
  },
  {
    id: 8,
    customerName: "Helen Anderson",
    quantity: 2,
    paymentMode: "Credit Card",
    totalPrice: 28,
    storeName: "Local Grocers",
  },
  {
    id: 9,
    customerName: "Ian Taylor",
    quantity: 1,
    paymentMode: "Cash",
    totalPrice: 12,
    storeName: "Neighborhood Market",
  },
  {
    id: 10,
    customerName: "Julia Moore",
    quantity: 4,
    paymentMode: "Credit Card",
    totalPrice: 50,
    storeName: "Discount Warehouse",
  },
];

export default function FinancesExpense() {
  return (
    <div style={{ width: "100%", borderColor: "primary" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableSelectionOnClick
      />
    </div>
  );
}
