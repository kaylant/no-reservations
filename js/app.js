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

import UserModel from './models/userModel'
import ListCollection from './models/listCollection'
import ListModel from './models/listModel'

import SignInView from './views/signIn'
import ListView from './views/listView'
import ItemAdder from './views/itemAdder'
import ToDoList from './views/toDoList'
import Item from './views/item'

function app() {

	var Router = Backbone.Router.extend({
	    routes: {
	        "todo": "home",
	        "*default": "showLogin"
	    },

	    handleUserSubmit: function(username) { 
	        localStorage.todoUsername = username
	        var userModel = new UserModel({username: username}) 
	        userModel.fetch().then(function(resp){
	            if (resp !== null) { 
	                location.hash = "todo"
	            }
	        })
	    },
	    
	    showLogin: function() { 
	        location.hash = "login"
	        var boundSubmitter = this.handleUserSubmit.bind(this)
	        DOM.render(<SignInView handleUserSubmit={boundSubmitter}/>, document.querySelector('.container')) 
	    },

	    home: function() {
	        if (typeof localStorage.todoUsername !== 'string') {location.hash = "login"}
	        var lc = new ListCollection(localStorage.todoUsername)
	    	console.log(lc)
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