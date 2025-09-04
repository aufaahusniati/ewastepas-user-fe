# E-Whale - User Frontend

Welcome to E-Whale, an innovative solution for managing and picking up electronic waste. This repository contains the client-side (frontend) of the E-Whale application that interacts with users.

## About The Project

E-Whale is a web platform designed to make the process of recycling electronic waste (e-waste) easier for the community. Inspired by whales, which are often threatened by waste, E-Whale aims to reduce the negative impact of electronic waste on the environment.

This application allows users to select the type of e-waste to be picked up, schedule a pickup time, and track the order status in real-time.

### Key Features

* **User Authentication:** Registration, login, OTP verification, and password recovery system.
* **E-Waste Catalog:** Users can browse various types of electronic waste available for pickup.
* **Cart System:** Add or adjust the quantity of waste for pickup.
* **Pickup Scheduling:** Users can select their preferred date and time for pickup.
* **Order Tracking:** Monitor the status of the pickup in real-time, from waiting to completion.
* **Profile Management:** Users can manage their personal data, address, and change their password.
* **Informative Pages:** An "About Us" page that introduces the team behind the E-Whale project.

### 🛠️ Technologies Used

* **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces.
* **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling.
* **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework for rapid UI development.
* **[React Router](https://reactrouter.com/)** - For client-side routing.
* **[Axios](https://axios-http.com/)** - A promise-based HTTP client for API communication.
* **[React Slick](https://react-slick.neostack.com/)** & **[Swiper](https://swiperjs.com/)** - For slider/carousel components.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Make sure you have Node.js, npm (or yarn/pnpm), Docker, and Docker Compose installed on your machine.

### Installation

1.  Clone the repo:
    ```sh
    git clone [https://github.com/username/ewastepas-user-fe.git](https://github.com/username/ewastepas-user-fe.git)
    ```
2.  Navigate to the project directory:
    ```sh
    cd ewastepas-user-fe
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Create a `.env` file in the project root and add any necessary environment variables (e.g., backend API URL).

### Available Scripts

* `npm run dev`: Runs the app in development mode.
* `npm run build`: Builds the app for production.
* `npm run lint`: Runs the linter to check code quality.
* `npm run preview`: Runs the production build locally.
