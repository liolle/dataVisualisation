import { getTabData, insertDiv,transformTable,insertDisplay,setUpSVG,addSwitch } from "./util";

import * as d3 from "d3";


const table1 =document.querySelector("#table1") as HTMLTableElement
const table2 =document.querySelector("#table2") as HTMLTableElement
const tab1_sh_btn = document.querySelector("#tab1_sh_btn") as HTMLButtonElement
const tab1_pannel = document.querySelector("#tab1_pannel") as HTMLElement
const svg_cont1 = document.querySelector("#tab1_canvas") as HTMLDivElement


const extracted_table1 = getTabData(table1)
const extracted_table2 = getTabData(table2,1)


insertDiv(table1,{id:"t1ChartDiv",width:`${table1.offsetWidth}px`,
height:"300px",style:`background-color: cornflowerblue;
border-radius: 5px;`})

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