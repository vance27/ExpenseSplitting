# Expense Splitting
### About
This project is a work in progress. The goal is to take exported csv data from Mint and convert to an automated total of what is owed to that individual. This is useful for roommates who want to split expenses evenly.

### Tools
(postgres, next, tRPC)
- Nx Workspace
- Next.js
- tRPC
- Prisma
- Postgres
- React
- Material UI

## TODO

- Investigate figma for design
- Secret storage for env files, postgres, etc.
- make sure users cant navigate to id routes that they aren't authorized to view (dashboard/nottheirid )
  - add check to routes to verify slugs are users id
- callbacks vs making calls on pages (getServerSideProps)
- possibility to add transactions manually
- valueFormatter for currency
- dates are not being formatted correctly (strings in db how to handle on client)
- add view of current cost to authrorized users on import
- add "PossibleDuplicates" flag to import
- add "GetPossibleDuplicates" api to backend for user to cleanup
- if clicking import and not all conditions are filled, route to preferences page automatically
- unlighthouse

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
##### Sections
* current amount owed (OwedDisplay)
* current expense splitting window (CurrentExpenseSplittingWindow, takes in a prop of who's current expense splitting window to display)
* IFF authorized users, show table of that user's transactions, and selectable tabs for each user (selection brings up that user's transactions) (AuthorizedUsersDisplay - uses current expense splitting window)

##### Dashboard experience
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

Update schema.prisma to add any database changes. Then run the following command to update the database:
npx prisma migrate dev --name [NAME OF THE MIGRATION]

Use the following command to start Prisma Studio:
npx prisma studio
Prisma Studio is now running on http://localhost:5555 and allows us to visualize and interact with the postgres database.

## Next.js

## tRPC

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
