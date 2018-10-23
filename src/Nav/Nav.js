import React from 'react'
import './Nav.css'
import Logo from '../Logo/Logo'
import PropTypes from 'prop-types'

const Nav = (props) => {
    const navbarClasses = props.userHasQueried ? 'navbar' : 'navbar-hide'
    return (
        <div className={navbarClasses}>
            <Logo logoSizeIsSmall={props.userHasQueried} />
        </div>
    )
}

Nav.propTypes = {
    userHasQueried: PropTypes.bool.isRequired
}

export default Nav
