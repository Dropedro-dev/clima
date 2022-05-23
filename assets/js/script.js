document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    
    if(input !== '') {
        aviso('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=b43426e19770eed694b900812bdc98d9&units=metric&lang=pt_br`;
        
        let results = await fetch(url);
        let json = await results.json();
        
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                wind: {
                    angle: json.wind.deg,
                    speed: json.wind.speed
                }
            })

        } else {
            clearInfo();
            aviso('localisação não encontrada');
        }
    }
});

let aviso = (msg) => {
    document.querySelector('.aviso').innerHTML = msg
};

let showInfo = (json) => {
    aviso('');
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC`;
    document.querySelector('.ventoInfo').innerHTML = `${json.wind.speed}<span>km/h</span>`;
    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.wind.angle -90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

let clearInfo = () => {
    aviso('');
    document.querySelector('.resultado').style.display = 'none';
}