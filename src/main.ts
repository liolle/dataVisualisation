import { getTabData, insertDiv,transformTable,insertDisplay,setUpSVG,setUpSVG2,addSwitch,tab1_innerhtml } from "./util";

import * as d3 from "d3";


const table1 =document.querySelector("#table1") as HTMLTableElement
const table2 =document.querySelector("#table2") as HTMLTableElement


const extracted_table1 = getTabData(table1)
const extracted_table2 = getTabData(table2,1)


//table0

// table1


insertDiv(table1,{id:"tab1",width:`${table1.offsetWidth}px`,
height:"500px",style:`
border-radius: 5px; flex`,innerHtml:tab1_innerhtml})

const tab1_sh_btn = document.querySelector("#tab1_sh_btn") as HTMLButtonElement
const tab2_sh_btn = document.querySelector("#tab2_sh_btn") as HTMLButtonElement
const tab1_pannel = document.querySelector("#tab1_pannel") as HTMLElement
const svg_cont1 = document.querySelector("#tab1_canvas") as HTMLDivElement
const svg_cont2 = document.querySelector("#tab2_canvas") as HTMLDivElement


//table2




let t_table = transformTable(extracted_table1)

let options = {
    margin:{top: 10, right: 5, bottom: 5, left: 35},
    width : svg_cont1.offsetWidth ,
    height : 500 ,
    color: "black",
    min_date : "2002",
    max_date : "2012"
}

let canvas = setUpSVG("tab1_canvas",options)

for (let index = 0; index < t_table.length; index++) {
    insertDisplay(canvas,t_table[index],options)
    addSwitch(t_table[index].row_title,tab1_pannel)
}


// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]).padding(0.1);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#tab2_canvas").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let  dataset1 = [
    {name: "item1", value: 20},
    {name: "item2", value: 40},
    {name: "item3", value: 60},
    {name: "item4", value: 80},
    {name: "item5", value: 100}
  ];
  
  let dataset2 = [
    {name: "box1", value: 300},
    {name: "box2", value: 85},
    {name: "box3", value: 100},
    {name: "box4", value: 150},
    {name: "box5", value: 220}
  ];
  
  // Scale the range of the data in the domains
  x.domain([0, d3.max(dataset1, function(d) { return d.value; }) as number])
  y.domain(dataset1.map(function(d) { return d.name; }));
  
  // append the rectangles for the bar chart
  var bars = svg.selectAll(".bar")
      .data(dataset1)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("y", (d) => { return y(d.name); })
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", function(d) { return x(d.value); });
  
  // add the x Axis
  svg.append("g")
  .attr("id","x_bar")
      .call(d3.axisTop(x));
  
  // add the y Axis
  svg.append("g")
  .attr("id","y_bar")
      .call(d3.axisLeft(y));
  
  // function to update the chart
  function updateChart(data:{name:string,value:number}[]) {
    x.domain([0, d3.max(data, function(d) { return d.value; }) as number] );
    y.domain(data.map(function(d) { return d.name; }));
  
    var bars = svg.selectAll(".bar")
      .data(data);
  
    // transition the bars
    bars.transition()
      .duration(1000)
      .attr("y", (d)=> { return y(d.name); })
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", function(d) { return x(d.value); });
  
    // update the x and y axis
    svg.select("#x_bar")
      .transition()
      .duration(1000)
      .call(d3.axisTop(x));
  
    svg.select("#y_bar")
      .transition()
      .duration(1000)
      .call(d3.axisLeft(y));
  }

  let tab2_date1 = document.querySelector("#tab2_date1") as HTMLElement
  let tab2_date2 = document.querySelector("#tab2_date2") as HTMLElement

  console.log(extracted_table2)

  tab2_date1.addEventListener("click",()=>{
    updateChart(dataset1)
  })

  tab2_date2.addEventListener("click",()=>{
    updateChart(dataset2)
  })

/*

Listeners

*/

tab1_sh_btn.addEventListener("click",()=>{
    let chart = document.querySelector("#tab1_top") as HTMLDivElement

    switch (getComputedStyle(chart, null).display) {
        case "none":
            chart.style.display = "flex"
            tab1_sh_btn.innerText = "Hide"
            break;
        case "flex":
            chart.style.display = "none"
            tab1_sh_btn.innerText = "Show"
            break;
        default:
            break;
    }


    
})

tab2_sh_btn.addEventListener("click",()=>{
    let chart = document.querySelector("#tab2_top") as HTMLDivElement

    switch (getComputedStyle(chart, null).display) {
        case "none":
            chart.style.display = "flex"
            tab1_sh_btn.innerText = "Hide"
            break;
        case "flex":
            chart.style.display = "none"
            tab1_sh_btn.innerText = "Show"
            break;
        default:
            break;
    }


    
})