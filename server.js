import express from "express";
import mongoose from "mongoose";
import eventRoutes from "./routes/eventRoutes.js"; 
import userRoutes from "./routes/userRoutes.js"; 
import leaveRoutes from "./routes/leaveRoutes.js"; 
import cors from "cors";


const PORT = process.env.PORT || 3000;
const app = express();
const HOST = '192.168.1.155';

// Middleware
app.use(express.json());
app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
      ],
      credentials: true,
    })
  );

// MongoDB Connection
mongoose
    // .connect("mongodb://127.0.0.1:27017/calendar_base")
    // .connect("mongodb://192.168.1.155:27017/calendar_base")
    // .connect("mongodb+srv://nimitbisht:hff89P0nbI0VUowk@backenddb.0bzyq.mongodb.net/vacation")
        .connect("mongodb+srv://shivam721088:yb9ODW3ynMMuVQT5@cluster0.g7vb6.mongodb.net/vacationTracker")
        
        
    .then(() => console.log("MongoDB connection established"))
    .catch((error) => console.log(error.message));


// Routes
app.use("/event", eventRoutes)
app.use("/", userRoutes)
app.use("/", leaveRoutes)


// Run in Localhost
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Run in Local LAN
// app.listen(PORT, HOST, () => {
//     console.log(`Server is running on http://${HOST}:${PORT}`);
// });
