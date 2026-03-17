#  Docker Music App

Application containerisée qui récupère et affiche le **Top 10 des morceaux** depuis l'API Deezer, avec lecture audio intégrée.

## Architecture
```
api-service (Node.js :3000) ──→ MongoDB (:27017)
```

##  Technologies

- **Node.js** + Express
- **MongoDB** + Mongoose
- **Docker** (2 containers)
- **API Deezer** (charts, images, previews)
- **HTML / CSS / JS** (player audio custom)

##  Lancement
```bash
# Créer le réseau Docker
docker network create music-network

# Lancer MongoDB
docker run -d --name mongo --network music-network -p 27017:27017 mongo

# Builder et lancer l'API
docker build -t api-service ./api-service
docker run -d --name api-service --network music-network -p 3000:3000 api-service
```

##  Endpoints

| Route | Description |
|-------|-------------|
| `GET /send-data` | Récupère les données Deezer et les stocke dans MongoDB |
| `GET /top10` | Retourne le top 10 depuis MongoDB |
| `GET /top10.html` | Interface web avec player audio |

##  Fonctionnalités

-  Affichage des pochettes d'albums
-  Lecture des previews 30 secondes
-  Barre de progression cliquable
-  Contrôle du volume
-  Badges or / argent / bronze