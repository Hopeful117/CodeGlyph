# Utilise une image Python officielle
FROM python:3.11-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt
RUN python -c "import nltk; nltk.download('punkt_tab')"


# Copier tout le projet
COPY . .

# Port exposé
EXPOSE 8000

# Commande de lancement
CMD command: gunicorn -c gunicorn.conf.py devpulse_backend.wsgi:application


