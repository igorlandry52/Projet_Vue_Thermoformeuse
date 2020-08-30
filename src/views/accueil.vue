<template>
  <div class="accueil">
  <v-card
    class="mx-auto"
    max-width="1120"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="../assets/3dmap_accueil.jpg"
    >
      <v-card-title>La précision du relief</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0"><strong>Julien Arlandis</strong></v-card-subtitle>

    <v-card-text >
      <div>3Dmap réalise des cartes en relief à usage récréatif et éducatif, 
        fabrication 100% Française. Fruit de nos efforts en R&D et de 
        technologies de pointe, le procédé de fabrication innovant des 
        produits 3Dmap offre une qualité d'exception qui crée la rupture 
        avec les anciennes cartes en relief. Un logiciel de traitement 3D 
        a été spécifiquement développé pour permettre une plus large utilisation 
        de l'information géographique comme l'exploitation de donnée bathymétriques.</div>
    </v-card-text>

    <v-divider
          class="mx-4 mb-3"
          inset
          vertical
        ></v-divider>

        <v-tabs
          background-color="white"
          color="green accent-3"
          right
        >
          <v-tab>Description</v-tab>
          <v-tab>Contact</v-tab>

          <v-tab-item
            v-for="n in 2"
            :key="n"
          >
            <v-container >
              <v-card-text >
                <div>{{tools[n-1]}}</div>
                <div v-if="n==2">
                
                </div>
              </v-card-text >
            </v-container>
          </v-tab-item>
        </v-tabs>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    tools: [`3Dmap a été créée en juillet 2016 par deux frères vauclusiens, 
    Julien et Romain Arlandis, passionnés de géographie et de patrimoine. 
    Les cartes sont conçues, créées et commercialisées en France afin de 
    valoriser le caractère culturel, sportif et touristique de nos régions. 
    Au total, une douzaine de professionnels locaux contribuent à la fabrication 
    de chaque carte. Un bel exemple de Made in France. Romain : Chargé du développement 
    commercial Julien : Chargé de la production des cartes`]
  }),
}
</script>

<style>

</style>