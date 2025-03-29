# EmployWise Frontend Assignment

## Project Overview
This is a frontend application for the EmployWise assignment. It includes user authentication, user listing, editing, and deletion functionalities. The project is built using React with Vite and styled using TailwindCSS.

## [Live Link](https://jobtask-employwise.vercel.app/)

## Features
- **User Authentication**: Login functionality with token-based authentication.
- **User Management**:
  - Fetch and display user list.
  - Edit user details.
  - Delete users.
- **Pagination**: Supports server-side pagination.
- **API Handling**: Uses Axios for API calls.

## Technologies Used
- **React (Vite)** – For frontend development.
- **React Router** – For routing between pages.
- **TailwindCSS** – For styling.
- **Axios** – For API requests.
- **React Data Table Component** – For user listing and pagination.

## Installation & Setup
### Prerequisites
Ensure you have **Node.js** and **Yarn** installed.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/ii-shimul/jobtask-employwise
   cd jobtask-employwise
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Start the development server:
   ```sh
   yarn dev
   ```

## API Endpoints
- **Login**: `POST https://reqres.in/api/login`
- **Fetch Users**: `GET https://reqres.in/api/users?page={page}`
- **Edit User**: `PUT https://reqres.in/api/users/{id}`
- **Delete User**: `DELETE https://reqres.in/api/users/{id}`

## Deployment
To deploy the application:
1. Build the project:
   ```sh
   yarn build
   ```
2. Deploy to a hosting service like **Vercel** or **Netlify**.

## Author
- **Injamamul Islam Shimul**
- **Email: islamshimul27@gmail.com**

