# Airbnb Clone

A full-stack Airbnb-inspired web application for browsing rental homes and managing listings. It includes guest-facing home discovery and favourites, plus protected host tools for creating, editing, and removing listings.

## Features

- Browse available homes and view full listing details
- Add and remove homes from a favourites list
- View bookings and saved homes
- Sign up with server-side form validation and securely hashed passwords
- Log in and out with session-based authentication
- Create, edit, and delete listings from the host dashboard
- Responsive EJS views styled with Tailwind CSS

## Tech stack

- **Server:** Node.js, Express 5
- **Views:** EJS
- **Database:** MongoDB with Mongoose
- **Authentication:** Express Session, MongoDB session store, bcryptjs
- **Validation:** express-validator
- **Styling:** Tailwind CSS

## Getting started

### Prerequisites

- Node.js 18 or later
- npm
- A MongoDB database (MongoDB Atlas or a local instance)

### Installation

```bash
git clone https://github.com/KRISHANPRAJAPAT947/Airbnb-clone.git
cd Airbnb-clone
npm install
```

Before starting the app, set the MongoDB connection string used by `DB_PATH` in `app.js` to a database you control. Do not commit database credentials to the repository.

### Run locally

```bash
npm run dev
```

This builds Tailwind CSS, watches style changes, and starts the app with Nodemon. Open [http://localhost:3000](http://localhost:3000).

For a single development server process:

```bash
npm start
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Build and watch Tailwind CSS, then start the app with Nodemon. |
| `npm start` | Build Tailwind CSS and start the Express server with Nodemon. |
| `npm run tailwind` | Watch and rebuild the generated Tailwind stylesheet. |
| `npm run tailwind:build` | Build the Tailwind stylesheet once. |

## Routes

| Area | Routes | Purpose |
| --- | --- | --- |
| Homes | `/`, `/homes`, `/homes/:homeId` | Browse listings and view details. |
| Favourites | `/favourites` | View, add, and remove favourite homes. |
| Bookings | `/bookings` | View booking information. |
| Authentication | `/login`, `/signup`, `/logout` | Manage account sessions. |
| Host dashboard | `/host/add-home`, `/host/host-home-list` | Manage home listings (login required). |

## Project structure

```text
├── controllers/   # Request handlers
├── models/        # Mongoose data models
├── public/        # Images and compiled CSS
├── routes/        # Express route definitions
├── views/         # EJS templates and reusable partials
├── app.js         # Application entry point
└── input.css      # Tailwind source stylesheet
```

## Security note

Keep database connection strings and session secrets out of source control. Use environment variables for production deployments and rotate any credential that has been exposed in a committed file.

## License

This project is licensed under the ISC License. See [package.json](./package.json) for details.
