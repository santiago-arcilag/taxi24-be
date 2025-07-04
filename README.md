# Taxi24_BE: Backend API for Taxi24 Technical Test

## Project Purpose
This project implements a backend RESTful API for Taxi24, designed to serve as a white-label fleet management solution. It was developed as a technical test to demonstrate:
- API design and RESTful best practices
- Domain modeling for drivers, passengers, and trips
- Use of Clean Architecture principles
- Code quality, modularity, and maintainability

## Requirements Coverage
**All requirements from the technical test are addressed:**
- CRUD endpoints for drivers, passengers, and trips
- Nearby driver search (within 3km)
- Trip assignment and completion
- 3 closest drivers for a passenger
- Data model clarity and SQL schema (via TypeORM entities)
- Seed data for demonstration
- No authentication/authorization (as requested)
- Frequent, descriptive git commits
- API documentation via Swagger at `/api`

## Main Features
- **Drivers:**
  - List all drivers
  - List available drivers
  - Find available drivers within a 3km radius
  - Get driver by ID
- **Passengers:**
  - List all passengers
  - Get passenger by ID
  - Get 3 closest available drivers for a passenger
- **Trips:**
  - Create a new trip (assign driver to passenger)
  - Complete a trip
  - List all active trips
  - List all trips

## Key Technical Decisions
- **NestJS + TypeORM:** Chosen for modularity, scalability, and rapid development.
- **PostgreSQL:** Used for relational modeling and geospatial queries.
- **Clean Architecture:** Each domain (drivers, passengers, trips) is a separate module with its own entities, services, and controllers.
- **Environment Configuration:** Supports both local (Docker/Postgres) and cloud (Railway, Render, etc.) deployments using `.env` variables and `DATABASE_URL`.
- **Validation & Error Handling:** DTOs with `class-validator` and `ValidationPipe` ensure robust input validation; controllers return proper HTTP status codes and error messages.
- **Seed Data:** A script (`src/seed.ts`) populates the DB with demo data for immediate testing.
- **Swagger/OpenAPI:** Full API documentation is auto-generated and accessible at `/api`.

## How Requirements Were Met
- **No authentication/authorization:** All endpoints are public as requested.
- **SQL schema:** The TypeORM entities (`driver.entity.ts`, `passenger.entity.ts`, `trip.entity.ts`) define the schema and auto-generate tables.
- **Frequent commits:** Every meaningful change is committed with a descriptive message.
- **Testing:** Includes unit tests and is ready for further test expansion.

## Project setup

### What is Taxi24_BE?
Taxi24_BE exposes a set of APIs that allow other companies to manage their fleet of drivers and passengers, and to handle trip assignments efficiently. The project is built using Node.js with NestJS and TypeScript, and uses PostgreSQL as the database.

### Main Features
- **Drivers:**
  - List all drivers
  - List available drivers
  - Find available drivers within a 3km radius of a location
  - Get driver by ID
- **Passengers:**
  - List all passengers
  - Get passenger by ID
  - For a passenger, get the 3 closest available drivers
- **Trips:**
  - Create a new trip (assign driver to passenger)
  - Complete a trip
  - List all active trips
  - List all trips

### Technical Test Context
- Built as a single NestJS service (Node.js, TypeScript)
- Follows RESTful design and best practices
- Demonstrates domain modeling, code quality, and use of known REST patterns
- Includes seed data, SQL schema via TypeORM, and a clear README
- Extra points for tests and Clean Architecture principles
- No authentication/authorization required
- API documentation available at `/api` via Swagger

## Project setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the example environment file and configure your database credentials:

```bash
cp .env.example .env
```

Edit `.env` as needed for your local PostgreSQL setup.

3. Run the database (PostgreSQL) locally. You can use Docker, for example:

```bash
docker run --name taxi24-postgres -e POSTGRES_USER=taxi24_user -e POSTGRES_PASSWORD=taxi24_pass -e POSTGRES_DB=taxi24_db -p 5432:5432 -d postgres
```

## Compile and run the project

```bash
# development
npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
