# Ecoyaan Checkout

A modern, responsive e-commerce checkout application built with the newest web technologies.

## 🏗️ Architectural Choices

This project uses a robust, scalable tech stack optimized for performance and developer experience:

- **Framework**: [Next.js 16](https://nextjs.org/) using the **App Router** (`src/app`). The App Router allows for intuitive file-based routing and seamless integration of server and client components.
- **Language**: [TypeScript](https://www.typescriptlang.org/) is used throughout the project to ensure type safety, reduce runtime errors, and improve code maintainability (`src/types`).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) powers the UI, offering utility-first CSS that keeps styling tightly coupled with components without bloating external stylesheets.
- **Form Validation**: Implemented using custom utility functions (`src/utils/validation.ts`) and regex patterns for real-time feedback (on blur and change). This ensures a smooth user experience without relying on heavy external libraries.
- **State Management**: **Redux Toolkit (RTK)** combined with `react-redux`. For a multi-step checkout process (Cart -> Shipping -> Payment), a centralized global state is crucial. Redux Toolkit provides a standard, boilerplate-free way to predictably manage complex application states like cart items, user details, and checkout progress (`src/store`).
- **Component Architecture**: Reusable UI elements and page-specific client components are organized cleanly (`src/components`), separate from the Next.js routing logic.

## 📂 Project Structure

```text
src/
├── app/        # Next.js App Router pages (routing, layouts)
├── components/ # Reusable React components (UI components, page clients)
├── store/      # Redux Toolkit slices and store configuration
├── types/      # TypeScript interfaces and type definitions
└── utils/      # Helper functions and utilities
```

## 🚀 Running Locally

To get the project up and running on your local machine, follow these steps:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd Ecoyaan
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **View the app**:
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## 🛠️ State & Form Management

### Data Persistence
Data is persisted throughout the checkout flow using **Redux Toolkit**. 
- The central store is configured in the `src/store` directory.
- Global slices manage the state across different routes (e.g., maintaining the cart data when navigating from `/cart` to `/checkout/shipping` and `/checkout/payment`).
- This ensures that when a user navigates between steps, their information remains intact.
- High-level state persistence is currently session-based (within the application state), ensuring a fast and responsive experience across routes.

### Form Validation
The checkout forms use a robust manual validation strategy:
- **Custom Utilities**: A central `validation.ts` file houses logic for validating email, phone numbers, and PIN codes using Regex.
- **Real-time Feedback**: Validation triggers on `blur` and `change` events, providing immediate feedback to the user via error messages.
- **Submit Protection**: Final validation occurs during form submission to prevent navigation if errors exist.
