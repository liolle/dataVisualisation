import * as d3 from "d3";
import { now } from "d3";

export const COUNTRY_COLORS = {
    "Belgium": "#1E90FF",
    "Bulgaria": "#00BFFF",
    "Czech_Republic": "#00FF7F",
    "Denmark": "#3CB371",
    "Germany": "#1f911f",
    "Estonia": "#006400",
    "Ireland": "#8B0000",
    "Greece": "#B22222",
    "Spain": "#DC143C",
    "France": "#8B008B",
    "Croatia": "#663399",
    "Italy": "#4B0082",
    "Cyprus": "#000000",
    "Latvia": "#FFFF00",
    "Lithuania": "#9ACD32",
    "Luxembourg": "#6B8E23",
    "Hungary": "#FFA500",
    "Malta": "#FFD700",
    "The_Netherlands": "#70701d",
    "Austria": "#87CEEB",
    "Poland": "#00CED1",
    "Portugal": "#40E0D0",
    "Romania": "#48D1CC",
    "Slovenia": "#20B2AA",
    "Slovakia": "#5F9EA0",
    "Finland": "#00FFFF",
    "Sweden": "#00FF00",
    "Iceland": "#7FFF00",
    "Liechtenstein": "#7CFC00",
    "Norway": "#ADFF2F",
    "Switzerland": "#90EE90",
    "Montenegro": "#98FB98",
    "Macedonia": "#8FBC8F",
    "Serbia": "#3CB371",
    "Turkey": "#2E8B57"
};
    
    
export const tab1_innerhtml = 

`
<div id="tab1_top" class=" flex flex-col  flex-[1_1_90%] rounded-md ">
    <div class=" flex flex-row p-1">
        <div id="tab1_canvas" class=" flex-[1_1_70%] " >

        </div>
        <div id="tab1_pannel" class=" flex-[1_1_30%] p-1 flex flex-col max-h-[500px] overflow-y-scroll">



        </div>
    </div>
</div>
<div class="flex-[1_1_10%] p-2 flex items-center ">
    <button id="tab1_sh_btn" type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-bold
    text-gray-900 focus:outline-none rounded-lg border-2 w-[10%]
    border-gray-900 hover:bg-gray-300 hover:text-blue-700 ">
    Hide
    </button>
</div>
`

export const tab2_innerhtml = 

`
<div id="tab2_top" class=" flex flex-col w-full  flex-[1_1_90%] rounded-md">

    <div id="tab2_dates" class=" flex-[1_1_10%]  flex flex-row justify-center gap-10 items-center">
    <button id="tab2_date1" type="button" class="py-2.5 px-5 text-2xl font-bold
    text-gray-900 focus:outline-none rounded-lg border-2 w-[20%]
    border-gray-900 hover:bg-gray-300 hover:text-blue-700 ">
    2007-09
    </button>

    <button id="tab2_date2" type="button" class="py-2.5 px-5 mr-2 mb-2 text-2xl font-bold
    text-gray-900 focus:outline-none rounded-lg border-2 w-[20%]
    border-gray-900 hover:bg-gray-300 hover:text-blue-700 ">
    2010-12
    </button>
    </div>

    <div id="tab2_canvas" class=" flex-[1_1_90%] ">

    </div>

    </div>
    <div class=" flex-[1_1_10%]  p-2 flex items-center">

    <button id="tab2_sh_btn" type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-bold
    text-gray-900 focus:outline-none rounded-lg border-2 w-[10%]
    border-gray-900 hover:bg-gray-300 hover:text-blue-700 ">
    Hide
    </button>

</div>
`

export const tab0_innerhtml = 

`
    <div id="tab0_top" class=" flex flex-col w-full  flex-[1_1_90%] rounded-md">

    <div id="tab0_canvas" class=" flex-[1_1_90%] ">

    </div>

    </div>
    <div class=" flex-[1_1_10%]  p-2 flex items-center">

    <button id="tab0_sh_btn" type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-bold
    text-gray-900 focus:outline-none rounded-lg border-2 w-[10%]
    border-gray-900 hover:bg-gray-300 hover:text-blue-700 ">
    Hide
    </button>

    <button id="tab0_start_btn" type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-bold
    text-gray-900 focus:outline-none rounded-lg border-2 w-[10%]
    border-gray-900 hover:bg-gray-300 hover:text-blue-700 ">
    Start
    </button>

    </div>
`

/*

Data retrieval

*/

export const getTabData = (tab:HTMLTableElement,type=0):Table=>{

    let rows:Row_raw[] = []
    let trs = tab.querySelectorAll("tr")
    
    trs.forEach(element=>{
        let row = extractFromRow(element)
        if(row.table.length) rows.push(row)
    })

    return {
        col_title:extractColTitle(tab,type),
        rows : rows
    }
}


