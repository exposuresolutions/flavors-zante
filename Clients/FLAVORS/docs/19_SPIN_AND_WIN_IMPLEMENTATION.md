# ?? SPIN & WIN - IMPLEMENTATION GUIDE
## Flavors Zante Gamification System

**Date:** December 23, 2025
**Status:** READY FOR DEVELOPMENT

---

## ?? CONCEPT

A digital spin wheel that customers can play:
1. **In-venue:** Show staff your registered account, spin on your phone
2. **Online:** After completing certain actions (signup, review, referral)
3. **Everyone wins something** (T&Cs apply)

---

## ?? PRIZE STRUCTURE

| Prize | Probability | Cost to Business | Redemption |
|-------|-------------|------------------|------------|
| **FREE SHOT** | 30% | ~€1 | Immediate |
| **10% OFF NEXT ORDER** | 25% | Variable | Same visit |
| **FREE DAIQUIRI** | 15% | ~€3 | Same visit |
| **FLAVORS STICKER** | 10% | ~€0.20 | Immediate |
| **VIP WRISTBAND** | 8% | ~€2 | Same visit |
| **FREE T-SHIRT** | 5% | ~€8 | While stocks last |
| **50% OFF NEXT VISIT** | 4% | Variable | Next visit |
| **FREE BOTTLE SERVICE** | 2% | ~€50 | Booking required |
| **JACKPOT: FREE PARTY** | 1% | ~€200 | Booking required |

---

## ?? TERMS & CONDITIONS

```
FLAVORS ZANTE SPIN & WIN - TERMS & CONDITIONS

1. ELIGIBILITY
   - Must be 18+ years old
   - Must have a registered Flavors VIP account
   - One spin per day per account
   - Staff may request ID verification

2. REDEMPTION
   - Prizes valid for 24 hours unless stated otherwise
   - "Same visit" prizes must be used before leaving the venue
   - "Next visit" prizes valid for 7 days
   - Non-transferable, no cash alternative
   - Subject to availability (especially merch)

3. SPIN REQUIREMENTS
   - First spin: FREE upon registration
   - Additional spins earned by:
     * Making a purchase (1 spin per €10 spent)
     * Leaving a Google Review (1 spin)
     * Referring a friend who registers (2 spins)
     * Uploading a "Moment" photo (1 spin)
     * Booking a private party (5 spins)

4. FAIR PLAY
   - Flavors reserves the right to void prizes obtained through fraud
   - Account sharing is prohibited
   - Management decision is final

5. DATA
   - By playing, you consent to marketing communications
   - You can unsubscribe at any time
   - See Privacy Policy for full details
```

---

## ?? TECHNICAL IMPLEMENTATION

### HTML/CSS/JS Spin Wheel Component

