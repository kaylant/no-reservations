import React, {Component} from 'react'
import Backbone from 'bbfire'

// default view on the model is that a task is false or "un-done"
var ListModel = Backbone.Model.extend({
    defaults: {
        status: "pending"
    }
})

export default ListModel