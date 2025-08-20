# ALX Project 0x14 — Reading API Documentation

## API Overview
TMDB (The Movie Database) API provides developers with access to a comprehensive, community-driven dataset including metadata for movies, TV shows, actors, images, ratings, and more. With an extensive set of endpoints, you can search, discover, and retrieve detailed information such as cast and crew, trailers, reviews, recommendations, and trending content. :contentReference[oaicite:1]{index=1}

## Version
### TMDB API Version: **v3** :contentReference[oaicite:2]{index=2}

## Available Endpoints
Here are some of the primary endpoints you can use:

- `/search/movie` – Search movies by keyword  
- `/movie/{movie_id}` – Get detailed movie data including synopsis, release date, runtime  
- `/movie/{movie_id}/credits` – Fetch cast and crew information  
- `/movie/{movie_id}/images` – Retrieve movie posters, backdrops, and stills  
- `/movie/popular` – List of current popular movies  
- `/movie/{movie_id}/reviews` – User reviews and ratings  
- `/movie/{movie_id}/recommendations` – Recommended movies based on a given movie  
- `/trending/movie/day` – Daily trending media  
- Authentication & account endpoints (token/session) – Login, get account state  
- Configuration endpoints – Static lists like languages, available images etc. :contentReference[oaicite:3]{index=3}

## Request and Response Format
Typical request (with API key in query):


## Authentication
- Requests must include your **API key** as a query parameter: `api_key=YOUR_API_KEY`
- For account-specific methods (rating, account states), you must authenticate via temporary request token or session-based authentication.
- A bearer token may be required for some protected endpoints. :contentReference[oaicite:5]{index=5}

## Error Handling
Common HTTP error responses:
- **401 Unauthorized**: Invalid or missing API key
- **404 Not Found**: Resource not found
- **429 Too Many Requests**: Rate limited by API
- **400 Bad Request**: Parameter validation failure

