const request =require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6d29c05195a328a3790b782f8b192a2e&query='+longitude+','+latitude
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Something get wrong',undefined)
        } else if (body.error) {
           callback('Bad coordinates',undefined)
        } else {
           
            callback(undefined,
            body.current.weather_descriptions[0]+ ". It's "+body.current.temperature+" degree and feels like "+ body.current.feelslike +" degree." 
        )}
        
    })
}
module.exports = forecast