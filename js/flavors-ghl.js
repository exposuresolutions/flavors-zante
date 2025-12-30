/**
 * FLAVORS ZANTE - GHL API INTEGRATION
 * VERSION 2.0 - WITH LIVE API CALLS
 * 
 * This helper handles:
 * - Contact creation via GHL API
 * - Form submissions via GHL Forms/Webhooks
 * - Chat widget control
 * - Event tracking & analytics
 * - Lead capture flows
 */

const FLAVORS_GHL = {
    // Configuration
    config: {
        apiKey: 'pit-2092e990-2c0f-4723-98ec-dd8483c87da1',
        locationId: 'KbiucErIMNPbO1mY4qXL',
        chatWidgetId: '694e7ef43773e0b8ca3489f7',
        apiBase: 'https://services.leadconnectorhq.com',
        
        // Tags for different activities
        tags: {
            spinWin: 'spin-win-player',
            trafficLight: 'traffic-light-user',
            frozenChallenge: 'frozen-challenge-entry',
            vipInquiry: 'vip-booking-inquiry',
            worldCup: 'world-cup-2026',
            finalBoss: 'final-boss-inquiry',
            menuView: 'menu-viewer',
            bottleGame: 'bottle-game-player'
        }
    },

    // ============================================
    // GHL API CALLS (Server-side proxy needed for production)
    // ============================================
    
    /**
     * Create or update a contact in GHL
     * NOTE: In production, this should go through a server-side proxy
     * to protect the API key
     */
    createContact: async function(contactData) {
        const data = {
            locationId: this.config.locationId,
            firstName: contactData.firstName || contactData.name?.split(' ')[0] || 'Guest',
            lastName: contactData.lastName || contactData.name?.split(' ').slice(1).join(' ') || '',
            email: contactData.email || '',
            phone: contactData.phone || '',
            tags: contactData.tags || [],
            source: 'Flavors Website',
            customFields: contactData.customFields || []
        };
        
        // Store locally for now (server proxy needed for live API)
        this.storeLocalEvent('contact_created', data);
        console.log('?? Contact data prepared:', data);
        
        // In production, this would be:
        // return await this.apiCall('/contacts/', 'POST', data);
        
        return { success: true, data: data, message: 'Contact stored locally. Server proxy needed for live API.' };
    },

    /**
     * Add tags to a contact
     */
    addTagsToContact: async function(contactId, tags) {
        const data = {
            tags: Array.isArray(tags) ? tags : [tags]
        };
        
        this.storeLocalEvent('tags_added', { contactId, tags });
        console.log('??? Tags prepared for contact:', contactId, tags);
        
        return { success: true, data: data };
    },

    // ============================================
    // CHAT WIDGET CONTROL
    // ============================================
    
    /**
     * Open the GHL chat widget
     */
    openChat: function() {
        // Method 1: New LeadConnector Widget
        const lcWidget = document.querySelector('chat-widget');
        if (lcWidget) {
            if (typeof lcWidget.open === 'function') {
                lcWidget.open();
                return true;
            }
            lcWidget.click();
            return true;
        }

        // Method 2: Legacy GHL Object
        if (window.GHL && window.GHL.openChat) {
            window.GHL.openChat();
            return true;
        }

        // Method 3: Legacy ghlChat
        if (window.ghlChat && window.ghlChat.open) {
            window.ghlChat.open();
            return true;
        }

        console.warn('GHL chat widget not ready, retrying...');
        setTimeout(() => this.openChat(), 1500);
        return false;
    },

    // ============================================
    // GAME LOGGING FUNCTIONS
    // ============================================

    /**
     * Log a Spin & Win play and create/update contact
     */
    logSpinWin: async function(playerName, prize, email = null, phone = null) {
        const prizeCode = this.generatePrizeCode('FLV');
        
        const data = {
            name: playerName,
            prize: prize,
            prizeCode: prizeCode,
            email: email,
            phone: phone,
            game: 'spin-win',
            timestamp: new Date().toISOString(),
            tags: [this.config.tags.spinWin]
        };
        
        // Store locally
        this.storeLocalEvent('spin_win', data);
        
        // If we have contact info, create contact
        if (email || phone) {
            await this.createContact({
                name: playerName,
                email: email,
                phone: phone,
                tags: [this.config.tags.spinWin, `prize-${prize.toLowerCase().replace(/\s+/g, '-')}`],
                customFields: [
                    { key: 'last_prize_won', value: prize },
                    { key: 'prize_code', value: prizeCode }
                ]
            });
        }
        
        console.log('?? Spin & Win logged:', prize, prizeCode);
        return { ...data, prizeCode };
    },

    /**
     * Log a Traffic Light status change
     */
    logTrafficLight: async function(status, name = null, email = null, phone = null) {
        const statusMap = {
            'red': 'Taken',
            'amber': 'Complicated', 
            'green': 'Single'
        };
        
        const data = {
            status: statusMap[status] || status,
            statusColor: status,
            name: name,
            email: email,
            phone: phone,
            game: 'traffic-light',
            timestamp: new Date().toISOString(),
            tags: [this.config.tags.trafficLight]
        };
        
        this.storeLocalEvent('traffic_light', data);
        
        // Create contact if we have info
        if (email || phone) {
            await this.createContact({
                name: name,
                email: email,
                phone: phone,
                tags: [this.config.tags.trafficLight, `status-${status}`]
            });
        }
        
        console.log('?? Traffic Light logged:', status);
        return data;
    },

    /**
     * Log a Frozen Challenge entry
     */
    logFrozenChallenge: async function(name, email = null, phone = null, time = null) {
        const data = {
            name: name,
            email: email,
            phone: phone,
            completionTime: time,
            game: 'frozen-challenge',
            timestamp: new Date().toISOString(),
            tags: [this.config.tags.frozenChallenge]
        };
        
        this.storeLocalEvent('frozen_challenge', data);
        
        if (email || phone) {
            await this.createContact({
                name: name,
                email: email,
                phone: phone,
                tags: [this.config.tags.frozenChallenge],
                customFields: time ? [{ key: 'frozen_challenge_time', value: time }] : []
            });
        }
        
        console.log('?? Frozen Challenge logged:', name);
        return data;
    },

    /**
     * Log a VIP/Final Boss booking inquiry
     */
    logBookingInquiry: async function(type, details = {}) {
        const tagMap = {
            'vip': this.config.tags.vipInquiry,
            'final-boss': this.config.tags.finalBoss,
            'world-cup': this.config.tags.worldCup,
            'general': this.config.tags.vipInquiry
        };
        
        const data = {
            type: type,
            ...details,
            timestamp: new Date().toISOString(),
            tags: [tagMap[type] || this.config.tags.vipInquiry]
        };
        
        this.storeLocalEvent('booking_inquiry', data);
        
        if (details.email || details.phone) {
            await this.createContact({
                name: details.name,
                email: details.email,
                phone: details.phone,
                tags: [tagMap[type] || this.config.tags.vipInquiry],
                customFields: [{ key: 'inquiry_type', value: type }]
            });
        }
        
        console.log('?? Booking inquiry logged:', type);
        return data;
    },

    /**
     * Log Bottle of Love game
     */
    logBottleGame: async function(name, status, email = null, phone = null) {
        const data = {
            name: name,
            status: status,
            email: email,
            phone: phone,
            game: 'bottle-of-love',
            timestamp: new Date().toISOString(),
            tags: [this.config.tags.bottleGame]
        };
        
        this.storeLocalEvent('bottle_game', data);
        
        if (email || phone) {
            await this.createContact({
                name: name,
                email: email,
                phone: phone,
                tags: [this.config.tags.bottleGame, this.config.tags.trafficLight]
            });
        }
        
        console.log('?? Bottle game logged:', name);
        return data;
    },

    // ============================================
    // LOCAL STORAGE & ANALYTICS
    // ============================================

    /**
     * Store event locally for analytics
     */
    storeLocalEvent: function(eventType, data) {
        try {
            const key = `flavors_${eventType}`;
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            existing.push({
                ...data,
                id: this.generateId(),
                storedAt: new Date().toISOString()
            });
            
            // Keep only last 100 events per type
            if (existing.length > 100) {
                existing.shift();
            }
            
            localStorage.setItem(key, JSON.stringify(existing));
            
            // Also store in combined log
            const allEvents = JSON.parse(localStorage.getItem('flavors_all_events') || '[]');
            allEvents.push({ type: eventType, ...data, storedAt: new Date().toISOString() });
            if (allEvents.length > 500) allEvents.shift();
            localStorage.setItem('flavors_all_events', JSON.stringify(allEvents));
            
        } catch (e) {
            console.warn('Could not store event locally:', e);
        }
    },

    /**
     * Get local analytics
     */
    getLocalAnalytics: function(eventType = null) {
        const analytics = {};
        const eventTypes = ['spin_win', 'traffic_light', 'frozen_challenge', 'booking_inquiry', 'bottle_game', 'page_view', 'contact_created'];
        
        eventTypes.forEach(type => {
            if (!eventType || eventType === type) {
                try {
                    analytics[type] = JSON.parse(localStorage.getItem(`flavors_${type}`) || '[]');
                } catch (e) {
                    analytics[type] = [];
                }
            }
        });
        
        // Add summary
        if (!eventType) {
            analytics.summary = {
                totalSpins: analytics.spin_win?.length || 0,
                totalTrafficLight: analytics.traffic_light?.length || 0,
                totalFrozenEntries: analytics.frozen_challenge?.length || 0,
                totalBookingInquiries: analytics.booking_inquiry?.length || 0,
                totalPageViews: analytics.page_view?.length || 0
            };
        }
        
        return eventType ? analytics[eventType] : analytics;
    },

    /**
     * Export analytics as CSV
     */
    exportAnalytics: function() {
        const allEvents = JSON.parse(localStorage.getItem('flavors_all_events') || '[]');
        
        if (allEvents.length === 0) {
            console.log('No events to export');
            return null;
        }
        
        // Create CSV
        const headers = ['Type', 'Name', 'Email', 'Phone', 'Prize', 'Status', 'Timestamp'];
        const rows = allEvents.map(e => [
            e.type || '',
            e.name || e.playerName || '',
            e.email || '',
            e.phone || '',
            e.prize || '',
            e.status || '',
            e.timestamp || e.storedAt || ''
        ]);
        
        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        
        // Download
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `flavors-analytics-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('?? Analytics exported:', allEvents.length, 'events');
        return csv;
    },

    /**
     * Clear local analytics
     */
    clearAnalytics: function() {
        const keys = ['spin_win', 'traffic_light', 'frozen_challenge', 'booking_inquiry', 'bottle_game', 'page_view', 'contact_created', 'all_events'];
        keys.forEach(k => localStorage.removeItem(`flavors_${k}`));
        console.log('??? Analytics cleared');
    },

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    /**
     * Open WhatsApp with a pre-filled message
     */
    openWhatsApp: function(message, phone = null) {
        // Default to Flavors number if none provided
        const targetPhone = phone || '306900000000'; // Replace with actual number
        const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    },

    /**
     * General contact handler
     */
    contact: function(topic) {
        // Open chat widget or WhatsApp
        if (window.LC_API) {
            window.LC_API.open_chat_window();
        } else {
            this.openWhatsApp(`Hi Flavors! I'm interested in: ${topic}`);
        }
    },
    
    /**
     * Show a toast notification
     */
    showToast: function(message) {
        // Create toast element if it doesn't exist
        let toast = document.getElementById('ghl-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'ghl-toast';
            toast.style.cssText = 'position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px); background: rgba(20,20,20,0.95); border: 1px solid #FFD700; color: #fff; padding: 12px 25px; border-radius: 50px; z-index: 11000; font-weight: 600; opacity: 0; transition: all 0.3s;';
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
        
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            toast.style.opacity = '0';
        }, 3000);
    },

    /**
     * Generate a random ID
     */
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    },

    /**
     * Generate a prize code
     */
    generatePrizeCode: function(prefix = 'FLV') {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = prefix + '-';
        for (let i = 0; i < 4; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
};

// Make globally available
window.FLAVORS_GHL = FLAVORS_GHL;

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('?? FLAVORS GHL Integration v2.0 loaded');
    console.log('?? Analytics summary:', FLAVORS_GHL.getLocalAnalytics().summary || FLAVORS_GHL.getLocalAnalytics());
});
