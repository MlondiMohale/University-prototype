// =======================
// LOGIN FUNCTION
// =======================
function login() {
  let id = document.getElementById("id")?.value;
  let user = document.getElementById("username")?.value;

  if (id && user) {
    window.location.href = "home.html";
  } else {
    alert("Enter details");
  }
}

// =======================
// GLOBAL SEARCH
// =======================
function searchRedirect(e) {
  if (e.key === "Enter") {
    let inputEl = document.getElementById("search");
    if (!inputEl) return;

    let query = inputEl.value.trim();

    if (!query) {
      alert("Enter search term");
      return;
    }

    window.location.href = "search.html?q=" + encodeURIComponent(query);
  }
}

// =======================
// COURSE REGISTRATION
// =======================
const courses = [
  "CS101 - Introduction to Programming",
  "CS202 - Data Structures",
  "CS303 - Databases",
  "CS404 - Artificial Intelligence"
];

let selectedCourses = [];

function searchCourses() {
  let inputEl = document.getElementById("courseSearch");
  if (!inputEl) return;

  let input = inputEl.value.toLowerCase();

  let results = courses.filter(c =>
    c.toLowerCase().includes(input)
  );

  let output = document.getElementById("courseList");
  if (!output) return;

  output.innerHTML = results.map(course =>
    `<p onclick="addCourse(\`${course}\`)">${course}</p>`
  ).join("");
}

function addCourse(course) {
  if (!selectedCourses.includes(course)) {
    selectedCourses.push(course);
    displayCart();
  }
}

function displayCart() {
  let cart = document.getElementById("cart");
  if (!cart) return;

  cart.innerHTML = selectedCourses.map(c => `<p>${c}</p>`).join("");
}

function confirmRegistration() {
  if (selectedCourses.length === 0) {
    alert("No courses selected");
  } else {
    alert("Registered for:\n" + selectedCourses.join("\n"));
  }
}

// =======================
// LIBRARY SYSTEM
// =======================
const libraryData = [
  { title: "Computer Science: An Overview", type: "book", location: "Main Library" },
  { title: "Introduction to Algorithms", type: "book", location: "Science Library" },
  { title: "AI Research Paper 2025", type: "article", location: "Online" },
  { title: "Database Systems Journal", type: "article", location: "Online" }
];

function searchLibrary() {
  let searchEl = document.getElementById("librarySearch");
  let filterEl = document.getElementById("filter");
  let output = document.getElementById("libraryResults");

  if (!searchEl || !filterEl || !output) return;

  let query = searchEl.value.toLowerCase();
  let filter = filterEl.value;

  let results = libraryData.filter(item => {
    let matchesQuery = item.title.toLowerCase().includes(query);
    let matchesFilter = (filter === "all" || item.type === filter);
    return matchesQuery && matchesFilter;
  });

  if (results.length === 0) {
    output.innerHTML = "<p>No results found</p>";
    return;
  }

  output.innerHTML = results.map(item => `
    <div class="card">
      <h4>${item.title}</h4>
      <p>Type: ${item.type}</p>
      <p>Location: ${item.location}</p>
      <button onclick="checkAvailability(\`${item.title}\`)">Check Availability</button>
    </div>
  `).join("");
}

function checkAvailability(title) {
  alert(title + " is available!");
}

// =======================
// PAYMENT SYSTEM
// =======================

// Make sure this exists if NOT using data.js
if (typeof studentFees === "undefined") {
  var studentFees = { balance: 5000 };
}

function loadBalance() {
  let balanceEl = document.getElementById("balance");
  if (balanceEl) {
    balanceEl.innerText = studentFees.balance;
  }
}

function payFees() {
  let amountEl = document.getElementById("amount");
  if (!amountEl) return;

  let amount = parseInt(amountEl.value);

  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  if (amount > studentFees.balance) {
    alert("Amount exceeds balance");
    return;
  }

  studentFees.balance -= amount;

  alert("Payment successful!");
  loadBalance();
}

// =======================
// DIRECTORY SYSTEM
// =======================

// Fallback if not using data.js
if (typeof directoryData === "undefined") {
  var directoryData = [
    { name: "Dr. Sarah Johnson", role: "Professor", department: "Computer Science", email: "sarah@uni.edu" },
    { name: "Mr. John Dlamini", role: "Administrator", department: "Admissions", email: "john@uni.edu" },
    { name: "Dr. Linda Nkosi", role: "Lecturer", department: "Mathematics", email: "linda@uni.edu" }
  ];
}

function searchDirectory() {
  let inputEl = document.getElementById("dirSearch");
  let output = document.getElementById("directoryResults");

  if (!inputEl || !output) return;

  let query = inputEl.value.toLowerCase();

  let results = directoryData.filter(person =>
    person.name.toLowerCase().includes(query) ||
    person.department.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    output.innerHTML = "<p>No results found</p>";
    return;
  }

  output.innerHTML =
    `<div class="grid">` +
    results.map(p => `
      <div class="card">
        <h4>${p.name}</h4>
        <p>${p.role}</p>
        <p>${p.department}</p>
        <p>${p.email}</p>
      </div>
    `).join("") +
    `</div>`;
}

// =======================
// MOBILE MENU
// =======================
function toggleMenu() {
  let nav = document.getElementById("navMenu");
  if (nav) {
    nav.classList.toggle("active");
  }
}

// =======================
// PAGE LOAD HANDLING
// =======================
window.addEventListener("DOMContentLoaded", () => {
  loadBalance();

  // Auto-load library results
  if (document.getElementById("libraryResults")) {
    searchLibrary();
  }
});