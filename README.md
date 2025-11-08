# 🎉 Nursery App 

## 📂 File Structure

```
Nursery_WT/
├── app.py                          # Flask backend with all routes
├── requirements.txt                # Python dependencies
├── .env                           # Environment variables (SECRET_KEY, DB URL)
├── Procfile                       # For deployment
│
├── templates/
│   ├── index.html                 # Home page (with slider & quick access)
│   ├── register.html              # Registration form
│   ├── login.html                 # Login form
│   └── explore.html               # Explore page (NEW DESIGN - with navbar)
│
├── static/
│   ├── explore.js                 # Product filtering, cart logic (UPDATED)
│   ├── style.css                  # Auth pages styling
│   ├── styles.css                 # Home page styling
│   └── explore.css                # Explore page styling
│
└── Documentation/
    ├── REDESIGN_SUMMARY.md        # What changed & why
    ├── UI_LAYOUT_GUIDE.md         # Visual layout guide
    ├── TESTING_GUIDE.md           # How to test everything
    └── SETUP_GUIDE.md             # Initial setup instructions
```
