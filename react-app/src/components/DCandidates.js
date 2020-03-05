import React, { useState, useEffect } from 'react';     // react hooks functions
import { connect } from 'react-redux'; //The connect() function connects a React component to a Redux store.
import * as actions from '../actions/dCandidate';
import { Grid, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, recomposeColor, withStyles, Button, ButtonGroup } from '@material-ui/core';
import DCandidateForm from './DCandidateForm'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useToasts } from "react-toast-notifications";

// access the default styles of material ui
const styles = theme => ({
    // to overide other classes (table headers)
    root: {
        // MuiTableCell-head is taken by 
        "& .MuiTableCell-head": { fontSize: "1.25rem" }
        // then this will be bind to <TableHead></TableHead>
    },
    //paper is a class
    paper : {
        //theme.spacing(1)=8px, theme.spacing(2)=16px,
        margin: theme.spacing(2),
        padding: theme.spacing(2)
        // then we have to access this through props(in DCandidate) at last export default
        // then it should binf to JSX element <Paper></Paper>
    }
})


//sfc
const DCandidates = ({classes, ...props}) => {
    //store data using useState function in class base components
    //property x, function setX, initial value for x = 0 oin useState function
    //store value in x, to update x use setX
    // const [x, setX] = useState(0)
    // setX(5) // x = 5 now

    // passing record id to parent comp to child cmp
    const [currentId, setCurrentId] = useState(0)

    //instead of life cycle of classbase components we can use useEffects method
    // when the value of x is changed this function will be triggered, like componendDidMount=componentfullyloaded
    useEffect(() => {
        //when the component is fully loaded we can call the function fetch all
        props.fetchAllDCandidates()

    },[])

    //toast message
    const {addToast} = useToasts()

    const onDelete = id =>{
        if(window.confirm('Are you sure to delete this record ?'))
            props.deleteDCandidate(id, ()=> addToast("Deleted Successfully", {appearance:'info'}))
    }

    return ( 
        <Paper className = {classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DCandidateForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root} >
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dCandidateList.map((record, index)=>{
                                        return(
                                            <TableRow key={index} hover>
                                                <TableCell>{record.fullname}</TableCell>
                                                <TableCell>{record.mobile}</TableCell>
                                                <TableCell>{record.bloodGroup}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant="text" >
                                                        <Button>
                                                            <EditIcon 
                                                                color="primary" 
                                                                onClick={()=>{setCurrentId(record.id)}}     
                                                            >
                                                            </EditIcon>
                                                        </Button>
                                                        <Button>
                                                            <DeleteIcon 
                                                                color="secondary" 
                                                                onClick={()=> onDelete(record.id)}
                                                            >
                                                            </DeleteIcon>
                                                        </Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>  
        </Paper>      
    );
}

// parameters to connect function
const mapStateToProps = state=>({
        dCandidateList:state.dCandidate.list        // mapping, dCamdidate.js in reducers
        // to access the list in reducer we can use DCandidateList key proprrty here from props parameter
    })

//function to map those action creaters to props
const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate: actions.Delete
} 
 
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidates));  // connect function pass the DCandidates 