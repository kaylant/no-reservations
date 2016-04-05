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
import Firebase from 'firebase'
import Backbone from 'bbfire'

import SignInView from './views/signIn'
import ListView from './views/listView'
import ItemAdder from './views/itemAdder'
import ToDoList from './views/toDoList'
import Item from './views/item'



function app() {

	//------------ Models ------------//

	// set up model for user of the to-do list app
	// the username default is null because it is overwritten by SignInView
	var UserModel = Backbone.Model.extend({
	    defaults: {
	        username: null
	    },

	    // this url requries .json because the persistance data is returned in this format
	    url: function() {
	        return `https://no-reservations.firebaseio.com/users/${this.get('username').json}`
	    }
	})

	// default view on the model is that a task is false or "un-done"
	var ListModel = Backbone.Model.extend({
	    defaults: {
	        status: "pending"
	    }
	})

	// put the initialize method on collection
	// initialize is passed in a username from below
	var ListCollection = Backbone.Firebase.Collection.extend({
	    model: ListModel,
	    initialize: function(username) {
	        this.url = `https://no-reservations.firebaseio.com/users/${username}/tasks`
	    },
	    parse: function(rawData) {
	    	// console.log(rawData)
	    	return rawData
	    }
	})

	//------------ Sign-In View ------------//

	// captures value in input bar where user signs into the to-do-list
	var SignInView = React.createClass ({
	    _submitUsername: function(evt) {
	        if (evt.keyCode === 13) {
	            var username = evt.target.value
	            this.props.handleUserSubmit(username)
	        }
	    },

	    render: function() {
	        return (
	            <div className="signinContainer">
	                <input onKeyDown={this._submitUsername} name="username" />
	            </div>
	            )
	    }
	})

	//------------ Router ------------//

	var Router = Backbone.Router.extend({
	    routes: {
	        "*todo": "home",
	        "default": "showLogin"
	    },

	    handleUserSubmit: function(username) { 
	    	console.log('running handle submit')
	        localStorage.todoUsername = username
	        var userModel = new UserModel({username: username}) 
	        userModel.fetch().then(function(resp){
	            if (resp !== null) { 
	                window.location.hash = "todo"
	            }
	        })
	    },
	    
	    showLogin: function() { 
	        window.location.hash = "login"
	        var boundSubmitter = this.handleUserSubmit.bind(this)
	        DOM.render(<SignInView handleUserSubmit={boundSubmitter}/>, document.querySelector('.container')) 
	    },

	    home: function() {
	        if (typeof localStorage.todoUsername !== 'string') {window.location.hash = "login"}
	        var lc = new ListCollection(localStorage.todoUsername)
	    	//console.log(lc)
	        //var intervalID = setInterval(lc.fetch.bind(lc),1500)
	        DOM.render(<ListView listColl={lc}/>,document.querySelector('.container'))
	    },

	    initialize: function() {
	        Backbone.history.start()
	    }
	}) 

var rtr = new Router()	

}

app()