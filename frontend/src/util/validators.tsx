export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const validateUpperCase = (value: string) => {
    return String(value).match(/[A-Z]/)
}

export const validateLowerCase = (value: string) => {
    return String(value).match(/[a-z]/)
}

export const validateNumber = (value: string) => {
    return String(value).match(/[0-9]/)
}

export const validateSpecialCharacter = (value: string) => {
    return String(value).match(/[$@$!%*#?&]/)
}