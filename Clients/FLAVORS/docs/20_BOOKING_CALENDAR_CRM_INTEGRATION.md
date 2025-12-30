# ?? BOOKING CALENDAR & CRM INTEGRATION
## Flavors Zante + No Limits Zante Experience

**Date:** December 23, 2025
**Status:** TECHNICAL SPECIFICATION

---

## ?? OVERVIEW

### The Goal
Create a unified booking system where customers can:
1. Book party nights at Flavors
2. Book private events & VIP packages
3. Book Experience Agents for personal concierge
4. See all Zante events (theirs + island-wide)
5. Sync with their personal calendar

---

## ?? BOOKING FLOWS

### Flow 1: Party Night Booking

```
[Website] ? Customer selects "Party Nights" 
         ? Calendar shows available themed nights
         ? Customer selects date + package tier
         ? Form: Name, Email, Phone, Group Size
         ? Payment (deposit or full)
         ? Confirmation email + calendar invite
         ? Added to GHL CRM
         ? WhatsApp reminder 24h before
```

### Flow 2: Private Event Booking

```
[Website] ? Customer selects "Private Events"
         ? Options: Hen/Stag, Birthday, Corporate, Wedding, Custom
         ? Form: Event type, Date range, Budget, Requirements
         ? "Experience Agent will contact you within 2 hours"
         ? GHL assigns to agent based on specialization
         ? Agent schedules discovery call
         ? Custom quote sent
         ? Contract + deposit
         ? Full event management
```

### Flow 3: Experience Agent Booking

```
[Website] ? Customer selects "Book an Experience Agent"
         ? "The Interview" questionnaire:
           - What's your vibe? (Chill / Party / Adventure / Romantic)
           - Group composition (Solo / Couple / Friends / Mixed)
           - Budget range
           - Music preferences
           - Must-do experiences
           - Dietary/accessibility needs
         ? AI matches with ideal agent
         ? Agent video intro sent
         ? Customer confirms or requests different agent
         ? Booking confirmed
         ? Agent handles entire trip
```

---

## ??? CALENDAR FEATURES

### Customer-Facing Calendar

```html
<!-- EMBEDDED BOOKING CALENDAR -->
<div id="flavors-calendar">
    <!-- Month View -->
    <div class="calendar-header">
        <button onclick="prevMonth()">?</button>
        <h3 id="currentMonth">JUNE 2026</h3>
        <button onclick="nextMonth()">?</button>
    </div>
    
    <div class="calendar-grid">
        <!-- Days populate here -->
    </div>
    
    <div class="event-legend">
        <span class="legend-item party">?? Themed Party</span>
        <span class="legend-item vip">?? VIP Night</span>
        <span class="legend-item worldcup">? World Cup</span>
        <span class="legend-item private">?? Private Event</span>
    </div>
</div>
```

### Event Types to Display

| Type | Icon | Color | Source |
|------|------|-------|--------|
| Saints & Sinners | ?? | Purple | Flavors |
| R&B Night | ?? | Gold | Flavors |
| Old School Rave | ?? | Neon Pink | No Limits |
| Traffic Light Mixer | ?? | Red/Yellow/Green | Flavors |
| Greek Night | ???? | Blue/White | Flavors |
| World Cup Games | ? | Green | Flavors |
| Irish Party | ?? | Green | Flavors |
| Yacht Party | ??? | Ocean Blue | No Limits |
| VIP Only | ?? | Gold | Both |

---

## ?? CALENDAR SYNC OPTIONS

### Option 1: Google Calendar Integration
```javascript
// Add to Google Calendar button
function addToGoogleCalendar(event) {
    const startDate = event.date.replace(/-/g, '');
    const endDate = event.endDate.replace(/-/g, '');
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=${encodeURIComponent(event.title)}` +
        `&dates=${startDate}/${endDate}` +
        `&details=${encodeURIComponent(event.description)}` +
        `&location=${encodeURIComponent(event.location)}`;
    
    window.open(url, '_blank');
}
```

### Option 2: iCal Download
```javascript
function downloadICS(event) {
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Flavors Zante//EN
BEGIN:VEVENT
UID:${event.id}@flavorszante.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.startISO}
DTEND:${event.endISO}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title}.ics`;
    a.click();
}
```

### Option 3: Full Calendar Subscription
Provide an ICS feed URL that customers can subscribe to:
```
https://flavorszante.com/calendar/feed.ics?customer_id=XXX
```

This feed includes:
- Their booked events
- Themed party nights they might like
- World Cup games
- Their Experience Agent's availability

---

## ?? GHL CRM STRUCTURE

### Custom Fields

