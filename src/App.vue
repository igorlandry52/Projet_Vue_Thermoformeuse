<template>
  <v-app>
    <home />
    <v-content>
      <router-view></router-view>
    </v-content>
    
  </v-app>
</template>

<script>
import home from "@/views/Home";
export default {
  name:"App",
  components: { home },
  data () {
    return {
      //
    }
  }
}
</script>