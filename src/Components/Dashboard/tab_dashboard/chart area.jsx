import React, { Component, useState } from "react";
import Chart from "react-apexcharts";



export default class Area_chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          height:'100%',
          id: "basic-bar",
          zoom:{enabled:false},
          toolbar:{show:false},
          sparkline:{enabled:true},
          // dropShadow:{enabled:true,top:0,left:0,blur:10},
        },
        stroke:{curve:"smooth",},
        // colors:["#FFFFFF","#FFFF00"],
        fill:{type:"gradient",
          // colors:["#ff00dd"],
          colors:this.props.fill,
          gradient:{
            shadeIntensity:0,
            inverseColors:true
          }

        },
        xaxis: {labels:{show:false,},axisBorder:{show:false},axisTicks:{show:false,}},
        yaxis:{labels:{show:false}},
        tooltip:{enabled:false},
        grid:{show:false}
      },
      series: [
        {
          name: "series-1",
          data: [0]
        },
      ],
    };
  }
  render() {
    // console.log(this.state.series)
    return (
      <Chart
          options={this.state.options}
          series={[{name: "series-1",data: this.props.newData}]}
          type="area"
          height='120'
      />
    );
  }
}