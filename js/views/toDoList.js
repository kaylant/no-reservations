import React, {Component} from 'react'

var ToDoList = React.createClass({

    _makeItem: function(model) {
        return <Item updater={this.props.updater} listModel={model} remover={this.props.remover}/>
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