import { Divider, Paper, Stack, Button, Grid } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import "../../styles/inventory.css";
import InventoryTable from "../Table";
import EditInventoryItemOverlay from "./EditInventoryItemOverlay";
import AddInventoryItemOverlay from "./AddInventoryItemOverlay";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "@mui/material/IconButton";
import { fetchItemsByCategory } from "../../services";
import { updateItem } from "../../services"; // Import the addItem function from the service file
import { deleteItem } from "../../services";

function CategoryView(props) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editState, setEditState] = useState(false);
  const [addState, setAddState] = useState(false);

  React.useEffect(() => {
    fetchInventoryItems();
  }, [props.selectedCategory]);

  async function fetchInventoryItems() {
    try {
      const response = await fetchItemsByCategory(props.selectedCategory.id);
      setItems(response);
    } catch (error) {
      console.error("Error fetching items by category:", error);
    }
  }

  function handleItemEdit(item) {
    setSelectedItem(item);
    setEditState(true);
  }

  function handleItemAdd(params) {
    setAddState(true);
  }

  async function handleItemDelete(item) {
    // Show a confirmation dialog before deleting the item
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) {
      return; // If the user cancels the operation, exit the function
    }

    try {
      // Call the deleteItem function from your service file
      await deleteItem(item.id);
      // If the deletion is successful, update the local state
      const updatedItems = items.filter((i) => i.id !== item.id);
      setItems(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  const columns = [
    {
      field: "item_name",
      headerName: "Item Name",
      width: 320,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "item_description",
      headerName: "Item Description",
      width: 350,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "availability",
      headerName: "Availability",
      align: "center",
      headerAlign: "center",
      description: "This column is not sortable.",
      width: 170,
      renderCell: (params) => {
        const quantity = params.row.quantity || 0;
        return quantity > 0 ? "Available" : "Out of Stock";
      },
    },
    // {
    //   field: "availability",
    //   headerName: "Availability",
    //   align: "center",
    //   headerAlign: "center",
    //   description: "This column is not sortable.",
    //   width: 170,
    // },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      description: "This column is not sortable.",
      sortable: false,
      width: 220,
      renderCell: (params) => {
        return (
          <Stack direction={"row"}>
            <EditIcon className="icon" onClick={() => handleItemEdit(params)} />
            <DeleteIcon
              className="icon"
              onClick={() => handleItemDelete(params)}
            />
          </Stack>
        );
      },
    },
  ];

  return (
    <div>
      {addState && (
        <AddInventoryItemOverlay
          fetchInventoryItems={fetchInventoryItems}
          categoryId={props.selectedCategory.id} // Pass category_id prop here
          setAddState={setAddState}
        />
      )}
      {editState && (
        <EditInventoryItemOverlay
          fetchInventoryItems={fetchInventoryItems}
          categoryId={props.selectedCategory.id}
          setEditState={setEditState}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          updateItem={updateItem}
        />
      )}

      <Paper elevation={1} className="category-top-pane">
        {/* Render category details here */}
        <Stack direction="column">
          <KeyboardBackspaceIcon
            className="close-btn"
            onClick={() => props.setOpenCategoryView(false)}
          />

          <Stack direction="row" alignItems="center">
            <p className="emoji">{props.selectedCategory.emoji}</p>
            <p className="category-title-txt">
              {props.selectedCategory.category_name}
            </p>
            <Divider
              className="category-title-divider"
              variant="middle"
              orientation="vertical"
              flexItem
            />
            <p className="category-description-txt">
              {props.selectedCategory.category_description}
            </p>
          </Stack>
        </Stack>
      </Paper>

      <Grid container alignItems="center" className="btn-add-item">
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleItemAdd}
          >
            Add Item
          </Button>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            fontStyle="italic"
            fontSize={12}
          >
            (users can use the below given table to sort or search the items in
            the table by hovering over the column heading and clicking the three
            dots)
          </Typography>
        </Grid>
      </Grid>

      <div className="table">
        <InventoryTable
          // setSelectedItem={setSelectedItem}
          rows={items}
          columns={columns}
        />
      </div>
    </div>
  );
}

export default CategoryView;
