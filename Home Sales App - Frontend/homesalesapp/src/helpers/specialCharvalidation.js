

export const specialCharvalidation = (string, isUsername) => {

    if(isUsername){
        const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return regex.test(string)
    }else{
        const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return regex.test(string)
    } 
  
}

export const UpperLowerValidation = (password) => {
    
    const regexUpper = /.*[A-Z].*/;

    const regexLower = /.*[a-z].*/;

    return regexUpper.test(password) && regexLower.test(regexLower)

}


