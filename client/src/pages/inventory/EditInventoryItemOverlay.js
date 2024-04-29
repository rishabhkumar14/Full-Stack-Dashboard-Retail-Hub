import { Button, Stack, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/inventory.css";

function EditInventoryItemOverlay(props) {
  const [itemData, setItemData] = useState({
    price: props.selectedItem.price || "",
    item_name: props.selectedItem.item_name || "",
    description: props.selectedItem["item-description"] || "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    console.log("Selected item::::", props.selectedItem);

    setItemData({
      price: props.selectedItem.row.price,
      item_name: props.selectedItem.row.item_name,
      description: props.selectedItem.row.item_description,
    });
  }, [props.selectedItem]);

  function handleChange(event) {
    const { id, value } = event.target;
    setItemData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  async function handleEditSave() {
    const { price, item_name, description } = itemData;
    const parsedPrice = parseFloat(price);
    // Perform validation
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMsg("Please enter a valid value for price!");
      return;
    }
    if (!item_name.trim()) {
      setErrorMsg("Please enter a valid value for item name!");
      return;
    }
    if (!description.trim()) {
      setErrorMsg("Please enter a valid value for description!");
      return;
    }

    try {
      const params = {
        item_id: props.selectedItem.id,
        price: parsedPrice,
        item_name: item_name,
        item_description: description,
      };
      const updatedItem = await props.updateItem(params.item_id, params);
      // Update state with the response received after updating
      setItemData(updatedItem);
      props.fetchInventoryItems();
      props.setEditState(false);
    } catch (err) {
      console.error("Error while updating item:", err);
    }
  }

  function closeOverlay() {
    props.setEditState(false);
  }

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <Paper elevation={3} className="edit-inventory-item-overlay-container">
        <div className="overlay-title">
          Edit Inventory Item Details
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
            id="item_name"
            label="Item Name"
            size="small"
            value={itemData.item_name}
            onChange={handleChange}
            disabled
          />

          <TextField
            id="price"
            label="Price"
            size="small"
            value={itemData.price}
            onChange={handleChange}
          />

          <TextField
            required
            id="description"
            label="Item Description"
            multiline
            rows={3}
            value={itemData.description}
            onChange={handleChange}
          />
        </Stack>
        <div className="error-msg">{errorMsg}</div>
        <Stack direction={"row"} spacing={3} className="buttons">
          <Button variant="outlined" onClick={closeOverlay}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </Stack>
      </Paper>
    </Backdrop>
  );
}

export default EditInventoryItemOverlay;
