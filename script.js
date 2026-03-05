let serialNumber = 1;
let clockInterval;
let startTime;
let userRole;
let log = [];
let lastTimelineTime = null;
let audioContext;

// Initialize Web Audio API
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

const roleNames = {
    ceo: 'Sarah',
    cto: 'David',
    ciso: 'Elena',
    itManager: 'Marcus',
    hr: 'Patricia',
    socAnalyst: 'Alex'
};

const bestActions = {
    isolate: ['isolate', 'disconnect', 'quarantine', 'segment'],
    backup: ['backup', 'restore', 'recovery'],
    noPay: ['no pay', 'don\'t pay', 'ransom'],
    notify: ['notify', 'authorities', 'law enforcement', 'report'],
    communicate: ['communicate', 'internal', 'team', 'update']
};

const aiResponses = {
    ceo: [
        "As CEO, I prioritize business continuity. We need to assess the impact on operations immediately. Marcus, I need a status update from IT.",
        "Let's not panic. Elena, what's our security protocol? David, what's our recovery plan?",
        "Patricia, we need to coordinate communication with all stakeholders. I want updates every 15 minutes. How long until systems are back, David?",
        "This is a critical situation. Elena, brief me on our incident response plan. David, what's our backup strategy?",
        "Financial impact assessment needed immediately. Marcus, how many systems are affected? Patricia, prepare stakeholder communications.",
        "Board notification required. Elena, what's our legal obligation for disclosure? David, give me recovery timeline estimates.",
        "Customer data protection is paramount. Alex, any indication of data exfiltration? Marcus, isolate all customer-facing systems.",
        "Insurance claim process should begin. Patricia, coordinate with our insurance provider. Elena, document everything for the claim.",
        "Business continuity plan activation. David, what's our failover status? Marcus, ensure critical systems are protected.",
        "Media relations strategy needed. Patricia, draft a holding statement. Elena, advise on what we can and cannot say publicly.",
        "Vendor notification required. Marcus, identify affected third parties. David, coordinate vendor communications.",
        "Regulatory compliance check. Elena, which authorities need notification? Alex, preserve all forensic evidence."
    ],
    cto: [
        "From a technical standpoint, we should isolate the network to prevent spread. Marcus, coordinate with your team immediately.",
        "Alex, check our logs. Marcus, are our backups clean and isolated?",
        "Elena, let's ensure this is treated as a security incident. I'll coordinate recovery procedures with Marcus.",
        "Network segmentation is critical. Marcus, implement emergency network controls. Alex, monitor for lateral movement.",
        "Cloud infrastructure check. Are our cloud backups secure? Marcus, verify multi-factor authentication on all admin accounts.",
        "Application inventory needed. David speaking - which business-critical apps are affected? Marcus, prioritize recovery order.",
        "Database integrity check. Alex, scan for data corruption. Marcus, prepare database restoration procedures.",
        "Endpoint protection status. Marcus, ensure all antivirus is updated. Alex, check for unusual endpoint behavior.",
        "VPN and remote access lockdown. Marcus, disable all remote access temporarily. David here - coordinate with IT security.",
        "Source code repositories secure? Marcus, audit access controls. Alex, check for any code modifications.",
        "Development environment isolation. Marcus, separate dev/test from production. David coordinating recovery priorities.",
        "Third-party API security. Alex, monitor API traffic for anomalies. Marcus, prepare API failover procedures."
    ],
    ciso: [
        "Security first: Isolate affected systems immediately. David, work with Marcus on that. We need to notify law enforcement.",
        "Don't pay the ransom. It encourages more attacks and violates our policy. Sarah, we should brief the board.",
        "Let's activate our incident response plan. Alex, I need your SOC analysis. Marcus, lock down all access points.",
        "Threat intelligence gathering. Alex, correlate with known ransomware patterns. Marcus, check for indicators of compromise.",
        "Zero trust verification. Marcus, implement strict access controls. David, audit all privileged accounts immediately.",
        "Forensic investigation initiated. Alex, preserve evidence chains. Elena speaking - coordinate with legal for chain of custody.",
        "Regulatory notification assessment. Sarah, we may need to report this breach. Patricia, prepare compliance documentation.",
        "Insurance notification required. Patricia, contact our cyber insurance provider. Elena, document incident details.",
        "Stakeholder communication plan. Sarah, board briefing needed. Patricia, prepare executive summary for leadership.",
        "Law enforcement coordination. Alex, prepare technical evidence. Elena, establish contact with FBI cyber division.",
        "Vendor risk assessment. Marcus, identify compromised suppliers. David, implement vendor access restrictions.",
        "Recovery security controls. Alex, monitor for re-infection. Marcus, implement enhanced security during recovery."
    ],
    itManager: [
        "My IT team is on it. We're isolating the affected systems now. Elena, we'll follow your security protocols.",
        "David, we can restore from clean backups. Alex, help us identify the attack vector.",
        "Communication is critical. Patricia, help us draft notices for staff. Sarah, this will impact our operations.",
        "Server room security check. Marcus here - physical access controls verified. Alex, monitor for unauthorized access attempts.",
        "Help desk coordination. Patricia, prepare user communication templates. David, establish incident hotline for employees.",
        "Backup verification in progress. Alex, scan backups for malware. Marcus coordinating restoration priorities.",
        "Network infrastructure assessment. David, check router and switch configurations. Alex, monitor for command and control traffic.",
        "User account lockdown. Marcus implementing emergency access controls. Patricia, prepare password reset procedures.",
        "Mobile device management. Alex, check for compromised mobile endpoints. Marcus, enforce device wipe policies.",
        "Printer and peripheral security. David, isolate network printers. Marcus, check for embedded device compromises.",
        "Data center operations. Alex, monitor environmental controls. Marcus, ensure backup power systems are ready.",
        "Change management freeze. David, halt all system changes. Marcus, document current system state for recovery."
    ],
    hr: [
        "Patricia here. We need to think about employee communication and compliance. Should we notify everyone, Sarah?",
        "Ensure we comply with all data protection regulations during recovery, Marcus.",
        "Support for affected employees is critical. David, is there any personal data we need to disclose?",
        "Employee assistance program activation. Patricia coordinating support resources. Sarah, prepare wellness communications.",
        "Privacy impact assessment. Elena, identify affected employee data. Marcus, implement data protection measures.",
        "Workforce communication strategy. Sarah, executive messaging needed. Patricia drafting employee notifications.",
        "Remote work policy review. David, assess remote access security. Marcus, prepare secure remote work guidelines.",
        "Training and awareness update. Elena, schedule security training refresh. Patricia, prepare phishing awareness campaign.",
        "Employee morale support. Sarah, leadership communication critical. Patricia organizing town hall meetings.",
        "Compliance documentation. Elena, prepare regulatory reports. Marcus, gather IT compliance evidence.",
        "Vendor HR coordination. Patricia contacting benefits providers. David, assess vendor data exposure.",
        "Return to work procedures. Marcus, prepare secure login procedures. Patricia, coordinate employee return protocols."
    ],
    socAnalyst: [
        "Alex here. I detected unusual activity in our logs earlier - this confirms ransomware. Elena, I can help trace the attack pattern.",
        "I'm tracing the entry point now. David, I need access to network logs. Marcus, isolate the initial breach point.",
        "Monitoring for further threats. David, I recommend network segmentation. This is a serious breach.",
        "Malware analysis in progress. Elena, initial indicators suggest Ryuk variant. Marcus, quarantine affected systems.",
        "Log correlation complete. David, attack timeline established. Alex identifying attack progression patterns.",
        "Threat hunting initiated. Marcus, deploy enhanced monitoring. Elena, coordinate with threat intelligence teams.",
        "Anomaly detection alerts. David, unusual outbound traffic detected. Marcus, implement traffic blocking rules.",
        "Forensic evidence collection. Elena, preserving digital evidence. Alex documenting attack methodology.",
        "Command and control identification. Marcus, block C2 domains. David, monitor for beaconing activity.",
        "Lateral movement analysis. Alex tracing attacker pathways. Elena, assess data exfiltration scope.",
        "Vulnerability assessment. David, scan for exploited weaknesses. Marcus, prioritize patching procedures.",
        "Post-incident monitoring. Elena, establish enhanced surveillance. Alex, monitor for similar attack patterns."
    ]
};

