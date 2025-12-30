# ?? FLAVORS ZANTE - DEPLOYMENT & ONBOARDING PROCESS
**Date:** December 30, 2025
**Status:** LIVE

---

## 1. THE NEW DEPLOYMENT WORKFLOW (GitHub -> GHL)
We have moved away from manual copy-pasting. All site updates now follow this strict process to ensure version control and instant updates.

### Step 1: Edit Code Locally
*   Make changes in VS Code to files in `Clients\FLAVORS\ghl\`.
*   **Key Files:**
    *   `flavors-zante-v5.html` (Main Home Page)
    *   `flavors-traffic.html` (Traffic Light App)
    *   `feedback-survey.html` (Onboarding/Feedback Form)
    *   `strategy.html` (Internal Strategy Doc)

### Step 2: Push to GitHub
*   Open Terminal.
*   Run:
    ```bash
    git add .
    git commit -m "Description of changes"
    git push
    ```
*   **Result:** GitHub Actions automatically deploys the code to GitHub Pages.

### Step 3: GoHighLevel (One-Time Setup)
*   We use the **GHL Loader Script** (`ghl-loader.html`).
*   In GHL, create a **Custom Code** element for each page.
*   Paste the Loader Script code.
*   **CRITICAL:** Update the `GITHUB_FILE_URL` variable in the script to point to the specific file on GitHub Pages (e.g., `.../flavors-traffic.html`).

---

## 2. ONBOARDING & REGISTRATION PROCESS
We have standardized how we collect data for Staff, VIPs, and Feedback using `feedback-survey.html`.

### The Flow
1.  **User Action:** Click "Apply Now" (Jobs) or "Win VIP Table" (Feedback).
2.  **Destination:** `feedback-survey.html`
3.  **Submission:**
    *   Form validates data.
    *   Data is sent via **Webhook** to GoHighLevel.
    *   **Webhook URL:** `https://services.leadconnectorhq.com/hooks/KbiucErIMNPbO1mY4qXL/webhook-trigger/297f0e76-a8cd-401c-9230-433c3d44e8f7`
4.  **GHL Automation:**
    *   **Trigger:** Webhook Received.
    *   **Action 1:** Create/Update Contact.
    *   **Action 2:** Add Tag (e.g., `survey-submission`, `job-applicant`).
    *   **Action 3:** Send Email Notification to Natasha/Chris.
    *   **Action 4:** Send "Thank You" SMS to user.

### Key Links Map
| Page Name | File Name | Purpose |
| :--- | :--- | :--- |
| **Home** | `flavors-zante-v5.html` | Main landing page. |
| **Traffic Light** | `flavors-traffic.html` | Interactive party game. |
| **Onboarding** | `feedback-survey.html` | Staff application & customer feedback. |
| **Strategy** | `strategy.html` | Internal "Fire Meets Ice" roadmap. |

---

## 3. SIGN-OFF CHECKLIST
Please review and confirm the following:

- [ ] **Links Verified:** All buttons on Home Page point to the correct new pages.
- [ ] **Webhook Active:** The GHL Workflow is published and receiving data.
- [ ] **GitHub Connected:** The repository is set up and Pages is active.
- [ ] **Strategy Approved:** The "Fire Meets Ice" document reflects the 2026 vision.

**Signed:** ____________________ (Date: __________)
