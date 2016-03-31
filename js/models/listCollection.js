import React, {Component} from 'react'
import Backbone from 'bbfire'
import ListModel from './models/listModel'

// put the initialize method on collection
// initialize is passed in a username from below
var ListCollection = Backbone.Firebase.Collection.extend({
    model: ListModel,
    initialize: function(username) {
        this.url = `https://no-reservations.firebaseio.com/users/${username}/tasks`
    }
})

export default ListCollection