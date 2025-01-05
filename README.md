# Simbrella Challenge

This repository contains the solution for the Simbrella Challenge. It is a TypeScript-based React project that utilizes Jest for testing, and it's built using Vite as the development tool.

## Setup Instructions

Follow these steps to get the project up and running:

### Prerequisites

Ensure that you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or later)
- [pnpm](https://pnpm.io/) (recommended package manager)

### Steps

1. **Clone the Repository**:
   Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/yourusername/simbrella-challenge.git

   ```

2. **Install Dependencies & Run the Development Server**:
   - cd simbrella-challenge
   - pnpm install
   - pnpm dev

## Approach

The project is a TypeScript-based React application built with Vite. Below is an overview of the approach used to solve the challenge:

### Project Setup

- **Vite**: Chosen as the build tool for its fast build and reload times, which significantly enhance the development experience, especially when working with React.
- **TypeScript**: Utilized for type safety throughout the application. Type definitions for React and Jest are correctly configured to improve the development workflow.

### Component Structure

- The primary feature of the application is the **Transaction & Loan History** section, which displays a list of transactions.
- Components are modularized to ensure better maintainability and reusability across the application.
- State management is handled using React's **useState** and **custom** hooks. Asynchronous data fetching is handled using **React Query**, which provides caching and background data synchronization.

### Testing

- **Jest** is employed for unit and integration testing. **React Testing Library** is used for DOM interaction and assertions.
- The test suite ensures that the application’s main features work as expected, testing the rendering of components and verifying the behavior of user interactions.

### Error Handling

- Asynchronous operations, such as API calls, are properly handled to ensure a smooth user experience, even in the case of failures.
- Edge cases are taken into account both in the UI and within the test suite to ensure the app performs correctly under various conditions.

### Technologies Used

- **React**: Used for building the frontend UI.
- **TypeScript**: Provides type safety throughout the application.
- **Vite**: Used as the build tool for its fast development cycle.
- **Jest**: A testing framework for running unit and integration tests.
- **React Testing Library**: Helps with testing React components through DOM interaction.
- **React Query**: Handles data fetching and caching, improving performance by reducing redundant requests.

### Folder Structure

- `/src`: Contains all source files, including components, utilities, and other app logic.
- `/tests`: Contains test files for components and application logic.
- `package.json`: Project metadata and dependencies.
- `tsconfig.json`: TypeScript configuration file.
- `vite.config.ts`: Vite configuration for bundling and development.
