import React from 'react';
import { Puff } from  'react-loader-spinner'
import Products from './products';
import Comparison from './comparison';
import Rept from './rept';
import { Disclosure,Transition } from '@headlessui/react'
import ReactJsAlert from "reactjs-alert"
import Modal from '../modal/Modal'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  const navigation = [
    { name: 'Groceries', id:0, href: '/#', current: true, disb: false },
    { name: 'Clothes', id:1, href: '/clothes/#', current: false, disb: true },
    { name: 'Electronics', id:2, href: '/electronics/#', current: false, disb: true },
    
  ]
  
  
  
  
  class Groceries extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          q:'',
          isSearch: false,
          isLoaded: false,
          products: {},
          msg:"Search for a product",
          type: "info",
          status: false,
          id: 0,
          isEnable:false
         
        };
    }
  
    render(){
      let { q, isSearch, isLoaded, products, msg, type, status, id, isEnable } = this.state;

      const handleTrack = () => {
        if (q.length !== 0) {
          this.setState({
            isSearch: false,
            isLoaded:true
          });
          // Do something with value
          console.log("got this:", q);

          getProducts("http://localhost/load/api/v1/gproducts/"+ q)
      //   getProducts("https://comp-nbuy.com/load/api/v1/gproducts/"+ q)  

          
        }
        console.log(q.length)
      }
      const getProducts=(uri)=>{

        fetch(uri)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isSearch: true,
              products: result
            });
        //   console.log(products)  
          }
          
        )
        .catch(err => {
          console.log(err.message)
          this.setState({
            isSearch:false,
            isLoaded:false,
            msg:err.message
          })
        })

      }
      const handleKeyPress = e => {
        console.log(q.length) 
        if(q.length<=1){
          
            this.setState({ 
              isSearch:false,
              isLoaded:false,
              products: [],
              msg:"Happy Searching "
          }); 
        }
        if (e.key === "Enter") {
          handleTrack();
        }
      }
        return (
            <div class="">
              <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                  <div className="hidden md:block">
                      <div className="ml-6 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick= {(event) => {
                              (!isSearch&&item.id>2)? (
                              this.setState({ status: item.disb, id:0 })
                              ):(
                                
                                this.setState({ status: false, id:item.id })
                              
                                
                                
                              )
                              
                              
                            }}
                          
                            className={
                            classNames(
                              item.id === id ?
                              'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                    </div>
              <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                    <button
                        type="button"
                        href="#"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() => {
                          (!isSearch)? (
                          this.setState({ status: true, id:0 })
                          ):(
                            
                            this.setState({ status: false, id:3 })
                          
                            
                            
                          )
                          
                          
                        }
                      }
                      >
                        <span className="sr-only">View notifications</span>
                        Comparison
                    </button>
                    <button
                        type="button"
                        href="#"
                        className="rounded-full bg-gray-800 p-1 ml-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() => {
                          (!isSearch)? (
                          this.setState({ status: true, id:0 })
                          ):(
                            
                            this.setState({ status: false, id:4 })
                          
                            
                            
                          )
                          
                          
                        }
                      }
                      >
                        <span className="sr-only">View notifications</span>
                        Report
                    </button>
                   
                    
                    </div>
                  
                  </div>
                </div> 
           </div>
          </Disclosure>
          <section className="bg-white">
            <div className="container mx-auto flex items-center flex-wrap space-y-4">
            <nav id="store" className="w-full z-30 top-0 px-6 py-1">
              <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">


              </div>
            </nav>
            {id>2 ? (
              id===3?(
                <Comparison data={products}/>
              ):(
                <Rept data={products}/>
              )
            ):(
            <div className="relative mx-auto max-w-screen-lg justify-center">  
            <div className="pt-4 relative mx-auto text-gray-600 max-w-screen-lg flex justify-center">
            <input
              type="search"
              class="bg-gray-50 h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon3"
              value={q} 
              onChange={e => {
                      this.setState({ q: e.target.value});
                    }}
              onKeyDown={handleKeyPress} />
            <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             onClick={() => {
              handleTrack();
            }}
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span class="sr-only">Search</span>
          </button>
          </div>
          <div className="max-w-screen-lg justify-center px-2">
          <span>
          <br />
                  
                  Example: 
                  <a href='#'
                    onClick={() => {
                      q='Potato';
                      handleTrack();
                      console.log('potato')
                    }}
                  > Potato</a> 
                  <a href='#'
                     onClick={() => {
                      q='Onion';
                      handleTrack();
                      console.log('Onion')
                    }}
                  > Onion</a>
                  <a href='#'
                     onClick={() => {
                      q='Begun';
                      handleTrack();
                      console.log('Begun')
                    }}
                  > Begun </a>
                  <a href='#'
                    onClick={() => {
                      q='Apple';
                      handleTrack();
                      console.log('Apple')
                    }}
                  > Apple </a>
                   ....
                   </span>
                 </div>  
          
          </div>
          
            )}
          { !isLoaded ? (
                <div className="w-full"> 
                <div className="flex items-center justify-center my-32 pr-7">
                <h3 className="text-gray-400 text-2xl font-bold">  
                { msg }
                </h3>
                </div>
                </div> 
            ) : (  
                !isSearch ? (
              <div className="w-full">
                <div className="flex items-center justify-center my-32 pr-10">
                <Puff
                    height="70"
                    width="70"
                    radisu={1}
                    color="#0456ff"
                    ariaLabel="loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              </div>
            ) : (
              
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-16 mt-16 text-center">
                 
                  {products.map((product) => (
                    
                      
                      <div>
                        <div className="container bg-gray-80 max-w-screen-lg mx-auto h-7 text-base mt-10 text-stone-800"><h3 class="font-medium">{product.name} products
                        </h3>
                        </div>
                        <Products data={product.p} />
                    </div>
                  

                  
                    
                  )
                )
                      
                      }
                
              </div>
                ) 
               
              )
            }
          </div>
          </section>
          <ReactJsAlert
              status={status} // true or false
              type={type} // success, warning, error, info
              title= "Please Search for a product First"
              Close={() => this.setState({ status: false })}
            />
            {isEnable && (
                <Modal enable={true} sendData={this.getData} title={<span>About the site</span>} msg={<span>This is to make online product search easy for all user. <br /> This will help us to save our valuable time in sha allah. </span>} />
                )
    
            }
            </div>
        );

    }



  }
  export default Groceries;

