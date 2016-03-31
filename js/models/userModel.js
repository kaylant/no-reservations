import React, {Component} from 'react'
import Backbone from 'bbfire'

// set up model for user of the to-do list app
// the username default is null because it is overwritten by SignInView
var UserModel = Backbone.Model.extend({
    defaults: {
        username: null
    },

    // this url requries .json because the persistance data is returned in this format
    url: function() {
        return `https://no-reservations.firebaseio.com/users/${this.get('username').json}`
    }
})

export default UserModel