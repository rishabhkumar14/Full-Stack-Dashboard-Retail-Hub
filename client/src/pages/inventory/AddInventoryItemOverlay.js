import { Button, Stack, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/inventory.css";
import { addItem } from "../../services"; // Import the addItem function from the service file

function AddInventoryItemOverlay(props) {
  const [errorMsg, setErrorMsg] = useState("");

  function handleAddItem() {
    let itemName = document.getElementById("insert-item-name").value;
    let description = document.getElementById("insert-item-description").value;
    let price = document.getElementById("insert-item-price").value; // Add this line to get price

    if (!itemName) {
      setErrorMsg("Please enter a valid value for Item Name!");
    } else if (!description) {
      setErrorMsg("Please enter a valid value for Description!");
    } else if (!price || isNaN(price)) {
      setErrorMsg("Please enter a valid numeric value for Price!");
    } else if (!props.categoryId) {
      setErrorMsg("Category ID is missing!");
    } else {
      setErrorMsg("");

      let params = {
        item_name: itemName,
        item_description: description,
        price: parseFloat(price), // Parse price as float
        categoryId: props.categoryId,
        quantity: 0,
      };

      // Call the addItem function from the service file
      addItem(params)
        .then(() => {
          // If item added successfully, fetch updated inventory items and close overlay
          props.fetchInventoryItems();
          closeOverlay();
        })
        .catch((error) => {
          console.error("Error adding item:", error);
          // Check if the error message contains the unique constraint violation message
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            // Set the error message to be displayed to the user
            setErrorMsg(error.response.data.error);
          } else {
            // If it's not a unique constraint violation, display a generic error message
            setErrorMsg(
              "Failed to add item or item with same name exists. Please try again later."
            );
          }
        });
    }
  }

  function closeOverlay() {
    props.setAddState(false);
  }

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <Paper elevation={3} className="add-inventory-item-overlay-container">
        <div className="overlay-title">
          Add Inventory Item
          <CloseIcon
            style={{ float: "right", cursor: "pointer" }}
            onClick={closeOverlay}
          />
        </div>
        <hr className="hr" />
        <Stack
          className="overlay-content-body"
          direction={"column"}
          spacing={3}
        >
          <TextField
            id="insert-item-name"
            label="Item Name"
            size="small"
            required
          />
          <TextField
            id="insert-item-description"
            label="Description"
            size="small"
            required
          />
          <TextField
            id="insert-item-price"
            label="Price"
            size="small"
            required
          />
        </Stack>
        <div className="error-msg">{errorMsg}</div>
        <Stack direction={"row"} spacing={3} className="buttons">
          <Button variant="outlined" onClick={closeOverlay}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddItem}>
            Save
          </Button>
        </Stack>
      </Paper>
    </Backdrop>
  );
}

export default AddInventoryItemOverlay;
