import React, {Component} from 'react'
import ToDoList from './toDoList'
import ItemAdder from './itemAdder'

var Item = React.createClass({

    _selectStatus: function(event) {
        var newStat = event.target.value
        this.props.listModel.set({status:newStat})
        this.props.updater()
    },

    _clickHandler: function() {
        console.log(this.props.listModel)
        this.props.remover(this.props.listModel)
        console.log('do we read this line?')
    },

    render: function() {
        return <div className="item">
                    <p>{this.props.listModel.get('task')}</p>
                    <p>{this.props.listModel.get('status')}</p>
                    <select onChange={this._selectStatus} >
                        <option value="">change status</option>
                        <option value="pending">pending</option>
                        <option value="undone">undone</option>
                        <option value="done">done</option>
                    </select>
                    <button className="delete" onClick={this._clickHandler}>x</button>
                </div>
    }
})

export default Item