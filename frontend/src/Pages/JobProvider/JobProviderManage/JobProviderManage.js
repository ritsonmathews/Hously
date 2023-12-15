import { Container, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Backdrop, CircularProgress, Stack, Snackbar, Alert } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BiErrorCircle } from 'react-icons/bi'
import { IoIosArrowBack } from 'react-icons/io'
import { RiDeleteBinFill } from "react-icons/ri"
import { isAuthenticated } from '../../../auth'
import Success from '../../Common/Handlers/Success'
import { deleteProgramApi, getAdStatusApi, getDomainApi, getFeesTypeApi, getProgramApi, getTypeApi, getWorkTypeApi, updateProgramApi } from '../JobProviderApi'
import "./JobProviderManage.css"

const JobProviderManage = (props) => {
    const { history } = props
    const programId = props.match.params.programId
    const userId = props.match.params.userId
    const { token } = isAuthenticated()
    const adminId = isAuthenticated().admin._id
    const [listDomain, setListDomain] = useState([]);
    const [edit, setEdit] = useState(false);
    const [adType, setAdType] = useState("");
    const [adFeesType, setAdFeesType] = useState("");
    const [listAdStatus, setListAdStatus] = useState("");
    const [adWorkType, setAdWorkType] = useState("");
    const [open, setOpen] = useState(false)
    const [pageLoading, setPageLoading] = useState(false);
    const [values, setValues] = useState({
        id: "",
        type: "",
        companyName: "",
        place: "",
        duration: "",
        feesType: "",
        feesDetails: "",
        domain: "",
        workType: "",
        perks: "",
        requiredSkills: "",
        status: "",
        error: "",
        loading: false,
        success: "",
    })

    const programValidator=()=>{
        if(type===""){
            
        }
    }


    const { id, type, companyName, place, duration, feesType, feesDetails, domain, workType, perks, requiredSkills, status, error, loading, success } = values

    useEffect(() => {
        getProgram()
        getDomains()
        getAdType()
        getFeesType()
        getAdWorkType()
        getAdStatus()
    }, [])

    const handleChange = (name) => (event) => {
        setValues({
            ...values,
            error: "",
            [name]: event.target.value
        })
    }

    const getProgram = () => {
        getProgramApi(token, userId, programId, adminId).then(res => {
            setPageLoading(false)
            const { data } = res
            console.log(data);
            setValues({
                ...values,
                id: data._id,
                type: data.type,
                companyName: data.companyName,
                place: data.place,
                duration: data.duration,
                feesType: data.feesType,
                feesDetails: data.feesDetails,
                domain: data.domain,
                workType: data.workType,
                perks: data.perks,
                requiredSkills: data.requiredSkills,
                status: data.status
            })
        })
    }

    // Get Dropdown Values (Fuctions) Starts
    const getDomains = () => {
        getDomainApi(adminId, token).then((res) => {
            const { data } = res;
            console.log(data);
            setListDomain(data);
        });
    };

    const getAdType = () => {
        getTypeApi(adminId, token).then((res) => {
            const { data } = res;
            console.log(data);
            setAdType(data);
        });
    };

    const getFeesType = () => {
        getFeesTypeApi(adminId, token).then((res) => {
            const { data } = res;
            console.log(data);
            setAdFeesType(data);
        });
    };

    const getAdWorkType = () => {
        getWorkTypeApi(adminId, token).then((res) => {
            const { data } = res;
            console.log(data);
            setAdWorkType(data);
        });
    };

    const getAdStatus = () => {
        getAdStatusApi(adminId, token).then((res) => {
            const { data } = res;
            console.log(data);
            setListAdStatus(data);
            setPageLoading(true)
        });
    };
    // Get Dropdown Values (Fuctions) Ends


    const clickUpdate = () => {
        console.log("update");
        
        setValues({
            ...values,
            loading: true
        })
        updateProgramApi(token, userId, programId, adminId, { type, companyName, place, duration, feesType, feesDetails, domain, workType, perks, requiredSkills, status }).then(res => {
            if (res) {
                if (res.response) {
                    setValues({
                        ...values,
                        error: res.response.data.error
                    })
                }
                else {
                    const { data } = res
                    console.log("Updated", data);
                    setEdit(false)
                    setValues({
                        ...values,
                        loading: false,
                        success: "Program updated succesfully"
                    })
                    handleClick()
                }
            }
        })
    }

    const deleteProgram = () => {
        if (window.confirm("Are you sure?") === true) {
            deleteProgramApi(token, userId, programId, adminId).then(res => {
                const { data } = res
                console.log(data);
                setValues({
                    ...values,
                    success: "Program deleted Successfully"
                })
                handleClick()
                setTimeout(() => {
                    history.push(`/jobprovider/profile/${userId}`)
                }, 1500);
            })
        }
    }


    const showError = () => (
        <div
            style={{
                display: error ? "" : "none",
                color: "red",
                margin: "0 0 5px 0",
                textAlign: "left",
                letterSpacing: "1px",
            }}
        >
            <BiErrorCircle style={{ margin: "0 5px -2px 0" }} />
            {error}
        </div>
    );

    //Snackbar functions Starts
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //Snackbar functions Ends
    const showSuccess = () => (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" 
                sx={{ width: "100%", backgroundColor: "#003300", color: "white" }}>
                    {success}
                </Alert>
            </Snackbar>
        </Stack>
    );

    const showPageLoading = () => (
        pageLoading && (
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    )

    return (
        <div className="provider-manage-main-parent">
            <Container>
                <div className="provider-manage-main">
                    <form>
                        <Grid container>
                            <Grid item xs={5} >
                            <Button
                      variant="contained"
                      color="info"
                      sx={{ mb: 1 }}
                      onClick={() => history.goBack()}
                      startIcon={<IoIosArrowBack />}
                      size="small"
                    >
                      Back
                    </Button>
                            </Grid>
                            <Grid item xs={6} sx={{ textAlign: "right" }}>
                                <Button variant='contained' color='secondary' sx={{ textTransform: "capitalize" }} onClick={() => setEdit(!edit)}>
                                    {edit ? "Cancel" : "Edit    "}
                                </Button>
                                <Button color="error" onClick={deleteProgram}> <RiDeleteBinFill fontSize={20} /> </Button>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
                                {showPageLoading()}
                                {showSuccess()}
                                {showError()}
                                {/* {success&&<Success msg={success} state={true}/>} */}
                            </Grid>
                            {/* Provider ID */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    label="Provider Id"
                                    className="provider-postad-textfield"
                                    style={{ pointerEvents: "none", marginTop: "15px", width: "90%" }}
                                    required
                                    value={id}
                                />
                            </Grid>

                            {/* Ad Type */}
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ minWidth: "90%" }}>
                                    <InputLabel id="type-label" variant="outlined" sx={{ mt: 1.5 }}>
                                        Type
                                    </InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="type-label"
                                        id="type"
                                        style={{ margin: "15px 0", pointerEvents: edit ? "" : "none" }}
                                        label="Type"
                                        value={type}
                                        onChange={handleChange("type")}
                                    >
                                        {adType &&
                                            adType.map((data, index) => (
                                                <MenuItem key={index} value={data}>
                                                    {data}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/*Ad Company Name*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    label="Company Name"
                                    className="provider-postad-textfield"
                                    style={{ marginBottom: "15px", width: "90%", pointerEvents: edit ? "" : "none" }}
                                    value={companyName}
                                    onChange={handleChange("companyName")}
                                />
                            </Grid>

                            {/*Ad Place */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    label="Place"
                                    className="provider-postad-textfield"
                                    style={{ marginBottom: "15px", width: "90%", pointerEvents: edit ? "" : "none" }}
                                    value={place}
                                    onChange={handleChange("place")}
                                />
                            </Grid>

                            {/*Ad Duration */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    label="Duration"
                                    className="provider-postad-textfield"
                                    style={{ marginBottom: "15px", width: "90%", pointerEvents: edit ? "" : "none" }}
                                    value={duration}
                                    onChange={handleChange("duration")}
                                />
                            </Grid>

                            {/*Ad Fees Type */}
                            <Grid item xs={6} sm={3}>
                                <FormControl sx={{ minWidth: "80%" }}>
                                    <InputLabel id="fees-type-label" variant="outlined">
                                        Fees Type
                                    </InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="fees-type-label"
                                        id="fees-type"
                                        style={{ marginBottom: "15px", pointerEvents: edit ? "" : "none" }}
                                        label="Fees Type"
                                        value={feesType}
                                        onChange={handleChange("feesType")}
                                    >
                                        {adFeesType &&
                                            adFeesType.map((data, index) => (
                                                <MenuItem key={index} value={data}>
                                                    {data}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Ad Fees Details */}
                            <Grid item xs={6} sm={3}>
                                {feesType === "Paid" && (
                                    <TextField
                                        variant="outlined"
                                        label="Fees"
                                        className="provider-postad-textfield"
                                        style={{
                                            marginBottom: "15px",
                                            width: "80%",
                                            pointerEvents: edit ? "" : "none"
                                        }}
                                        value={feesDetails}
                                        onChange={handleChange("feesDetails")}
                                    />
                                )}

                            </Grid>

                            {/* Ad Domain */}
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ minWidth: "90%" }}>
                                    <InputLabel id="domain-label" variant="outlined">
                                        Domain
                                    </InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="domain-label"
                                        id="domain"
                                        style={{ marginBottom: "15px", pointerEvents: edit ? "" : "none" }}
                                        label="Domain"
                                        value={domain}
                                        onChange={handleChange("domain")}
                                    >
                                        {listDomain.map((value, index) => (
                                            <MenuItem key={index} value={value._id}>
                                                {value.domainName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Ad Work type */}
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ minWidth: "90%" }}>
                                    <InputLabel id="worktype-label" variant="outlined">
                                        Work Type
                                    </InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="worktype-label"
                                        id="worktype"
                                        style={{ marginBottom: "15px", pointerEvents: edit ? "" : "none" }}
                                        label="Work Type"
                                        value={workType}
                                        onChange={handleChange("workType")}
                                    >
                                        {adWorkType &&
                                            adWorkType.map((data, index) => (
                                                <MenuItem key={index} value={data}>
                                                    {data}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Ad Perks */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    label="Perks"
                                    multiline
                                    rows={4}
                                    className="provider-postad-textfield"
                                    style={{ marginBottom: "15px", width: "90%", pointerEvents: edit ? "" : "none" }}
                                    value={perks}
                                    onChange={handleChange("perks")}
                                />
                            </Grid>

                            {/* Ad Skills */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    label="Required Skills"
                                    multiline
                                    rows={4}
                                    className="provider-postad-textfield"
                                    style={{ marginBottom: "15px", width: "90%", pointerEvents: edit ? "" : "none" }}
                                    value={requiredSkills}
                                    onChange={handleChange("requiredSkills")}
                                />
                            </Grid>

                            {/* Ad Status */}
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ minWidth: "90%" }}>
                                    <InputLabel id="adStatus-label" variant="outlined">
                                        Status
                                    </InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="adStatus-label"
                                        id="adStatus"
                                        style={{ marginBottom: "15px", pointerEvents: edit ? "" : "none" }}
                                        label="Status"
                                        value={status}
                                        onChange={handleChange("status")}
                                    >
                                        {listAdStatus &&
                                            listAdStatus.map((data, index) => (
                                                <MenuItem key={index} value={data}>
                                                    {data}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Ad Posting Button */}
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        margin: "10px 0 0",
                                        width: "90%",
                                        textTransform: "capitalize",
                                        display: edit ? "" : "none",
                                    }}
                                    onClick={clickUpdate}
                                >
                                    Update
                                </Button>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Typography>* <span style={{ color: "#ff1a1a" }}>These fields cannot be Updated</span></Typography>
                            </Grid> */}
                        </Grid>
                    </form>


                </div>
            </Container>
        </div>
    )
}

export default JobProviderManage
