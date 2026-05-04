# ByteCanvas

A modern blogging platform built with React, Vite, Tailwind CSS, and Appwrite.

## Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Frontend     | React 18 + Vite                   |
| Styling      | Tailwind CSS + Inter font         |
| State        | Redux Toolkit                     |
| Backend/Auth | Appwrite                          |
| Forms        | React Hook Form                   |
| Editor       | TinyMCE                           |

## Getting Started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill in your Appwrite credentials:

```
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
```

## Features

- Sign up / login with Appwrite Auth
- Create, edit, and delete blog posts
- Rich-text editor (TinyMCE) with image support
- Featured image upload to Appwrite Storage
- Active / inactive post status
- Author-only edit and delete controls
- Responsive grid layout

## Test Account

| Field    | Value         |
|----------|---------------|
| Email    | user@dev.in   |
| Password | user1234      |
