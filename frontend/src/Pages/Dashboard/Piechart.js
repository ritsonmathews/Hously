import { Chart as ChartJS, Legend, ArcElement, Tooltip } from 'chart.js';
import React from 'react'
import { Doughnut, Pie } from 'react-chartjs-2'
import './Piechart.css'
    
ChartJS.register(ArcElement, Tooltip, Legend);
    
const Piechart = () => {
    return (
        <div className='container'>
            <Doughnut
            data={{
                labels:["Total Users","Jobs Posted","Applied Jobseekers","Jobseekers"],
                datasets:[
                            {
                                data:[492,320,480,520],
                                backgroundColor: ["#5dbb1f","orange","#00a6ff","#aa00ff"],
                            }
                        ]
                }}/>
        </div>
    )
}

export default Piechart