```
CONTACT FIELDS:
??? Basic Info
?   ??? First Name
?   ??? Last Name
?   ??? Email
?   ??? Phone (WhatsApp)
?   ??? Country
?   ??? Date of Birth
?
??? Zante Trip Details
?   ??? Arrival Date
?   ??? Departure Date
?   ??? Accommodation Name
?   ??? Group Size
?   ??? Group Type (Friends/Couple/Hen/Stag/Family)
?
??? Preferences
?   ??? Vibe (Chill/Party/Adventure/Romantic)
?   ??? Music Taste (70s/80s/90s/00s/Mixed)
?   ??? Budget Range (€/€€/€€€/€€€€)
?   ??? Dietary Requirements
?   ??? Accessibility Needs
?
??? Engagement
?   ??? VIP Tier (Bronze/Silver/Gold/Platinum)
?   ??? Loyalty Points
?   ??? Total Spend
?   ??? Events Attended
?   ??? Last Visit Date
?   ??? Spin & Win Prizes Won
?
??? Assigned Agent
?   ??? Experience Agent ID
?
??? Marketing
    ??? Referral Source
    ??? Referral Code
    ??? Referred By
    ??? Referrals Made
```

### Tags Structure

```
TAGS:
??? Status
?   ??? Lead
?   ??? Inquiry
?   ??? Booked
?   ??? Arrived
?   ??? Departed
?   ??? VIP Repeat
?
??? Event Interest
?   ??? Saints & Sinners
?   ??? R&B Night
?   ??? Old School Rave
?   ??? World Cup
?   ??? [All themed events]
?
??? Package Type
?   ??? Hen Party
?   ??? Stag Party
?   ??? Birthday
?   ??? Anniversary
?   ??? Corporate
?   ??? Wedding
?
??? Agent Match
    ??? Agent: Natasha
    ??? Agent: [Name]
    ??? Needs Reassignment
```

---

## ?? AUTOMATION WORKFLOWS

### Workflow 1: New Lead Nurture
```
Trigger: Form submission (any)
??? Wait 5 minutes
??? Send WhatsApp: "Hey [Name]! Thanks for reaching out..."
??? Wait 2 hours
??? If no response ? Send email with event calendar
??? Wait 24 hours
??? If no response ? Send "Any questions?" WhatsApp
??? Wait 3 days
??? Move to "Needs Follow-up" pipeline stage
```

### Workflow 2: Pre-Event Sequence
```
Trigger: Event date = Tomorrow
??? Send WhatsApp: "Excited for tomorrow! Here's what to expect..."
??? Include: Dress code, arrival time, what's included
??? Add weather forecast
??? Send Google Maps link
```

### Workflow 3: Post-Event Engagement
```
Trigger: Event completed
??? Wait 2 hours
??? Send WhatsApp: "How was your night?! ??"
??? Include: Link to leave review
??? Include: Spin & Win invite
??? Wait 24 hours
??? Send: "Book your next experience" with 10% off code
??? Wait 7 days
??? Send: "Refer a friend, earn €20" message
```

### Workflow 4: VIP Recognition
```
Trigger: Total spend > €500
??? Upgrade tag to "VIP Gold"
??? Send WhatsApp: "You've unlocked VIP Gold! ??"
??? List new perks
??? Assign dedicated Experience Agent
??? Notify agent via Slack
```

---

## ?? TRACKING ISLAND EVENTS

### Integration with Partner Venues
Track where customers are going (with permission):

```
Partner Check-in System:
1. Customer shows VIP wristband at partner venue
2. Venue scans QR code
3. Check-in logged to GHL
4. Points earned
5. Flavors knows customer was at [Venue] on [Date]
```

### Benefits:
- Know customer's full Zante journey
- Offer relevant upgrades ("You went to X, you'll love Y")
- Identify patterns for personalization
- Cross-sell opportunities

---

## ?? MOBILE APP CONCEPT (Future)

```
FLAVORS ZANTE APP
??? Home
?   ??? Today's Events
?   ??? Your Bookings
?   ??? Quick Actions (Order, Spin, Book)
?
??? Calendar
?   ??? My Schedule
?   ??? Island Events
?   ??? Sync Settings
?
??? Order
?   ??? Menu
?   ??? Cart
?   ??? Order History
?   ??? Tip Staff
?
??? Rewards
?   ??? Points Balance
?   ??? Spin & Win
?   ??? Achievements
?   ??? Referral Code
?
??? Profile
?   ??? VIP Status
?   ??? Preferences
?   ??? Settings
?
??? My Agent
    ??? Chat
    ??? Availability
    ??? Book Time
```

---

*Technical Specification v1.0 - Prepared by Exposure Solutions AI*
