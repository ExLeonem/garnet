/**
 * @author Maksim Sandybekov
 * @date 5.3.2020
 * 
 * Wrapp local storage functionality
 */


const getItem = (key, defaultValue = null) => {

    let value = window.localStorage.getItem(key);
    if (value === "null" || value === "undefined" || value == null) {
        return defaultValue;
    }

    return JSON.parse(value);
}

const setItem = (key, value) => {

    if (value != null || value != undefined) {
        localStorage.setItem(key, JSON.stringify(value));
        return;
    }

    localStorage.setItem(key, null);
}

export {
    getItem,
    setItem,
}