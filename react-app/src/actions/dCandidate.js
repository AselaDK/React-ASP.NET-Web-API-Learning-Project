import api from "./api";


//export const create = data => {
//     return{
//         type: 'create',
//         payload: data
//     }
// }

//dispatch(create({fullName: 'xxxx'}))

// to define what type of operations we have
export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE : 'UPDATE',
    DELETE : 'DELETE',
    FETCH_ALL : 'FETCH_ALL'

}

// pass 0 if age is null
const formatData = data =>({
    ...data,
    age:parseInt(data.age?data.age:0)
    //email:data.email?data.email:""
})

// FETCH ALL FUNCTION - Actual Structure
// export const fetchAll = () =>
// {
//     return dispatch =>      // dispatch is a parameter
//     {
//         ... actual operations are here
            // dispatch function
//     }
// }

export const fetchAll = () => dispatch =>      // dispatch is a parameter
{
    //... get api requests from api.js
    api.dCandidate().fetchAll()
        .then(
            response => {
                console.log(response);
                dispatch({
                    type:ACTION_TYPES.FETCH_ALL,
                    // pass data here in payload from asp.net core array
                    payload: response.data
                    // then create reducer
                })
            }
        )
        .catch(err => console.log(err))    
}

export const create = (data, onSuccess) => dispatch =>{
    data = formatData(data)
    api.dCandidate().create(data)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload:res.data
            })
        onSuccess()
    })
    .catch(err => console.log(err)) 
}

export const update = (id, data, onSuccess) => dispatch =>{
    data = formatData(data)
    api.dCandidate().update(id, data)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload:{id:id, ...data} //bcz update/put returns nothing
            })
        onSuccess()
    })
    .catch(err => console.log(err)) 
}

export const Delete = (id, onSuccess) => dispatch =>{
    api.dCandidate().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload:id
            })
        onSuccess()
    })
    .catch(err => console.log(err)) 
}