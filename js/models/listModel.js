import React, {Component} from 'react'
import Backbone from 'bbfire'
import ListCollection from './listCollection'

// default view on the model is that a task is false or "un-done"
var ListModel = Backbone.Model.extend({
    defaults: {
        status: "pending"
    }
})

export default ListModel