type Row_raw = {
    row_title: string,
    table : string[]
}

export type Table = {
    col_title:string[],
    rows: Row_raw[]
}

export type Row = {
    row_title:string,
    row_data:[string,number][]
}


const extractColTitle = (tab:HTMLTableElement,type=0):string[]=>{

    let titles:string[] = []
    let titles_row = undefined

    switch (type) {
        case 0:
            let body = tab.querySelector("tbody")
            if (body){
                let tr = body.querySelector("tr") 
                if (tr)titles_row = tr
            }
            break;
    
        case 1:
            let tr = tab.querySelector("tr") 
            if (tr)titles_row = tr
            break;    

        default:
            break;
    }

    if (titles_row != undefined) {
        let tds = titles_row.querySelectorAll("th")
        
        for (let i = 2; i < tds.length; i++) {
            titles.push(tds[i].innerText)
        }
    }
   
    return titles;
}

const extractFromRow = (row: HTMLTableRowElement):Row_raw =>{
    
    let table: string[] = []
    let row_title = ""
    let elem =row.querySelectorAll("td")
    
    if (elem ){
        for (let i = 0; i < elem.length; i++) {
            if(elem[i]){
                if (!i){
                    row_title = cleanTitle((elem[i]).innerText)
                    continue
                }
                table.push(elem[i].innerText)
            }
        }
    }

    return {
        row_title: row_title,
        table:table
    }
}

const transformRow = (row:Row_raw,years:string[]):Row=>{
    let res:[string,number][] = []   

    for (let i = 0; i < years.length; i++) {
        let y = parseInt(row.table[i])
        if (!isNaN(y))res.push([years[i],y])
        
    }
    return {
        row_title:row.row_title,
        row_data: res
    };
}

export const transformTable = (table:Table):Row[] =>{
    let res:Row[] = []

    for (let i = 0; i < table.rows.length; i++) {
        let row_t:Row = transformRow(table.rows[i],table.col_title)
        res.push(row_t)
    }
    return res
}

const cleanTitle = (title:string):string =>{

    let sourceName = title.split('(')[0]

    let outputNane = ""

    for (let i = 0; i < sourceName.length; i++) {
        outputNane += sourceName[i] == ' '?'_':sourceName[i]
        
    }

    return outputNane
}


/*

Graph building

*/

export class LiveGraph {

    data:[number,number][] =[]
    timeout
    inter: number = NaN
    canvas
    graph
    x_axe_start
    x_axe_end
    initial_scale
    running = false

    constructor(timeout:number,canvas:{
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
        x_scale: d3.ScaleLinear<number, number, never>;
        y_scale: d3.ScaleLinear<number, number, never>; 
    }) {
        this.timeout = timeout
        this.canvas = canvas

        this.graph = this.canvas.svg
        .append("g")
        .append("path")
        .datum(this.data)
        
        this.x_axe_start = 0
        this.x_axe_end = 1
        this.initial_scale = canvas.x_scale(-1)

    }


    async #updateGraph (canvas:{
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
        x_scale: d3.ScaleLinear<number, number, never>;
        y_scale: d3.ScaleLinear<number, number, never>; 
    },data:[number,number][],x_axe_start:number) {

        if(this.x_axe_end>=data.length){

            try {
                let res = await fetch("https://canvasjs.com/services/data/datapoints.php")
                if (!res.ok) return
    
                let fetched_data:[number,number][] = await res.json()
    
                fetched_data.forEach(elem=>{
                    this.data.push([this.x_axe_start,elem[1]])
                    this.x_axe_start++
                })
    
                // let c_p = 2
                // let c_p1 = 1
    
            } catch (err) {
                console.error(err)
    
            }
        }


        this.canvas.x_scale.domain([0, this.x_axe_end] );
        
        this.canvas.svg.select("#x_axes0")
        .transition()
        .call(d3.axisBottom(this.canvas.x_scale));
        
        this.x_axe_end++

        this.graph
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .transition()
        .attr("d", d3.line()
        .x((d)=>canvas.x_scale(d[0]))
        .y((d)=>canvas.y_scale(d[1]))
        )
        .attr("transform", null)

    }


    start(state=true) {
        if (!state && !this.running) return

        this.running = true
        this.#updateGraph(this.canvas,this.data,this.x_axe_start)
        setTimeout(() => {
            this.start(false)
        }, this.timeout);
        
        
    }

    stop() {
        this.running = false
    }

}



