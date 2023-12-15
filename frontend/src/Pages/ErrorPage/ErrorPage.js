import { Button, Grid } from '@mui/material';
import React from 'react';
import { BiError } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import "./ErrorPage.css"

const ErrorPage = (props) => {
    const { history } = props
    return (
        <div className="error-page-main-parent">
            <div className="error-page-main">
                <Grid container>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={(event) =>{
                                event.preventDefault()
                                history.goBack()
                            }}
                            startIcon={<IoIosArrowBack />}
                            size="small"
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
                <div className="error-page-message">
                    <div style={{ color: "red" }}>
                        <BiError size={35} />
                    </div>
                   <div>
                   You are not authorized to access this page !!
                   </div>
                </div>

            </div>
        </div>
    )
};

export default ErrorPage;
