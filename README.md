# Spotamp
> Un outil collaboratif pour créer des playlists Spotify

Cette application web permet de partager ses playlits avec la communauté ou avec ses amis pour recevoir des recommandations de titres à ajouter. 

:heavy_exclamation_mark:Le projet va devoir changer de nom. Il va aussi évoluer vers une application mobile, qui correspondra mieux aux besoins. Affaire à suivre...

Trello du projet : [par ici !](https://trello.com/b/YvqnQF0R/spotamp)

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

* Barre de navigation avec accès au compte utilisateur et notifications
* Cartes : 
  * Dernières demandes de collaboration de mes amis
  * Dernières demandes publiques de collaboration qui correspondent à des tags (gouts musicaux) de l'utilisateur (pas de demande ne correspondant pas au gout de la personne)
  * Une carte par communauté suivie par l'utilisateur avec le top actualité
  
## Profil utilisateur

L'utilisateur à les possibilités suivantes sur l'interface de son compte : 
* Management de ses playlists :
  * status de la playlist (privée, entre amis, publiques)
  * Ajout de playlist
  * Suppression de playlist
  * Ajout de musiques avec recherche (à voir... ?)
* Mes amis
  * Ajout/suppression d'amis
  * Affinités musicales (communautés en communs, nb de recommandations acceptées...)
* Edition du profil :
  * Changer photo
  * Editer style musicaux (ajout/suppression, mode automatique ?)
  
## Communautés (V2)

Les communautés sont des groupes de personnes gérés par des administrateurs qui se regroupent selon leur goûts musicaux. Il est possible de partager : 
* Les playlists
* Un artiste particulier
* Evennements ? (concerts, festivals..)
* Titre d'un artiste ? 

Chaque communauté aurait sa page avec son dashboard affichant le top du fil d'actualité. Un système d'onglet sur la page communauté permet de naviguer entre : 
* Les membres de la communauté (admin et membres)
* Les playlists de la communauté (filtres récents, most liked...)
* Les artistes (même filtres)
* Les titres ? (mêmes filtres)
* Les demandes de recommandations publiques correspondant au tag (gout musical) de la communauté (?)
  
 Dans les infos des playlists:
  * [Ajouter les informations avec une moyenne pour chaque paramètres (acousticness)]https://developer.spotify.com/documentation/web-api/reference/tracks/)
 
# Dev doc

## Commandes 

- Pour lancer le serveur de l'API il faut utiliser la commande `nodemon app_hooked.js --debug=3001`.
- Pour lancer le serveur de base de données il faut lancer le script avec la commande `./run_mongod.sh`.
- Pour lancer *SpotAmp* il faut utiliser la commande `ng serve --proxy-config proxy.conf.json`.


## Ressources utilisées pour ce projet 

- [API MEAN](https://medium.com/@vipinswarnkar1989/mean-stack-crud-app-using-angular4-21dce501b77)
- [Angular frontEnd](https://medium.com/@vipinswarnkar1989/mean-todo-app-with-angular4-32d6d778cf68)
- [Spotify auth with passport](https://github.com/JMPerez/passport-spotify)
- [Socket IO](https://socket.io/docs/)
- [Dashboard Spotify de SpotAmp](https://beta.developer.spotify.com/dashboard/applications/9e37acaec39942ae9338212428659bad)

