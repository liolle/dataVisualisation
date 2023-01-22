
/*

Data retrieval

*/

export const getTabData = (tab:HTMLTableElement,type=0):Table=>{

    let rows:Row[] = []
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


type Row = {
    row_title: string,
    table : string[]
}

export type Table = {
    col_title:string[],
    rows: Row[]
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

const extractFromRow = (row: HTMLTableRowElement):Row =>{
    
    let table: string[] = []
    let row_title = ""
    let elem =row.querySelectorAll("td")
    
    if (elem ){
        for (let i = 0; i < elem.length; i++) {
            if(elem[i]){
                if (!i){
                    row_title = elem[i].innerText
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



/*

Graph building

*/



export const insertDiv = (sibling: HTMLElement,
    options:{id: string
    ,width:string,height:string,style:string})=>{
        if(!sibling) return
        
        let newDiv = document.createElement("div")
        newDiv.id = options.id
        newDiv.setAttribute("style",options.style)
        newDiv.setAttribute("width",options.width) 
        newDiv.setAttribute("height",options.height)

        if (sibling.parentNode){
            sibling.parentNode.insertBefore(newDiv,sibling)
        }
        else{
            sibling.appendChild(newDiv)
        }
    }


