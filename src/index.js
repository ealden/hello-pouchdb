import Vue from 'vue'
import PouchDB from 'pouchdb'

const db = new PouchDB('entries')
const remoteCouch = false

const app = new Vue({
  el: '#app',
  data: {
    name: '',
    description: '',
    entries: []
  },
  mounted: function() {
    this.listEntries()
  },
  methods: {
    addEntry: function() {
      let entry = {
        _id: new Date().toISOString(),
        name: this.name,
        description: this.description
      }

      db.put(entry, (err, result) => {
        if (!err) {
          this.listEntries()
        }
      })
    },
    listEntries: function() {
        db.allDocs({include_docs: true, descending: true}, (err, doc) => {
          this.entries = doc.rows
        })
    }
  }
})
