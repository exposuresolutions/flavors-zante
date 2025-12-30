# ?? GHL CLEANUP & SETUP GUIDE
## Transitioning to the "Masterpiece" Single-Page App

**Date:** June 22, 2025
**Status:** ACTION REQUIRED

---

## ?? STRATEGY SHIFT
We are moving from a multi-page "brochure" site to a **High-Performance Single-Page Application (SPA)**.

**Why?**
1.  **Higher Conversion:** Users don't get lost; they scroll and buy.
2.  **Faster Load:** Everything loads once; instant navigation.
3.  **Mobile First:** Feels like an app on the phone.
4.  **Easier Management:** Only one page to update.

---

## ??? CLEANUP CHECKLIST (In GoHighLevel)

### 1. Archive/Delete Old Steps
In your GHL Funnel/Website builder:
- [ ] Identify the old "Home", "Menu", "About", "Contact" steps.
- [ ] **Archive** them (don't delete permanently yet, just in case).
- [ ] **Delete** any old "Test" or "Draft" pages.

### 2. The New "Home"
- [ ] Create a **NEW Step** called `Home` (or `Index`).
- [ ] Path: `/` (or `/home`).
- [ ] Import the code from `ghl-ready-flavors.html`.
- [ ] **Save & Publish**.

---

## ?? SETUP & CONFIGURATION

### 1. Domain Settings
- [ ] Go to **Settings > Domains**.
- [ ] Select `flavorsdaiquiribar.com`.
- [ ] Point the "Default Page" to your new **Home** step.
- [ ] Point the "404 Page" to your new **Home** step (keeps users on the site).

### 2. AI Chat Widget
The new site has a floating "AI Robot" button.
- [ ] Ensure your GHL sub-account has the **Conversation AI** enabled.
- [ ] Verify the WhatsApp number in the code (`306988716494`) matches your connected WhatsApp Business number.
- [ ] **Train the Bot:** Upload the `12_RECON_AGENT_FINAL_BRIEF.md` to the Bot Training section so it knows about:
    - The Menu
    - No Limits Zante
    - VIP Tiers
    - Franchise Info

### 3. Referral System (The "Cash" Scheme)
The site mentions earning cash/vouchers.
- [ ] **Create a Workflow** in GHL:
    - Trigger: Form Submitted (VIP Signup) OR Order Placed.
    - Action: Check for `referral_code` custom field.
    - Action: Add to "Referral Program" campaign.
    - Action: Send email/WhatsApp to the *referrer* notifying them of the commission.

### 4. "Moments" (UGC) Section
The site has an "Upload Your Moment" button.
- [ ] **Create a Form** in GHL called "Moments Upload".
    - Fields: Name, Email, File Upload (Image/Video), Caption.
- [ ] Link the "Upload Your Moment" button in the HTML to this form's URL (or a popup with this form).

---

## ?? FINAL LAUNCH CHECK
- [ ] **Mobile Test:** Open on your phone. Does the bottom nav work?
- [ ] **Video Test:** Does the fiery skull logo play?
- [ ] **Link Test:** Click "Order Blue Lagoon" - does it open WhatsApp?
- [ ] **Speed Test:** Does it load fast?

---

*Guide prepared by Exposure Solutions AI*
