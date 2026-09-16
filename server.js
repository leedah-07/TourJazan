require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

// السماح للسيرفر بتقديم ملفات HTML و CSS و JS
app.use(express.static(path.join(__dirname, "public")));

// API خاص بنا لجلب الطقس
app.get("/api/weather", async (req, res) => {
    try {
        const city = "Jizan";

        const apiKey = process.env.OPENWEATHER_API_KEY;

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ar`
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "حدث خطأ أثناء جلب بيانات الطقس"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});