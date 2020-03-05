 import React, { useState, useEffect} from 'react';

// to use common functions of forms
//sfc
const useForm = (initialFieldValues, validate, setCurrentId) => {

    // to any component we need state property values 
    const [ values, setValues ] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const {name, value} = e.target
        const fieldValue = {[name]: value}
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    const resetForm = () =>{
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        setCurrentId(0)
    }

    return { 
        values, 
        setValues, 
        errors,
        setErrors,
        handleInputChange, 
        resetForm
    };
}
  
 export default useForm;