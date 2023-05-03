window.addEventListener('scroll', () => {
chrome.runtime.sendMessage({
    message: 'document-scrolled',
    scroll_value: window.scrollY,
    document_height: document.body.scrollHeight
   });

})

window.addEventListener('load', (e) => {
    document.addEventListener('click', (e) => {
        chrome.runtime.sendMessage({
            message: "document-clicked",
        })
    })
})

    if (document) {
      document.addEventListener('click', (e) => {
            chrome.runtime.sendMessage({
                message: "document-clicked",
            })
        })
    }

function handleDescription() {
    let description;

    let description_element = document.querySelector('meta[name="description"]') || document.querySelector("meta[name='og:description'") || document.querySelector("meta[name='twitter:description'");
    if (description_element) {
        description = description_element.content;
    }


    const cleaned = removeStopWords(description);
    const final_description = extractWords(cleaned, 10)

    
    // send the dscription
    
    chrome.runtime.sendMessage({
        message: 'compute-page-relevance',
        data: {
            description: cleaned
        }
    });
    

    
    function removeStopWords(text) {
        if (text) {

            const stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']
            const split_text = text.split(' ');

            let new_word = ''

            split_text.forEach(token => {
                if (!stopwords.includes(token)) {
                    new_word+= `${token} `
                }
            })

            // return the first 60 ccharacters.
            

            return new_word;
       
        }
        else {
            return ''
        }
       
    }

    function extractWords(text, len) {
        if(text) {
            const split = text.split(' ');
            let new_word;
            try {

                for(let i=0; i<len; i++){
                    new_word += `${split[i]} `
                }
            }
            catch(e) {
                // just incase len makes the stuff to go out of range, just return what we have
                return new_word
            }


            return new_word
        }

        return ''
    }
}

window.addEventListener('DOMContentLoaded', (e) => {

    handleDescription()
    
})
    /*
    const div = document.createElement("div");
    div.classList.add('mindfulai')
    div.style.background = 'pink';
    div.style.height = "100%";
    div.style.width = '100%';
    div.style.position = 'fixed';
    div.style["zIndex"] = 100000000000000000000000;
    document.body.append(div)
    //document.body.appendChild("<p>Testing this shit</p>")*/
