const messages = [
    "un applauso virtuale",
    "quasi ma no",
    "aria fritta",
    "oggi fortuna off?",
    "hai vinto un caffè immaginario",
    "molto quasi",
    "niente",
    "magari il prossimo",
    "speranza attiva",
    "che sfiga",
    "la prossima volta forse",
    "il destino ti ha fregato",
    "...",
    "non oggi",
    "sorridi comunque",
    "almeno sei fortunato in amore",
    "questo biglietto è lontano",
    "non arrenderti",
    "abbiamo capito",
    "non era questo",
    "quasi quasi",
    "tanta energia sprecata",
    "ne vale la pena?",
    "un’altra chance?",
    "ehi, penso positivo",
    "fingeva di essere vincente",
    "buon allenamento",
    "sei sulla strada giusta",
    "c’è sempre un domani",
    "tieni duro",
    "non mollare",
    "un po’ di suspense",
    "non c'è nessun premio",
    "forse quando nevicherà",
    "se continui così, vai a pestare una merda",
    "non ci siamo",
    "era scritto nelle stelle",
    "ci hai messo cuore",
    "peccato, riprova"
];

document.addEventListener('DOMContentLoaded', () => {
    const yearInput = document.getElementById('year');
    if (yearInput) {
        const today = new Date();
        const maxDate = new Date(today);
        maxDate.setFullYear(maxDate.getFullYear() - 1); // richiede almeno 1 anno
        yearInput.max = maxDate.toISOString().split('T')[0];
        yearInput.min = '1950-01-01';
    }
});

let winnerIndex = 0;
let age = 0;
const audio = document.getElementById("bgm");
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let originalName = "";


function playWinSound() {

    const notes = [784, 880, 1046, 988, 784, 880];

    notes.forEach((f, i) => {

        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();

        o.frequency.value = f;
        o.type = "sawtooth";

        g.gain.setValueAtTime(0, audioCtx.currentTime);
        g.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.01);
        g.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + i * 0.15 + 0.18);

        o.connect(g);
        g.connect(audioCtx.destination);

        const start = audioCtx.currentTime + i * 0.15;
        o.start(start);
        o.stop(start + 0.18);
    });
}

