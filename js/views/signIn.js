import React, {Component} from 'react'

// captures value in input bar where user signs into the to-do-list
var SignInView = React.createClass ({
    _submitUsername: function(e) {
        if (e.keyCode === 13) {
            var username = e.target.value
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

export default SignInView