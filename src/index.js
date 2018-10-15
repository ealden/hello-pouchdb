import Vue from 'vue'
import PouchDB from 'pouchdb'

const db = new PouchDB('entries')
const remoteCouch = false

const app = new Vue({
  el: '#app',
  data: {
    name: '',
    description: ''
  },
  methods: {
    addEntry: function() {
      let entry = {
        _id: new Date().toISOString(),
        name: this.name,
        description: this.description
      }

      db.put(entry, function callback(err, result) {
        if (!err) {
          console.log('Successfull added an entry!')
        }
      })
    }
  }
})
