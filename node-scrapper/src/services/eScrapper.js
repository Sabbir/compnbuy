const fs = require('fs')

const cheerio = require('cheerio')

//const sc = require("./scrapedBooks.json")
const { json } = require('body-parser')

const got = require('got');


const dAPI = 'https://www.daraz.com.bd/catalog/?q='
const sAPI = 'https://www.smartbd.com/catalogsearch/result/?q='
const cApi = 'https://www.computervillage.com.bd/search?q='
const fApi = 'https://www.globalbrand.com.bd/index.php?route=product/search&search='

const scrapperScript = async (pr) => {
    try {
        let daAPI = dAPI + pr
        let stAPI = sAPI + pr
        let cvAPI = cApi + pr 
        let foAPI = fApi + pr

        pr = pr.toLowerCase()
        
         
        


      const scrapedDataD = []
      const scrapedDataT = []
      const scrapedDataC = []
      const scrapedDataF = []
      const js = []
      
      try{
        let res = await got(daAPI).text()
       // console.log(res)
         
        
         
            
              // writing the response to a file named data.html
              $ = cheerio.load(res) 
              var te = $("head > script")
              
              
              
              const DataBooks = te[3].lastChild.data.replace("window.pageData=","")
            
              let l = JSON.parse(DataBooks)
              let lItem = l.mods.listItems 
              
              lItem.forEach(elem => {
          
                const scrapItemD = { title: '', price: '', url: '', img: ''}
                scrapItemD.title = elem.name
                scrapItemD.price = "BDT "+elem.price
                scrapItemD.url = elem.productUrl
                scrapItemD.img = elem.image
                scrapedDataD.push(scrapItemD)
      
              })
                      
      }
      catch(er){
        console.log(er)
        const scrapItemD = { title: "Something Wrong, please try again", price: 'ERROR', url: '', img: ''}
        scrapedDataD.push(scrapItemD)
        
      }  
      js.push({name:'Daraz',p: scrapedDataD })
      
      //techlandBD
      try{
        let res = await got(stAPI).text()
        console.log(stAPI)
        
        
         
            
              // writing the response to a file named data.html
              $ = cheerio.load(res) 
              var te = $("div > .products")

              console.log(te)
              
              
              
              te.each(el=>{
                console.log(el) 
                const scrapItemS = { title: '', price: '', url: '', img: ''}
                 
                let t = $(te[el]).find('a img').attr('alt')
                let u = $(te[el]).find('a').attr('href')
                let p = $(te[el]).siblings("div > .price-box").find(".price").text()
                let img = $(te[el]).find("a img").attr("src")

                p = p.replace('৳',' Tk')
                scrapItemS.title = t
                scrapItemS.price = p
                scrapItemS.url = u
                scrapItemS.img = img 
      
                console.log(u)
                scrapedDataT.push(scrapItemS)
                
                
               }
              )        
      }
      catch(er){
        console.log(er)
        const scrapItemS = { title: "Something Wrong, please try again", price:'0.00', url: '', img: ''}
        scrapedDataT.push(scrapItemS)
        
      }  
      js.push({name:'SmartBD',p: scrapedDataT })

      //computervillage
      try{
        let res = await got(cvAPI).text()
       // console.log(res)
         
        
         
            
              // writing the response to a file named data.html
              $ = cheerio.load(res) 
              var te = $("div > .grid-view-item")
              
              
              
              te.each(el=>{
                
                const scrapItemC = { title: '', price: '', url: '', img: ''}
                 
                let t = $(te[el]).find('a img').attr('alt')
                let u = $(te[el]).find('a').attr('href')
                let p = $(te[el]).find(".money").text()
                let img = $(te[el]).find("a").children("img").attr("data-src")
                

                p = p.replace('৳','Tk ')
                scrapItemC.title = t
                scrapItemC.price = p
                scrapItemC.url = u
                scrapItemC.img = img 
      
      
                scrapedDataC.push(scrapItemC)
                
                
               }
              )        
      }
      catch(er){
        console.log(er)
        const scrapItemC = { title: "Something Wrong, please try again", price: 'ERROR', url: '', img: ''}
        scrapedDataC.push(scrapItemC)
        
      }  
      js.push({name:'ComputerVillage',p: scrapedDataC })

      //GlobalBrand
      try{
        let res = await got(foAPI).text()
       // console.log(res)
         
        
         
            
              // writing the response to a file named data.html
              $ = cheerio.load(res) 
              var te = $("div > .product-layout")
              
              te.each(el=>{
                const scrapItemF = { title: '', price: '', url: '', img: ''}
                 
                let t = $(te[el]).find('a img').attr('alt')
                let u = $(te[el]).find('a').attr('href')
                let p = $(te[el]).find(".price").text()
                let img = $(te[el]).find("a img").attr("src")
                
                p = p.replace('৳','Tk ')
                scrapItemF.title = t
                scrapItemF.price = p
                scrapItemF.url = u
                scrapItemF.img = img 
      
      
                scrapedDataF.push(scrapItemF)
                
                
               }
              )        
      }
      catch(er){
        console.log(er)
        const scrapItemF = { title: "Something Wrong, please try again", price: 'ERROR', url: '', img: ''}
        scrapedDataF.push(scrapItemF)
        
      }  
      js.push({name:'Globalbrand',p: scrapedDataF})


      return JSON.stringify(js, null, 2)

    }
    catch (error) {
        console.error(error)
        
      }
}


const getAlleProducts = (pr) => {
    return scrapperScript(pr).then((e)=> {
        //the promise is resolved here
        
        return e
      }).catch(console.error.bind(console))
  }
module.exports = {                    
    getAlleProducts,
}