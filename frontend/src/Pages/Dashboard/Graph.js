import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import React from 'react'
import { Line } from 'react-chartjs-2'
import './Graph.css'

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, );

const Graph = () => {
    return (
        <div className='container'>
            <Line 
            data={{
                labels:[0,1,2,3,4,5,6,7,8],
                datasets:[
                            {
                                data:[0,1,0.7,3.4,2,5,2.5,7,8],
                                label:"Total Users",
                                borderColor: "#5dbb1f",
                                backgroundColor: "rgb(93, 187, 31)",
                                color: "#5dbb1f",
                                tension: 0.4,
                            },
                            {
                                data:[5,3,4,8,5,6.2,1.5,5,4],
                                label:"Jobs Posted",
                                borderColor: "orange",
                                backgroundColor: "orange",
                                color: "orange",
                                tension: 0.4
                            },
                            {
                                data:[4,0.3,5,2,6,3,2.3,1,5],
                                label:"Applied Jobseekers",
                                borderColor: "#00a6ff",
                                backgroundColor: "#00a6ff",
                                color: "#00a6ff",
                                tension: 0.4
                            },
                            {
                                data:[7,5,2,5.4,7,8,5.5,4,1],
                                label:"Jobseekers",
                                borderColor: "#aa00ff",
                                backgroundColor: "#aa00ff",
                                color: "#aa00ff",
                                tension: 0.4
                            }
                        ]
                }}
                options={{
                    elements:{
                        point:{
                            radius:2,
                        },
                        line:{
                            borderWidth:3,
                        },
                    },
                }}/>
        </div>
    )
}

export default Graph
