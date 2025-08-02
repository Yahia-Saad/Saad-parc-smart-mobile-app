
const addCardBtn = document.getElementById("addCardBtn");
const inputChoiceModal = document.getElementById("inputChoiceModal");
const chooseTextBtn = document.getElementById("chooseTextBtn");
const chooseImageBtn = document.getElementById("chooseImageBtn");
const cancelChoiceBtn = document.getElementById("cancelChoiceBtn");

const imageInputModal = document.getElementById("imageInputModal");
const imageFileInput = document.getElementById("imageFileInput");
const analyzeImageBtn = document.getElementById("analyzeImageBtn");
const cancelImageBtn = document.getElementById("cancelImageBtn");

const cardForm = document.getElementById("cardForm");
const immatInput = document.getElementById("immat");
const immatAntInput = document.getElementById("immatAnt");
const miseEnCirculationInput = document.getElementById("miseEnCirculation");
const pinValiditeInput = document.getElementById("pinValidite");
const marqueInput = document.getElementById("marque");
const numChassisInput = document.getElementById("numChassis");
const descriptionInput = document.getElementById("description");

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const logsContainer = document.createElement("div");
logsContainer.className = "logs";
document.body.appendChild(logsContainer);

const statsContainer = document.createElement("div");
statsContainer.className = "stats";
document.body.appendChild(statsContainer);

const systemInfo = document.createElement("div");
systemInfo.className = "system-info";
document.body.appendChild(systemInfo);

const StorageKeyCards = "GreyCardAppCards";
const StorageKeyLogs = "GreyCardAppLogs";
const StorageKeyAnalytics = "GreyCardAppAnalytics";
const StorageKeySystemInfo = "GreyCardAppSystemInfo";

const saveSound = document.getElementById("saveSound");
const clickSound = document.getElementById("clickSound");

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function playSave() {
  saveSound.currentTime = 0;
  saveSound.play();
}
const translateBtn = document.createElement("button");
translateBtn.className = "Btn";

translateBtn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
           10-4.48 10-10S17.52 2 12 2zm0 2c1.74 0 
           3.41.56 4.75 1.5C16.45 8.34 14.35 9 12 9s-4.45-.66-4.75-3.5C8.59 4.56 10.26 4 12 4zm0 
           16c-1.74 0-3.41-.56-4.75-1.5.3-2.84 2.4-3.5 
           4.75-3.5s4.45.66 4.75 3.5C15.41 19.44 13.74 
           20 12 20zm6.5-3.5c-.83-3.67-3.95-4.5-6.5-4.5s-5.67.83-6.5 
           4.5c-1.26-1.47-2-3.39-2-5.5s.74-4.03 
           2-5.5C5.33 8.67 8.95 9.5 12 9.5s6.67-.83 
           8.5-2c1.26 1.47 2 3.39 2 5.5s-.74 4.03-2 
           5.5z"/>
