import { getTabData, insertDiv } from "./util";

import * as d3 from "d3";


const table1 =document.querySelector("#table1") as HTMLTableElement
const table2 =document.querySelector("#table2") as HTMLTableElement


const extracted_table1 = getTabData(table1)
const extracted_table2 = getTabData(table2,1)

insertDiv(table1,{id:"t1ChartDiv",width:`${table1.offsetWidth}px`,
height:"300px",style:`background-color: cornflowerblue;
border-radius: 5px;`})