<template>
  <div class="configuration">
  <v-data-table
    :headers="headers"
    :items="temperatures"
		:search="search"
		:single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Configuration</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Recherche"
					single-line
					hide-details
				></v-text-field>
				<v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" class="mb-3">
          <template v-slot:activator="{ on }">
            <!-- <v-btn color="primary" dark class="mb-2" v-on="on">Add-config</v-btn> -->
            <v-btn
              v-on="on"
              color="green darken-1"
              class="mt-2"
              dark
              fab
              fixed
              right
              @click="dialog = !dialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Nom de Profil"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field type="number" :rules="rules.max(220, editedItem.T1)" v-model="editedItem.T1" label="T1(°C)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field type="number" :rules="rules.max(220, editedItem.T2)" v-model="editedItem.T2" label="T2(°C)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field type="number" :rules="rules.max(220, editedItem.T3)" v-model="editedItem.T3" label="T3(°C)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field type="number" :rules="rules.max(220, editedItem.T4)" v-model="editedItem.T4" label="T4(°C)"></v-text-field>
                  </v-col>
									<v-col cols="12" sm="6" md="4">
                    <v-text-field type="number" :rules="rules.max(220, editedItem.T5)" v-model="editedItem.T5" label="T5(°C)"></v-text-field>
                  </v-col>
									<v-col cols="12" sm="6" md="4">
                    <v-text-field type="number" :rules="rules.max(220, editedItem.T6)" v-model="editedItem.T6" label="T6(°C)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <template v-if="popup">
                <v-alert
                  dense
                  outlined
                  type="error"
                  border="left"
                  class="mx-4 mb-4"
                >
                  saisiser des valeurs inférieur à 220.
                </v-alert>
              </template>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              
            </v-card-actions>      
            
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
		<template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length" >More info about {{ item.name }}</td>
			<v-expansion-panels></v-expansion-panels>
    </template>
    <template v-slot:item.actions="{ item }" >
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  </div>
</template>

<script>
  
  export default {
    data: () => ({
      expanded: [],
      rules: {
        max(maxnum, v) { 
          return (v || 0) <= maxnum || 'Max';
        }
      },
      singleExpand: true,
      popup: false,
      dialog: false,
			search: '',
      headers: [
        {
          text: 'Nom de Profil',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'T1(°C)', value: 'T1' },
        { text: 'T2(°C)', value: 'T2' },
        { text: 'T3(°C)', value: 'T3' },
				{ text: 'T4(°C)', value: 'T4' },
				{ text: 'T5(°C)', value: 'T5' },
				{ text: 'T6(°C)', value: 'T6' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
      temperatures: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        T1: 0,
        T2: 0,
        T3: 0,
				T4: 0,
				T5: 0,
				T6: 0
      },
      defaultItem: {
        name: '',
        T1: 0,
        T2: 0,
        T3: 0,
				T4: 0,
				T5: 0,
				T6: 0
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nouvelle Configuration' : 'Modification'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        fetch("http://localhost:3000/", {
            method: "POST",
            body: JSON.stringify(["get_temp"]),
            headers : {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          }).then(res => res.json())
          .then(data => {
            this.temperatures = data;
        });
        setInterval(() => {
          for (let index = 0; index < 5; index++) {
            if(this.editedItem.T1 > 220 || this.editedItem.T2 > 220 || this.editedItem.T6 > 220 ||
              this.editedItem.T3 > 220 || this.editedItem.T4 > 220 || this.editedItem.T5 > 220 ) this.popup = true;
            else this.popup = false;
          }
        }, 100);
      },

      editItem (item) {
        this.editedIndex = this.temperatures.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.temperatures.indexOf(item)
        confirm('Are you sure you want to delete this item?') && 
        fetch("http://localhost:3000/", {
            method: "POST",
            body: JSON.stringify(["del_temp", index]),
            headers : {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          }).then(res => res.json());
          // .then(data => {
            
          // });
        this.initialize();
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if(!this.popup) { 
          fetch("http://localhost:3000/", {
            method: "POST",
            body: JSON.stringify(["set_temp", this.editedItem, this.editedIndex]),
            headers : {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          }).then(res => res.json());
          // .then(data => {
            
          // });
          this.initialize();
          this.close();
        }  
      }
    }
  }
</script>