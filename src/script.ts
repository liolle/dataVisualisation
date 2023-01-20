import { getTabData } from "./util";


//referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);

const table1 =document.querySelector("#table1") as HTMLTableElement
const table2 =document.querySelector("#table2") as HTMLTableElement


if (table1 != null) {
    
    console.log(getTabData(table1))
    console.log(getTabData(table2,1))
}
