##Lendsqr Frontend Assessment
##Overview

This project was developed as part of the Lendsqr Frontend Engineer Technical Assessment.  
It implements a responsive web application that allows users to log in, view a dashboard, browse a list of users, and view detailed information for each user.

The application:

- Fetches mock data for 500 users
- Caches user details in LocalStorage to reduce API calls
- Implements unit tests for critical UI components
- Uses Next.js App Routerfor modern routing and server-side rendering
- Matches the provided Figma design closely

---

## Tech Stack

| Technology                       | Purpose       | Reason for Choice                                 |
| -------------------------------- | ------------- | ------------------------------------------------- |
| **Next.js (App Router)**         | Framework     | SEO-friendly, hybrid SSR/SSG, great DX            |
| **TypeScript**                   | Type safety   | Prevents runtime errors, improves maintainability |
| **SCSS Modules**                 | Styling       | Scoped styles, powerful mixins & nesting          |
| **Chakra UI**                    | UI Components | Accessible, easy to style (used for menus)        |
| **Material UI**                  | UI Components | Stable handling for dropdowns & modals            |
| **React Testing Library + Jest** | Testing       | Ensures UI correctness                            |
| **Faker.js**                     | Mock Data     | Generates realistic dummy user records            |

## Installation & Setup

```bash
# Clone repository
git clone https://github.com/james2000-design/lendsqr-fe-test.git

# Navigate into project
cd lendsqr-fe-test

# Install dependencies
npm install

# Start development server
npm run dev

# Build production version
npm run build

# Preview production build
npm start

# Run all tests
npm run test

# Run with coverage report
npm run test -- --coverage
```