```html
<!-- SPIN WHEEL MODAL -->
<div id="spinModal" class="spin-modal" style="display:none;">
    <div class="spin-modal-content">
        <span class="close-spin">&times;</span>
        <h2>?? SPIN & WIN</h2>
        <p>Tap the wheel to spin!</p>
        
        <div class="wheel-container">
            <div class="wheel" id="wheel">
                <div class="segment" data-prize="FREE SHOT" style="--i:0;">FREE SHOT</div>
                <div class="segment" data-prize="10% OFF" style="--i:1;">10% OFF</div>
                <div class="segment" data-prize="FREE DAIQUIRI" style="--i:2;">FREE DAIQUIRI</div>
                <div class="segment" data-prize="STICKER" style="--i:3;">STICKER</div>
                <div class="segment" data-prize="VIP WRISTBAND" style="--i:4;">VIP BAND</div>
                <div class="segment" data-prize="FREE SHOT" style="--i:5;">FREE SHOT</div>
                <div class="segment" data-prize="10% OFF" style="--i:6;">10% OFF</div>
                <div class="segment" data-prize="T-SHIRT" style="--i:7;">T-SHIRT</div>
            </div>
            <div class="wheel-pointer">?</div>
        </div>
        
        <div id="prizeResult" style="display:none;">
            <h3>?? YOU WON!</h3>
            <p id="prizeText"></p>
            <p>Show this screen to staff</p>
            <div id="prizeCode"></div>
            <button onclick="claimPrize()">CLAIM NOW</button>
        </div>
        
        <p class="spins-remaining">Spins remaining: <span id="spinsCount">1</span></p>
    </div>
</div>

<style>
.spin-modal {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.9);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spin-modal-content {
    background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    max-width: 400px;
    border: 2px solid #FFD700;
}

.wheel-container {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 20px auto;
}

.wheel {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 5px solid #FFD700;
    position: relative;
    transition: transform 4s ease-out;
    background: conic-gradient(
        #E63946 0deg 45deg,
        #FF6B35 45deg 90deg,
        #FFB627 90deg 135deg,
        #00BFFF 135deg 180deg,
        #9B59B6 180deg 225deg,
        #E63946 225deg 270deg,
        #FF6B35 270deg 315deg,
        #25D366 315deg 360deg
    );
}

.segment {
    position: absolute;
    width: 50%;
    height: 50%;
    top: 0;
    left: 50%;
    transform-origin: 0% 100%;
    transform: rotate(calc(var(--i) * 45deg)) skewY(-45deg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 2px black;
}

.wheel-pointer {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 30px;
    color: #FFD700;
}

.wheel.spinning {
    animation: spin 4s ease-out forwards;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(var(--rotation)); }
}

#prizeCode {
    background: #FFD700;
    color: black;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0;
    font-family: monospace;
}
</style>

<script>
const prizes = [
    { name: 'FREE SHOT', weight: 30 },
    { name: '10% OFF', weight: 25 },
    { name: 'FREE DAIQUIRI', weight: 15 },
    { name: 'STICKER', weight: 10 },
    { name: 'VIP WRISTBAND', weight: 8 },
    { name: 'FREE SHOT', weight: 30 },
    { name: '10% OFF', weight: 25 },
    { name: 'T-SHIRT', weight: 5 }
];

let spinsRemaining = 1;
let isSpinning = false;

function spinWheel() {
    if (isSpinning || spinsRemaining < 1) return;
    
    isSpinning = true;
    spinsRemaining--;
    document.getElementById('spinsCount').textContent = spinsRemaining;
    
    // Weighted random selection
    const totalWeight = prizes.reduce((sum, p) => sum + p.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedPrize;
    let selectedIndex = 0;
    
    for (let i = 0; i < prizes.length; i++) {
        random -= prizes[i].weight;
        if (random <= 0) {
            selectedPrize = prizes[i];
            selectedIndex = i;
            break;
        }
    }
    
    // Calculate rotation (multiple full spins + landing position)
    const segmentAngle = 360 / prizes.length;
    const targetAngle = (selectedIndex * segmentAngle) + (segmentAngle / 2);
    const fullSpins = 5; // Number of full rotations
    const finalRotation = (fullSpins * 360) + (360 - targetAngle) + 22.5;
    
    const wheel = document.getElementById('wheel');
    wheel.style.setProperty('--rotation', finalRotation + 'deg');
    wheel.classList.add('spinning');
    
    setTimeout(() => {
        wheel.classList.remove('spinning');
        wheel.style.transform = `rotate(${finalRotation}deg)`;
        showPrize(selectedPrize.name);
        isSpinning = false;
    }, 4000);
}

function showPrize(prize) {
    document.getElementById('prizeResult').style.display = 'block';
    document.getElementById('prizeText').textContent = prize;
    document.getElementById('prizeCode').textContent = generateCode();
}

function generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'FLV-';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function claimPrize() {
    // Send to GHL via webhook or form submission
    alert('Show this code to staff to claim your prize!');
}

// Trigger spin on wheel click
document.getElementById('wheel').addEventListener('click', spinWheel);
</script>
```

---

## ?? GHL INTEGRATION

### Webhook for Prize Tracking
When a prize is claimed, send data to GHL:

```javascript
function sendToGHL(prize, code, userEmail) {
    fetch('YOUR_GHL_WEBHOOK_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: userEmail,
            prize: prize,
            code: code,
            timestamp: new Date().toISOString(),
            venue: 'Flavors Laganas'
        })
    });
}
```

### GHL Workflow
1. **Trigger:** Webhook received
2. **Action:** Update contact custom field "Last Prize Won"
3. **Action:** Add tag "Spin Winner - [PRIZE]"
4. **Action:** Log in notes
5. **Action:** If prize = "JACKPOT", notify manager

---

## ?? ANALYTICS TO TRACK

| Metric | Purpose |
|--------|---------|
| Total spins per day | Engagement |
| Prizes redeemed vs won | Claim rate |
| Spin ? Purchase conversion | ROI |
| Most popular spin triggers | Optimize incentives |
| Customer LTV by spin participation | Value of gamification |

---

*Implementation Guide v1.0 - Prepared by Exposure Solutions AI*
