<h1>PollStream</h1>
<h4>PollStream is a polling application where users can create polls and know the opinion of people</h4>

<h2>TECH STACK</h2>

  * Backend: Flask (Python)

  * Database: MongoDB

  * Frontend: ReactJS (Vite)

  * Deployment: Render (Backend) and Vercel (Frontend)

<h3>PROJECT STRUCTURE</h3>

```
PollStream/
├── backend/
│   ├── venv/
│   ├── .env
│   ├── .gitigonre
│   ├── requirements.txt
│   └── server.py
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── src/
│       ├── assets/
│       │   └── poll.png
│       ├── components/
│       │   ├── AllPoll.jsx
│       │   ├── CreatePoll.jsx
│       │   ├── Footer.jsx
│       │   ├── Header.jsx
│       │   ├── Hero.jsx
│       │   ├── Login.jsx
│       │   ├── MyPolls.jsx
│       │   ├── PollCard.jsx
│       │   └── Register.jsx
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
└── README.md
```
<h3>LOCAL SETUP</h3>

### 1. For Backend

#### 🪟 Windows (CMD or PowerShell)
```
python -m venv venv 
venv\Scripts\activate
```

#### 🍎 macOS / 🐧 Linux
```
python3 -m venv venv
source venv/bin/activate
```

####  Install Dependencies
```
pip install -r requirements.txt
```

#### Configure enviornment variables
create .env file 

Add feilds 
```
MONGO_URI="your_mongo_server_uri"
JWT_SECRET_KEY="your_secret_key"
```

#### Configure Whitelisted domains
In server.py on line 17
```python
WHITELISTED_ORIGINS = [
    "URL-of-Your-Frontend",
]
```

#### If using Atlas Mongo Server ?
Add the IP addresses of your backend Server to the allowed IPs.

#### Run the Backend
```
python server.py
```

### 1. For Frontend

####  Install Dependencies
```
npm install
```

#### Configure Backend URIs for API calls
In App.jsx on line 7
```javascript
localStorage.setItem("Backend_URI","URI_of_your_backend")
```

#### Run the Frontend
```
npm run dev
```

<h2>Critical points to Consider !!</h2>

* Set up CORS policy properly as said above

* Must add the allowed IPs if using Atlas Mongo Server

