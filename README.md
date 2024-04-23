# RetailHub Dashboard

RetailHub Dashboard is a web application designed to provide a comprehensive overview of key metrics and data visualization for retail businesses.

## Features

- **Dashboard Overview:** View key metrics such as weekly sales, new users, item orders, bug reports, employees, and vendors all returned from our prisma db tables.
- **Customized Graphs:** Visualize data using customized bar charts, pie charts, line charts, and area charts.
- **Data Management:** Add, update, and delete categories and items through the web interface.

- **Responsive Design:** User-friendly interface optimized for desktop and mobile devices.

## Authentication and Middleware

- **Auth0 Authentication:** Authentication has been implemented using Auth0 to secure inventory access and handle POST requests.
- **Middleware:** A middleware named `/verify` has been created to handle GET and POST requests to interact with our Prisma database.

## External Weather API Integration

The RetailHub Dashboard includes integration with an external weather API to provide information about the weather conditions of the store location.

## Custom Components

Custom components have been created using Material-UI (MUI) to enhance the functionality and aesthetics of the RetailHub Dashboard.

## Tests

Tests have been added in the `test` folder to ensure the functionality and reliability of the RetailHub Dashboard.

## Accessibility

Accessibility has been maintained for all the working pages of the RetailHub Dashboard, ensuring usability for all users, including those with disabilities.

## Light House Report

The Light House report for this project is available in PDF form in the `client/src/assets` folder.

## Code Structure and Naming Conventions

The codebase follows industry standards with well-maintained variable names and folder structure for clarity and consistency.

## API Endpoints

- `GET /dashboard-data`: Fetches data for populating the dashboard graphs.
- `GET /categories`: Retrieves a list of all categories.
- `POST /categories`: Adds a new category.
- `PUT /categories/:id`: Updates an existing category.
- `DELETE /categories/:id`: Deletes a category.
- `GET /items/:categoryId`: Retrieves items by category.
- `POST /items`: Adds a new item.
- `PUT /items/:id`: Updates an existing item.
- `DELETE /items/:id`: Deletes an item.

## Database Schema

The database schema includes two main tables:

- **User:** Stores user details such as username, email, and password.
- **Category:** Stores different types of categories with their descriptions and emojis.
- **Item:** Stores unique items belonging to a category, including item name, description, price, quantity, and category ID.

## Conclusion

The RetailHub Dashboard offers a robust solution for retail businesses, providing comprehensive insights, intuitive data visualization, and seamless data management. With its user-friendly interface, responsive design, and adherence to industry standards, this dashboard empowers retailers to make informed decisions and drive business growth. We welcome feedback, contributions, and suggestions for further improvements to enhance the RetailHub experience.
