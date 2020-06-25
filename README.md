# Vigilie

Accès Rapide :
- [Vigilie Client](https://github.com/Virg62/Vigilie-Client)
- [Vigilie Client Conseil Municipal](https://github.com/Virg62/Vigilie-Client-CM)
- [Vigilie Serveur](https://github.com/Virg62/Vigilie-Serveur)

Sommaire :

1- [Sujet](#sujet)

2- [Matériel Requis](#matériel-requis)

3- [Installation](#installation)

4- [Utilisation](#utilisation)

## Sujet

Vigilie est un système participatif permettant d'informer les citoyens en cas de dangers / pour informer mis en place par une mairie.
Ainsi, si un utilisateur trouve un potentiel danger (ex: Arbre couché sur une chaussée / Innondation d'une route /...), celui-ci peut le signaler et après validation par un membre du conseil municipal (ou d'un administrateur tiers), cette information peut être transmise à l'ensemble des utilisateurs de l'application via une notification.

L'application peut également servir au conseil municipal d'informer les citoyens (ex: fête du village prévue...)

Des modules peuvent être ajoutés à l'application (ex: Carte avec points d'eau potable publique / Sondages / ...) afin de la rendre plus fonctionnelle.

*Ces modules seront bientôt en développement !*

## Matériel Requis

*Le client peut être compilé sur une machine Linux (Ubuntu / Debian / Mint) ou un pc Windows standard*

L'ordinateur doit contenir les outils suivants : 

- NPM

- Cordova (moteur de l'application) ```npm install -g cordova```

## Installation

- Tout d'abord cloner le repository du projet

```bash
    git clone https://github.com/Virg62/Vigilie-Client
```

- Naviguer dans le dossier créé

```bash
    cd Vigilie-Client
```

- Installer les dépendances du projet (via npm)

```bash
    npm install
```

- Vous devez insérer les fichiers récupérés sur votre console Google Firebase (google-services.json pour android par exemple) à la racine du projet

- Modifier l'URL de votre serveur API dans le fichier [www/js/master.js](www/js/master.js#L4) (4ème ligne)

- Pour ajouter une platforme à l'application, il faut lancer la commande :

```bash
    cordova platform add browser # pour ajouter le navigateur
```
La liste des platerformes est disponible [ici](https://cordova.apache.org/docs/fr/latest/guide/support/index.html)

## Utilisation

### Tests

Pour tester sur une platforme :

```bash
    cordova run browser # lance un serveur de test sur http://localhost:8000
    # Note : ici, quand une modification est faite sur un fichier, il faut terminer la commande avec la combinaise CTRL+C et la relancer pour que les modifications soient prises en compte. 
```

### Compilation

Pour compiler sur une platforme : 

```bash
    cordova build browser # compile pour le navigateur
```
La localisation du résultat de la compilation est disponible sur la documentation de Cordova

