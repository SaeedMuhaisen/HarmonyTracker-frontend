export const convertInchesToCm = (inches) => {
    return inches * 2.54;
};

export const convertCmToInches = (cm) => {
    return cm / 2.54;
};

export const convertLbtoKg = (lb) => {
    return lb / 2.205;
}

export const convertKgtoLb = (lb) => {
    return lb * 2.205;
}

export const convertFtToCm = (ft) => {
    return ft * 30.48;
}

export const convertCmtoFt = (cm) => {
    return cm / 30.48;
}

export const capitalizeFirstLetters = (s) => {
    if(s===null){
        return null;
    }
    const words = s.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return words.join('');
}