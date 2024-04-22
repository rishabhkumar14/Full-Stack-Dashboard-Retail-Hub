import { Button, Stack, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/inventory.css";

function EditCategoryOverlay(props) {
  const [categoryData, setCategoryData] = useState({
    category_name: "",
    category_description: "",
    emoji: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Populate category data when the overlay is opened for editing
    setCategoryData({
      category_name: props.selectedCategory.category_name,
      category_description: props.selectedCategory.category_description,
      emoji: props.selectedCategory.emoji,
    });
  }, [props.selectedCategory]);

  function handleChange(event) {
    const { id, value } = event.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  async function handleUpdateCategory() {
    const { category_name, category_description, emoji } = categoryData;
    // Perform validation
    if (!category_name.trim()) {
      setErrorMsg("Please enter category name!");
      return;
    }
    if (!category_description.trim()) {
      setErrorMsg("Please enter category description!");
      return;
    }

    try {
      await props.handleUpdateCategory(props.selectedCategory.id, categoryData);
      props.setOpenEditCategoryOverlay(false);
    } catch (err) {
      console.error("Error while updating category:", err);
    }
  }

  function closeOverlay() {
    props.setOpenEditCategoryOverlay(false);
  }

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <Paper elevation={3} className="overlay-container">
        <div className="overlay-title">
          Edit category
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
            required
            id="category_name" // Update the ID to match the state key
            label="Category Name"
            size="small"
            value={categoryData.category_name}
            onChange={handleChange}
          />
          <TextField
            id="emoji"
            label="Category Icon"
            size="small"
            value={categoryData.emoji}
            onChange={handleChange}
          />
          <TextField
            required
            id="category_description" // Update the ID to match the state key
            label="Category Description"
            multiline
            rows={4}
            value={categoryData.category_description}
            onChange={handleChange}
          />
        </Stack>
        <div className="error-msg">{errorMsg}</div>
        <Stack direction={"row"} spacing={3} className="buttons">
          <Button variant="outlined" onClick={closeOverlay}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdateCategory}>
            Save
          </Button>
        </Stack>
      </Paper>
    </Backdrop>
  );
}

export default EditCategoryOverlay;
