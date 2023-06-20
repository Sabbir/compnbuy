const fs = require('fs')

const cheerio = require('cheerio')

//const sc = require("./scrapedBooks.json")
const { json } = require('body-parser')

const got = require('got');


const dAPI = 'https://dailyshoppingbd.com/?match=all&subcats=Y&search_performed=Y&dispatch=products.search&q='
const bAPI = 'https://www.thebasketbd.com/catalogsearch/result/?q='
const cApi = 'https://www.computervillage.com.bd/search?q='
const fApi = 'https://www.globalbrand.com.bd/index.php?route=product/search&search='

const scrapperScript = async (pr) => {
    try {
        let dsAPI = dAPI + pr
         let baAPI = bAPI + pr
        // let cvAPI = cApi + pr 
        // let foAPI = fApi + pr

        const scrapedDataD = []
        const scrapedDataM = []
        // const scrapedDataB = []
        // const scrapedDataW = []
        const js = []

        pr = pr.toLowerCase()

        //dailyshopping
      try{
        let res = await got(dsAPI).text()
        console.log(dsAPI)
         
        
         
            
              // writing the response to a file named data.html
              $ = cheerio.load(res) 
       
              var te = $("div > .ty-column4")
              
              
              
              te.each(el=>{
               // console.log($(te[el]).html())
                const scrapItemD = { title: '', price: '', url: '', img: ''}
                let t = $(te[el]).find('.product-title').attr('title')
                let u = $(te[el]).find('a').attr('href')
                let p = $(te[el]).find(".ty-price").text()
                let img = $(te[el]).find("a").children("img").attr("src")
                
                p = p.replace('৳','Tk ')
                scrapItemD.title = t
                scrapItemD.price = p
                scrapItemD.url = u
                scrapItemD.img = img 
      
      
                scrapedDataD.push(scrapItemD)
                
                
               }
              )        
      }
      catch(er){
        console.log(er)
        const scrapItemD = { title: "Something Wrong, please try again", price: 'ERROR', url: '', img: ''}
        scrapedDataD.push(scrapItemD)
        
      }  
      js.push({name:'DailyShopping',p: scrapedDataD })
      
           
      //Thebasketbd
      try{
            let res = await got(baAPI).text()
          
             
            
             
                
              // writing the response to a file named data.html
              $ = cheerio.load(res) 
        
              var te = $(".product-item-info")
              
            //  console.log($(te).html())  
                  
              te.each(el=>{
                console.log($(te[el]).html())
                const scrapItemB = { title: '', price: '', url: '', img: ''}
                let t = $(te[el]).find('.product-item-name').text()
                let u = $(te[el]).find('a').attr('href')
                let p = $(te[el]).find(".price").text()
                let img = $(te[el]).find(".product-image-photo").attr("data-lazysrc")
                
                console.log(img)
                p = p.replace('৳','Tk ')
                scrapItemB.title = t
                scrapItemB.price = p
                scrapItemB.url = u
                scrapItemB.img = img 
      
      
                scrapedDataM.push(scrapItemB)
                
                
                }
              )        
          }
          catch(er){
            console.log(er)
            const scrapItemB = { title: "Something Wrong, please try again", price: 'ERROR', url: '', img: ''}
            scrapedDataM.push(scrapItemB)
            
          }  
          js.push({name:'Basket(Chattogram)',p: scrapedDataM })
          return JSON.stringify(js, null, 2)
      
    }
    catch (error) {
        console.error(error)
        
      }

      

      
}

const getAllgProducts = (pr) => {
    return scrapperScript(pr).then((e)=> {
        //the promise is resolved here
        
        return e
      }).catch(console.error.bind(console))
  }
module.exports = {                    
    getAllgProducts,
}