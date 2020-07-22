import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'fontsource-roboto'
import HighlightIcon from '@material-ui/icons/Highlight'
import TonalityIcon from '@material-ui/icons/Tonality';
import { IconButton, ButtonGroup } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000000'
        },

        secondary: {
            main: '#AA0000'
        }
    }
})

class Redsight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'default',
            bulb: true,
            flash_interval: 3000,
            off_interval: 50
        }

        this.toggleFlash = this.toggleFlash.bind(this)
    }

    toggleFlash() {
        this.setState({
            mode: this.state.mode === 'default' ? 'flash' : 'default'
        })
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        //console.log('@@@', {...this.state, iID: this.intervalID})
        const {bulb, mode, flash_interval, off_interval} = this.state
        if(mode === 'flash') {
            if(bulb)
                this.intervalID = setTimeout(() => this.setState({ bulb: false}), flash_interval)
            else
                this.intervalID = setTimeout(() => this.setState({bulb: true}), off_interval)
        }

        if(mode === 'default'){
            clearInterval(this.intervalID)
            this.intervalID = undefined
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
        this.intervalID = undefined
    }

    render() {
        return (
            <div>
                <div
                    className={this.state.bulb ? "redsight" : "offsight"}
                />
                <ThemeProvider theme={theme}>
                    <ButtonGroup orientation='vertical'>
                        <IconButton aria-label="flash" color='primary' onClick={this.toggleFlash}>
                            <HighlightIcon fontSize='large'/>
                        </IconButton>
                        <IconButton aria-label="gradient" color='primary'>
                            <TonalityIcon fontSize='large' />
                        </IconButton>
                    </ButtonGroup>
                </ThemeProvider>
            </div>
        )
    }
}

ReactDOM.render(
    <Redsight />,
    document.getElementById('root')
);