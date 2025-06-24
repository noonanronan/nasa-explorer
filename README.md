# NASA Explorer
A full-stack web app built for the Bounce Insights coding challenge. The app fetches and displays space related data from NASA's public APIs, with beautiful UI, interactivity , and visualizations.

## Technologies
● React
● NodeJS
● Express
● NASA Open APIs
● Axios
● CORS
● Dotenv
● Recharts

## Structure
■ ├── frontend/
■ ├── backend/
■ └── README.md

## Setup Instructions

Backend setup
```bash
cd backend
npm install
# Create a .env file and add your NASA_API_KEY:
# NASA_API_KEY=your_nasa_api_key
node index.js
```

Frontend setup:
```bash
cd frontend
npm install
npm start
```

## Features implemented 
● **APOD (Astronomy Picture of the Day)**
View the daily space photo with title, explanation, and a button to view a random one.
● **Mars Rover Photos**
Filter by camera and sol (Martian day), with dynamic input and tooltips explaining sol.
● **EPIC (Earth Polychromatic Imaging Camera)**
View Earth images from the DSCOVR satellite with time-based search.
● **NEO (Near-Earth Objects)**
Displays 10 nearby asteroids with their estimated diameters visualized using a bar chart.
● **NASA Media Library**
Search NASA’s image and video library. Clicking a result opens a modal preview (with support for video or image).
● **Home Page Enhancements**
Stylish layout with FontAwesome icons, improved descriptions, and accessible formatting.


## NASA API
You must register at https://api.nasa.gov to obtain your free API key and set it in your .env file.