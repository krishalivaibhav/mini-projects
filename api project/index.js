import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Handle the root URL to render the initial page
app.get("/", (req, res) => {
    res.render("index");
});

// Handle the API call to fetch random dog image
app.get("/fetch-image", async (req, res) => {
    try {
        const result = await axios.get("https://dog.ceo/api/breeds/image/random");
        res.json({
            message: result.data.message,
            status: result.data.status,
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500).json({ error: "Failed to fetch image" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
