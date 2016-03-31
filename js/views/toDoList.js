import React, {Component} from 'react'
import ListView from './listView'
import Item from './item'

var ToDoList = React.createClass({

    _makeItem: function(model, i) {
        return <Item updater={this.props.updater} listModel={model} remover={this.props.remover} key={i}/>
    },

    render: function() {
        // console.log(this)
        return (
            <div className="itemList">
                {this.props.listColl.map(this._makeItem)}
            </div>
            )
    }
})

export default ToDoList