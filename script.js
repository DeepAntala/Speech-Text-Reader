const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: './images/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './images/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './images/food.jpg',
        text: "I'm Hungry" 
    },
    {
        image: './images/home.jpg',
        text: "I'm Home" 
    },
    {
        image: './images/outside.jpg',
        text: "I'm Outside" 
    },
    {
        image: './images/tired.jpg',
        text: "I'm tired" 
    },
    {
        image: './images/school.jpg',
        text: "I'm at school" 
    },
    {
        image: './images/school.jpg',
        text: "I'm at school" 
    }
    
];
data.forEach(createBox);

function createBox(item){
    const box = document.createElement('div');
    const {
        image, text
    } = item;

    box.classList.add('box');
    box.innerHTML = `
        <img src = "${image}" alt="${text}" />
        <p class = "info">${text}</p>
    `;
    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });
    main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

let voices = [];
function getVoices(){
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voicesSelect.appendChild(option);
    });
}

function setTextMessage(text){
    message.text = text;
}

function speakText(){
    speechSynthesis.speak(message);
}

function setVoice(e){
    message.voice = voices.find(voice => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));
voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

getVoices();
