import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Redsight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'default',
            bulb: true,
            flash_interval: 3000
        }

        this.toggleFlash = this.toggleFlash.bind(this)
    }

    toggleBulb() {
        const currState = this.state.bulb
        this.setState({ bulb: !currState})
    }

    toggleFlash() {
        this.setState({
            mode: this.state.mode === 'default' ? 'flash' : 'default'
        })
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        console.log('@@@', {...this.state, iID: this.intervalID})
        if(this.state.mode === 'flash' && !this.intervalID)
            this.intervalID = setInterval(this.toggleBulb.bind(this), this.state.flash_interval)
        
        if(this.state.mode === 'default' && this.intervalID)    {
            clearInterval(this.intervalID)
            this.intervalID = null
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
        this.intervalID = null
    }

    render() {
        return (
            <div
                className={this.state.bulb ? "redsight" : "offsight"}
                onClick={this.toggleFlash}
            />
        )
    }
}

ReactDOM.render(
    <Redsight />,
    document.getElementById('root')
);