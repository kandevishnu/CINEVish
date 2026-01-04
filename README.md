
# 🎬 CINEVish — React + TMDB API

A fully responsive and theme-aware movie web app built with React, Redux, Tailwind CSS, and powered by TMDB API. Users can browse movies, view detailed information, manage favorites, and enjoy smooth infinite scrolling with a clean UI.

## ✨ Features Overview

### 🔍 TMDB API Integration
- Real-time movie data using TMDB API.
- Multiple categories supported: Now Playing, Popular, Top Rated, Upcoming.
- Movies fetched in Telugu, English, and other languages with readable labels.

## 🌐 Proxy Server for TMDB API (ISP Bypass)

Due to restrictions by some ISPs (like Jio in India) that block direct access to the TMDB API, a proxy server is used to bypass these limitations and avoid CORS issues.

The frontend sends API requests to a proxy (e.g., `https://server-tmdb.vercel.app`), which then securely forwards the request to TMDB and returns the response.

This ensures smooth functionality regardless of the user's ISP and helps maintain reliability in API data fetching.

### 🔁 Infinite Scrolling
- Seamless infinite scroll implementation using React hooks.
- Automatically loads more movies as users scroll (no pagination).

### 🔎 Search Functionality
- Search bar to find movies by title.
- Results update in real-time with full support for dark/light theme styling.

### 🎥 Movie Details Page
- Route-based dynamic page (`/movie/:id`) using React Router.
- Displays:
  - Backdrop & Poster
  - Title, Release Date, Runtime
  - Genres, Overview
  - Cast & Crew
  - Production Companies
  - Embedded YouTube Trailer (if available)

### 🌟 Favorites System (Redux + LocalStorage)
- Users can add/remove movies to their personal Favorites list.
- Favorites persist across sessions using localStorage.
- Favorites page includes posters, ratings, and descriptions with remove button.

### 🎨 Light/Dark Theme Toggle
- Fully functional theme toggle with:
  - Animated icon transition (sun/moon)
  - Default dark mode
  - Theme-aware styles (cards, text, buttons, background)

### ⚛️ Redux for State Management
- Global state management using Redux.
- Separate feature slices (e.g., favoritesSlice) for modularity.
- `useSelector` and `useDispatch` used across components.

### ⏳ Themed Skeleton Loaders
- Custom skeleton UI for loading states:
  - Backdrop
  - Poster
  - Title, Trailer, Cast Cards
- Enhances perceived performance and polish.

### 💡 Responsive Design with Tailwind CSS
- Mobile-first design using utility-first classes.
- Layouts adapt to all screen sizes with smooth transitions and hover animations.
- Clean component styling and spacing.

### 🧭 Navigation & UX Enhancements
- React Router navigation with `useNavigate`.
- Back buttons, detailed pages, and scroll restoration handled smoothly.
- Interactive movie cards with hover scaling, shadows, and responsive layout.

### 🧠 Clean Codebase & Project Setup
- Project initialized using Vite for fast dev builds and hot reload.
- Clear folder structure (components, store, routes, etc.)
- `.gitignore` includes unnecessary folders (`node_modules`, `.vscode`, `logs`).

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Redux
- **Routing**: React Router
- **State Management**: Redux Toolkit
- **Data Source**: TMDB API
- **Build Tool**: Vite
- **Deployment**: (You can add Vercel, Netlify, etc.)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kandevishnu/CINEVish.git
cd CINEVish
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add TMDB API Key

Create a `.env` file in the root directory and add your TMDB API key:

```
VITE_TMDB_API_KEY=your_api_key_here
```

### 4. Start the Development Server

```bash
npm run dev
```

App will be running at `http://localhost:5173`

### 🧪 Optional Scripts

```bash
npm run build       # Create production build
npm run preview     # Preview production build locally
```

## 🧾 License

This project is open-source and available under the MIT License.

## 🙌 Acknowledgements

- TMDB API
- React
- Redux Toolkit
- Tailwind CSS
- Vite


<!-- Testing the Git integration with frontend  -->