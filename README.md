<p align="center">
<img src="https://raw.githubusercontent.com/almirbi/pepsi-machine/main/apps/webapp/src/components/Deposit/50-purple.png" alt="rupee" width="200"/>
</p>

## What's inside?

This is a showcase vending machine app with a buyer and seller roles. A seller can post products. A buyer can insert coins and spend them to buy the products. The result of the purchase returns the solution of a Coin Change problem.

This turborepo uses [Yarn](https://classic.yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `api`: `NEST JS` API for managing users, products, deposit and buying/selling.

  - `Passport.js` for auth
  - `Swagger` for documentation
  - `Prisma` as ORM
  - `PostgreSQL` + `Docker` for local database

- `webapp`: Rupees! Supports the API. Insert your rupees into the PEPSI machine and buy a product as a buyer or put products into the machine as a seller.
  - `Next JS` + `React` components
  - `Material UI` as a design system
  - `Axios` as API client
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-prettier`)

## Getting started

Prerequisites:

- Node 18 (tested on, probably supports less)
- Docker
- yarn

Install dependencies

```
yarn
```

Start the DB:

```
docker compose -f ./packages/database/docker-compose.yml up -d
```

Run the API and webapp

```
yarn dev
```

Adding a package to a monorepo

```
yarn workspace (api | webapp | database | eslint-config-custom) add react
```

e.g.

```
yarn workspace api add @types/node
```

### Develop

To develop all apps and packages, run the following command:

```
yarn dev
```

API documentation available at [http://localhost:3000/docs](http://localhost:3000/docs)

Visit [http://localhost:3001/](http://localhost:3001/) for the test webapp.

## Testing

Watch out, running tests cleans the database
TODO: separate DB for tests

Also requires the DB running
TODO? Mock prisma?

```
yarn test
```

### Build

To build all apps and packages, run the following command:

```
yarn run build
```
