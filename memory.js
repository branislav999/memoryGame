
const emojies = ['😀','😀','🙊','🙊','👀','👀','😲','😲'];


function shuffleEmojies(){
    emojies.map((emoji, index) =>{
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [emojies[index], emojies[randomIndex]] = [emojies[randomIndex], emojies[index]]
    } )
}

shuffleEmojies();


function createElements(){
    for (let i = 0; i < emojies.length; i ++){
        const p = document.createElement('p');
        const div = document.createElement('div');
        p.classList.add('emoji-card'); 
        p.innerText = emojies[i];
        div.appendChild(p);
        document.body.appendChild(div);
    }
}

createElements();



document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('div');    

    cards.forEach(card => {
        
        const p = card.querySelector('p');
        const value = p.innerText;

        card.addEventListener('click', function (){
            

            if (value === '😀'){
                p.textContent = '';          
            }
        })

    })
})