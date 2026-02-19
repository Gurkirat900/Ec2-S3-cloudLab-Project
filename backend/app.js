import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import fileRoutes from "./routes/fileRoutes.js"
import path from "path"
import { fileURLToPath } from "url"

const app= express()

app.use(cors())              // allows app to accept requests from other domains

app.use(express.json({limit:"20kb"}))       // allows app to accept data in json format and limits the data so as server doesnt crash
app.use(express.urlencoded({extended:true,limit:"20kb"}))            // allows server to accept url links
app.use(express.static("public"))              // allows app to accept files/folders=> in this case "public" folder
app.use(cookieParser())                            // allows app to use and store cookies entered by user

app.use("/api/v1/auth",authRoutes)          // all routes related to authentication will start with /api/auth
app.use("/api/v1/files",fileRoutes)          // all routes related to file operations will start with /api/files


// ------------------- Serve React Frontend -------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// adjust path 
const frontendPath = path.join(__dirname, "../../frontend/dist");

// Serve static files from React build
app.use(express.static(frontendPath));

// Handle React Router (important)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


export {app}
