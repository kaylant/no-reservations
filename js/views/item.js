import React, {Component} from 'react'

var Item = React.createClass({

    _selectStatus: function(event) {
        var newStat = event.target.value
        this.props.listModel.set({status:newStat})
        this.props.updater()
    },

    _clickHandler: function() {
        this.props.remover(this.props.listModel)
    },

    render: function() {
        return <div className="item">
                    <p>{this.props.listModel.get('item')}</p>
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