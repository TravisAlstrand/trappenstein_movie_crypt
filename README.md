# 🎬 Trappenstein's Movie Crypt

A modern web application for movie enthusiasts to discover, track, and engage with horror movie content from Trappenstein's YouTube channel.

## 📋 Overview

Trappenstein's Movie Crypt is a full-stack React application that allows users to search for movies, save them to personalized watchlists, and stay connected with Trappenstein's latest horror movie reviews. Built with a focus on user experience and dark aesthetic design, this platform bridges the gap between movie discovery and community engagement.

## ✨ Features

- 🔍 **Movie Search** - Search through thousands of movies using The Movie Database (TMDB) API
- 📚 **Personal Watchlist** - Save movies you want to watch
- 🎥 **Featured Reviews** - Showcase of latest YouTube video reviews from Trappenstein
- 👤 **User Profiles** - Customizable profiles with avatar selection
- 🔐 **Authentication** - Secure user authentication with email verification
- 📱 **Responsive Design** - Fully responsive interface for desktop and mobile devices
- 🌙 **Dark Mode** - Eye-friendly dark theme throughout the application

## 🚀 Coming Soon

- ⭐ **Movie Ratings** - Rate and review movies
- 💬 **Review Requests** - Request Trappenstein to review specific movies
- 🎯 **Community Features** - Connect with other horror movie fans

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Authentication & Database)
- **API**: The Movie Database (TMDB)
- **Icons**: React Icons

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/TravisAlstrand/trappenstein_movie_crypt.git
cd trappenstein-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_TMDB_API_KEY=your_tmdb_api_key
```

4. Start the development server:

```bash
npm run dev
```

## 🗄️ Database Schema

The application uses Supabase with the following main tables:

- **profiles** - User profile information including username, email preferences, and avatar
- **watchlists** - User's saved movies with watch status

## 🎨 Project Structure

```
trappenstein-app/
├── src/
│   ├── components/      # Reusable React components
│   ├── context/         # React Context providers
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   ├── global_css/     # Global styles
│   └── assets/         # Static assets
├── public/            # Public assets
└── package.json
```

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to open an issue or reach out.

## 📝 License

This project is part of my personal portfolio.

## 🔗 Links

- **YouTube Channel**: [Trappenstein](https://youtube.com/@trappenstein)
- **GitHub**: [TravisAlstrand](https://github.com/TravisAlstrand)

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Authentication and database services by [Supabase](https://supabase.com/)

---

Built with 💀 by Travis Alstrand (Trappenstein)
