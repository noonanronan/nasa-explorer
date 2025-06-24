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
node server.js
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
● **AI Summary Feature**
uses OpenAI to summarize complex APOD explanations for beginners (with on demand summarization)


## NASA API
You must register at https://api.nasa.gov to obtain your free API key and set it in your .env file.

## Highlights
● Clean UI with FontAwesome icons

● Responsive design across screen sizes

● User interactivity with search, filters, and modals

● Error and loading state handling

● Real API integration with real-time space data

● Modular code and organized structure

## Testing
**Manual Testing**
All APIs and features were tested in the browser and using curl/Postman

Checked for:
● Proper data rendering
● Error handling (e.g. API errors, missing data)
● AI summary API usage and fallbacks

**Automated Testing** 
added a backend unit test using Jest to ensure the /api/summarize route consistently returns a valid summary from the OpenAI API.
This test helps validate core AI functionality independently from the frontend and ensures reliability during further development.

To run backend tests: