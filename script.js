document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("rsvpForm");

    if (!form) {
        console.error("Форма rsvpForm не найдена");
        return;
    }

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const guestName = document
            .getElementById("guestName")
            .value
            .trim();

        const attendance = document.querySelector(
            'input[name="attendance"]:checked'
        );

        if (!guestName) {
            alert("Введите имя и фамилию");
            return;
        }

        if (!attendance) {
            alert("Выберите вариант ответа");
            return;
        }

        const submitButton =
            form.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = "Отправка...";

        try {

            const response = await fetch(
                "https://wedding-server-7bxs.onrender.com/send-rsvp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: guestName,
                        attendance: attendance.value
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                alert("Спасибо! Ваш ответ успешно отправлен.");

                form.reset();

            } else {

                alert(
                    data.message ||
                    "Ошибка отправки"
                );

            }

        } catch (error) {

            console.error(error);

            alert("Не удалось связаться с сервером.");

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Отправить";

        }

    });

});

const weddingDate = new Date("August 22, 2026 16:00:00").getTime();

setInterval(() => {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}, 1000);

const music = document.getElementById("bgMusic");

let musicStarted = false;

window.addEventListener("scroll", () => {

    if (!musicStarted) {

        music.play()
            .then(() => {
                musicStarted = true;
            })
            .catch(error => {
                console.log(error);
            });

    }

}, { passive: true });

const petalsContainer = document.querySelector(".petals");

function createPetal() {

    const petal = document.createElement("img");

    petal.src = "images/petal.png";

    petal.classList.add("petal");

    petal.style.left =
        Math.random() * window.innerWidth + "px";

    petal.style.width =
        (35 + Math.random() * 35) + "px";

    petal.style.animationDuration =
        (10 + Math.random() * 10) + "s";

    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 20000);
}

setInterval(createPetal, 1200);
