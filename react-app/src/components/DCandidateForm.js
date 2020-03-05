import React, {useState, useEffect} from 'react';
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from '@material-ui/core';
import useForm from "./useForm"; 
import { connect } from 'react-redux'; //The connect() function connects a React component to a Redux store.
import * as actions from '../actions/dCandidate';
import { useToasts } from "react-toast-notifications";

const styles = theme =>({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 230,
        }, 
    },
    formControl:{
        margin: theme.spacing(1),
        width: 230,
    },
    smMargin:{
        margin: theme.spacing(1),
    }
})

const initialFieldValues = {
    fullname: '',
    mobile: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
}

const DCandidatesForm = ({classes, ...props}) => {

    //toast message
    const {addToast} = useToasts()

    // validate form 
    const validate = (fieldValues = values) =>{
        let temp={...errors}
        if('fullname' in fieldValues)   // check if key fullname is inside the field values
            temp.fullname = fieldValues.fullname?"":"This field is required."
        if('mobile' in fieldValues)   
            temp.mobile = fieldValues.mobile?"":"This field is required."
        if('bloodGroup' in fieldValues)   
            temp.bloodGroup = fieldValues.bloodGroup?"":"This field is required."
        if('email' in fieldValues)   
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        //set error object using set errors
        setErrors({
            ...temp
        })

        if(fieldValues === values)
            return Object.values(temp).every(x=> x==="") //check every element in temp return empty

    }

    // getting return values of useForm
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select drop down
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);


    const handleSubmit = e =>{
        e.preventDefault()  // prevent default behaviour of html forms
        //console.log(values);
        if(validate())
        {
            const onSuccess = () =>{ 
                resetForm()
                addToast("Submitted Successfully", {appearance:'success'})
            }
            if(props.currentId === 0)
                props.craeteDCandidate(values, onSuccess)
            else
                props.updateDCandidate(props.currentId, values, onSuccess)
            //window.alert("Validation succeeded!")
        }
    }

    // get values to the form after click Edit button
    useEffect(()=> {
        if(props.currentId !== 0)
        {
            setValues({
                ...props.dCandidateList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit} >
            <Grid container>
                <Grid item xs={6}>
                    <TextField 
                        name="fullname"
                        variant="outlined"
                        label="Full Name"    
                        value={values.fullname}
                        onChange={handleInputChange}
                        {...(errors.fullname && { error: true, helperText: errors.fullname } )}
                    />
                    <TextField 
                        name="email"
                        variant="outlined"
                        label="Email"    
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email } )}
                    />
                    <FormControl 
                        variant="outlined" 
                        className={classes.formControl} 
                        {...(errors.bloodGroup && {error:true})}
                    >
                        <InputLabel ref={inputLabel} >Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Select Blood Group</MenuItem>
                            <MenuItem value="A+">A + </MenuItem>
                            <MenuItem value="A-">A - </MenuItem>
                            <MenuItem value="B+">B + </MenuItem>
                            <MenuItem value="B-">B - </MenuItem>
                            <MenuItem value="AB+">AB + </MenuItem>
                            <MenuItem value="AB-">AB - </MenuItem>
                            <MenuItem value="O+">O + </MenuItem>
                            <MenuItem value="O-">O - </MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText> }
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                <TextField 
                        name="mobile"
                        variant="outlined"
                        label="Mobile"    
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && { error: true, helperText: errors.mobile } )}
                    />
                    <TextField 
                        name="age"
                        variant="outlined"
                        label="Age"    
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        name="address"
                        variant="outlined"
                        label="Address"    
                        value={values.address}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset 
                        </Button>
                    </div>
                </Grid>
            </Grid>

        </form>
    );
}

// parameters to connect function
const mapStateToProps = state=>({
    dCandidateList:state.dCandidate.list        // mapping, dCamdidate.js in reducers
    // to access the list in reducer we can use DCandidateList key proprrty here from props parameter
})

//function to map those action creaters to props
const mapActionToProps = {
    craeteDCandidate : actions.create,
    updateDCandidate : actions.update
} 

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidatesForm));