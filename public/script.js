

//  التاريخ والوقت
function updateDateTime() {
  const now = new Date();

  const date = now.toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  const time = now.toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit"
  });

  document.getElementById("date").innerText = date;
  document.getElementById("time").innerText = time;
}

setInterval(updateDateTime, 1000);
updateDateTime();


//  جلب الطقس
async function getWeather() {

    try {

        const response = await fetch("/api/weather");

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "حدث خطأ");
        }

        document.getElementById("temp").innerText =
            Math.round(data.main.temp) + "°";

        document.getElementById("desc").innerText =
            data.weather[0].description;

    } catch (error) {

        console.error(error);

        document.getElementById("desc").innerText =
            "تعذر جلب حالة الطقس";
    }
}

getWeather();