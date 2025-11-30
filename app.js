const tg = window.Telegram.WebApp;
tg.expand();

// Адрес твоего API (локальный вариант A)
const API_BASE = "https://t6aijm6rb0.loclx.io";
const useMock = false;

// Элементы страницы
const sectionsContainer = document.getElementById("sections");
const materialsBlock = document.getElementById("materials");
const backBtn = document.getElementById("back");
const materialsTitle = document.getElementById("materials-title");
const materialsList = document.getElementById("materials-list");

// Если Telegram передал пользователя
let currentUserId = null;
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    currentUserId = tg.initDataUnsafe.user.id;
    console.log("User ID:", currentUserId);
}


// ===============================
//   ЗАГРУЗКА РАЗДЕЛОВ
// ===============================
async function loadSections() {
    sectionsContainer.innerHTML = "Загрузка...";

    try {
        const resp = await fetch(`${API_BASE}/api/sections`);
        const data = await resp.json();

        sectionsContainer.innerHTML = "";

        data.forEach(sec => {
            const div = document.createElement("div");
            div.className = "section-card";
            div.innerHTML = `
                <div class="section-title">${sec.title}</div>
                <div class="section-desc">${sec.description || ""}</div>
            `;
            div.addEventListener("click", () => openSection(sec.id, sec.title));
            sectionsContainer.appendChild(div);
        });

    } catch (err) {
        console.error("Ошибка API:", err);
        sectionsContainer.innerHTML = "❌ Ошибка подключения к серверу";
    }
}



// ===============================
//   ОТКРЫТЬ РАЗДЕЛ
// ===============================
async function openSection(sectionId, sectionTitle) {
    materialsBlock.classList.remove("hidden");
    sectionsContainer.style.display = "none";

    materialsTitle.textContent = sectionTitle;
    materialsList.innerHTML = "Загрузка...";

    try {
        const resp = await fetch(`${API_BASE}/api/sections/${sectionId}/materials`);
        const data = await resp.json();

        materialsList.innerHTML = "";

        if (!data.length) {
            materialsList.innerHTML = "<p>Пока пусто.</p>";
            return;
        }

        data.forEach(m => {
            const div = document.createElement("div");
            div.className = "material-item";
            div.innerHTML = `
                <div class="material-title">${m.title}</div>
                <div class="material-type">${m.type}</div>
            `;
            materialsList.appendChild(div);
        });

    } catch (err) {
        console.error("Ошибка API:", err);
        materialsList.innerHTML = "❌ Ошибка загрузки материалов";
    }
}



// ===============================
//   КНОПКА НАЗАД
// ===============================
backBtn.onclick = () => {
    materialsBlock.classList.add("hidden");
    sectionsContainer.style.display = "flex";
};



// ===============================
//   СТАРТ
// ===============================
loadSections();