function drawScratchTexture(ctx, w, h) {

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#d7dadc");
    grad.addColorStop(0.3, "#9ea3a6");
    grad.addColorStop(0.6, "#cfd2d3");
    grad.addColorStop(1, "#8a8f93");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 900; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.15})`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
    }

    ctx.globalAlpha = 0.07;
    for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.moveTo(0, Math.random() * h);
        ctx.lineTo(w, Math.random() * h);
        ctx.strokeStyle = "#fff";
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

function start() {

    originalName = document.getElementById("name").value.toLowerCase().trim();
    const dateValue = document.getElementById("year").value;

    if (!originalName || !dateValue) {
        alert("Inserisci dati richiesti");
        return;
    }

    const birthDate = new Date(dateValue);

    if (isNaN(birthDate.getTime())) {
        alert("Data non valida");
        return;
    }

    const today = new Date();

    const minDate = new Date("1950-01-01");
    const maxDate = new Date(today);
    maxDate.setFullYear(maxDate.getFullYear() - 8);

    if (birthDate < minDate) {
        alert("Troppo vintage per questo 😅");
        return;
    }

    if (birthDate > today) {
        alert("Hai viaggiato nel tempo? Inserisci una data valida.");
        return;
    }

    if (birthDate > maxDate) {
        alert("Sei troppo piccolo per questo! Riprova tra qualche anno!");
        return;
    }

    const birthdayMonth = birthDate.getMonth();
    const currentMonth = today.getMonth();
    const m = currentMonth - birthdayMonth;

    if (birthdayMonth > currentMonth) {
       alert("Sembra che sia passato troppo tempo dal tuo compleanno. Torna l'anno prossimo, ma nel frattempo goditi questa canzone");
    } else if (birthdayMonth < currentMonth) {
        alert("Sei un po' in anticipo, torna tra " + Math.abs(m) + " mesi. Intanto goditi questo video"}
    }
        audio.volume = 1;
        audio.muted = false;
        window.open('https://www.youtube.com/watch?v=sqkzN2Ye_pk&autoplay=1', 'noopener');
        return;
    } else {

    let calcAge = today.getFullYear() - birthDate.getFullYear();

    if (
        m < 0 ||
        (m === 0 && today.getDate() < birthDate.getDate())
    ) {
        calcAge--;
    }

    age = calcAge;

    audio.loop = true;
    audio.play();

    winnerIndex = Math.floor(Math.random() * age);

    document.getElementById("start").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    document.getElementById("welcome").innerText =
        `Auguri ${capitalize(originalName)}!`;

    document.getElementById("info").innerHTML =
        `<h4>1 Gratta e Vinci per ogni anno compiuto</h4>
         <h4>Ti spettano ${age} tickets</h4>
         <h4>Vincerai qualcosa?</h4>`;

    createTickets();
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function createTickets() {

    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    for (let i = 0; i < age; i++) {

        const ticket = document.createElement("div");
        ticket.className = "ticket";

        const content = document.createElement("div");
        content.className = "ticket-content";

        const isWin = i === winnerIndex;

        if (isWin) {
            content.innerHTML = "<h3>🎁 HAI VINTO 🎁</h3>";
        } else {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            content.innerHTML = `<h3>RITENTA</h3> <h3>💩</h3><p><b>${msg}</b></p>`;
        }

        const canvas = document.createElement("canvas");

        ticket.appendChild(content);
        ticket.appendChild(canvas);
        grid.appendChild(ticket);

        setupScratch(canvas, isWin);
    }
}

function setupScratch(canvas, isWin) {

    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width));
    canvas.height = Math.max(1, Math.round(rect.height));
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const ctx = canvas.getContext("2d");

    drawScratchTexture(ctx, canvas.width, canvas.height);

    let drawing = false;
    let revealed = false;
    let lastX = null;
    let lastY = null;

    function scratch(e) {

        if (revealed) return;

        const rect = canvas.getBoundingClientRect();

        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.lineCap = "round";
        ctx.lineWidth = 45;

        if (lastX !== null && lastY !== null) {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();

        lastX = x;
        lastY = y;

        check();
    }

    function check() {

        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        let clear = 0;

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) clear++;
        }

        if (clear / (canvas.width * canvas.height) > 0.35) {

            revealed = true;
            canvas.style.display = "none";

            if (isWin) {
                const message = document.getElementById("gift-message");
                message.innerText = "speriamo sia un regalo gradito";

                audio.pause();
                audio.currentTime = 0;
                audio.load();
                playWinSound();
                confetti({
                    particleCount: 220,
                    spread: 160
                });

                document.getElementById("win").classList.remove("hidden");
            }
        }
    }

    canvas.addEventListener("mousedown", () => drawing = true);
    canvas.addEventListener("mouseup", () => drawing = false);
    canvas.addEventListener("mousemove", e => drawing && scratch(e));

    canvas.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        drawing = true;
        canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener("pointerup", (e) => {
        e.preventDefault();
        drawing = false;
        lastX = null;
        lastY = null;
        canvas.releasePointerCapture(e.pointerId);
    });

    canvas.addEventListener("pointercancel", (e) => {
        e.preventDefault();
        drawing = false;
        lastX = null;
        lastY = null;
    });

    canvas.addEventListener("pointermove", (e) => {
        if (!drawing) return;
        e.preventDefault();
        scratch(e);
    });

    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        drawing = true;
    }, { passive: false });

    canvas.addEventListener("touchend", (e) => {
        e.preventDefault();
        drawing = false;
        lastX = null;
        lastY = null;
    }, { passive: false });

    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        drawing && scratch(e);
    }, { passive: false });
}

function openGift() {
    document.getElementById("win").classList.add("hidden");
    document.getElementById("final").classList.remove("hidden");
}

function downloadGift() {
    const a = document.createElement("a");
    a.href = `regalo-${originalName}.pdf`;
    a.download = `regalo-${originalName}.pdf`;
    a.click();

}
