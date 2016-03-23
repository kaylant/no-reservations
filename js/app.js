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
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./serviceworker.js').then(() => {
//         // Registration was successful
//         console.info('registration success')
//     }).catch(() => {
//         console.error('registration failed')
//             // Registration failed
//     })
// } else {
//     // No ServiceWorker Support
// }

import DOM from 'react-dom'
import React, {Component} from 'react'
import Backbone from 'backbone'


function app() {
	// --------------------- Model/Collection --------------------- //
	var GuestModel = Backbone.Model.extend ({
		initialize: function(newName) {
			this.set({name: newName})
		},

		defaults: {
			partySize: 1
		}

	})

	var GuestCollection = Backbone.Collection.extend ({
		model: GuestModel
	})

	// --------------------- Views --------------------- //

    var ResView = React.createClass({
    	// gets name passed in from _handleKeyDown function below
    	// add new instance of model with name to collection
    	// guest coll was put on state
        _addGuest: function(name) {
            this.state.guestColl.add(new GuestModel(name))
            this.setState({
                guestColl: this.state.guestColl
            })
        },

        // guest collection is on props, but moved to state above
        getInitialState: function() {
            return {
                guestColl: this.props.guestColl
            }
        },

        // put guestCollection on state
        render: function() {
            return (
                <div className="partyView">
                    <GuestAdder adderFunc={this._addGuest}/>
                    <GuestList guestColl={this.state.guestColl}/>
                </div>  
                )
        }
    })

 	var GuestAdder = React.createClass({
 		// captures guest name at input
        _handleKeyDown: function(keyEvent) {
            if (keyEvent.keyCode === 13) {
                var guestName = keyEvent.target.value
                this.props.adderFunc(guestName)
                keyEvent.target.value = ''
            }
        },
        // input runs _handleKeyDown, above 
        render: function() {
            return <input onKeyDown={this._handleKeyDown} />
        }
    })

    var GuestList = React.createClass({
        _makeGuest: function(model) {
            return <Guest guestModel={model} />
        },

        render: function() {
            return (
                <div className="guestList">
                    {this.props.guestColl.map(this._makeGuest)}
                </div>
                )
        }
    })

    var Guest = React.createClass({
        render: function() {
            return <p>{this.props.guestModel.get('name')}</p>
        }
    })

	// --------------------- Router --------------------- //

	var Router = Backbone.Router.extend ({
		// one default route, home
		routes: {
			"*default" : "home"
		},

		// home function places instance of the GuestCollection on the view, ResView
		home: function() {
			window.location.hash = "home"
			DOM.render(<ResView guestColl={new GuestCollection()}/>, document.querySelector('.container'))
		},

		initialize: function() {
			Backbone.history.start()
		}

	})

	var rtr = new Router()

}

app()
