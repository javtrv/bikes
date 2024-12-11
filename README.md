# Custom-made bikes configurator

## Description:

This web application allows the user to configure custom-made bikes, selecting components and visualizing the total price in real time. The project is built on a monorepository with Next.js for the frontend and NestJS for the backend.

## Instalation:

- Clone the repository.
- Asure you have node 22.12 or higher installed.
- Create a .env file in the frontend folder with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

- Install dependencies.

```bash
npm install
```


- Run the dev server.

```bash
npm run dev
```

- You can run the apps individually.

```bash
npm run api // to start the backend server
npm run app // to start the frontend server
```

## Data base:

We're using a PostgreSQL database for this project. In development, it's set up using Docker Compose, with the configuration in the docker-compose.yml and the .env.template file, all in the api folder.

For production, the database is hosted on Render. The database URL is currently hardcoded in the code for demonstration purposes. In a real-world scenario, it should be configured as an environment variable.

The database is pre-populated with some initial data. You can reset the database to this initial state by making a GET request to the following endpoint:

```
http://localhost:4000/api/seeds
```

## Key Features

- Data creation:
  Users can select from various components like frames, wheels, and chains. The system ensures compatible combinations of components.

  To allow this, the solution is based in 3 main components:

  - Categories: Represent the main categories of components (e.g., frames, wheels, chains).
  - Products: Represent the specific products within each category (e.g., road frame, mountain frame).
  - Rules: Define the allowed and forbidden combinations of components, as well as any associated discounts or price increases. (e.g., road frame with mountain wheels).

- Real-time Pricing:
  The estimated total amount is calculated dynamically based on the selected components and their combinations.
  The system uses a step-by-step form to guide the user through the selection process, providing real-time price updates.

- User-Friendly Interface:
  The system provides a user-friendly interface with a sidebar to navigate between the different categories. For each main componet (categories, products and rules) there is a page that allows the user to search, create and in some cases delete components.

  Also the step-by-step form guides the user through the selection process making the process more intuitive and not overwhelming.

## Solution details

For this MVP, the solution is primarily based on the Category component. A crucial decision was made to introduce an Order field for each category. This decision was motivated by three key factors:

1. To build the product selection form dynamically according to the order of the categories. This approach is user-friendly, as it guides the user through the selection process, ensuring a logical sequence of product selection.

2. Simplify the queries on the product rules. By ordering the categories, the system can easily determine what rules are applicable to the selected products.

3. Development time.


While this initial implementation focuses on a sequential product selection, the future vision is to allow users to freely select products without a strict order and allow more flexibility in the product selection process.

Additionally, 4 types of rules were implemented:

- ONLY: A product A can only be combined with a product B (of its corresponding category).
- FORBIDDEN: A product A cannot be combined with a product B.
- DISC: The total amount is discounted if product A is combined with product B.
- INCR: The total amount has an increase if a product A is combined with a product B.

The rule creation form allows for flexible rule definitions, enabling the combination of a product A with a list of products B, enhancing the system's adaptability.

## Next Steps:

Some ideas were left out of this MVP to focus on the core features. Here are some of the next steps to improve the system:

- Add a 'Previous' button to the form to allow users to go back and edit their selections. - Top priority
- Add a 'Edit' button to the product list in the summary to allow users to remove or change products. - Top priority

- Show the discount or increase amount by product in the final price.
- Eliminate the dependency of the 'Order' field in the categories.
- Rules system: Allows to create new types of rules.
- Testing: Implement unit and integration tests.
- Validations: Improve the validation system.
- Bugs: Revision of the system to fix bugs and improve performance.
- Refactor some components to allow reuse.




