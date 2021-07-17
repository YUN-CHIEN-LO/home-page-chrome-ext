let nowWeather = {};
let imgs = [
    "https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", //晴天 
    "https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", //晴時多雲 
    "https://images.pexels.com/photos/7084167/pexels-photo-7084167.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", //多雲時晴 
    "https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", //多雲
    "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", //多雲時陰 
    "https://images.pexels.com/photos/414659/pexels-photo-414659.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", //陰天 



];
const getWx = function(data) {
    nowWeather.nowWx = data.records.location[0].weatherElement[0].time[0].parameter;
    nowWeather.nowPop = data.records.location[0].weatherElement[1].time[0].parameter.parameterName;
    nowWeather.nowMinT = data.records.location[0].weatherElement[2].time[0].parameter.parameterName;
    nowWeather.nowMaxT = data.records.location[0].weatherElement[4].time[0].parameter.parameterName;
    showWeatherImg();
}

const showWeatherImg = function() {
    let src = '';
    $("#weather").append(`
    <h1 class="status">${nowWeather.nowWx.parameterName}</h1>
    <h1>${nowWeather.nowMinT}°C ～ ${nowWeather.nowMaxT}°C</h1>
    <h1>降雨機率${nowWeather.nowPop}%</h1>
    `);
    document.body.style.backgroundImage = `url(${imgs[nowWeather.nowWx.parameterValue]})`;
}

function getWeather(callback) {
    const now = dayjs();
    return axios
        .get("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001", {
            params: {
                'Authorization': 'CWB-7ED74692-0AE8-4D25-BEE5-705FFEE50FDE',
                locationName: "新北市",
            }
        })
        .then(function(response) {
            // handle success
            console.log(response);
            callback(response.data);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .then(function() {
            // always executed
        });
}

$(document).ready(function() {
    $("#app").css('color', 'red');
    getWeather(getWx);
});