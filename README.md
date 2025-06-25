# NASA Explorer
A full-stack web app built for the Bounce Insights coding challenge. The app fetches and displays space related data from NASA's public APIs, with beautiful UI, interactivity , and visualizations.

## Live Demo
Frontend: [https://nasa-explorer-two.vercel.app](https://nasa-explorer-two.vercel.app)  
Backend: [https://nasa-explorer-jamg.onrender.com](https://nasa-explorer-jamg.onrender.com)

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

### Backend setup
```bash
cd backend
npm install
# Create a .env file and add your NASA_API_KEY:
# NASA_API_KEY=your_nasa_api_key
node server.js
```

### Frontend setup:
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
● **Responsive UI**  
Adapts to desktop, tablet, and mobile screen sizes.  
● **Error Handling & Loading States**  
All features include fallback UI for failed requests or loading delays.  

## Raunning locally
### NASA API  
You must register at https://api.nasa.gov to obtain your free API key and set it in your .env file.  

### OpenAI API (for AI Summarization Feature)
The app uses OpenAI's API to generate simplified summaries of complex NASA explanations (like those in the APOD section).  
● Go to your API Keys page(https://platform.openai.com/account/api-keys) and generate a key  
● Add it to your backend `.env` file OPENAI_API_KEY=[Add here]

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
● Valid OpenAI summaries  
● Search and filtering logic  

**Automated Testing**  
added a backend unit test using Jest to ensure the /api/summarize route consistently returns a valid summary from the OpenAI API.  
This test helps validate core AI functionality independently from the frontend and ensures reliability during further development.  
To run backend test locally:
```bash
cd backend
npm install
npm test
```

## Deployment  
● Backend is hosted on Render  
● Frontend is deployed on Vercel  
● All axios API calls use process.env.REACT_APP_API_URL for environment compatibility  

## ScreenShots  
**Test past**  
![image](https://github.com/user-attachments/assets/0b62f22f-0e43-457b-be58-21493752219f)  


Built with by Ronan Noonan.

