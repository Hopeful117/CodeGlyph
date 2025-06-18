
# 📰 CodeGlyph

CodeGlyph is a full-stack web application (Django + React) designed to centralize and browse the latest news about programming languages from multiple sources (Dev.to, Reddit, Hacker News...).
---
## 🌐 Features

- 🔍 Automatic article fetching by language or source
- 🧩 Secure read-only REST API (write access limited to backend scripts)
- 📦 Django backend with Django REST Framework
- ⚛️ React frontend with dynamic article display
- 🔐 JWT Authentication (planned / in progress)
- 📑 Pagination & filtering
- 🚀 Production-ready architecture
---

---
## ⚙️ Installation

### 1. 🔧 Django Backend

```bash
cd devpulse_backend
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt

# Configuration
cp praw.ini.example praw.ini  # or create your own file

# Run the server
python manage.py runserver
```


---
### 2. ⚛️ React Frontend

```bash
cd devpulse_frontend
npm install

# Run React dev server
npm start
```

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:8000/api/
```
---
## 🔒 Security

- Only backend internal scripts (in `utils/`) can add articles.
- The API is read-only via the REST interface.
- JWT is in place or being implemented for future admin access.
---
## 🔁 Updating Articles

Run the update script manually in the Django shell:

```bash
python manage.py shell
>>> from news.utils import fetch_all_sources
>>> fetch_all_sources()
```

Or via cron job or automated task later.
---
## 📝 Roadmap

- Full JWT authentication
- Search engine
- Personalized notifications or RSS feeds
- Enhanced UI
---
## 🧑‍💻 Author

Ludovic Brot – [hopeful117](https://github.com/hopeful117)
