const search = document.querySelector('#search');
const form = document.querySelector('form');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('section h1').textContent = "..."
    document.querySelector('section h2').textContent = "..."
    document.querySelector('#wind').textContent = "..."
    document.querySelector('#temp').textContent = "..."
    document.querySelector('#precipitation').textContent = "..." 
    fetch(`/weather?adress=${search.value}`).then((res) => {
        res.json().then((data) =>{
            console.log(data);
            if(data.error){return document.querySelector('section h1').textContent = data.error;}
            document.querySelector('section h1').textContent = data.condition;
            document.querySelector('section h2').textContent = data.location;
            document.querySelector('#wind').textContent = data.wind;
            document.querySelector('#temp').textContent = data.temperature;
            document.querySelector('#precipitation').textContent = data.precipitation + " %";
        })
    })
})