
function getTime2(time) {
    const timeString = `${time}`;
    if (timeString.length === 2) return time
    return `0${time}`
}
let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
let time2 = `${getTime2(hours)}:${getTime2(minutes)}:${getTime2(seconds)}`;

export default time2