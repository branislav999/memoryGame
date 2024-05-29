// Load emojis from JSON file using fetch API with try/catch

async function loadEmojis() {
    try{
        const response = await fetch('emojis.json');

        if (!response.ok){
            throw new Error('Unable to retrieve emojis');
        }

        const emojis = await response.json();
        return emojis;
    } catch(error){
        console.error('Error loading emojis: ', error)
    }

}

async function fetchEmojis() {
    try {
        const emojis = await loadEmojis();
        shuffleEmojis(emojis);
        createElements(emojis, 0)

    } catch (error) {
        console.error("Error fetching", error);
    }
}



// Shuffle the emojis array using an ES6 function
function shuffleEmojis(emojis){
    emojis.map((emoji, index) =>{
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [emojis[index], emojis[randomIndex]] = [emojis[randomIndex], emojis[index]]
    } )
}

// Shuffle emojis before creating elements


// Create elements that will store emoji characters
function createElements(emojis, index) {
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
    createElements(emojis, index + 1);
}

// Play the game using jQuery
$(document).ready(async function(){
    const emojis = await fetchEmojis();

    const cards = $('div');    
    let cardsUp = false;

    // When a card is clicked, reveal the value and check for matches
    cards.click(function (){
        const card = $(this);

        if (cardsUp || card.hasClass('matched')){
            return;
        }

        const p = card.find('p');
        p.addClass('face-up');

        clickedCardsQueue.enqueue({value: p.text(), index: cards.index(this)});

        if (clickedCardsQueue.queue.length === 2) {
            const first = clickedCardsQueue.queue[0];
            const second = clickedCardsQueue.queue[1];
            let firstIndex = first.index;
            let secondIndex = second.index;

            if (first.value === second.value){
                cards.eq(firstIndex).addClass('matched');
                cards.eq(secondIndex).addClass('matched');
                clickedCardsQueue.clear();
            } 
            else {
                cardsUp = true;

                // Set the timeout to hide the values after 1.5 seconds
                setTimeout(() => {
                    cards.eq(firstIndex).find('p').removeClass('face-up');
                    cards.eq(secondIndex).find('p').removeClass('face-up');
                    cardsUp = false;
                }, 1500);
                clickedCardsQueue.clear();
            }
        }
    });
});

// Define a queue to store the last two clicked cards
class Queue {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.queue = [];
    }

    enqueue(item) {
        if (this.queue.length === this.maxSize){
            this.queue.shift();
        }
        this.queue.push(item);
    }
    
    dequeue() {
        return this.queue.shift();
    }

    clear() {
        this.queue = [];
    }
}

const clickedCardsQueue = new Queue(2);
