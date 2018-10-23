import React from 'react'
import './Query.css'
import Logo from '../Logo/Logo'
import QueryBar from './QueryBar'
import PropTypes from 'prop-types'

class Query extends React.Component {
    constructor() {
        super()

        this.state = {
            shrink: false
        }
    }

    setShrink = (shrink) => {
        this.setState({ shrink })
    }

    render() {
        const classes = !this.state.shrink
            ? 'query-container'
            : 'query-container query-container-small'
        const logoContainerClasses = this.props.logoSizeIsSmall
            ? 'query-logo-container-hide' 
            : 'query-logo-container-show'
        return (
            <div className={classes}>
                <div className={logoContainerClasses}>
                    <Logo logoSizeIsSmall={this.props.logoSizeIsSmall} />
                </div>
                <QueryBar
                    resetQuery={this.props.resetQuery}
                    submitText={this.props.submitText}
                    setShrink={this.setShrink}
                />
            </div>
        )
    }
}
Query.propTypes = {
    logoSizeIsSmall: PropTypes.bool.isRequired,
    submitText: PropTypes.func.isRequired,
    resetQuery: PropTypes.func.isRequired,
}
export default Query
