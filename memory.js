
const emojis = ['😀','😀','🙊','🙊','👀','👀','😲','😲'];

// Shuffle the emojis array using an ES6 function
function shuffleEmojis(){
    emojis.map((emoji, index) =>{
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [emojis[index], emojis[randomIndex]] = [emojis[randomIndex], emojis[index]]
    } )
}

shuffleEmojis();

// function createElements(){
//     for (let i = 0; i < emojis.length; i++){
//         const p = document.createElement('p');
//         const div = document.createElement('div');
//         p.classList.add('emoji-card'); 
//         p.innerText = emojis[i];
//         div.appendChild(p);
//         document.body.appendChild(div);
//     }
// }

// Create elements that will store emoji characters
function createElements(index) {
    // Base case: Stop recursion when index exceeds the length of the emojis array
    if (index >= emojis.length) {
        return;
    }

    // Create HTML elements for the current emoji
    const p = document.createElement('p');
    const div = document.createElement('div');
    p.classList.add('emoji-card'); 
    p.innerText = emojis[index];
    div.appendChild(p);
    document.body.appendChild(div);

    // Recursively call createElements with the next index
    createElements(index + 1);
}

// Start creating HTML elements from the beginning of the emojis array (index 0)
createElements(0);



// Play the game
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('div');    
    let cardsUp = false;

    // Iterate through each div and retrieve the values
    cards.forEach((card, index) => {

        
        
        const p = card.querySelector('p');
        const value = p.innerText;

        // When the card is clicked, reveal the value. Logic for the memory game itself 
        card.addEventListener('click', function (){
            
            if (cardsUp || card.classList.contains('matched')){
                return;
            }

            p.classList.add('face-up');

            clickedCardsQueue.enqueue({value: value, index: index});

            if (clickedCardsQueue.queue.length === 2) {
                const first = clickedCardsQueue.queue[0];
                const second = clickedCardsQueue.queue[1];
                let firstIndex = first.index;
                let secondIndex = second.index;

                if (first.value === second.value){
                    cards[firstIndex].classList.add('matched');
                    cards[secondIndex].classList.add('matched');
                    clickedCardsQueue.clear();
                } 
                else {
                    cardsUp = true;

                    // Set the timeout of 1.5 seconds before hiding the values
                    setTimeout(() => {
                        
                        cards[firstIndex].querySelector('p').classList.remove('face-up');
                        cards[secondIndex].querySelector('p').classList.remove('face-up');
                        cardsUp = false;
                        
                    }, 1500);
                    clickedCardsQueue.clear();

                }
            }
        
        })

    })
})

// Defining a que that will store the last two clicked cards
class Queue{
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.queue = [];

    }

    enqueue(item){
        if (this.queue.length === this.maxSize){
            this.queue.shift();
        }

        this.queue.push(item);
    }
    
    dequeue(){
        return this.queue.shift();
    }

    clear() {
        this.queue = []
    }

}

const clickedCardsQueue = new Queue(2);

