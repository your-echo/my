const tg = window.Telegram.WebApp;
tg.expand();

const API = "https://YOUR-API-RENDER-URL"; // ← подставлю, когда пришлёшь URL

const content = document.getElementById("admin-content");

// --- ВЫХОД ---
function goBack() {
    window.location.href = "index.html";
}


// --- РАЗДЕЛЫ ---
async function openSections() {
    content.innerHTML = "Загрузка разделов...";

    const res = await fetch(`${API}/api/sections`);
    const data = await res.json();

    let html = `
        <h2>Разделы</h2>
        <button onclick="showCreateSection()">➕ Создать раздел</button>
        <div class="list-block">
    `;

    data.forEach(sec => {
        html += `
            <div class="list-item">
                <b>${sec.title}</b>
                <button onclick="deleteSection(${sec.id})">Удалить</button>
            </div>
        `;
    });

    html += "</div>";
    content.innerHTML = html;
}

function showCreateSection() {
    content.innerHTML = `
        <h2>Создать раздел</h2>
        <input id="new-title" placeholder="Название"><br><br>
        <textarea id="new-desc" placeholder="Описание"></textarea><br><br>
        <button onclick="createSection()">Создать</button>
        <button onclick="openSections()">Назад</button>
    `;
}

async function createSection() {
    const title = document.getElementById("new-title").value;
    const description = document.getElementById("new-desc").value;

    await fetch(`${API}/api/admin/sections?user_id=${tg.initDataUnsafe.user.id}&title=${title}&description=${description}`, {
        method: "POST"
    });

    openSections();
}

async function deleteSection(id) {
    await fetch(`${API}/api/admin/sections/${id}?user_id=${tg.initDataUnsafe.user.id}`, {
        method: "DELETE"
    });

    openSections();
}



// --- МАТЕРИАЛЫ ---
function openMaterials() {
    content.innerHTML = `
        <h2>Материалы</h2>
        <p>Скоро добавлю функцию выбора раздела, загрузки текстов, ссылок…</p>
    `;
}



// --- ЗАГРУЗКА ФАЙЛОВ ---
function openUpload() {
    content.innerHTML = `
        <h2>Загрузить файл</h2>
        <input type="file" id="fileInput"><br><br>
        <button onclick="uploadFile()">Загрузить</button>
    `;
}

async function uploadFile() {
    let file = document.getElementById("fileInput").files[0];
    let form = new FormData();

    form.append("file", file);

    await fetch(`${API}/api/admin/upload?user_id=${tg.initDataUnsafe.user.id}`, {
        method: "POST",
        body: form
    });

    alert("Файл загружен!");
}



// --- ФАЙЛЫ R2 ---
async function openFiles() {
    const res = await fetch(`${API}/api/admin/files?user_id=${tg.initDataUnsafe.user.id}`);
    const files = await res.json();

    let html = `<h2>Файлы в R2</h2><div class="list-block">`;

    files.forEach(name => {
        html += `
            <div class="list-item">
                ${name}
                <button onclick="deleteFile('${name}')">Удалить</button>
            </div>
        `;
    });

    html += "</div>";
    content.innerHTML = html;
}

async function deleteFile(name) {
    await fetch(`${API}/api/admin/files?key=${name}&user_id=${tg.initDataUnsafe.user.id}`, {
        method: "DELETE"
    });
    openFiles();
}
