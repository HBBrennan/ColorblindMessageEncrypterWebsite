import React from 'react'
import 'font-awesome/css/font-awesome.css'
import './QueryBar.css'
import PropTypes from 'prop-types'

class QueryBar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            query: '',
            queried: false
        }
    }

    handleQueryChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })  
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({queried: true})
        this.props.setShrink(true)
        this.props.submitText(this.state.query)
    }

    handleReset = (e) => {
        e.preventDefault()
        this.setState({ query: '', queried: false })
        this.props.setShrink(false)
        this.props.resetQuery()
    }

    showList = () => {
        this.context.router.history.push('/')
    }

    render() {
        return (
            <div className="querybar-container">
                <form className="query-form">
                    <input
                        type="query"
                        name="query"
                        value={this.state.query}
                        className="query-input"
                        placeholder="Text to Encrypt"
                        onChange={this.handleQueryChange}
                    />
                    <button
                        type="submit"
                        className="query-button"
                        onClick={this.handleSubmit}
                    >
                        <i className="query-icon fa fa-query" />
                    </button>
                    <button className="reset-button" onClick={this.handleReset}>
                        <i className="fa fa-repeat" />
                    </button>
                </form>
            </div>
        )
    }
}

PropTypes.PropTypes = {
    submitText: PropTypes.func.isRequired,
    setShrink: PropTypes.func.isRequired,
    resetQuery: PropTypes.func.isRequired,
}

QueryBar.contextTypes = {
    router: PropTypes.object
}

export default QueryBar