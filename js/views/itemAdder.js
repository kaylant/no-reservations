import React, {Component} from 'react'
import ListView from './listView'

var ItemAdder = React.createClass({
    // captures to-do item at input
    _handleKeyDown: function(keyEvent) {
        if (keyEvent.keyCode === 13) {
            var taskText = keyEvent.target.value
            this.props.adderFunc(taskText)
            keyEvent.target.value = ''
        }
    },

    // input runs _handleKeyDown, above 
    render: function() {
        return <input onKeyDown={this._handleKeyDown} />
    }
})

export default ItemAdder