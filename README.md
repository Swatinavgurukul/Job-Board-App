# Job Board App

## Overview
A responsive Job Board application built with React TypeScript and MUI. It allows users to search, filter, sort, paginate, and bookmark jobs from a public API.

## Features
- Search by job title or company name
- Filter by location
- Remote-only toggle
- Sort by date or company name
- Bookmark jobs (stored in Redux + persisted)
- Paginated job list (10 per page)
- Bookmark view at `/bookmarks`
- Error and empty state handling
- Loading skeletons
- 404 page for undefined routes

## 🚀 Technologies Used

- **React + TypeScript + Vite**
- **Redux Toolkit** for state management
- **Redux Persist** for local storage sync
- **Material UI (MUI)** for UI components
- **Axios** for API calls
- **Custom Hooks** for utilities like debouncing

## 📁 Folder Structure

```bash
.
src/
├── components/ # Reusable UI components
├── pages/ # Route pages (Jobs, Bookmarks, NotFound)
├── redux/ # Store & bookmark slice
├── utils/ # API functions
├── hooks/ # Custom hooks
├── types/ # TypeScript interfaces
├── App.tsx # Routing setup
├── main.tsx # App entry point


## Installation & Running Locally

```bash
git clone https://github.com/Swatinavgurukul/Job-Board-App.git

cd job-board-app
npm install
npm run dev


