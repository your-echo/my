const tg = window.Telegram.WebApp;
tg.expand();

// Пока работаем с демо-данными (mock)
const API_BASE = ""; // подключим позже
const useMock = true;

// Демо-данные
const mockSections = [
    { id: 1, title: "Основы", description: "Стартовый путь." },
    { id: 2, title: "Практики", description: "Упражнения и медитации." },
    { id: 3, title: "Материалы", description: "Документы и файлы." },
];

const mockMaterials = {
    1: [
        { id: 101, title: "Введение в сознание", type: "text" },
        { id: 102, title: "Природа ума", type: "text" },
    ],
    2: [
        { id: 201, title: "Утренняя практика", type: "audio" },
        { id: 202, title: "Дыхание света", type: "video" },
    ],
    3: [
        { id: 301, title: "PDF: Основы", type: "file" },
        { id: 302, title: "Архив материалов", type: "archive" },
    ],
};

// Элементы
const sectionsContainer = document.getElementById("sections");
const materialsBlock = document.getElementById("materials");
const backBtn = document.getElementById("back");
const materialsTitle = document.getElementById("materials-title");
const materialsList = document.getElementById("materials-list");

// Загрузка разделов
async function loadSections() {
    let sections = mockSections; // потом: await fetch(API...)

    sectionsContainer.innerHTML = "";

    sections.forEach(sec => {
        const div = document.createElement("div");
        div.className = "section-card";
        div.innerHTML = `
            <div class="section-title">${sec.title}</div>
            <div class="section-desc">${sec.description || ""}</div>
        `;
        div.onclick = () => openSection(sec.id, sec.title);
        sectionsContainer.appendChild(div);
    });
}


async function openSection(sectionId, sectionTitle) {
    materialsBlock.classList.remove("hidden");
    sectionsContainer.style.display = "none";

    materialsTitle.textContent = sectionTitle;

    const materials = mockMaterials[sectionId] || [];

    materialsList.innerHTML = "";

    materials.forEach(m => {
        const div = document.createElement("div");
        div.className = "material-item";
        div.innerHTML = `
            <div class="material-title">${m.title}</div>
            <div class="material-type">${m.type}</div>
        `;
        materialsList.appendChild(div);
    });
}

backBtn.onclick = () => {
    materialsBlock.classList.add("hidden");
    sectionsContainer.style.display = "flex";
};

// старт
loadSections();
