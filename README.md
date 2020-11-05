# new_projet

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


Pilotage informatique d’une machine industrielle

Description :
3Dmap est une entreprise spécialisée dans la fabrication et la vente de cartes géographiques en relief thermoformées. La
réalisation d’une carte passe par plusieurs étapes, un moule en aluminium qui reproduit le relief du territoire considéré est usiné
avec une machine à commande numérique. Le fond de carte est préalablement imprimé à plat sur des feuilles de PVC. Chaque
feuille est ensuite positionnée sur le châssis d’une thermoformeuse, puis chauffée à 180° afin d’être moulée par aspiration au
contact du moule.
La machine-outil est pilotée par une carte Raspberry qui centralise toutes les entrées/sorties de la machine via les ports GPIO et
USB, elle s’interface avec les composants suivants : un régulateur la température qui contrôle les 6 zones du plateau de chauffe,
les servovariateurs qui pilotent les moteurs brushless, la pompe à vide, le détecteur de pression, l’électrovanne, le bouton d’arrêt
d’urgence, le bouton poussoir de démarrage du cycle.
Le code de l’automate est développé en Javascript sous NodeJs.
Dans ce contexte, vous serez amené à développer une IHM pour piloter de manière ergonomique la thermoformeuse depuis une
tablette tactile. L’IHM sera conçue comme une web application au moyen du framework Vue.js dans le strict respect des standards
du web, elle proposera les fonctionnalités suivantes :

● Affichage en temps réel des températures sur un graphe,
● Paramétrage des températures de seuil pour chacune des 6 zones de chauffe,
● Paramétrage du cycle (vitesse de montée du moule, temps de chauffe...),
● Système de logs et de visualisation de logs pour consulter l’historique d’utilisation de la machine.

Le projet se décompose en deux grandes parties :

1. Développement de l’API qui fera le lien entre l’automate et l’interface web.
    L’API sera développée en Javascript sous NodeJS.
    Les transferts d’information se feront exclusivement en JSON sur la couche HTTP.
2. Développement de l’interface web au moyen du framework Vue.js, l’affichage du graphe pourra s’appuyer sur
    la puissante bibliothèque de datavisualisation D3.

Moyens matériels, logiciels, documentations :
Linux, NodeJS, Vue.js, D3.js
Matériels utilisés :
● Raspberry
● Thermoformeuse
