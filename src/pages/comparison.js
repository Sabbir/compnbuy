import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price comparison chart',
      },
    },
  };





class Comparison extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        d:[]
        
        
        
      };
    }
    componentDidMount() {
    
        console.log("Componenet comparison mounts")
        
    }
    

    render(){
      let {d} = this.state
      let dt = this.props.data
      
      let lbl = []
      let dset = []
      let g = 0
      let t = 0
      let b = 32 
  
        dt.map((dat)=>{
          let lb=[]
          let i = 0
          let price = []
          
          
          let data1={label:'', data: [], borderColor:'', backgroundColor: '', pointBorderWidth: 1, pointHoverRadius: 5,pointRadius: 2}
          
           
           dat.p.map((p)=>{
            lb.push(i.toString())
             let pr = p.price.replace(/[BDT|Tk|'As low as '|\n|' '|'was ']/g, '')
             price.push(parseInt(pr.replace(/[,|' ']/g, '')))
            i++
            t++
           })
           console.log(t)
  
  
           if(lb.length > lbl.length)
             lbl = lb
            
             console.log(dat.name) 
           let r = 255-g 
           
           console.log(r,g,b)
           data1.label = dat.name 
           data1.data = price.sort(function(a, c){return a - c})
           data1.borderColor = 'rgb('+r+','+g+', '+b+')' 
           data1.backgroundColor = 'rgb('+r+','+g+', '+b+')'
           g= g+100
            g>255? g=g-255: b=b+50
           console.log(data1.data)
           
  
           d.push(data1)
           console.log(d)
  
           console.log(lbl)
           console.log(dset)
          
        })
        
        
        let da = {labels:lbl, datasets:d}
      
        
        
        console.log(da)
        return(
            <div className="w-full relative mx-auto text-gray-600 max-w-screen-lg">
                <Line options={options} data={da} />;
            </div>
        )
    }
}
export default Comparison;