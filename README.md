# A Collaborative Todo Sample - ZenStack + Next.js

This project is a collaborative todo app built with [Next.js](https://nextjs.org) (app router), [Auth.js](https://authjs.dev/), and [ZenStack](https://zenstack.dev).

> See the [pages-route](https://github.com/zenstackhq/sample-todo-nextjs-tanstack/tree/pages-route) branch for an implementation using Next.js's old pages router.

In this fictitious app, users can be invited to workspaces where they can collaborate on todos. Public todo lists are visible to all members in the workspace.

See a live deployment at: https://zenstack-todo.vercel.app/.

## Features:

-   User signup/signin
-   Creating workspaces and inviting members
-   Data segregation and permission control

## Running the sample:

1. Setup a new PostgreSQL database

    You can launch a PostgreSQL instance locally, or create one from a hoster like [Supabase](https://supabase.com). Create a new database for this app, and set the connection string in .env file.

1. Install dependencies

    ```bash
    npm install
    ```

1. Configure environment variables

    Copy the `.env.example` file to `.env` and set the values for your environment. Github related variables can be left empty if you don't need GitHub OAuth login.

1. Generate server and client-side code from model

    ```bash
    npm run generate
    ```

1. Synchronize database schema

    ```bash
    npm run db:push
    ```

1. Start dev server

    ```bash
    npm run dev
    ```

For more information on using ZenStack, visit [https://zenstack.dev](https://zenstack.dev).
