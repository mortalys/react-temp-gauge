import React, { Component } from 'react';
import { render } from 'react-dom';
import {RadialGauge} from 'react-canvas-gauges';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      interval: null,
      txtColor: 'black',
      goal: 100
    };
  }

  componentDidMount() {  

    let limit = this.state.goal;
    let currentTemp = 0, directionUp = true;
    let color = this.state.txtColor;

    directionUp = this.state.goal > 0 ? true : false;

    if (this.state.goal == 0) return false;

    this.state.interval = setInterval(()=> {
        currentTemp = directionUp ? (currentTemp + 0.5): (currentTemp - 0.5);

        if (currentTemp == 0) color = 'black'
        if (currentTemp < 0) color = 'blue'
        if (currentTemp < -25) color = 'navy'
        if (currentTemp > 0) color = 'orange'
        if (currentTemp > 25) color = 'red'        

        if (directionUp && currentTemp > (limit+0.10))
        {
          clearInterval(this.state.interval) 
        } 
        else if (!directionUp && currentTemp < (limit-0.10))
        {
          clearInterval(this.state.interval) 
        }         
        else
        {
          this.setState({
            temperature: currentTemp,
            txtColor: color
          })
        }     

    }, 10);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.state.interval)
    }
  }

  render() {
    return (
      <div>
        <RadialGauge
          units='°C'
          title='Temperature'
          value={this.state.temperature}
          minValue={-100}
          maxValue={100}
          majorTicks={[-100, -90 ,-80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          minorTicks={0.5}
          height='800'    
          colorNumbers={this.state.txtColor}
          colorValueText={this.state.txtColor}
          colorValueTextShadow='black'
          colorBorderOuter={this.state.txtColor}
          colorNeedleCircleOuter={this.state.txtColor}
          colorValueBoxRect={this.state.txtColor}
          colorNeedle={this.state.txtColor}
          colorValueBoxBackground='white'
          valueInt='1'
          valueDec='1'
          highlights='false'
          ></RadialGauge>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
