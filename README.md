# Spotamp
> Un outil collaboratif pour créer des playlists Spotify

Cette application web permet de partager ses playlits avec la communauté ou avec ses amis pour recevoir des recommendations de titres à ajouter. 

## Connexion

La connection s'effectue avec le compte Spotify. L'application demande les accès suivants : 
* `playlist-read-private` : Accès aux playlists privées
* `playlist-read-collaborative` : Accès aux playlists collaboratives
* `playlist-modify-public` : Modification des playlists publiques
* `playlist-modify-private` : Modification des playlists privées
* *(`user-library-read` : Accès à la lecture des  titres et albums sauvegardés)*
* *(`user-read-email` : accès à l'adresse mail)*
* *(`user-top-read` : accès au top titre et top artiste)*

## Première connexion

* Demande de style musicaux (ou determination selon les playlists)
* Ajout d'amis (optionnel)
* Rejoindre des communauté musicales

## Accueil 

* Liste des playlists de l'utilisateur
* Notification de recommendations
* Dernières demandes de la communauté qui corresponde à des tags de l'utilisateur
* Fil d'actualité de la communauté au groupe de l'utilisateur

### Commandes 

- Pour lancer le serveur de l'API il faut utiliser la commande `npm run dev`.
- Pour lancer le serveur de base de données il faut lancer le script avec la commande `./run_mongod.sh`.
- Pour lancer *SpotAmp* il faut utiliser la commande `ng serve`.