export const insertDiv = (sibling: HTMLElement,
    options:{id: string
    ,width:string,height:string,style:string,innerHtml:string})=>{
        if(!sibling) return
        
        let newDiv = document.createElement("div")
        newDiv.id = options.id
        newDiv.setAttribute("style",options.style)
        newDiv.setAttribute("width",options.width) 
        newDiv.setAttribute("height",options.height)
        newDiv.innerHTML = options.innerHtml

        if (sibling.parentNode){
            sibling.parentNode.insertBefore(newDiv,sibling)
        }
        else{
            sibling.appendChild(newDiv)
        }
    }


export const insertDisplay = (svgInfo:{
    svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    x_scale:d3.ScaleTime<number, number, never>,
    y_scale: d3.ScaleLinear<number, number, never>
},row:Row,
    options:{
        margin:{top: number, right: number, bottom: number, left: number},
        width : number ,
        height : number
    })=>{


let date_parser =d3.timeParse("%Y")

// Add the line and points 
let graph = svgInfo.svg.append("g")
.attr("id",`p_${row.row_title}`)


// lines            
// Issues with the type of d3.line but work 
graph
.append("path")
.datum(row.row_data)
.attr("fill", "none")
.attr("stroke", COUNTRY_COLORS[row.row_title])
.attr("stroke-width", 1.5)
.attr("d", d3.line()
  .x((d)=>svgInfo.x_scale(date_parser(d[0]) as Date))
  .y((d)=>svgInfo.y_scale(d[1]))
);

//points
graph
.selectAll("whatever")
.data(row.row_data)
.enter()
.append("circle")
.style("fill", COUNTRY_COLORS[row.row_title])
.attr("cx", (d)=>svgInfo.x_scale(date_parser(d[0]) as Date))
.attr("cy", (d)=>svgInfo.y_scale(d[1]))
.attr("r", 3)

}

export const insertBars =(svgInfo:{
    svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    x_scale:d3.ScaleLinear<number, number, never>,
    y_scale: d3.ScaleBand<string>
},row:Row[],max_data:number)=>{

// Scale the range of the data in the domains
svgInfo.x_scale.domain([0, max_data ])
svgInfo.y_scale.domain(row.map(function(d) { return d.row_title; }));
  
// append the rectangles for the bar chart
svgInfo.svg.selectAll(".bar")
.data(row)
.enter().append("rect")
.attr("class", "bar")
.attr("y", (d) => { return svgInfo.y_scale(d.row_title); })
.attr("height",svgInfo.y_scale.bandwidth())
.attr("x", 0)
.attr("width", function(d) { return svgInfo.x_scale(d.row_data[0][1]); })
.attr("fill","#d1d5db");

// add the x Axis
svgInfo.svg.append("g")
.attr("id","x_bar")
.call(d3.axisTop(svgInfo.x_scale))
.selectAll("text")
.style("fill", "#1d4ed8");

// add the y Axis
svgInfo.svg.append("g")
.attr("id","y_bar")
.call(d3.axisLeft(svgInfo.y_scale))
.selectAll("text")
.style("fill", "#1d4ed8");
  
}

export const updateBars =(canvas:{
svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
x_scale:d3.ScaleLinear<number, number, never>,
y_scale: d3.ScaleBand<string>
},data:Row[],index=0,max_data:number) => {

canvas.x_scale.domain([0, max_data] );
canvas.y_scale.domain(data.map((d)=>{ return d.row_title; }));

var bars = canvas.svg.selectAll(".bar")
.data(data);

// transition the bars
bars.transition()
.duration(1000)
.attr("y", (d) => { return canvas.y_scale(d.row_title); } )
.attr("height", canvas.y_scale.bandwidth())
.attr("x", 0)
.attr("width", function(d) { return canvas.x_scale(d.row_data[index][1]); });

// update the x and y axis
canvas.svg.select("#x_bar")
.transition()
.duration(1000)
.call(d3.axisTop(canvas.x_scale));

canvas.svg.select("#y_bar")
.transition()
.duration(1000)
.call(d3.axisLeft(canvas.y_scale));
}


