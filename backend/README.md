# Running on local machine.

### Prerequisites

Install Xampp

## Getting Started

First, run Xampp and start Apache and MySQL server:
Open [http://localhost/phpmyadmin](http://localhost/phpmyadmin) with your browser and create a database named `branch_management_system`.

---

Create a `.env` file with the following values

```
PORT=3100
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

## Running the project

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

Open [http://localhost:3100](http://localhost:3100) with your browser to see the result.
