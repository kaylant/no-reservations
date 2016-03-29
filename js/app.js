// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right undonew
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }


import DOM from 'react-dom'
import React, {Component} from 'react'
import Backbone from 'backbone'



function app() {
    // --------------------- Model/Collection --------------------- //
    var ListModel = Backbone.Model.extend({

        defaults: {
            status: "pending"
        },

        initialize: function(newItem) {
            this.set({item: newItem})
        }
    })

    var ListCollection = Backbone.Collection.extend({
        model: ListModel
    })

    // --------------------- Views --------------------- //

    var ListView = React.createClass({
        // gets item passed in from _handleKeyDown function below
        // add new instance of model with item to collection
        // list coll was put on state
        _addItem: function(item) {
            this.state.listColl.add(new ListModel(item))
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

        _removeItem: function(model) {
            this.state.listColl.remove(model)
            this._updater()
        },

        _updater: function() {
            this.setState({
                listColl: this.state.listColl
            })
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
                    <ItemAdder adderFunc={this._addItem}/>
                    <ToDoList updater={this._updater} listColl={listColl} remover={this._removeItem}/>
                </div>  
                )
        }
    })

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

    var ToDoList = React.createClass({

        _makeItem: function(model) {
            return <Item updater={this.props.updater} listModel={model} remover={this.props.remover}/>
        },


        render: function() {
            console.log(this)
            return (
                <div className="itemList">
                    {this.props.listColl.map(this._makeItem)}
                </div>
                )
        }
    })

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

    // --------------------- Router --------------------- //

    var Router = Backbone.Router.extend({
        routes: {
            "*default": "home"
        },

        home: function() {
            DOM.render(<ListView listColl={new ListCollection()}/>,document.querySelector('.container'))
        },

        // home function places instance of the listCollection on the view, ListView
        initialize: function() {
            Backbone.history.start()
        }
    })

    var rtr = new Router()

}

app()