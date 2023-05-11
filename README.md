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

---

## UX Flow

### Basic Use-case

#### Dashboard experience

- A user logs in to the application.
- The user is brought to the dashboard page.

##### Authorized Users

- The users "friends" that they can charge and be charged by
- The friends list can be updated by the user (add/remove, must be approved by friend)
- The authorized users/friends amount owed to the user will be displayed on the dashboard
- The user will also be able to select other authorized users list of transactions to view.

##### Owed Display

- The user will see a current amount owed or that they owe and the transactions that are in the current expense splitting window.
- There are options to edit any of the transactions in the list.
- There is also a dedupe feature that will allow the user to select which transactions are duplicates and merge them into one transaction.
- The user can COMPLETE the expense splitting window and start a new one changing the expense splitting window's status. (request to complete expense splitting window will be sent to all authorized users)
  - Need to be able to be connected to multiple expense splitting windows at once.
- The user can also select a different expense splitting window to view transactions from.

#### Import experience

- The user can upload a csv file from mint.
- The csv transactions are automatically included in the current expense splitting window (need to select one of the expense splitting windows). A preview is shown before the records are added, allowing the user to edit the records before they are added (dedupe)
- There will be warnings for transactions that occur outside of the expense splitting window date range.

#### User Preferences

##### Filter list

- uploadable txt file list of values to filter out of the csv file
- saves list to profile, deduplicates list and sorts alphabetically

---

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

---

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
