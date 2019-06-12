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
         var xMin = parseInt(document.getElementById("a").value);
         var xMax = parseInt(document.getElementById("b").value);

        instance.options.data[0].range[0] = xMin;
        instance.options.data[0].range[1] = xMax;
        if (document.getElementById("fx").value !== ""){
            instance.options.data[0].fn = document.getElementById("fx").value;
        }
        instance.draw();

        
    }

    genRandomPoints = function(){
      var xMin = parseInt(document.getElementById("a").value);
      var xMax = parseInt(document.getElementById("b").value);

      var yMax = this.getMax;
      var yMin = this.getMin;
      console.log('y max: ' + yMax);
      console.log('y min: ' + yMin);


      var shots = parseInt(document.getElementById("shots").value);

      instance.options.data[1].fnType = 'points';
      instance.options.data[1].graphType = 'scatter';

      for(var shot = 0; shot <= shots; shot ++){

        var xPoint = Math.random() * (+xMax - +xMin) + +xMin;
        var yPoint = Math.random() * (+yMax - +yMin) + +yMin;

        instance.options.data[1].points.push([xPoint,yPoint]); 
        console.log('x: ' + xPoint  + 'y: ' + yPoint);
      }

    }
    
    getMax = function(){
      var xMin = parseInt(document.getElementById("a").value);
      var xMax = parseInt(document.getElementById("b").value);     
      var yMax = 0;

      for(var i = 1; i <= xMax; i ++){

        var xToEvaluate = Math.random() * (+xMax - +xMin) + +xMin;
  
        var datum = instance.options.data[0]
        var scope = {
          x: xToEvaluate
        }
        console.log('evaluated: ' + xToEvaluate + 'result: ' + functionPlot.eval.builtIn(datum,'fn',scope))

        if(yMax < functionPlot.eval.builtIn(datum,'fn',scope)){
          yMax = functionPlot.eval.builtIn(datum,'fn',scope)
        }

      }
      console.log('Max found: ' + yMax);
      console.log('New max: ' + yMax * 1.20);
      return yMax;

    }
    
    getMin = function(){
      var xMin = parseInt(document.getElementById("a").value);
      var xMax = parseInt(document.getElementById("b").value);     
      // var shots = parseInt(document.getElementById("shots").value);
      var yMin = 0;

      for(var i = 1; i <= xMax; i ++){

        var xToEvaluate = Math.random() * (+xMax - +xMin) + +xMin;
  
        var datum = instance.options.data[0]
        var scope = {
          x: xToEvaluate
        }
        console.log('evaluated: ' + xToEvaluate + 'result: ' + functionPlot.eval.builtIn(datum,'fn',scope))

        if(yMin > functionPlot.eval.builtIn(datum,'fn',scope)){
          yMin = functionPlot.eval.builtIn(datum,'fn',scope)
        }

      }
      console.log('Min found: ' + yMin);
      console.log('New Min: ' + yMin * 1.20);

    
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
      range: [-10,10]
    //   derivative: {
    //     fn: "2 * x",
    //     updateOnMouseMove: true
    //   }
    },
    {
        points: [
          // [1, 1],
          // [2, 1],
          // [2, 2],
          // [1, 2],
          // [1, 1]
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
document.getElementById("btn").addEventListener("click" , grafico.genRandomPoints);
document.getElementById("btn").addEventListener("click" , grafico.draw_graph);

document.getElementById("btn").addEventListener("click" , grafico.getMax);
