<!-- <template>
  <div class="elevation-1">
    <v-toolbar flat color="white">
      <v-toolbar-title>Historiques / Logs</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
				<v-text-field
					v-model="recherche"
					append-icon="mdi-magnify"
					label="Recherche"
					single-line
					hide-details
				></v-text-field>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="logs"
      :search="recherche"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.date }}</td>
        <td class="text-xs-right">{{ props.item.etat }}</td>
        <td class="text-xs-right">{{ props.item.durée }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      recherche: '',
      headers: [
        {
          text: "Nom d'utilisateur",
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Date', value: 'date' },
        { text: 'Etat', value: 'etat' },
        { text: 'Durée (secondes)', value: 'durée' }
      ],
      logs: []
    }),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        setInterval(() => {
          fetch("http://localhost:3000/", {
            method: "POST",
            body: JSON.stringify(["get_temp_log"]),
            headers : {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          }).then(res => res.json())
          .then(data => {
            this.logs = data;
          });
        }, 100);
      }
    }
  }
</script> -->

<template>
  <v-data-table
    :headers="headers"
    :items="logs"
    :search="recherche"
    sort-by="durée"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
      <v-toolbar-title>Historiques / Logs</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
				<v-text-field
					v-model="recherche"
					append-icon="mdi-magnify"
					label="Recherche"
					single-line
					hide-details
				></v-text-field>
    </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>


<script>
  export default {
    data: () => ({
      recherche: '',
      headers: [
        {
          text: "Nom d'utilisateur",
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Date', value: 'date' },
        { text: 'Etat', value: 'etat' },
        { text: 'Durée (secondes)', value: 'durée' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      logs: []
    }),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        setInterval(() => {
          fetch("http://localhost:3000/", {
            method: "POST",
            body: JSON.stringify(["get_temp_log"]),
            headers : {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          }).then(res => res.json())
          .then(data => {
            let arrayData = [];
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                const element = data[key];
                arrayData.push(element); 
              }
            }
            this.logs = arrayData;
          });
        }, 100);
      },

      deleteItem (item) {
        const index = this.logs.indexOf(item);
        confirm('Are you sure you want to delete this item?') && 
        fetch("http://localhost:3000/", {
            method: "POST",
            body: JSON.stringify(["del_temp_log", index]),
            headers : {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
        }).then(res => res.json());
      }
    },
  }
</script>