export const setUpSVG0 = (containerId:string,options:{
    margin:{top: number, right: number, bottom: number, left: number},
    width : number ,
    height : number 
}):{
    svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    x_scale:d3.ScaleLinear<number, number, never>,
    y_scale: d3.ScaleLinear<number, number, never>
 }=>{

    // set the dimensions and margins of the graph
let width = options.width - options.margin.right ,
height = options.height - options.margin.top - options.margin.bottom;

let svg = d3.select("#"+containerId)
.append("svg")
.attr("width", options.width + options.margin.left + options.margin.right)
.attr("height", options.height + options.margin.top + options.margin.bottom)
.append("g")
.attr("transform","translate(" + options.margin.left + "," + options.margin.top + ")");

// Add X axis
let x = d3.scaleLinear()
.domain([0,10])
.range([ 0, width ]);

svg.append("g")
.attr("transform", "translate(0," + height + ")")
.attr("id","x_axes0")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([0,30])
.range([ height, 0 ]);

svg.append("g")
.attr("id","y_axes0")
.call(d3.axisLeft(y))

    return {
        svg:svg,
        x_scale:x,
        y_scale:y
    }
}

export const setUpSVG = (containerId:string,options:{
    margin:{top: number, right: number, bottom: number, left: number},
    width : number ,
    height : number ,
    min_date: string,
    max_date: string,
}):{
    svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    x_scale:d3.ScaleTime<number, number, never>,
    y_scale: d3.ScaleLinear<number, number, never>
 }=>{

    // set the dimensions and margins of the graph
let width = options.width - options.margin.right ,
height = options.height - options.margin.top - options.margin.bottom;

let date_parser =d3.timeParse("%Y")

let svg = d3.select("#"+containerId)
.append("svg")
.attr("width", options.width + options.margin.left + options.margin.right)
.attr("height", options.height + options.margin.top + options.margin.bottom)
.append("g")
.attr("transform","translate(" + options.margin.left + "," + options.margin.top + ")");
    
let date_min = date_parser(options.min_date) as Date
let date_max = date_parser(options.max_date) as Date

// Add X axis
let x = d3.scaleTime()
.domain([date_min,date_max])
.range([ 0, width ]);

svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([-50,6800])
.range([ height, 0 ]);

svg.append("g")
.call(d3.axisLeft(y));




    return {
        svg:svg,
        x_scale:x,
        y_scale:y
    }
}

export const setUpSVG2 = (containerId:string,options:{
    margin:{top: number, right: number, bottom: number, left: number},
    width : number ,
    height : number ,
}):{
    svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    x_scale:d3.ScaleLinear<number, number, never>,
    y_scale: d3.ScaleBand<string>
 }=>{

// set the dimensions and margins of the graph
let width = options.width- options.margin.left - options.margin.right,
height = options.width - options.margin.top - options.margin.bottom;

// set the ranges
let x = d3.scaleLinear().range([0, width]);
let y = d3.scaleBand().range([height, 0]).padding(0.1);

// append the svg object to the body of the page
var svg = d3.select("#"+containerId)
.append("svg")
.attr("width", options.width + options.margin.left + options.margin.right)
.attr("height", options.height + options.margin.top + options.margin.bottom)
.append("g")
.attr("transform", "translate(" + options.margin.left + "," + options.margin.top + ")");

return {
    svg:svg,
    x_scale:x,
    y_scale:y
}
}


export const addSwitch = ( countryName: string,pannel : HTMLElement)=>{

    let container = document.createElement("div")
    container.setAttribute("class","flex justify-start m-2")
    container.innerHTML = 
    `
    <div class="form-check form-switch h-14 w-[100%] pl-2 flex flex-row items-center select-none">

    <input class="form-check-input appearance-none flex-[1_1_30%] rounded-full float-left h-8 
    align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer 
    shadow-sm" type="checkbox" role="switch" id="switch_${countryName}" checked>

    <label class="form-check-label text-black flex-[1_1_70%] ml-3 overflow-clip " for="switch_${countryName}">
    ${countryName}
    </label>

    </div>

    `
    pannel.appendChild(container)

    container.addEventListener("click",()=>{
        let country_switch = document.querySelector(`#switch_${countryName}`) as HTMLInputElement
        let line_gd3 = d3.select(`#p_${countryName}`)

        if (country_switch.checked){
            line_gd3.style("visibility", "visible");
        }
        else{
            line_gd3.style("visibility", "hidden");
        }
        

    })


}

export const transform2 = (table:Table)=>{
    
}

export const sortRow = (row:Row[],index=0,order:"order"|"reverse")=>{

    if(index >= row.length) return
    
    row.sort((a,b)=>{
        let left =a.row_data[index][1]
        let right =b.row_data[index][1]
        
        if(order == "order")return left-right
        return right-left
    })
    

} 

export const getMax = (row:Row[],index=0):number=>{
    if(index >= row.length) return NaN

    let current_max = Number.NEGATIVE_INFINITY

    row.forEach(element => {
        let num = element.row_data[index][1]
        current_max = current_max < num ? num:current_max
        
    });
    return current_max

}

