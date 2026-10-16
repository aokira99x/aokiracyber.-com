// AOKIRA Cyber Security Portfolio - Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
    // 1. Automatic Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('terminal-date').textContent = new Date().toUTCString();

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // 3. Booting Intro Sequence Animation
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const bootLines = [
        "BIOS Version 4.06.05 - AOKIRA Security Core",
        "Checking NVRAM... [OK]",
        "Loading Kali Linux Security Kernel v6.12-aokira...",
        "Mounting secure encrypted partitions... [OK]",
        "Starting AOKIRA Cyber Security Daemon... [OK]",
        "Loading modules: [ Attacker | Forensics | Malware Sandbox ]... [DONE]",
        "Establishing secure connection to network node... [CONNECTED]",
        "Welcome to AOKIRA Cyber Security Portfolio."
    ];

    let lineIndex = 0;
    function typeBootSequence() {
        if (lineIndex < bootLines.length) {
            bootText.innerHTML += bootLines[lineIndex] + "<br>";
            lineIndex++;
            setTimeout(typeBootSequence, 180);
        } else {
            setTimeout(() => {
                bootScreen.style.opacity = '0';
                setTimeout(() => {
                    bootScreen.style.display = 'none';
                }, 700);
            }, 600);
        }
    }
    typeBootSequence();

    // 4. Matrix Digital Rain Canvas Background
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-<>~';
        const alphabet = katakana + latin;

        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const rainDrops = Array(columns).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00E5FF';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                // Highlight head of rain
                ctx.fillStyle = Math.random() > 0.85 ? '#00FF66' : '#00E5FF';
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        }
        setInterval(drawMatrix, 35);
    }

    // 5. Statistics Counter Animation
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    function runCounters() {
        if (animated) return;
        const section = document.getElementById('about');
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const speed = target / 25;
                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        counter.textContent = Math.ceil(count);
                        setTimeout(updateCount, 40);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCount();
            });
            animated = true;
        }
    }
    window.addEventListener('scroll', runCounters);

    // 6. Interactive Terminal CLI
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalForm = document.getElementById('terminal-form');
    const terminalBody = document.getElementById('terminal-body');

    const terminalCommands = {
        help: "Available commands:<br>&nbsp;&nbsp;<span class='text-cyberCyan'>whoami</span> &nbsp;&nbsp;&nbsp;&nbsp;- Display current user identity<br>&nbsp;&nbsp;<span class='text-cyberCyan'>about</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show brief AOKIRA bio<br>&nbsp;&nbsp;<span class='text-cyberCyan'>skills</span> &nbsp;&nbsp;&nbsp;&nbsp;- List cybersecurity roles & skills<br>&nbsp;&nbsp;<span class='text-cyberCyan'>projects</span> &nbsp;&nbsp;- List active security projects<br>&nbsp;&nbsp;<span class='text-cyberCyan'>status</span> &nbsp;&nbsp;&nbsp;&nbsp;- Check system status<br>&nbsp;&nbsp;<span class='text-cyberCyan'>contact</span> &nbsp;&nbsp;&nbsp;- Show contact channels<br>&nbsp;&nbsp;<span class='text-cyberCyan'>clear</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear terminal window",
        whoami: "aokira (Ethical Hacker & Security Researcher)",
        about: "AOKIRA is a digital identity focused on cyber security, ethical hacking, digital forensics, and security research tools development.",
        skills: "Core Roles:<br>1. ATTACKER (Penetration Testing, Recon, Web Sec)<br>2. DIGITAL FORENSICS (Log Analysis, Incident Response)<br>3. MALWARE DEVELOPER (Malware Analysis, Reverse Engineering)",
        projects: "Projects:<br>- Vulnerability Assessment Lab<br>- Digital Forensics Investigation<br>- Malware Analysis Sandbox<br>- Linux Security Hardening<br>- Web Security Testing<br>- Custom Security Tools",
        status: "SYSTEM STATUS: ONLINE [Secure Environment Active]",
        contact: "Connect via GitHub, Email, LinkedIn, or Telegram. See contact section below."
    };

    if (terminalForm) {
        terminalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cmd = terminalInput.value.trim().toLowerCase();
            
            if (cmd === '') return;

            // Print user command
            terminalOutput.innerHTML += `<div class="mt-2"><span class="text-cyberGreen">root@aokira:~#</span> ${escapeHtml(terminalInput.value)}</div>`;

            if (cmd === 'clear') {
                terminalOutput.innerHTML = '';
            } else if (terminalCommands[cmd]) {
                terminalOutput.innerHTML += `<div class="text-cyberCyan mt-1">${terminalCommands[cmd]}</div>`;
            } else {
                terminalOutput.innerHTML += `<div class="text-cyberRed mt-1">bash: ${escapeHtml(cmd)}: command not found. Type <span class='text-cyberGreen'>help</span> for available commands.</div>`;
            }

            terminalInput.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        });
    }
});

// Helper to escape HTML in terminal
function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// 7. Project Detail Modal Handler
function openProjectModal(title, description, tools, status) {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <div class="flex items-center space-x-2 text-cyberCyan text-xs mb-2">
            <i class="fa-solid fa-terminal"></i>
            <span>PROJECT_DETAILS // ${status}</span>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">${title}</h3>
        <p class="text-gray-300 text-sm leading-relaxed mb-4">${description}</p>
        <div class="bg-cyberDark p-4 rounded border border-cyberCyan/30 mb-6 text-xs space-y-2">
            <div><span class="text-gray-400">Tools Stack:</span> <span class="text-cyberGreen font-semibold">${tools}</span></div>
            <div><span class="text-gray-400">Security Scope:</span> <span class="text-white">Authorized Lab / Simulation Only</span></div>
        </div>
        <button onclick="closeProjectModal()" class="w-full py-2.5 rounded bg-cyberCyan text-black font-bold text-xs hover:bg-white transition-all">
            Close Terminal View
        </button>
    `;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

// 8. Download Certificate as PDF using html2pdf
function downloadCertificate() {
    const element = document.getElementById('certificate-box');
    const opt = {
        margin:       10,
        filename:     'AOKIRA_WhiteHat_Certificate.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#050505' },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    // Show loading state or notification if needed
    html2pdf().from(element).set(opt).save();
}

// 9. Contact Form Handler
function handleContactSubmit(event) {
    event.preventDefault();
    alert("Secure message transmitted successfully to AOKIRA node! (Placeholder handler)");
    event.target.reset();
}
