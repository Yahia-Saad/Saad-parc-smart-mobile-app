const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginContainer = document.querySelector(".login-container");
const registerContainer = document.querySelector(".register-container");
const clickSound = document.getElementById("clickSound");

const StorageKeyUsers = "GreyCardAppUsers";
const StorageKeySession = "GreyCardAppSession";

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function loadUsers() {
  const users = localStorage.getItem(StorageKeyUsers);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem(StorageKeyUsers, JSON.stringify(users));
}

function showMessage(text, container) {
  const msg = document.createElement("div");
  msg.textContent = text;
  msg.className = "alert";
  container.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

function switchToRegister() {
  playClick();
  loginContainer.classList.add("hidden");
  registerContainer.classList.remove("hidden");
}

function switchToLogin() {
  playClick();
  registerContainer.classList.add("hidden");
  loginContainer.classList.remove("hidden");
}

document.getElementById("goRegister").onclick = e => {
  e.preventDefault();
  switchToRegister();
};
document.getElementById("goLogin").onclick = e => {
  e.preventDefault();
  switchToLogin();
};

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  playClick();
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem(StorageKeySession, username);
    window.location.href = "dashboard.html";
  } else {
    alert("خطأ: اسم المستخدم أو كلمة المرور غير صحيحة!");
  }
});

registerForm.addEventListener("submit", e => {
  e.preventDefault();
  playClick();
  const username = document.getElementById("regUser").value.trim();
  const password = document.getElementById("regPass").value.trim();
  if (username.length < 3 || password.length < 3) {
    alert("يجب أن تكون أسماء المستخدم وكلمة المرور على الأقل 3 أحرف");
    return;
  }
  let users = loadUsers();
  if (users.find(u => u.username === username)) {
    alert("هذا الاسم مستخدم من قبل");
    return;
  }
  users.push({ username, password });
  saveUsers(users);
  alert("تم إنشاء الحساب بنجاح، يمكنك تسجيل الدخول الآن");
  switchToLogin();
});
