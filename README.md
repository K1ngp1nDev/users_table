### Test task

A small SPA built with Vite, Vue 3, TypeScript, Pinia, and Element Plus.

This project uses the JSONPlaceholder API to display a list of users and their posts, with basic filtering and post creation functionality.

#### Features

##### User List

Fetch and display users in a table with the following columns:

- ID

- Name

- Email

- City

- Actions (button to view posts)

Filter users by name.

##### View User Posts

Clicking "View Posts" opens a dialog that fetches and displays a user's posts.

##### Create Post

Within the same dialog, there is a form to create a new post.

After submitting, a notification appears to confirm success.

#### Requirements Implemented

- Composition API for managing component logic.

- Separation of logic into components (e.g., a page component for user listing and a separate component for the post dialog).

- Element Plus for the UI (table, dialog, form, notifications, etc.).

- Pinia store for state management (fetching users, posts, and creating new posts).

- Error handling (displays error messages if fetching or creating fails).

- Minimal responsiveness (media queries to adjust layouts, hide text on mobile, etc.).

#### Getting Started

##### Install Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

##### Development Server

```bash
npm run dev
```

##### Build for Production

```bash
npm run build
```

##### Preview Production Build

```bash
npm run preview
```
