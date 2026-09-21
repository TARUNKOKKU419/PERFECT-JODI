// PerfectJodi - Registration System

const STORAGE_KEY = "perfectJodiRegistrations";

// Load registrations
function getRegistrations() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Save registrations
function saveRegistrations(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Registration Form
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

        alert("Registration successful! Thank you for registering with PerfectJodi.");

        registrationForm.reset();
    });
}


// Admin Login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
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


// Load Dashboard
function loadDashboard() {

    const registrations = getRegistrations();

    const tableBody = document.getElementById("registrationTableBody");

    if (!tableBody) {
        return;
    }

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
                <button class="delete-btn" onclick="deleteRegistration(${person.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


// Delete Registration
function deleteRegistration(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this registration?"
    );

    if (!confirmDelete) {
        return;
    }

    let registrations = getRegistrations();

    registrations = registrations.filter(function (person) {
        return person.id !== id;
    });

    saveRegistrations(registrations);

    loadDashboard();

    alert("Registration deleted successfully.");
}


// Logout
function logout() {

    const dashboard = document.getElementById("dashboard");
    const adminSection = document.getElementById("admin");

    if (dashboard) {
        dashboard.style.display = "none";
    }

    if (adminSection) {
        adminSection.style.display = "block";
    }

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.reset();
    }

    window.location.hash = "admin";
}


// Make functions available to HTML buttons
window.deleteRegistration = deleteRegistration;
window.logout = logout;
window.loadDashboard = loadDashboard;