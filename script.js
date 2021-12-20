const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
//const loader = document.getElementById('loader');


//initialize some things
let apiQuotes = []; // this gets populated by the quotes we will fetch

//functions
//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {
    quoteContainer.hidden = false; 
    loader.hidden = true;
}


// GET Quotes from API
async function getQuotes() {
    loading();
        const apiUrl = 'https://type.fit/api/quotes';

        //Show New Quote Function 
        function newQuote() {
          
            //pick a random quote from apiQuotes array
            const quote = apiQuotes[Math.floor(Math.random() *apiQuotes.length)];
           // console.log(quote);
           //check if the author is blank and replace with 'unknown'
           if(!quote.author){
               authorText.textContent = 'Unknown';
           }else{
            authorText.textContent = quote.author;
           }
           //check the quote length to determine the styling
           
           if(quote.text.length > 80){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }

            //set the quote and hide the loader
              quoteText.textContent = quote.text;
              complete(); 

         
        }
            try {
                const response = await fetch(apiUrl);
                apiQuotes = await response.json();
               // console.log(apiQuotes);
                newQuote();
            } 
                catch(error){   //catch the error here
                }
}


// GET QUOTES LOCALLY
function getLocalQuotes() {
    //pick a random quote from apiQuotes array
    const localQuote = localQuotes[Math.floor(Math.random() *localQuotes.length)];
    console.log(localQuote);
}


//tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Load ... 
//call the getQuotes from API function
getQuotes();


// pull quotes locally instead
//getLocalQuotes();