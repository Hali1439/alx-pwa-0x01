# ALX Movie App

A Next.js application for browsing and discovering movies with filtering by year and genre.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your RapidAPI key for the movies database:
   ```
   MOVIE_API_KEY=your_actual_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000/movies](http://localhost:3000/movies) in your browser

## Features

- Browse movies by year and genre
- Responsive design for mobile and desktop
- Loading states and error handling
- Pagination support

## API Configuration

This app uses the [MoviesDatabase API](https://rapidapi.com/SAdrian/api/moviesdatabase) from RapidAPI. You need to:

1. Sign up for a RapidAPI account
2. Subscribe to the MoviesDatabase API
3. Get your API key and add it to `.env.local`

## Troubleshooting

### Runtime Error: "Something went wrong while fetching movies"

This error typically occurs due to:

1. **Missing API Key**: Ensure `MOVIE_API_KEY` is set in `.env.local`
2. **API Rate Limits**: Check if you've exceeded your API quota
3. **Network Issues**: Verify your internet connection
4. **Invalid API Response**: The API might return unexpected data format

### Solutions

1. Check browser console for detailed error messages
2. Verify API key is correctly set: `console.log(process.env.MOVIE_API_KEY)` in the API route
3. Test the API endpoint directly: POST to `/api/fetch-movies` with body: `{"page": 1}`
4. Check if the API service is available at https://moviesdatabase.p.rapidapi.com

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- RapidAPI (MoviesDatabase)
