const date_format = date => {
    //While calling function , pass date as parameter
    const dateForProcessing = new Date(date);
    const year = dateForProcessing.getFullYear();
    const month = dateForProcessing.getMonth() +1;
    const day = dateForProcessing.getDate();

    //Convert the input date as mm/dd/yyyy
    return `${month}/${day}/${year}`;
};


module.exports = {date_format};