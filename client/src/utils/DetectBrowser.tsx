type Browser = "Safari"|"Chrome"|"FireFox"|"Opera"|"Edge"|"Unknown"



export const specifyBrowser = ():Browser => {
    const userAgentData = navigator.userAgentData
    if(userAgentData) {
        const filter = (brand: NavigatorUABrandVersion) =>{
            return (/Chrome/.test(brand.brand) ||
            /Edge/.test(brand.brand) ||
            /Opera/.test(brand.brand)
            )
        } 
        const results = userAgentData.brands.filter(filter)
        if(results.length === 0) return "Unknown"
        else {
            if(/Chrome/.test(results[0].brand)) return "Chrome"
            else if(/Edge/.test(results[0].brand)) return "Edge"
            else return "Opera"
        }
        
        
    }
    else {
        //Detecting Safari
        if(/\bSafari/i.test(navigator.userAgent)) return "Safari"
        //Detecting Chrome
        else if(/\bChrome/i.test(navigator.userAgent)) return "Chrome"
        //Detecting FireFox
        else if(/\bFirefox/i.test(navigator.userAgent)) return "FireFox"
        //Detecting Opera
        else if(/\bOpr/i.test(navigator.userAgent)) return "Opera"
        //Detecting Edge
        else if(/\bEdg/i.test(navigator.userAgent)) return "Edge"

        return "Unknown"
    }
}


// export const isUserBrowserSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
// export isUserBrowserSafari;