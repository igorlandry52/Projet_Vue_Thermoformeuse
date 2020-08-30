<template>
  <div class="visualisation">
    <v-row>
      <v-col cols="6">
        <v-card
          class="mt-6"
          max-width="500"
        >
          <v-sheet
            class="v-sheet--offset mx-auto pb-0"
            color="light-blue accent-1"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <bar-chart :data="dataChart" width="430" height="400" :ok="value" />
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Temperature visualisation</div>
            <div class="subheading font-weight-light grey--text">Evolution des températures des 6 zones de chauffes</div>
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">dernière utilisation : {{dateUser}}</span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card
          max-width="300"
        >
          <v-card-text>
            <div class="title font-weight-light mb-2">Paramètres (*)</div>
            <v-divider class="my-2"></v-divider>
            <div class="text--primary" >
              <v-select
                v-model="selectedUser"
                :items="config"
                label="Config. User"></v-select>
              <v-select
                v-model="selectedTime"
                :items="temps"
                label="Durée en Seconde"></v-select>
            </div>
            <div class="title font-weight-light mb-2 mt-10">Marche/Arrêt</div>
            <v-divider class="my-2 mb-4"></v-divider>
            <div class="btn--marche">
              <v-btn
                @click="marche" 
                x-large
                v-bind:disabled="selectedUser !== '' && selectedTime !== 0 ? false : true" 
                v-bind:color="value === 0 ? 'success' : 'error'">
                <v-icon x-large color="black">mdi-power</v-icon>
              </v-btn>
            </div>
              <template v-if="pret">
                <v-alert
                  dense
                  text
                  type="success"
                  border="left"
                  class="mx-4 mt-3"
                >
                  Prêt !!!
                </v-alert>
              </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';


let data = [
  {
    x: 1,
    y: 0
  },
  {
    x: 2,
    y: 0
  },
  {
    x: 3,
    y: 0
  },
  {
    x: 4,
    y: 0
  },
  {
    x: 5,
    y: 0
  },
  {
    x: 6,
    y: 0
  }
];
let setupTime = 0;
let arret = 0;
let user = [];
setInterval(() => {
  fetch("http://localhost:3000/", {
    method: "POST",
    body: JSON.stringify(["get_temp"]),
    headers : {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
  .then(data => {
    const copyUser = [];
    data.forEach(element => {
      copyUser.push(element.name);
    });
    [...user] = copyUser;
  });
}, 10);


export default {
  name: 'visualisation',
  data() {
    return {
      dataChart: data,
      value: 0,
      pret: false,
      id: 0,
      dateUser: null,
      selectedUser: '',
      selectedTime: 0,
      config: user,
      temps: [ 40, 50, 60, 70, 80, 90 ]
    };
  },
  
  components: {
    BarChart
  },
  methods: {
    marche (){
      this.dateUser = (new Date()).toLocaleDateString("fr-FR",{
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric"
                });
      this.value = 1;
      let temp = [];
      fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify(["get_temp"]),
        headers : {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }).then(async res => await res.json())
      .then(async data => {
        await data.forEach(element => {
          if(element.name === this.selectedUser) {
            for (const key in element) {
              if (element.hasOwnProperty(key)) {
                if(key != "name") temp.push(element[key]);
              }
            }
          }
        });
      });
      
      fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify(["start", this.selectedUser, this.selectedTime]),
        headers : {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }).then(async res => await res.json())
      // .then(async data => {

      // });
      
      if(this.selectedTime > 0) setupTime = 1000*this.selectedTime;
      else setupTime = 40000; 
      setTimeout(() => {
        const copyTemp = [...temp];
        const tempMax = Math.max(...copyTemp)/2;
        let waitTime;
        if(Math.max(...copyTemp) > 100) waitTime = tempMax*100 + 1000;
        else if(Math.max(...copyTemp) < 20) waitTime = tempMax*1000;
        else waitTime = Math.max(...copyTemp)*100;
        const upIntervale = setInterval(() => {
          if(arret === 0) {
            for (let index = 0; index < data.length; index++) {
              if( data[index].y < temp[index]) data[index].y += 2;
              else data[index].y -= 2;
            }
          } 
        }, 100);
      
        setTimeout(() => {
          arret = 1;
          const downInterval = setInterval(() => {
            if(arret === 1) {
              for (let index = 0; index < data.length; index++) {
                if( data[index].y > 0) {
                  data[index].y -= copyTemp[index]/tempMax;
                }      
              }
            }     
          }, 100);
          setTimeout(() => {
            arret = 0;
            this.pret = true;
            this.value = 0;
            this.selectedUser = '';
            this.selectedTime = 0;
            clearInterval(upIntervale);
            clearInterval(downInterval);
            setTimeout(() => { 
              this.pret = false;
            }, 5000);
          }, waitTime);
        }, setupTime); 
      }, 100);
    }
  }
}
</script>

<style>
body {
  margin: 10px 0 0 10px;
}
.visualisation {
  margin-top: 20px;
  max-width: 1020px;
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 300px);
  grid-gap: 20px;
}
.v-sheet--offset {
  height: 370px;
  top: -24px;
  position: relative;
}
.text--primary {
  width: 160px;
}
</style>