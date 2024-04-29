import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";
import {
  Alert,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import Paper from "@mui/material/Paper";

function createData(id, name, price, count) {
  return { id, name, price, count };
}

const rows = [];

export default function VendorPurchaseOrder() {
  const [allcategory, setAllcategory] = React.useState([]);
  const [allitems, setAllitems] = React.useState([]);
  const [allvendors, setallvendors] = React.useState([]);

  const [vendorID, setvendorID] = React.useState([]);
  const [counter, setcounter] = React.useState(0);
  const [itemId, setItemId] = React.useState(0);

  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await getItemCategories({});
  //       setAllcategory(response);
  //     } catch (err) {
  //       console.log("Error while calling API");
  //     }
  //   })();
  // }, []);

  const [category, setcategory] = React.useState([]);
  const handleChangeCategory = (event) => {
    setcategory(event.target.value);
    //setItem([]);
  };

  const [item, setItem] = React.useState([]);
  const handleChangeItem = (event, index) => {
    setItem(event.target.value);
    setItemId(index.props.children);
    // setItem(event.target.value);
  };

  // React.useEffect(() => {
  //   if (category) {
  //     (async () => {
  //       try {
  //         let userDetails = JSON.parse(localStorage.getItem("userdetails"));
  //         const response = await getItemsByCategoryAndStoreId({
  //           storeId: userDetails.chain_id,
  //           categoryId: category,
  //         });
  //         setAllitems(response);
  //       } catch (err) {
  //         console.log("Error while calling API");
  //       }
  //     })();
  //   }
  // }, [category]);

  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       let userDetails = JSON.parse(localStorage.getItem("userdetails"));
  //       const response = await getAllVendorsDetails({
  //         chain_id: userDetails.chain_id,
  //       });
  //       setallvendors(response);
  //     } catch (err) {
  //       console.log("Error while calling API");
  //     }
  //   })();
  // }, []);

  const [vendor, setvendor] = React.useState([]);
  const handleChangeVendors = (event, index) => {
    setvendor(event.target.value);
    setvendorID(index.props.value);
  };

  const [price, setPrice] = React.useState("");
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const [count, setCount] = React.useState("");
  const handleChangeCount = (event) => {
    setCount(event.target.value);
  };

  const [tableData, setTableData] = React.useState(rows);

  const handleClickButton = () => {
    const newData = createData(item, itemId, count, price);
    setTableData([...tableData, newData]);
    setcategory("");
    setItem("");
    setPrice("");
    setCount("");
  };

  // React.useEffect(() => {
  //   if (category && tableData.length > 0) {
  //     (async () => {
  //       try {
  //         let userDetails = JSON.parse(localStorage.getItem("userdetails"));

  //         // Assuming data is available in the scope or you should get it from tableData
  //         const data = tableData[0]; // Adjust this accordingly

  //         const response = await insertOrderFromJson({
  //           storeId: userDetails.chain_id,
  //           vendorId: vendorID,
  //           itemId: data.id,
  //           price: parseInt(data.price),
  //           count: parseInt(data.count),
  //         });
  //       } catch (err) {
  //         console.error("Error in useEffect:", err);
  //       }
  //     })();
  //   }
  // }, [category, tableData]);

  // const handleSubmit = async () => {
  //   let userDetails = JSON.parse(localStorage.getItem("userdetails"));
  //   let vendorsID = vendorID;

  //   for (const data of tableData) {
  //     try {
  //       const response = await insertOrderFromJson({
  //         storeId: userDetails.chain_id,
  //         vendorId: vendorsID,
  //         itemId: data.id,
  //         price: parseInt(data.price),
  //         count: parseInt(data.count),
  //       });
  //       setcounter((prevCounter) => prevCounter + 1);
  //       window.alert("Order Placed Successfully");
  //     } catch (error) {
  //       console.error("Error during order insertion:", error);
  //     }
  //   }

  //   setTableData([]);
  //   setcategory("");
  //   setItem("");
  //   setPrice("");
  //   setCount("");
  //   setvendor("");
  // };

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      style={{
        paddingTop: "20px",
        paddingLeft: 40,
        paddingBottom: "40px",
        paddingRight: 40,
      }}
      //className="dashboard-container"
    >
      <Grid item xs={6}>
        <Grid
          container
          style={{ paddingRight: 20, paddingTop: "30px" }}
          spacing={3}
        >
          <Grid item xs={12} sm={12}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Vendor Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={vendor}
                  label="Vendor Name"
                  disabled={allvendors.length === 0 || tableData[0]}
                  onChange={handleChangeVendors}
                >
                  {allvendors &&
                    allvendors.map((data, index) => (
                      <MenuItem value={data.vendor_id}>
                        {data.vendor_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="category"
                  onChange={handleChangeCategory}
                >
                  {allcategory && allcategory.length === 0 ? (
                    <MenuItem value="None">Books</MenuItem>
                  ) : (
                    allcategory &&
                    allcategory.map((data, index) => (
                      <MenuItem key={data.category_id} value={data.category_id}>
                        {data.category_name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Item</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={item}
                  label="item"
                  disabled={allitems.length === 0}
                  onChange={handleChangeItem}
                >
                  {allitems &&
                    allitems.map((data, index) => (
                      <MenuItem key={data.item_id} value={data.item_id}>
                        {data.item_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="number"
                  value={price}
                  onChange={handleChangePrice}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Price"
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="number"
                  value={count}
                  onChange={handleChangeCount}
                  label="Count"
                />
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12}>
            <center>
              <br />
              <Button
                onClick={handleClickButton}
                variant="outlined"
                color="primary"
                size="small"
              >
                Add to order list
              </Button>
            </center>
          </Grid>
        </Grid>
      </Grid>

      {/* table */}
      <Grid item xs={6}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={
            {
              //height: "250px",
            }
          }
        >
          <Grid item xs={12} sm={12}>
            <TableContainer>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Item Id</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell align="right">Item Count</TableCell>
                    <TableCell align="right">Item Price&nbsp;($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Grid
                          container
                          justifyContent="center"
                          spacing={2}
                          style={{ height: "250px" }}
                          alignItems="center"
                          padding={2}
                        >
                          <Grid item xs={12} sm={12}>
                            <ShoppingBasketTwoToneIcon
                              color="#D3D3D3"
                              style={{ fontSize: 60 }}
                            />
                            <br />
                            <br />
                            <span
                              style={{
                                fontSize: 15,
                                fontWeight: 300,
                              }}
                            >
                              To add items to the vendor order, fill the
                              adjacent form.
                            </span>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ) : (
                    tableData.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>

                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.count}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <br />
            <center>
              <Button
                // onClick={handleSubmit}
                variant="contained"
                color="primary"
                size="small"
                endIcon={<SendIcon />}
              >
                Submit Order
              </Button>
            </center>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
