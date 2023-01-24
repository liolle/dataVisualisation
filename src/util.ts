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
},
    row:Row,
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
    min_date: string,
    max_date: string,
}):{
    svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    x_scale:d3.ScaleLinear<number, number, never>,
    y_scale: d3.ScaleBand<string>
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

// // Add X axis
// let x = d3.scaleLinear()
// .domain([50,400])
// .range([ 0, width ]);


// // Add Y axis
// var y = d3.scaleLinear()
// .domain([30,0])
// .range([ height, 0 ]);


// Initialize the X axis
let x = d3.scaleLinear()
.domain([0, d3.max([4, 8, 15, 16, 23, 42]) as number])
.range([0, width])

// Initialize the Y axis
let y =d3.scaleBand()
.domain(d3.range(6))
.range([0, 20 * 6])



svg.append("g")
.call(d3.axisTop(x));

svg.append("g")
.call(d3.axisLeft(y));




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

