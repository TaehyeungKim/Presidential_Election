export const dataProcess = (data: any)=> {
    for(let elm in data) {
        let obj = data[elm]
        for(let key in obj) {
            if(typeof obj[key] === "string") {
                let numStr = obj[key] as string
                let sa = numStr.split("\n")[0].split(",")
                var str = sa[0]
                if(sa.length >= 2) {
                    for(let i = 1; i < sa.length; i++) {
                        str = str.concat(sa[i])
                    }
                }
                let num = Number(str)
                if(elm !== "시도명" && elm !== "구시군명") {
                    obj[key] = num
                }
            }
        }
        data[elm] = obj
    }
}

export default dataProcess;