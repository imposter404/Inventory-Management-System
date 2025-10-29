import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class Line_chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          foreColor:"#ffffffff",
          height:'100%',
          id: "basic-bar",
          zoom:{enabled:false},
          toolbar:{show:false},
          sparkline:{
            // enabled:true
          },
        },
        
        colors:["#ffa600ff","#008cffff","#f700ffff","#ff006aff"],
        xaxis: {
          // categories:this.props.newData.date,
          // categories:this.props.newData.date,
          labels:{
            // show:false,
          },
          // axisBorder:{show:false},
          axisTicks:{show:false,}
        },
        legend:{
          show:true,
          position:'top',
          offsetY:"30"
        },
        yaxis:{labels:{show:false}},
        tooltip:{enabled:true,theme:'dark'},
        grid:{show:false}
      },

      series: [
        {
          name: "revenue",
          data: [30, 40, 45, 50, 49, 60,]
        },
        {
          name: "Profit",
          data: [45, 50, 49, 60, 70, 91,]
        },
        {
          name: "Orders",
          data: [45, 50, 91, 49, 60, 70,]
        },
        {
          name: "Products",
          data: [60, 70, 91,45, 50, 49]
        },
      ],
    };
  }

  render() {
    console.log(this.props.newData.date)
    return (
      <Chart
          options={{...this.state.options,xaxis:{categories:this.props.newData.date}}}
          // series={this.state.series}
          series={[
            {name: "Revenue",data: this.props.newData.revenue},
            {name: "Profit",data: this.props.newData.profit},
            {name: "Orders",data: this.props.newData.orders},
            {name: "Products",data: this.props.newData.products},
          ]}

          type="line"
          // width="350"
          height="450px"
      />
    );
  }
}