</svg>
`;

document.body.appendChild(translateBtn);


translateBtn.onclick = () => {
  if (!navigator.onLine) {
    alert("⚠️ لا يوجد اتصال بالإنترنت، الترجمة غير متاحة");
    return;
  }

  // ترجمة العناوين والنصوص
  document.querySelectorAll("h1, h2, h3, p, li").forEach(el => {
    el.textContent = el.textContent
      .replace("البطاقة الرمادية", "Carte Grise")
      .replace("تسجيل خروج", "Déconnexion")
      .replace("أضف بطاقة", "Ajouter une carte")
      .replace("إحصائيات البطاقة الرمادية:", "Statistiques de la carte grise:")
      .replace("إجمالي البطاقات:", "Total des cartes:")
      .replace("تحليلات الصور:", "Analyses d'images:")
      .replace("متوسط دقة التحليل:", "Précision moyenne:")
      .replace("سجل النشاط:", "Journal des activités:")
      .replace("معلومات النظام:", "Infos système:")
      .replace("آخر دخول:", "Dernière connexion:")
      .replace("الوضع:", "Mode:")
      .replace("تطوير", "Développement")
      .replace("لا توجد نتائج", "Aucun résultat trouvé");
  });

  // ترجمة الأزرار
  document.querySelectorAll("button").forEach(btn => {
    btn.textContent = btn.textContent
      .replace("تسجيل خروج", "Déconnexion")
      .replace("أضف بطاقة", "Ajouter une carte")
      .replace("تحليل الصورة", "Analyser l'image")
      .replace("إلغاء", "Annuler")
      .replace("كتابة نصية", "Saisie manuelle")
      .replace("صورة", "Par image")
      .replace("حفظ البطاقة", "Enregistrer la carte")
      .replace("ترجمة شاملة للفرنسية", "Traduction complète")
      .replace("Consol", "Console");
  });

  // ترجمة الـ Placeholder للحقول
  immatInput.placeholder = "Numéro d'immatriculation (ex: 12/34/5678)";
  immatAntInput.placeholder = "Ancienne immatriculation";
  miseEnCirculationInput.placeholder = "Date de mise en circulation";
  pinValiditeInput.placeholder = "Code de validité";
  marqueInput.placeholder = "Marque";
  numChassisInput.placeholder = "Numéro de châssis";
  descriptionInput.placeholder = "Description (facultatif)";
  searchInput.placeholder = "Rechercher par immatriculation...";

  alert("✅ Traduction complète activée");
};


searchInput.oninput = e => {
  const query = e.target.value.trim().toLowerCase();
  const cards = loadCards();
  const filtered = query
    ? cards.filter(c =>
        (c.immat && c.immat.toLowerCase().includes(query)) ||
        (c.marque && c.marque.toLowerCase().includes(query))
      )
    : [];
  searchResults.innerHTML = filtered.length
    ? filtered.map(c => `<li>${c.immat} - ${c.marque}</li>`).join("")
    : "<li>لا توجد نتائج</li>";
};

window.addEventListener("offline", () => alert("⚠️ لا يوجد اتصال بالإنترنت"));
window.addEventListener("online", () => console.log("✅ الاتصال متاح"));


function loadCards() {
  return JSON.parse(localStorage.getItem(StorageKeyCards) || "[]");
}

function saveCards(cards) {
  localStorage.setItem(StorageKeyCards, JSON.stringify(cards));
}

function logActivity(action) {
  const logs = JSON.parse(localStorage.getItem(StorageKeyLogs) || "[]");
  logs.push({ action, time: new Date().toLocaleString() });
  localStorage.setItem(StorageKeyLogs, JSON.stringify(logs));
  renderLogs();
}

function clearForm() {
  immatInput.value = "";
  immatAntInput.value = "";
  miseEnCirculationInput.value = "";
  pinValiditeInput.value = "";
  marqueInput.value = "";
  numChassisInput.value = "";
  descriptionInput.value = "";
}

function validateImmat(value) {
  return /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}$/.test(value);
}


function updateAnalytics(confidence) {
  const stats = JSON.parse(localStorage.getItem(StorageKeyAnalytics) || "[]");
  stats.push({ confidence, time: Date.now() });
  localStorage.setItem(StorageKeyAnalytics, JSON.stringify(stats));
  renderStatistics();
}

function renderLogs() {
  const logs = JSON.parse(localStorage.getItem(StorageKeyLogs) || "[]");
  logsContainer.innerHTML = "<h3>سجل النشاط:</h3>";
  logs.slice(-15).reverse().forEach(log => {
    const p = document.createElement("p");
    p.textContent = `${log.time} - ${log.action}`;
    logsContainer.appendChild(p);
  });
}

function renderSystemInfo() {
  const info = JSON.parse(localStorage.getItem(StorageKeySystemInfo) || "{}");
  systemInfo.innerHTML =
    `<h3>معلومات النظام:</h3>
     <p>آخر دخول: ${info.lastLogin || "غير متوفر"}</p>
     <p>نسخة النظام: 1.0.0</p>
     <p>الوضع: تطوير</p>`;
}

function processExtractedText(text) {
  const immatMatch = text.match(/\d{1,2}\/\d{1,2}\/\d{1,4}/);
  const marqueMatch = text.match(/(?:الماركة|ماركة)\s*[:\-]?\s*(\w+)/i);
  const numChassisMatch = text.match(/(?:رقم الهيكل|الهيكل)\s*[:\-]?\s*(\w+)/i);
  const pinMatch = text.match(/(?:رمز الصلاحية|الصلاحية)\s*[:\-]?\s*(\w+)/i);
  const miseMatch = text.match(/(?:تاريخ الاستعمال|تاريخ الاستخدام)\s*[:\-]?\s*(\d{4}[-/]\d{2}[-/]\d{2})/);

  let confidence = 0;
  if (immatMatch) confidence += 20;
  if (marqueMatch) confidence += 20;
  if (numChassisMatch) confidence += 20;
  if (pinMatch) confidence += 20;
  if (miseMatch) confidence += 20;

  immatInput.value = immatMatch ? immatMatch[0] : "";
  marqueInput.value = marqueMatch ? marqueMatch[1] : "";
  numChassisInput.value = numChassisMatch ? numChassisMatch[1] : "";
  pinValiditeInput.value = pinMatch ? pinMatch[1] : "";
  miseEnCirculationInput.value = miseMatch ? miseMatch[1] : "";
  descriptionInput.value = `تم استخراج البيانات بنسبة دقة ${confidence}%`;

  logActivity(`تحليل صورة بدقة ${confidence}%`);
  updateAnalytics(confidence);
}

analyzeImageBtn.onclick = () => {
  const file = imageFileInput.files[0];
  if (!file) {
    alert("يرجى اختيار صورة البطاقة بوضوح");
    return;
  }
  playClick();
  const reader = new FileReader();
  reader.onload = e => {
    Tesseract.recognize(e.target.result, 'ara+fra+eng', { logger: m => console.log(m) })
      .then(({ data: { text } }) => {
        processExtractedText(text);
        alert("\u2714 تم تحليل الصورة");
        imageInputModal.classList.add("hidden");
        cardForm.classList.remove("hidden");
      })
      .catch(err => {
        console.error(err);
        alert("مشكل صدرية الهاتف غير مدعومة جرب في نظام غير sumsung");
      });
  };
  reader.readAsDataURL(file);
};

addCardBtn.onclick = () => {
  playClick();
  inputChoiceModal.classList.remove("hidden");
};

chooseTextBtn.onclick = () => {
  playClick();
  inputChoiceModal.classList.add("hidden");
  cardForm.classList.remove("hidden");
  clearForm();
};

chooseImageBtn.onclick = () => {
  playClick();
  inputChoiceModal.classList.add("hidden");
  imageInputModal.classList.remove("hidden");
  clearForm();
};

cancelChoiceBtn.onclick = () => {
  playClick();
  inputChoiceModal.classList.add("hidden");
};

cancelImageBtn.onclick = () => {
  playClick();
  imageInputModal.classList.add("hidden");
  clearForm();
};

searchInput.oninput = e => {
  const query = e.target.value.trim();
  const cards = loadCards();
  const filtered = query ? cards.filter(c => c.immat.includes(query) || (c.marque && c.marque.includes(query))) : [];
  searchResults.innerHTML = filtered.map(c => `<li>${c.immat} - ${c.marque}</li>`).join("") || "<li>لا توجد نتائج</li>";
};

cardForm.onsubmit = e => {
  e.preventDefault();
  const immat = immatInput.value.trim();
  if (!validateImmat(immat)) {
    alert("الصيغة غير صحيحة، مثال: 12/34/5678");
    return;
  }
const card = {
  immat: immat,
  immatAnt: immatAntInput.value.trim(),
  miseEnCirculation: miseEnCirculationInput.value,
  pinValidite: pinValiditeInput.value.trim(),
  marque: marqueInput.value.trim(),
  numChassis: numChassisInput.value.trim(),
  description: descriptionInput.value.trim()
};

const cards = loadCards();
const exists = cards.some(c =>
  c.immat === card.immat &&
  c.immatAnt === card.immatAnt &&
  c.miseEnCirculation === card.miseEnCirculation &&
  c.pinValidite === card.pinValidite &&
  c.marque === card.marque &&
  c.numChassis === card.numChassis
);

if (exists) {
  alert("⚠️ هذه البطاقة موجودة بالفعل ولا يمكن إضافتها مرتين.");
  return;
}

cards.push(card);
saveCards(cards);

  playSave();
  renderStatistics();
  logActivity("إضافة بطاقة يدوياً");
  alert("تم حفظ البطاقة");
  cardForm.reset();
  cardForm.classList.add("hidden");
};

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.onclick = () => {
  localStorage.removeItem("GreyCardAppSession");
  alert("تم تسجيل الخروج");
  window.location.href = "index.html";
};

if (!localStorage.getItem("GreyCardAppSession")) {
  alert("يجب تسجيل الدخول للوصول للنظام");
  window.location.href = "index.html";
}

renderStatistics();
renderLogs();
renderSystemInfo();
localStorage.setItem(StorageKeySystemInfo, JSON.stringify({ lastLogin: new Date().toLocaleString() }));
console.log("✅ تم تفعيل جميع وحدات النظام.");
const consolBtn = document.getElementById("consolBtn");
const consolPanel = document.getElementById("consolPanel");

consolBtn.onclick = () => {
  const cards = loadCards();
  const logs = JSON.parse(localStorage.getItem("GreyCardAppLogs") || "[]");
  const stats = JSON.parse(localStorage.getItem("GreyCardAppAnalytics") || "[]");

  const lastLog = logs.length ? logs[logs.length - 1].action : "لا توجد عمليات";
  const lastConfidence = stats.length ? stats[stats.length - 1].confidence + "%" : "N/A";

  consolPanel.innerHTML = `
    <h4 style="margin-top:0;">ملخص النظام</h4>
    <p>عدد البطاقات: ${cards.length}</p>
    <p>آخر عملية: ${lastLog}</p>
    <p>دقة آخر تحليل: ${lastConfidence}</p>
  `;
  
  consolPanel.style.display = consolPanel.style.display === "none" ? "block" : "none";
};
