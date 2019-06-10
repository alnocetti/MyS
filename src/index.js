// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import d3 from "d3";

class Grafico{

    draw_graph = function() {
        instance.options.xAxis.domain[0] = parseInt(document.getElementById("a").value);
        instance.options.xAxis.domain[1] = parseInt(document.getElementById("b").value);
        if (document.getElementById("fx").value !== ""){
            instance.options.data[0].fn = document.getElementById("fx").value;
        }
        // var ejeX = [parseInt(document.getElementById("a").value), parseInt(document.getElementById("b").value)];

        // console.log(ejeX);
        instance.draw();
        // console.log(document.getElementById("fx").value)
        // console.log(instance.options.data[0].fn);
    }

}
window.d3 = d3;

const functionPlot = require("function-plot");

const graph = document.querySelector("#graph");

var instance = functionPlot({
  target: graph,
  yAxis: { domain: [-1, 9] },
  tip: {
    renderer: function() {}
  },
  grid: true,
  data: [
    {
      fn: "x^3",
    //   derivative: {
    //     fn: "2 * x",
    //     updateOnMouseMove: true
    //   }
    },
    {
        points: [
          [1, 1],
          [2, 1],
          [2, 2],
          [1, 2],
          [1, 1]
        ],
        fnType: 'points',
        graphType: 'scatter'
      }
    // {
        // fnType: "implicit",
        // color: "green",
        // fn: "x = 3 + 0*y"
        // fnType: "points",
        // color: "red",
        // points: "0,1"
    // },
  ],
});

var grafico = new Grafico();
document.getElementById("btn").addEventListener("click" , grafico.draw_graph);
