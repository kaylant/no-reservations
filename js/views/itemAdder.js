import React, {Component} from 'react'

var ItemAdder = React.createClass({
    // captures to-do item at input
    _handleKeyDown: function(keyEvent) {
        if (keyEvent.keyCode === 13) {
            var itemName = keyEvent.target.value
            this.props.adderFunc(itemName)
            keyEvent.target.value = ''
        }
    },

    // input runs _handleKeyDown, above 
    render: function() {
        return <input onKeyDown={this._handleKeyDown} />
    }
})

export default ItemAdder