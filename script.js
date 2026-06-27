// ==========================
// Mobile Menu
// ==========================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("show");
        menuBtn.setAttribute("aria-expanded", isOpen);
        menuBtn.innerHTML = isOpen ? "&times;" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.innerHTML = "☰";
        });
    });
}


// ==========================
// Scroll Reveal Animation
// ==========================
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    reveals.forEach(item => observer.observe(item));

} else {

    reveals.forEach(item => item.classList.add("active"));

}


// ==========================
// Join Now Popup
// ==========================
const joinModal = document.getElementById("joinModal");
const modalClose = document.getElementById("modalClose");
const joinForm = document.getElementById("joinForm");

const WHATSAPP_NUMBER = "923491860340";


// Open Popup
function openJoinModal() {

    if (!joinModal) return;

    joinModal.classList.add("show");
    joinModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

}

// Close Popup
function closeJoinModal() {

    if (!joinModal) return;

    joinModal.classList.remove("show");
    joinModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

}


// Open Button
document.querySelectorAll(".join-trigger").forEach(btn => {

    btn.addEventListener("click", openJoinModal);

});


// Close Button
if (modalClose) {

    modalClose.addEventListener("click", closeJoinModal);

}


// Outside Click
if (joinModal) {

    joinModal.addEventListener("click", e => {

        if (e.target === joinModal) {

            closeJoinModal();

        }

    });

}


// ESC Close
document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closeJoinModal();

    }

});


// ==========================
// Form Submit
// ==========================
if (joinForm) {

    joinForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const data = new FormData(this);

        const message = `📌 *New Student Registration*

👤 Full Name: ${data.get("name")}
📱 WhatsApp: ${data.get("phone")}
🎂 Age: ${data.get("age")}
💼 Profession: ${data.get("profession")}
🌍 City / Country: ${data.get("city")}
📖 Program: ${data.get("program")}
🕒 Preferred Time: ${data.get("time")}

💬 Message:
${data.get("message") || "N/A"}

━━━━━━━━━━━━━━
Submitted From Website`;

        const url =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

        this.reset();

        closeJoinModal();

    });

}