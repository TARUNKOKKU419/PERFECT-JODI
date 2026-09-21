const STORAGE_KEY = "perfectJodiRegistrations";

// Get registrations
function getRegistrations() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Save registrations
function saveRegistrations(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


// ===============================
// REGISTRATION
// ===============================

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const registration = {
            id: Date.now(),

            fullName: document.getElementById("fullName").value,
            gender: document.getElementById("gender").value,
            age: document.getElementById("age").value,
            caste: document.getElementById("caste").value,
            height: document.getElementById("height").value,
            weight: document.getElementById("weight").value,

            fatherName: document.getElementById("fatherName").value,
            motherName: document.getElementById("motherName").value,

            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            location: document.getElementById("location").value,

            education: document.getElementById("education").value,
            occupation: document.getElementById("occupation").value,
            about: document.getElementById("about").value,

            date: new Date().toLocaleString()
        };

        const registrations = getRegistrations();

        registrations.push(registration);

        saveRegistrations(registrations);

        alert("Registration submitted successfully! ❤️");

        registrationForm.reset();
    });
}


// ===============================
// ADMIN LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if (username === "NAGABABU" && password === "NAGABABU@123") {

            alert("Login successful!");

            const adminSection = document.getElementById("admin");
            const dashboard = document.getElementById("dashboard");

            if (adminSection) {
                adminSection.style.display = "none";
            }

            if (dashboard) {
                dashboard.style.display = "block";
            }

            loadDashboard();

        } else {

            alert("Invalid username or password!");

        }
    });
}


// ===============================
// DASHBOARD
// ===============================

function loadDashboard() {

    const tableBody = document.getElementById("registrationTableBody");

    if (!tableBody) {
        return;
    }

    const registrations = getRegistrations();

    tableBody.innerHTML = "";

    if (registrations.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="16" style="text-align:center;">
                    No registrations found.
                </td>
            </tr>
        `;

        return;
    }

    registrations.forEach(function (person, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${person.fullName}</td>
            <td>${person.gender}</td>
            <td>${person.age}</td>
            <td>${person.caste}</td>
            <td>${person.height}</td>
            <td>${person.weight}</td>
            <td>${person.fatherName}</td>
            <td>${person.motherName}</td>
            <td>${person.phone}</td>
            <td>${person.email}</td>
            <td>${person.location}</td>
            <td>${person.education}</td>
            <td>${person.occupation}</td>
            <td>${person.about}</td>
            <td>
                <button onclick="deleteRegistration(${person.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


// ===============================
// DELETE
// ===============================

function deleteRegistration(id) {

    if (!confirm("Are you sure you want to delete this registration?")) {
        return;
    }

    let registrations = getRegistrations();

    registrations = registrations.filter(function (person) {
        return person.id !== id;
    });

    saveRegistrations(registrations);

    loadDashboard();
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    const dashboard = document.getElementById("dashboard");
    const adminSection = document.getElementById("admin");

    if (dashboard) {
        dashboard.style.display = "none";
    }

    if (adminSection) {
        adminSection.style.display = "block";
    }
}


// Make functions available to HTML
window.deleteRegistration = deleteRegistration;
window.logout = logout;
window.loadDashboard = loadDashboard;