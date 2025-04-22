# Flashcard App

This is a single-page flashcard app where users can create and study flashcards grouped in sets.

## Users

There are three built-in users:

- `user1`, `user2` — regular users who can create, edit, and delete their own sets and cards.
- `admin` — can view, edit, and delete all users’ sets and cards, but cannot create any new content or practice.

Usernames must contain only letters, numbers, or underscores (`_`), and cannot be empty or `"dog"`.

## How to Use

1. Run `npm install`, `npm run build`, `npm start`
2. Visit `http://localhost:3000`
3. Log in with one of the built-in usernames listed above or register as a new user
4. Users will see and manage only their own data; admins will see all data
5. Click “Add Set” to start creating cards (users only)
6. Click “Practice” to begin testing yourself with flashcards

## Media

All icons used are from [Google Fonts Icons](https://fonts.google.com/icons).
