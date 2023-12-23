<!-- Spearheaded the development of Joelbay Collections, showcasing expertise in crafting robust backend solutions for e-commerce platforms.

Leveraged a cutting-edge tech stack, mastering Node.js, Express, Sequelize, and JWT, while seamlessly integrating external services for enhanced functionality.
Demonstrated skills on a live site, highlighting proficiency in creating and optimizing API routes for seamless user experiences and efficient data management. -->

# Joelbay Collections Full Stack Portfolio

## Overview

Welcome to Joelbay Collections, a Full Stack portfolio project showcasing my skills as a junior developer. This project combines a frontend catalog interface with a robust backend system, offering a seamless e-commerce experience for users. The frontend, built with React, provides a user-friendly interface for browsing and interacting with listings, while the backend, powered by Node.js and Express, handles data management, authentication, and more.

## Frontend Highlights

-   **Technologies Used:**

    -   React: v18.2.0
    -   React Router: v6.19.0
    -   Sass: v1.69.5
    -   Typewriter Effect: v2.21.0
    -   Vite: v5.0.0
    -   TypeScript: v5.2.2
    -   ESLint: v8.53.0
    -   Prettier: v3.1.0

-   **Features:**
    -   Dynamic routing for seamless navigation
    -   Responsive design for optimal user experience on various devices
    -   Contact forms on each listing for user inquiries
    -   Admin functionality for managing listings

## Backend Highlights

-   **Technologies Used:**

    -   Node.js: Backend runtime environment
    -   Express: Web application framework for Node.js
    -   Sequelize: Promise-based Node.js ORM for PostgreSQL
    -   JWT (JSON Web Tokens): Securely transmit information between parties
    -   Other Dependencies: SendGrid for email, Bcrypt for password hashing, and more.

-   **Features:**
    -   Secure user authentication using JWT
    -   Powerful Sequelize ORM for efficient database interactions
    -   Robust API routes for managing listings, admin accounts, and contact inquiries
    -   Email functionality for item inquiries using SendGrid

## Getting Started

To explore the full functionality of Joelbay Collections locally, follow these steps:

1. **Clone the Repository:**
    ```bash
    git clone [https://github.com/lanbow93/joelbay_frontend]
    ```
2. **Install Dependencies**
    ```bash
    pnpm install
    ```
3. **View In Browser**

    ```plaintext
    Open your browser and go to http://localhost:5173 to view the application.
    ```

    ## Pages/Components

    - Listings Page (`Listings.tsx`)
        - The main component that renders the listings page. It includes the logic for fetching and displaying listings, as well as handling filter options.
    - Single Listing Page (`SingleListing.tsx`)
        - The Single Listing Page displays detailed information about a specific listing. It allows users to view images, details, and make inquiries through a contact form.
    - Specials Page (`Specials.tsx`)
        - The Specials Page displays listings with special offers or unique conditions. It includes dynamic filtering options for categories, brands, and conditions.
    - Admin Login Page (`AdminLogin.tsx`)
        - To access the admin dashboard, administrators can log in using the Admin Login Page component.
    - Navigation Bar (`Navigation.tsx`)
      -The Navigation Bar component provides a navigation menu for the Joelbay Collections website. It includes links to different pages and a responsive menu for smaller screens.

#### State

-   `isLoading`: Manages the loading state during data retrieval.
-   `isModalActive`: Controls the visibility of the error modal.
-   `errorData`: Holds error-related information if any occurs during data fetching.
-   `listingData`: Stores the retrieved listings data.
-   `selectedFilters`: Manages the selected filter options for categories, brands, and conditions.
-   `isLoading`: Manages the loading state during data retrieval.
-   `isModalActive`: Controls the visibility of the error modal.
-   `errorData`: Holds error-related information if any occurs during data fetching.
-   `emailForm`: Manages the form data for making inquiries.
-   `currentImageIndex`: Keeps track of the currently displayed image index.
-   `transformValue`: Manages the transform value for image zoom effect.
-   `menuOpen`: Manages the state of the responsive menu.

#### Methods

-   `getListings`: Asynchronously fetches listings data from the backend API.
-   `handleCheckboxChange`: Handles checkbox changes for filter options.
-   `handleMouseMove`: Updates the transform value based on mouse movement for image zoom.
-   `handleMouseLeave`: Resets the transform value on mouse leave.
-   `handleInputChange`: Handles changes in the contact form input fields.
-   `handleFormSubmission`: Submits the contact form data for making inquiries.
-   `getSingleListing`: Fetches details of the selected listing.
-   `handleMenuToggle`: Toggles the state of the responsive menu.
