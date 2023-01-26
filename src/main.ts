import { getTabData, insertDiv,transformTable,insertDisplay,
  insertBars,setUpSVG,setUpSVG2,addSwitch,tab1_innerhtml,
  sortRow,getMax, updateBars,LiveGraph,tab2_innerhtml,setUpSVG0, tab0_innerhtml } from "./util";



const table0 =document.querySelector("#mw-content-text") as HTMLTableElement
const table1 =document.querySelector("#table1") as HTMLTableElement
const table2 =document.querySelector("#table2") as HTMLTableElement

const extracted_table1 = getTabData(table1)
const extracted_table2 = getTabData(table2,1)


//table0

// table1


insertDiv(table1,{id:"tab1",width:`${table1.offsetWidth}px`,
height:"500px",style:`
border-radius: 5px; flex`,innerHtml:tab1_innerhtml})

insertDiv(table2,{id:"tab2",width:`${table2.offsetWidth}px`,
height:"900px",style:`
w-full flex flex-col`,innerHtml:tab2_innerhtml})

insertDiv(table0,{id:"tab0",width:`${table2.offsetWidth}px`,
height:"500px",style:`
w-full flex flex-row justify-end`,innerHtml:tab0_innerhtml})

const tab1_sh_btn = document.querySelector("#tab1_sh_btn") as HTMLButtonElement
const tab1_pannel = document.querySelector("#tab1_pannel") as HTMLElement
const tab2_sh_btn = document.querySelector("#tab2_sh_btn") as HTMLButtonElement
const tab0_sh_btn = document.querySelector("#tab0_sh_btn") as HTMLButtonElement
const tab0_start_btn = document.querySelector("#tab0_start_btn") as HTMLButtonElement
const svg_cont1 = document.querySelector("#tab1_canvas") as HTMLDivElement
const svg_cont2 = document.querySelector("#tab2_canvas") as HTMLDivElement
const svg_cont0 = document.querySelector("#tab2_canvas") as HTMLDivElement


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
    insertDisplay(canvas,t_table[index])
    addSwitch(t_table[index].row_title,tab1_pannel)
}

let options2 = {
  margin:{top: 30, right: 5, bottom: 5, left: 100},
  width : svg_cont2.offsetWidth ,
  height : 800 ,
}

let t_table2 =transformTable(extracted_table2)

sortRow(t_table2,0,"order")
let dataset1 = [...t_table2]
let max_dataset1 = getMax(dataset1,0)

sortRow(t_table2,1,"order")
let dataset2 = [...t_table2]
let max_dataset2 = getMax(dataset1,1)

let canvas2 = setUpSVG2("tab2_canvas",options2)
insertBars(canvas2,dataset1,max_dataset1)



let options0 = {
    margin:{top: 10, right: 5, bottom: 5, left: 25},
    width : svg_cont0.offsetWidth ,
    height : 600 ,
}


let canvas0 = setUpSVG0("tab0_canvas",options0)
let chart0 = new LiveGraph(1000,canvas0)


/*

Listeners

*/

let tab2_date1 = document.querySelector("#tab2_date1") as HTMLElement
let tab2_date2 = document.querySelector("#tab2_date2") as HTMLElement

tab2_date1.style.backgroundColor = "#d1d5db"
tab2_date1.style.color = "#1d4ed8"

tab2_date1.addEventListener("click",()=>{
  
  updateBars(canvas2,dataset1,0,max_dataset1)
  tab2_date2.style.backgroundColor = "white"
  tab2_date2.style.color = "black"
  tab2_date1.style.backgroundColor = "#d1d5db"
  tab2_date1.style.color = "#1d4ed8"
})

tab2_date2.addEventListener("click",()=>{
  updateBars(canvas2,dataset2,1,max_dataset2)
  tab2_date1.style.backgroundColor = "white"
  tab2_date1.style.color = "black"
  tab2_date2.style.backgroundColor = "#d1d5db"
  tab2_date2.style.color = "#1d4ed8"
})

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
            tab2_sh_btn.innerText = "Hide"
            break;
        case "flex":
            chart.style.display = "none"
            tab2_sh_btn.innerText = "Show"
            break;
        default:
            break;
    }


    
})

tab0_sh_btn.addEventListener("click",()=>{
    let chart = document.querySelector("#tab0_top") as HTMLDivElement

    switch (getComputedStyle(chart, null).display) {
        case "none":
            chart.style.display = "flex"
            tab0_sh_btn.innerText = "Hide"
            break;
        case "flex":
            chart.style.display = "none"
            tab0_sh_btn.innerText = "Show"
            break;
        default:
            break;
    }


    
})

tab0_start_btn.addEventListener("click",()=>{

    if (tab0_start_btn.innerText == "Start"){
        chart0.start()
        tab0_start_btn.innerText = "Stop"
    }
    else{
        chart0.stop()
        tab0_start_btn.innerText = "Start"

    }
    
})