document.getElementById('confirmRole').addEventListener('click', confirmRole);
document.getElementById('startButton').addEventListener('click', startExercise);

function confirmRole() {
    userRole = document.getElementById('userRole').value;
    document.getElementById('roleSelection').style.display = 'none';
    document.getElementById('startButton').style.display = 'block';
    // Show input only for user role
    document.getElementById(userRole + 'Text').style.display = 'block';
    document.getElementById(userRole).querySelector('.submitBtn').style.display = 'block';
    // Add event listener for user submit
    document.querySelector(`[data-role="${userRole}"]`).addEventListener('click', submitStatement);
}

function startExercise() {
    initAudio();
    startTime = Date.now();
    clockInterval = setInterval(updateClock, 1000);
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('masterClock').style.display = 'block';
    document.getElementById('scenario').style.display = 'block';
    document.getElementById('roles').style.display = 'block';
    document.getElementById('hints').style.display = 'block';
    document.getElementById('timeline').style.display = 'block';
    document.getElementById('controlPanel').style.display = 'block';
    document.getElementById('downloadLog').addEventListener('click', downloadLog);
    document.getElementById('finishGame').addEventListener('click', finishGame);
    
    // Generate initial response from random agent
    setTimeout(() => {
        generateInitialResponse();
    }, 1000);
}

