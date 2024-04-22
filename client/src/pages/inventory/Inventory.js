import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCategoryOverlay from "./AddCategoryOverlay";
import EditCategoryOverlay from "./EditCategoryOverlay";
import CategoryView from "./CategoryView";
import { Box, Stack } from "@mui/material";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  deleteItem,
  fetchItemsByCategory,
} from "../../services";
import { useAppContext } from "../../appContext.js";

function Inventory(props) {
  const [categories, setCategories] = useState([]);
  const [openAddCategoryOverlay, setOpenAddCategoryOverlay] = useState(false);
  const [openEditCategoryOverlay, setOpenEditCategoryOverlay] = useState(false);
  const [openCategoryView, setOpenCategoryView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const { drawerOpen } = useAppContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchData();
  }, []);

  async function handleAddCategory(categoryData) {
    try {
      await addCategory(categoryData);
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  }

  async function handleUpdateCategory(categoryId, categoryData) {
    try {
      await updateCategory(categoryId, categoryData);
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  }

  async function handleDeleteCategory(categoryId) {
    // Show a confirmation dialog before deleting the category
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return; // If the user cancels the operation, exit the function
    }

    try {
      // Fetch all items belonging to the category
      const itemsToDelete = await fetchItemsByCategory(categoryId);

      // Delete each item
      await Promise.all(
        itemsToDelete.map(async (item) => {
          await deleteItem(item.id);
        })
      );

      // Once all items are deleted, delete the category
      await deleteCategory(categoryId);

      // If the deletion is successful, update the local state
      const updatedCategories = await fetchCategories();
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }

  function handleOpenCategoryView(category) {
    setOpenCategoryView(true);
    setSelectedCategory(category);
  }

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#f0f0f9",
        flexGrow: 1,
        p: 3,
        transition: "margin-left 0.3s ease",
        marginLeft: `${drawerOpen ? 200 : 0}px`,
        width: `calc(100% - ${drawerOpen ? 200 : 0}px)`,
        height: "200vh",
      }}
    >
      <br />
      <div className="inventory-container">
        {openCategoryView ? (
          <CategoryView
            selectedCategory={selectedCategory}
            setOpenCategoryView={(flag) => setOpenCategoryView(flag)}
          />
        ) : (
          <>
            {openAddCategoryOverlay && (
              <AddCategoryOverlay
                handleAddCategory={handleAddCategory}
                setOpenAddCategoryOverlay={(flag) => {
                  setOpenAddCategoryOverlay(flag);
                }}
              />
            )}
            {openEditCategoryOverlay && selectedCategory && (
              <EditCategoryOverlay
                handleUpdateCategory={handleUpdateCategory}
                setOpenEditCategoryOverlay={(flag) => {
                  setOpenEditCategoryOverlay(flag);
                }}
                selectedCategory={selectedCategory}
              />
            )}
            <Grid container spacing={3}>
              <Grid key="add-category" className="">
                <Paper
                  elevation={1}
                  className="paper-inventory"
                  onClick={() => setOpenAddCategoryOverlay(true)}
                >
                  <Stack direction={"row"}>
                    <DataSaverOnIcon
                      style={{
                        color: "#2563eb",
                        fontSize: "45px",
                        marginTop: "35px",
                        marginLeft: "15px",
                      }}
                    />
                    <p className="add-category-txt">Add Category</p>
                  </Stack>
                </Paper>
              </Grid>
              {categories.map((category) => {
                return (
                  <Grid key={category.id} className="grid-item-container">
                    <Paper elevation={1} className="paper-inventory">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{ display: "flex", alignItems: "center" }}
                          onClick={() => handleOpenCategoryView(category)}
                        >
                          <span className="category-icon">
                            {category.emoji}
                          </span>
                          <p className="grid-content">
                            {category.category_name}
                          </p>
                        </div>
                        <div className="action-icons">
                          <IconButton
                            onClick={() => {
                              setSelectedCategory(category);
                              setOpenEditCategoryOverlay(true);
                            }}
                          >
                            <EditIcon
                              style={{
                                color: "grey",
                                cursor: "pointer",
                                marginRight: "5px",
                                fontSize: "20px",
                              }}
                            />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <DeleteIcon
                              style={{
                                color: "#f44336",
                                cursor: "pointer",
                                fontSize: "20px",
                              }}
                            />
                          </IconButton>
                        </div>
                      </div>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </div>
    </Box>
  );
}

export default Inventory;
