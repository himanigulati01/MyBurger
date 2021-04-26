export const updatedObject = (oldObject, updateProperties) =>{
    return{
        ...oldObject,
        ...updateProperties
    }
}

export const checkValidity = (value, rules) =>
    {
        let isValid = true
        if(rules.required){
            isValid = value.trim() !=='' && isValid
        }
        if(rules.minlength){
            isValid = value.length >= rules.minlength && isValid
        }
        if(rules.maxlength){
            isValid = value.length <= rules.maxlength && isValid
        }
        if(rules.isEmail){
            const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            isValid = pattern.test(value) && isValid
        }
        return isValid

    }