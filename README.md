# Expense Splitting
### About
This project is a work in progress. The goal is to take exported csv data from Mint and convert to an automated total of what is owed to that individual. This is useful for roommates who want to split expenses evenly.

### Tools
PERN stack (postgres, express, react, node)
- Nx Workspace
- Prisma
- Postgres
- React
- Material UI
- Node
  

## TODO
### User preferences
- Users have preferences that determine how they want their data to be imported (what values are filtered out, regex for values that should be variable, etc.)  
- filter object is based off of column names from the csv file

### Db (postgres)
- verify no duplicated transactions (we should allow import and then add a POSSIBLE DUPLICATE flag to the transaction to display in the ui).

- CONVERT floats to integers (multiply by 100) to avoid floating point errors

### Frontend
- Allow select duplicates or all duplicates and click a button to merge them into one transaction.


## UX Flow
### Basic Use-case
- open page, option to view past records or upload a new file

- only allows csv files from mint export to be imported, will error otherwise

- shows list of uploaded files and allows users to edit the data. updates made will save the request to the database

- exportable to expense splitting format to double check values

### Filter list
- uploadable txt file list of values to filter out of the csv file
- saves list to profile, deduplicates list and sorts alphabetically


## Postgres
psql is the PostgreSQL interactive terminal. Running psql will connect you to a PostgreSQL host. Running psql --help will give you more information about the available options for connecting with psql:

    -h: --host=HOSTNAME: The database server host or socket directory; the default is local socket
    -p: --port=PORT: The database server port; the default is 5432
    -U: --username=USERNAME: The database username; the default is your_username
    -w: --no-password: Never prompt for password
    -W: --password: Force password prompt, which should happen automatically

## Prisma 
Prisma is what express backend uses to interact with the postgres database.


Prisma is a database toolkit that consists of these tools:
- Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript
- Prism Migrate: Declarative data modeling & migrations
- Prism Studio: GUI to view and edit data in your database

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
