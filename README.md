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

- add expense splitting window that contains all transactions that are within the window of time that the user wants to split expenses for.

### Frontend
- Allow select duplicates or all duplicates and click a button to merge them into one transaction.


## UX Flow
### Basic Use-case
#### Dashboard
- A user logs in to the application.
- The user is brought to the dashboard page.
- The user will see a current amount owed or that they owe and the transactions that are in the current expense splitting window.
- The user also has a list of authorized users that they can add or remove from the list.
- The list of authroized users are whom they can charge or be charged by. (1..1 connection)
- The user can see a list of transactions that are in the current expense splitting window.
- There are options to edit any of the transactions in the list.
- There is also a dedupe feature that will allow the user to select which transactions are duplicates and merge them into one transaction.
- The user will also be able to select other authorized users list of transactions to view.
- The user can COMPLETE the expense splitting window and start a new one changing the expense splitting window's status.
- The user can also select a different expense splitting window to view transactions from.
#### UploadCsv
- The user can upload a csv file from mint.
- The csv transactions are automatically included in the current expense splitting window. A preview is shown before the records are added, allowing the user to edit the records before they are added (dedupe)
- There will be warnings for transactions that occur outside of the expense splitting window date range.
---

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
