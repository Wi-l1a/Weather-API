// {city name}
let API = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = '&appid=56e094c841e6d5eb6ce71a512069a4dd'


const form = document.querySelector('.search_city')
const button = document.querySelector('#btn')
const input = document.querySelector('#inp')
const output = document.querySelector('.output')
const boxTitle = document.querySelector('.box-title')


const getWeather = async () => {
    let url = API + input.value + key
    const request = await fetch(url)
    const response = await request.json()
    renderWeather(response)
    input.value = ''
    getMap(response.coord)


}



const renderWeather = (data) => {
    output.innerHTML = ''
    const title = document.createElement('h2')
    title.textContent = data.name
    const tempC = document.createElement('h2')
    tempC.textContent = Math.floor(data.main.temp - 273.15) + ':  цельсия'
    const tempf = document.createElement('h2')
    tempf.textContent = Math.floor(data.main.temp - 273.15) * 9 / 5 + 32 + ':  фаренгейт'
    const wind = document.createElement('h2')
    wind.textContent = `порыв ветра ${data.wind.gust} : скорость ветра ${data.wind.speed}`
    title.classList.add('h2')
    tempC.classList.add('h2')
    tempf.classList.add('h2')
    wind.classList.add('h2')


    data.weather.forEach(wet => {
        boxTitle.innerHTML = ''
        const wetherP = document.createElement('h2')
        wetherP.classList.add('h2')
        wetherP.textContent = wet.description + '   облачность'
        const wetherM = document.createElement('h2')
        wetherM.classList.add('h2')
        wetherM.textContent = wet.main + '   описание'
        boxTitle.append(wetherP, wetherM)

    })


    boxTitle.append(title, tempC, tempf, wind,)
    output.append(boxTitle)

}

const getMap = ({ lon, lat }) => {
    let map = document.createElement('div')
    map.id = 'map'

    DG.then(function () {
        map = DG.map('map', {
            center: [lat, lon],
            zoom: 13
        });

        DG.marker([lat, lon]).addTo(map).bindPopup('Вы кликнули по мне!');
    });
    const boxMap = document.createElement('div')
    boxMap.classList.add('box-map')


    output.append(boxMap)
    boxMap.append(map)

}



form.addEventListener('submit', (event) => {
    event.preventDefault()
    getWeather()

})




let bg = document.querySelector('#myVideo');
window.addEventListener('mousemove', function (e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
});




