import { Box, Container, Divider, Grid } from '@mui/material'
import React from 'react'
import './Dashboard.css'
import Graph from './Graph'
import Piechart from './Piechart'

const Dashboard = () => {
    return (
        <div style={{backgroundColor:"whitesmoke",width:"100%"}}>
        <Container style={{marginTop:"100px"}}>
            <div className='main-container'>
                <div className='grid-div-container'>
                    <Grid container rowSpacing={2} columnSpacing={2} className='grid-container'>
                        <Grid item lg={3} md={3} sm={6} xs={6}>
                            <Box className='paper' style={{backgroundColor:"#5dbb1f"}}>
                                <h1 className='paper-head'>592</h1>
                                <p className='paper-para'>Total Users</p>
                            </Box>
                        </Grid>
                        <Grid item lg={3} md={3} sm={6} xs={6}>
                            <Box className='paper' style={{backgroundColor:"orange"}}>
                                <h1 className='paper-head'>320</h1>
                                <p className='paper-para'>Jobs Posted</p>
                            </Box>
                        </Grid>
                        <Grid item lg={3} md={3} sm={6} xs={6}>
                            <Box className='paper' style={{backgroundColor:"#00a6ff"}}>
                                <h1 className='paper-head'>480</h1>
                                <p className='paper-para'>Job Seekers Applied</p>
                            </Box>
                        </Grid>
                        <Grid item lg={3} md={3} sm={6} xs={6}>
                            <Box className='paper' style={{backgroundColor:"#aa00ff"}}>
                                <h1 className='paper-head'>520</h1>
                                <p className='paper-para'>Job Seekers</p></Box>
                        </Grid>
                    </Grid>
                </div>
                <div style={{display:"flex"}}>
                <div className='graph-container'>
                    {/* <h1 className='graph-title'>Overview</h1> */}
                    <Graph/>
                </div>
                <div className='piechart-container'>
                    {/* <h1 className='graph-title'>Overview</h1> */}
                    <Piechart/>
                </div>
                </div>
            </div>
        </Container>
        </div>
    )
}

export default Dashboard
