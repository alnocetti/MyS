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
        
        instance.options.data[1].points = [];
        instance.options.data[2].points = [];
   
        if (document.getElementById("fx").value !== ""){
            instance.options.data[0].fn = document.getElementById("fx").value;
        }
        var xMin = parseInt(document.getElementById("a").value);
        var xMax = parseInt(document.getElementById("b").value);
        var yMax = getMax();
        var yMin = getMin();
        var area = (xMax - xMin) * (yMax - yMin);
        var points = genRandomPoints(xMin, xMax, yMin, yMax);
        var greenPoints = points[0];
        var redPoints = points[1];

        var result = area * (greenPoints / (greenPoints + redPoints));
        document.getElementById("result").value = result;
        console.log('Result: ' + result);
        console.log('yMin: ' + yMin + '  yMax: ' + yMax);
        instance.options.data[0].range[0] = xMin;
        instance.options.data[0].range[1] = xMax;

        instance.draw();
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
        points: [],
        fnType: 'points',
        color: 'green',
        graphType: 'scatter'
    },
    {
        points: [],
        fnType: 'points',
        color: 'red',
        graphType: 'scatter'
    }
  ],
});

function getMax(){
    var xMin = parseInt(document.getElementById("a").value);
    var xMax = parseInt(document.getElementById("b").value);     
    var yMax = 0;

    for(var i = xMin; i <= xMax; i ++){

      var xToEvaluate = i;

      var datum = instance.options.data[0]
      var scope = {
        x: xToEvaluate
      }

      if(yMax < functionPlot.eval.builtIn(datum,'fn',scope)){
        yMax = functionPlot.eval.builtIn(datum,'fn',scope)
      }
    }
    return yMax;
  }

  function getMin(){
    var xMin = parseInt(document.getElementById("a").value);
    var xMax = parseInt(document.getElementById("b").value);     
    var yMin = 0;

    for(var i = xMin; i <= xMax; i ++){

      var xToEvaluate = i;

      var datum = instance.options.data[0]
      var scope = {
        x: xToEvaluate
      }

      if(yMin > functionPlot.eval.builtIn(datum,'fn',scope)){
        yMin = functionPlot.eval.builtIn(datum,'fn',scope)
      }

    }
    return yMin;
  }

    function genRandomPoints (xMin, xMax, yMin, yMax){

      var shots = parseInt(document.getElementById("shots").value);
      var result = [0,0];
      instance.options.data[1].fnType = 'points';
      instance.options.data[1].graphType = 'scatter';

      for(var shot = 0; shot < shots; shot ++){

        var xPoint = Math.random() * (+xMax - +xMin) + +xMin;
        var yPoint = Math.random() * (+yMax - +yMin) + +yMin;
        var image = functionPlot.eval.builtIn(instance.options.data[0],'fn',{x: xPoint})

        if ((yPoint < image && yPoint > 0) || (yPoint > image && yPoint < 0)) {
            instance.options.data[1].points.push([xPoint,yPoint]); 
            if (yPoint > 0){
                result[0] = result[0] + 1;
            }else{
                result[0] = result[0] - 1;
            }
        }else{
            instance.options.data[2].points.push([xPoint,yPoint]); 
            result[1] = result[1] + 1;
        }
      }
      return result;

    }

 var grafico = new Grafico();
document.getElementById("btn").addEventListener("click" , grafico.draw_graph);
