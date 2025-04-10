# Running on local machine.

### Prerequisites

Install Xampp

## Getting Started

First, run Xampp and start Apache and MySQL server:
Open [http://localhost/phpmyadmin](http://localhost/phpmyadmin) with your browser and create a database named `branch_management_system`.

Use the provided sql dump file to add default data if needed.

---

Create a `.env` file with the following values

```
PORT=3100
ACCESS_TOKEN_SECRET="3d6e915e5400da6bf7d8cf0cfe2aa64c8040904d661db44cab09414e7854f6f8591fd666b5b9f6efbc5c66de12e09bf14664bc861849d95c0cd45c69d73610bf"
REFRESH_TOKEN_SECRET="1d9ee75d73baa22ce76a6bc580c36b01f6cf6fd4cf59d4a155141f1d42dfc3b63f67c84c1d25ae9452db2e4e7f89ac7dd997f27dec7781a8c05617d6a7741e71" 

```

## Running the project

```
npm install # installing node packages
npm run start # Starting the project

```

Open [http://localhost:3100](http://localhost:3100) to access the API.

--- 
The default username and password is 
```
username: admin
password: admin
```

---

## Go to [Frontend Instructions](https://github.com/SayujKuickel/manage-branch/blob/main/frontend/README.md).
