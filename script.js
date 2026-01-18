// =====================
// BUKA OVERLAY
// =====================
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const main = document.getElementById("main-content");
    const btn = document.getElementById("openInvitation");
    const music = document.getElementById("music");

    // STATE AWAL (WAJIB)
    overlay.style.display = "block";
    main.style.display = "none";
    document.body.classList.add("overlay-lock");
    localStorage.removeItem("invitationOpened");

    btn.addEventListener("click", () => {
        overlay.style.display = "none";
        main.style.display = "block";
        document.body.classList.remove("overlay-lock");

        if (music) {
            music.currentTime = 0;
            music.play().catch(() => { });
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const main = document.getElementById("main-content");
    const btn = document.getElementById("openInvitation");
    const music = document.getElementById("music");

    // Cek localStorage → jika sudah dibuka sebelumnya, langsung main content
    if (localStorage.getItem("invitationOpened") === "true") {
        overlay.style.display = "none";
        main.style.display = "block";
        document.body.classList.remove("overlay-lock"); // scroll aktif
        if (music) music.play().catch(() => { });
    } else {
        overlay.style.display = "flex";
        main.style.display = "none";
        document.body.classList.add("overlay-lock"); // scroll dikunci
    }

    // Klik tombol buka undangan
    btn.addEventListener("click", () => {
        overlay.style.display = "none";
        main.style.display = "block";
        document.body.classList.remove("overlay-lock"); // scroll aktif
        if (music) {
            music.currentTime = 0;
            music.play().catch(() => { });
        }
        localStorage.setItem("invitationOpened", "true");
    });
});

// =====================
// COUNTDOWN
// =====================
const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

const weddingDate = new Date('December 31, 2027 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    if (distance < 0) return;

    countdownElements.days.textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
    countdownElements.hours.textContent = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    countdownElements.minutes.textContent = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    countdownElements.seconds.textContent = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// =====================
// LIGHTBOX
// =====================
let currentIndex = 0;
let zoomed = false;

const images = Array.from(document.querySelectorAll('.gallery-grid img'))
    .map(img => img.src);

/* SLIDER LAMBAT */
let slideIndex = 0;
setInterval(() => {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(s => s.classList.remove('active'));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
}, 5000); // LAMBAT (5 detik)

/* LIGHTBOX */
function openLightbox(i) {
    currentIndex = i;
    updateLightbox();
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    zoomed = false;
    document.getElementById('lightbox-img').style.transform = 'scale(1)';
    document.getElementById('shareMenu').style.display = 'none';
}

function changeSlide(n) {
    currentIndex = (currentIndex + n + images.length) % images.length;
    updateLightbox();
}

function updateLightbox() {
    document.getElementById('lightbox-img').src = images[currentIndex];
    document.getElementById('counter').innerText =
        `${currentIndex + 1} / ${images.length}`;
}

/* ZOOM */
function zoomImage() {
    zoomed = !zoomed;
    document.getElementById('lightbox-img').style.transform =
        zoomed ? 'scale(1.6)' : 'scale(1)';
}

/* SHARE */
function toggleShare() {
    const menu = document.getElementById('shareMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

function share(type) {
    const url = images[currentIndex];
    if (type === 'wa') window.open(`https://wa.me/?text=${url}`);
    if (type === 'fb') window.open(`https://facebook.com/sharer/sharer.php?u=${url}`);
    if (type === 'ig') alert('Share Instagram via Story / DM');
}
function resetZoom() {
    if (zoomed) {
        zoomed = false;
        document.getElementById('lightbox-img').style.transform = 'scale(1)';
    }
}


// =====================
// LOVE STORY TIMELINE PRO
// =====================
document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");
    if (!timeline) return;

    const line = timeline.querySelector(".timeline-line");
    const items = timeline.querySelectorAll(".timeline-item");

    function updateTimeline() {
        const rect = timeline.getBoundingClientRect();
        const viewHeight = window.innerHeight;

        /* progress scroll (dipelanin) */
        let progress = (viewHeight - rect.top) * 0.9; // ⬅️ KUNCI: bikin TURUN LEBIH PELAN
        progress = Math.max(0, progress);

        /* batas sampai marker terakhir */
        const lastMarker = items[items.length - 1]
            .querySelector(".timeline-marker")
            .getBoundingClientRect();

        const maxHeight =
            lastMarker.top - rect.top + 1;

        const height = Math.min(progress, maxHeight);
        line.style.height = `${height}px`;

        /* marker logic */
        items.forEach((item, index) => {
            const marker = item.querySelector(".timeline-marker");
            const markerRect = marker.getBoundingClientRect();

            if (markerRect.top < rect.top + height) {
                marker.classList.add("show");

                setTimeout(() => {
                    marker.classList.add("active");
                }, index * 120);
            } else {
                marker.classList.remove("active");
                marker.classList.remove("show");
            }
        });
    }

    window.addEventListener("scroll", updateTimeline);
    updateTimeline();
});
// =====================
// GIFS
// =====================

// =====================
// TOGGLE INFO PENGIRIM
// =====================
// Pastikan hanya ada 1 fungsi toggle
// Toggle Section Info Pengirim
const btnGift = document.getElementById('btn-gift');
const sectionGift = document.getElementById('info-kirim');

btnGift.addEventListener('click', function (e) {
    e.preventDefault();
    sectionGift.classList.toggle('show');

    if (sectionGift.classList.contains('show')) {
        sectionGift.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// Copy teks biasa
function copyText(number) {
    navigator.clipboard.writeText(number).then(() => {
        alert("Nomor rekening berhasil disalin ✅");
    });
}

// Copy + buka WhatsApp
function copyWa(number) {
    navigator.clipboard.writeText(number).then(() => {
        window.open(`https://wa.me/${number}`, '_blank');
    });
}

// =====================
// COPY & WHATSAPP
// =====================
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Berhasil disalin ✅");
    });
}

function copyAndWa(number) {
    navigator.clipboard.writeText(number).then(() => {
        alert("Nomor rekening berhasil disalin ✅");
        window.open(`https://wa.me/${number}`, "_blank");
    });
}

function copyWa(number) {
    navigator.clipboard.writeText(number).then(() => {
        alert("Nomor berhasil disalin ✅");
        window.open(`https://wa.me/${number}`, "_blank");
    });
}
// =====================
// RSVP RSVP RSVP RSVPRSVP RSVPRSVP RSVP
// =====================
const wishBtn = document.getElementById("wishBtn");
const form = document.getElementById("rsvpForm");
const attendanceHeader = document.getElementById("attendanceHeader");
const attendanceOptions = document.getElementById("attendanceOptions");
const attendanceText = document.getElementById("attendanceText");
const radios = document.querySelectorAll(".radio");
const guestCount = document.getElementById("guestCount");
const counts = document.querySelectorAll(".count");
const message = document.getElementById("message");
const wordCount = document.getElementById("wordCount");
const guestName = document.getElementById("guestName");
const wishContainer = document.querySelector(".wish-list-container");

let status = "";
let statusIcon = "";
let selectedCount = "";

/* ================= TOGGLE ================= */
wishBtn.onclick = () => {
    form.classList.toggle("hidden");
    wishContainer.classList.toggle("hidden");
};

attendanceHeader.onclick = () => {
    attendanceOptions.classList.toggle("hidden");
};

/* ================= HADIR / TIDAK ================= */
radios.forEach(r => {
    r.onclick = () => {
        radios.forEach(x => x.classList.remove("active"));
        r.classList.add("active");

        status = r.dataset.value;
        statusIcon = status === "Hadir" ? "✓" : "✕";
        attendanceText.textContent = status;

        if (status === "Hadir") {
            guestCount.classList.remove("hidden");
        } else {
            guestCount.classList.add("hidden");
            attendanceOptions.classList.add("hidden");
            selectedCount = "";
        }
    };
});

/* ================= JUMLAH ORANG ================= */
counts.forEach(c => {
    c.onclick = () => {
        counts.forEach(x => x.classList.remove("active"));
        c.classList.add("active");

        selectedCount = c.dataset.count + " Orang";
        attendanceText.textContent = "Hadir • " + selectedCount;

        guestCount.classList.add("hidden");
        attendanceOptions.classList.add("hidden");
    };
});

/* ================= WORD COUNT ================= */
message.oninput = () => {
    wordCount.textContent = message.value.length;
};

/* ================= TIME FORMAT ================= */
function timeAgo(ts) {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    const w = Math.floor(d / 7);
    const mo = Math.floor(d / 30);

    if (m < 1) return "Baru saja";
    if (m < 60) return `${m} menit yang lalu`;
    if (h < 24) return `${h} jam yang lalu`;
    if (d < 7) return `${d} hari yang lalu`;
    if (w < 5) return `${w} minggu yang lalu`;
    return `${mo} bulan yang lalu`;
}

/* ================= SUBMIT ================= */
form.onsubmit = e => {
    e.preventDefault();

    // ===== VALIDASI =====
    if (!guestName.value.trim()) {
        alert("Harap isi nama terlebih dahulu");
        return;
    }

    if (!status) {
        alert("Harap pilih konfirmasi kehadiran");
        return;
    }

    if (status === "Hadir" && !selectedCount) {
        alert("Harap pilih jumlah orang");
        return;
    }

    if (!message.value.trim()) {
        alert("Harap isi ucapan");
        return;
    }

    // ===== SIMPAN =====
    const now = Date.now();

    const item = `
    <div class="wish-item" data-ts="${now}">
        <div class="wish-header">💌 <strong>${guestName.value}</strong> ${statusIcon}</div>
        ${selectedCount ? `<div class="wish-count">(${selectedCount})</div>` : ""}
        <div class="wish-message">${message.value}</div>
        <div class="wish-time">${timeAgo(now)}</div>
    </div>
    `;

    wishContainer.innerHTML = item + wishContainer.innerHTML;
    localStorage.setItem("wishes", wishContainer.innerHTML);

    // ===== RESET =====
    form.reset();
    status = "";
    statusIcon = "";
    selectedCount = "";
    attendanceText.textContent = "Konfirmasi Kehadiran";
    guestCount.classList.add("hidden");
    attendanceOptions.classList.add("hidden");
    wordCount.textContent = 0;
};

/* ================= LOAD ================= */
window.onload = () => {
    const saved = localStorage.getItem("wishes");
    if (saved) wishContainer.innerHTML = saved;
};

/* ================= UPDATE TIME LIVE ================= */
setInterval(() => {
    document.querySelectorAll(".wish-item").forEach(item => {
        const ts = item.dataset.ts;
        const timeEl = item.querySelector(".wish-time");
        if (ts && timeEl) timeEl.textContent = timeAgo(ts);
    });
}, 60000);



// MUSIK  // MUSIK // MUSIK // MUSIK // MUSIK 

const vinyl = document.getElementById('vinyl');
const music = document.getElementById('music');

let isPlaying = true; // musik langsung muter di awal

vinyl.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        vinyl.classList.remove('spin');  // vinyl berhenti muter
        isPlaying = false;
    } else {
        music.play().catch(() => console.log("Klik lagi untuk memulai musik"));
        vinyl.classList.add('spin');     // vinyl mulai muter
        isPlaying = true;
    }
});


// papan pemasarannnnnnnnnnnnmnnnnnnnnn


const bottomAds = document.getElementById("bottomAds");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 5) {
        bottomAds.classList.add("show");
    } else {
        bottomAds.classList.remove("show");
    }
});





/* =====================
   BACKGROUND SLIDESHOW
===================== */
// =====================
// BACKGROUND SLIDESHOW (SAFE)
// =====================
const bgImages = [
    'beladandeni.webp',
    'beladandeni1.webp',
    'beladandeni2.webp'
];

const bg = document.querySelector('.bg-slideshow');

bgImages.forEach((img, i) => {
    const span = document.createElement('span');
    span.style.backgroundImage = `url('${img}')`;
    if (i === 0) span.classList.add('active');
    bg.appendChild(span);
});

const slides = bg.querySelectorAll('span');
let current = 0;

setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}, 8000);