function updateClock() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('masterClock').textContent = `Master Clock: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function submitStatement(event) {
    const role = event.target.getAttribute('data-role');
    const textArea = document.getElementById(role + 'Text');
    const statement = textArea.value.trim();
    if (!statement) return;

    const timestamp = new Date().toLocaleTimeString();
    const outputDiv = document.getElementById(role + 'Output');
    const score = evaluateStatement(statement);
    const entry = `<div>No.: ${serialNumber++} | Time: ${timestamp} | Score: ${score}<br>${roleNames[role]}: ${statement}</div><br><br>`;
    outputDiv.innerHTML += entry;

    textArea.value = '';

    checkForHint(statement, score);

    // Add to log
    log.push(`${timestamp} - ${roleNames[role]} (${role.toUpperCase()}): Submitted - ${statement} (Score: ${score})`);

    // Add to timeline
    addToTimeline(role, 'Submitted statement', timestamp);

    // Simulate AI responses
    setTimeout(() => {
        generateAIResponses(statement);
    }, 2000); // Delay for realism
}

function generateInitialResponse() {
    const allRoles = ['ceo', 'cto', 'ciso', 'itManager', 'hr', 'socAnalyst'];
    const role = allRoles[Math.floor(Math.random() * allRoles.length)];
    const initialResponses = {
        ceo: 'ALERT: I just received urgent notification - all systems are down! This is critical!',
        cto: 'We have a major incident! All IT systems are completely offline!',
        ciso: 'Security alert! Detected unauthorized activity and complete system shutdown. This appears to be a ransomware attack!',
        itManager: 'EMERGENCY: All servers are down! Systems are completely inaccessible!',
        hr: 'Something is seriously wrong. I cannot access any company systems!',
        socAnalyst: 'CRITICAL: SOC has detected a major ransomware event. All systems are encrypted. This is an active incident!'
    };

    const timestamp = new Date().toLocaleTimeString();
    const outputDiv = document.getElementById(role + 'Output');
    const score = evaluateStatement(initialResponses[role]);
    const header = `<div>No.: ${serialNumber++} | Time: ${timestamp} | Score: ${score}<br>`;
    
    outputDiv.classList.add('bright');
    outputDiv.innerHTML += header;

    // Play typing sounds repeatedly
    playTypingSound();
    const initialTypingInterval = setInterval(playTypingSound, 100);

    setTimeout(() => {
        clearInterval(initialTypingInterval);
        outputDiv.innerHTML += `${roleNames[role]}: ${initialResponses[role]}</div><br><br>`;
        outputDiv.classList.remove('bright');
        stopTypingSound();
        playFinishSound();
        log.push(`${timestamp} - ${roleNames[role]} (${role.toUpperCase()}): Initial Alert - ${initialResponses[role]} (Score: ${score})`);
        addToTimeline(role, 'Discovered incident', timestamp);
    }, 1000);
}

function generateAIResponses(userStatement) {
    const allRoles = ['ceo', 'cto', 'ciso', 'itManager', 'hr', 'socAnalyst'].filter(r => r !== userRole);
    let respondingRoles = [];

    // Check if user addresses a specific role by name or role title
    const lowerStatement = userStatement.toLowerCase();
    for (const role of allRoles) {
        const roleName = roleNames[role].toLowerCase();
        const roleTitle = role.toLowerCase().replace('manager', '');
        if (lowerStatement.includes(roleName) || lowerStatement.includes(roleTitle) || lowerStatement.includes(role.toLowerCase())) {
            respondingRoles.push(role);
        }
    }

    // If no specific, select 1-3 random
    if (respondingRoles.length === 0) {
        const num = Math.floor(Math.random() * 3) + 1; // 1 to 3
        const shuffled = allRoles.sort(() => 0.5 - Math.random());
        respondingRoles = shuffled.slice(0, num);
    }

    let index = 0;

    function processNext() {
        if (index >= respondingRoles.length) return;
        const role = respondingRoles[index++];
        const responses = aiResponses[role];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const timestamp = new Date().toLocaleTimeString();
        const score = evaluateStatement(randomResponse);
        const header = `<div>No.: ${serialNumber++} | Time: ${timestamp} | Score: ${score}<br>`;
        const outputDiv = document.getElementById(role + 'Output');

        // Highlight
        outputDiv.classList.add('bright');

        // Add header first
        outputDiv.innerHTML += header;

        // Play typing sound repeatedly during typing
        playTypingSound();
        const typingInterval = setInterval(playTypingSound, 100);

        // Type the response in 1 second
        setTimeout(() => {
            clearInterval(typingInterval);
            outputDiv.innerHTML += `${roleNames[role]}: ${randomResponse}</div><br><br>`;
            // Unhighlight and play sound
            outputDiv.classList.remove('bright');
            stopTypingSound();
            playFinishSound();
            // Add to log
            log.push(`${timestamp} - ${roleNames[role]} (${role.toUpperCase()}): Responded - ${randomResponse} (Score: ${score})`);
            // Add to timeline
            addToTimeline(role, 'Responded', timestamp);
            // Wait a bit before next
            setTimeout(processNext, 500);
        }, 1000);
    }

    processNext();
}

function addToTimeline(role, action, timestamp) {
    const timelineDiv = document.getElementById('timelineContent');
    const now = Date.now();
    let marginTop = 0;
    if (lastTimelineTime) {
        const diff = (now - lastTimelineTime) / 1000; // seconds
        marginTop = Math.min(diff * 2, 50); // 2px per second, max 50px
    }
    lastTimelineTime = now;
    const entry = `<div style="margin-top: ${marginTop}px;">${timestamp} - ${roleNames[role]}: ${action}</div>`;
    timelineDiv.innerHTML += entry;
}

function downloadLog() {
    const logText = log.join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exercise_log.txt';
    a.click();
    URL.revokeObjectURL(url);
}

let typingInterval;
function playTypingSound() {
    try {
        const ctx = initAudio();
        if (!ctx) return;
        
        // Create a quick click sound
        const now = ctx.currentTime;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = 800; // Higher frequency for typing
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        
        oscillator.start(now);
        oscillator.stop(now + 0.05);
    } catch (err) {
        console.log('Typing sound error:', err);
    }
}

function stopTypingSound() {
    clearInterval(typingInterval);
}

function playFinishSound() {
    try {
        const ctx = initAudio();
        if (!ctx) return;
        
        // Create a bell-like sound
        const now = ctx.currentTime;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = 1000;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        oscillator.start(now);
        oscillator.stop(now + 0.3);
    } catch (err) {
        console.log('Finish sound error:', err);
    }
}

function finishGame() {
    // Stop clock
    clearInterval(clockInterval);
    
    // Disable user input
    document.querySelectorAll('.submitBtn').forEach(btn => btn.disabled = true);
    document.querySelectorAll('textarea').forEach(ta => ta.disabled = true);
    
    // Hide current content and show thank you message
    document.getElementById('scenario').style.display = 'none';
    document.getElementById('timeline').style.display = 'none';
    document.getElementById('roles').style.display = 'none';
    document.getElementById('hints').style.display = 'none';
    document.getElementById('controlPanel').style.display = 'none';
    document.getElementById('masterClock').style.display = 'none';
    
    // Show thank you message
    const thankYouDiv = document.createElement('div');
    thankYouDiv.id = 'thankYouMessage';
    thankYouDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="#4CAF50"/>
                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="#4CAF50" opacity="0.3"/>
            </svg>
            <h1 style="color: #4CAF50; margin: 20px 0;">Thank You for Participating!</h1>
        </div>
        <p style="font-size: 20px; margin-bottom: 30px;">You have successfully completed the Cybersecurity Tabletop Exercise.</p>
        <p style="font-size: 18px; margin-bottom: 30px;">This simulation helped demonstrate the importance of coordinated incident response in handling ransomware attacks.</p>
        
        <h2 style="color: #2196F3; margin-bottom: 20px;">Key Lessons Learned:</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #4CAF50;">
                <div style="font-size: 24px; margin-bottom: 10px;">⚡</div>
                <h3 style="margin: 0 0 10px 0; color: #333;">Quick Communication</h3>
                <p style="margin: 0; color: #666;">Communication between roles is crucial for effective incident response.</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #2196F3;">
                <div style="font-size: 24px; margin-bottom: 10px;">📋</div>
                <h3 style="margin: 0 0 10px 0; color: #333;">Follow Procedures</h3>
                <p style="margin: 0; color: #666;">Following established incident response procedures ensures consistency and effectiveness.</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #FF9800;">
                <div style="font-size: 24px; margin-bottom: 10px;">🚫💰</div>
                <h3 style="margin: 0 0 10px 0; color: #333;">Never Pay Ransom</h3>
                <p style="margin: 0; color: #666;">Paying ransom encourages more attacks and doesn't guarantee data recovery.</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #9C27B0;">
                <div style="font-size: 24px; margin-bottom: 10px;">👮</div>
                <h3 style="margin: 0 0 10px 0; color: #333;">Coordinate with Authorities</h3>
                <p style="margin: 0; color: #666;">Always coordinate with law enforcement and relevant stakeholders during incidents.</p>
            </div>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; border: 2px solid #4CAF50; margin-bottom: 30px;">
            <p style="margin: 0 0 15px 0; font-size: 16px; color: #2E7D32;">
                <strong>💾 Remember to download your log file for detailed records of the exercise.</strong>
            </p>
            <button id="finalDownloadBtn" style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; cursor: pointer; margin-top: 10px;">
                📥 Download Exercise Log
            </button>
        </div>
    `;
    thankYouDiv.style.textAlign = 'center';
    thankYouDiv.style.padding = '50px';
    thankYouDiv.style.fontSize = '16px';
    thankYouDiv.style.maxWidth = '1200px';
    thankYouDiv.style.margin = '0 auto';
    
    document.body.appendChild(thankYouDiv);
    
    // Add event listener for final download button
    document.getElementById('finalDownloadBtn').addEventListener('click', downloadLog);
}

function typeText(element, text, prefix, callback) {
    let charIndex = 0;
    function type() {
        if (charIndex < text.length) {
            element.innerHTML = prefix + text.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, 100);
        } else {
            callback();
        }
    }
    type();
}

function evaluateStatement(statement) {
    let score = 0;
    const lowerStatement = statement.toLowerCase();

    for (const [key, words] of Object.entries(bestActions)) {
        if (words.some(word => lowerStatement.includes(word))) {
            score += 10;
        }
    }

    // Penalize bad actions
    if (lowerStatement.includes('pay') && lowerStatement.includes('ransom')) {
        score -= 20;
    }

    return score;
}

function checkForHint(statement, score) {
    const hintBox = document.getElementById('hintBox');
    if (score < 0) {
        hintBox.innerHTML = 'Hint: Paying ransom is generally not recommended as it funds criminals and doesn\'t guarantee data recovery.';
    } else if (score === 0) {
        hintBox.innerHTML = 'Hint: Consider isolating affected systems and restoring from backups.';
    } else {
        hintBox.innerHTML = 'Good decision! Continue with coordinated response.';
    }
}