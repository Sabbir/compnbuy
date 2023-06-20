const fs = require('fs')

const cheerio = require('cheerio')

//const sc = require("./scrapedBooks.json")
const { json } = require('body-parser')

const got = require('got');


const dAPI = 'https://www.daraz.com.bd/catalog/?q='
const oAPI = 'https://www.vibrantbd.com/search?q='
const biAPI = 'https://blucheez.com.bd/search?page=1&q='
const gAPI = 'https://www.gentlepark.com/product-search.php?searchkeyword='



const scrapperScript = async (pr) => {
    try {
      let daAPI = dAPI + pr
      let otAPI = oAPI + pr
      let blAPI = biAPI + pr
      let gaAPI = gAPI + pr


      const scrapedDataD = []
      const scrapedDataO = []
      const scrapedDataB = []
      const scrapedDataW = []
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
      
      //gentlepark
      
      try{
        const dataG  = await got(gaAPI).text()

        $ = cheerio.load(dataG) 
        
         
        var dt = $("div > .prdctblock")
        
          
              
        dt.each(el=>{
          const scrapItemG = { title: '', price: '', url: '', img: ''}
          

          let t = $(dt[el]).find('.product-name a').text()
          let u = "https://www.gentlepark.com/"+$(dt[el]).find("a").attr("href")
          let p = $(dt[el]).find(".product-price span").text();
          let img = "https://www.gentlepark.com/"+$(dt[el]).find("img").attr("src")
          
          scrapItemG.title = t
          scrapItemG.price = p.replace("Tk.","BDT")
          scrapItemG.url = u
          scrapItemG.img = img 
                 
          scrapedDataW.push(scrapItemG)
          
         }
        )
      }
      catch(er){
        console.log(er)
        const scrapItemG = { title: 'Something Wrong', price: 'ERROR', url: '', img: ''}
        scrapedDataW.push(scrapItemG)

      }
      js.push({name:'Gentlepark', p: scrapedDataW })

      //bluecheeze
      
      try{
        const dataB  = await got(blAPI).text()

        $ = cheerio.load(dataB, { xmlMode: true}) 
         
        var dt = $("div > .product-inner")
              
        dt.each(el=>{
          const scrapItemB = { title: '', price: '', url: '', img: ''}
          
          let t = $(dt[el]).children('div > .product-info').find('h3').text()
          let u = $(dt[el]).find("div > .product-image").attr("data-rendert4s")
          let p = $(dt[el]).find(".price").html().replace(/<del>.*<ins>/,'').replace('</ins>', '')
          let img = $(dt[el]).find("img").attr("src")

          
          scrapItemB.title = t
          scrapItemB.price = p
          scrapItemB.url = "https://blucheez.com.bd"+u
          scrapItemB.img = img 
          

          scrapedDataB.push(scrapItemB)
          
         }
        )
      }
      catch(er){
        console.log(er)
        const scrapItemB = { title: er.message, price: 'ERROR', url: '', img: ''}
        scrapedDataB.push(scrapItemB)

      }
      js.push({name:'Bluecheez', p: scrapedDataB })
      
      
      
      //Othoba
      try{
        const dataA  = await got(otAPI).text()

        $ = cheerio.load(dataA) 
        
        var dt = $("div > .product-item")
        
              
                  
        dt.each(el=>{
          const scrapItemO = { title: '', price: '', url: '', img: ''}
           
          let t = $(dt[el]).find('a img').attr('alt')
          let u = $(dt[el]).find('a').attr('href')
          let p = $(dt[el]).find(".price").text()
          let img = $(dt[el]).find("a div").children("img").attr("data-src")
          console.log(p)
          img = img.replace('{width}','400')
          p = p.replace('Sale price','')
          scrapItemO.title = t
          scrapItemO.price = p
          scrapItemO.url = "https://www.vibrantbd.com"+u
          scrapItemO.img = img 


          scrapedDataO.push(scrapItemO)
          
          
         }
        )
      }
      catch(er){
        console.log(er)
        const scrapItemO = { title: er.message, price: '', url: '', img: ''}
        scrapedDataL.push(scrapItemO)

      }
        js.push({name:'Vibrantbd', p: scrapedDataO })


      

      
        // te.forEach(elem => {
        //    console.log(elem.text)
        // })
       
       
      
      
      //console.dir(scrapedData)
      // fs.writeFile(
      //   './result/scrapedBooks.json',
      //   JSON.stringify(scrapedData, null, 2),
      //   (e) => {
      //     if (e) {
      //       console.log(e)
      //       return
      //     }
      //     console.log('Scraping completed.')
      //   },
      // )
      
      return JSON.stringify(js, null, 2)
      //return JSON.stringify(scrapedData, null, 2)
    } catch (error) {
      console.error(error)
      
    }
  }
  
  


  const getAllProducts = (pr) => {
    return scrapperScript(pr).then((e)=> {
        //the promise is resolved here
        
        return e
      }).catch(console.error.bind(console))
  }

  const getAllProductsJSON = () => {
    return sc
  }

  module.exports = {
                        
                    getAllProducts,
                    getAllProductsJSON,
                   }