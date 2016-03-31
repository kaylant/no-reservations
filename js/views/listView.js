import React, {Component} from 'react'
import ItemAdder from './itemAdder'
import ToDoList from './toDoList'

var ListView = React.createClass({

    componentWillMount: function() {
        var self = this
        this.props.listColl.on('sync', function(){self.forceUpdate()})
    },

    // gets item passed in from _handleKeyDown function below
    // add new instance of model with item to collection
    // list coll was put on state
    _addItem: function(item) {
        console.log("adding item")
        console.log(item)
        console.log(this.state.listColl.models)
        this.state.listColl.add(item)
        this._updater()
    },

    _genbuttons: function() {
        var butts = ["pending","undone","done","all"].map(function(itemStatus){
            return <button onClick={this._filterView} value={itemStatus}>{itemStatus}</button>
        }.bind(this))
        return butts
    },

    _filterView: function(event) {
        var buttView = event.target.value
        this.setState({
            viewType: buttView
        })
    },

    _updater: function() {
        this.setState({
            listColl: this.state.listColl
        })
    },

    _removeItem: function(model) {
        this.state.listColl.remove(model)
        this._updater()
    },

    // list collection is on props, but moved to state above
    getInitialState: function() {
        return {
            listColl: this.props.listColl,
            viewType: "all"
        }
    },

    // put listCollection on state
    render: function() {
        var listColl = this.state.listColl
        if (this.state.viewType === "pending") listColl = listColl.where({status:"pending"})
        if (this.state.viewType === "done") listColl = listColl.where({status:"done"})
        if (this.state.viewType === "undone") listColl = listColl.where({status:"undone"})

        return (
            <div className="listView">
                <h1>To-Do List</h1>
                <div className="buttons">{this._genbuttons()}</div>
                <ItemAdder adderFunc={this._addItem} />
                <ToDoList updater={this._updater} listColl={listColl} remover={this._removeItem}/>
            </div>  
            )
    }
})

export default ListView