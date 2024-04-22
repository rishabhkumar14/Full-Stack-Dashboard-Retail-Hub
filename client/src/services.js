// Define base URL
const BASE_URL = "http://localhost:8000";

// Function to fetch all categories
export async function fetchCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Function to add a new category
// export async function addCategory(categoryData) {
//   try {
//     const response = await fetch(`${BASE_URL}/categories`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(categoryData),
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error adding category:", error);
//     throw error;
//   }
// }

// Function to add a new category
export async function addCategory(categoryData) {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_name: categoryData.category_name,
        category_description: categoryData.category_description,
        emoji: categoryData.emoji,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
}

// Function to update an existing category
export async function updateCategory(categoryId, categoryData) {
  try {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_name: categoryData.category_name,
        category_description: categoryData.category_description,
        emoji: categoryData.emoji,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

// Function to delete a category
export async function deleteCategory(categoryId) {
  try {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

// Function to fetch all items by category
export async function fetchItemsByCategory(categoryId) {
  try {
    const response = await fetch(`${BASE_URL}/items/${categoryId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching items by category:", error);
    throw error;
  }
}

// Function to add a new item
export async function addItem(itemData) {
  try {
    const response = await fetch(`${BASE_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}

// Function to update an existing item
export async function updateItem(itemId, itemData) {
  try {
    const response = await fetch(`${BASE_URL}/items/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
}

// Function to delete an item
export async function deleteItem(itemId) {
  try {
    const response = await fetch(`${BASE_URL}/items/${itemId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}
