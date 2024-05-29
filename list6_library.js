const libraryStore = [];


String.prototype.capitalize = function() {
    return this.length === 0 ? ' ' : this[0].toUpperCase() + this.slice(1)
}

const capitalize = (str) => {
    return str.length === 0 ? ' ' : str[0].toUpperCase() + str.slice(1)
}

/**
 * Capitalize each word in sentence
 */
const capitalizeSentence = (sentence) => {
    return sentence.split(' ').map(element => capitalize(element)).join(' ')
}

class Media {
    #title;
    #ratings;
    #available;

    constructor({title}) {
        if ((typeof title) !== "string"){
            throw new Error("Title is not a string!")
        }
        this.#title = capitalizeSentence(title);
        this.#ratings = [];
        this.#available= true;
    }

    get title() {
        return this.#title
    }

    get ratings() {
        return this.#ratings
    }

    get available() {
        return this.#available
    }

    addRating(rate) {
        this.#ratings.push(rate)
    }

    orderMedia() {
        return new Promise((resolve, reject) => {
        if (this.#available) {
            setTimeout(() => {
                this.#available = false;
                resolve();
            }, 1000)
            return;
        }

        reject("Not #available")
        })
    }

    returnMedia() {
        return new Promise((resolve, reject) => {
        if (!this.#available) {
            setTimeout(() => {
                this.#available = true;
                resolve();
            }, 1000)
            return;
        }

        reject("Already returned")
        })
    }
}

class Book extends (Media) {
    #author
    #pages
    constructor({author, pages, ...rest}) {
        if ((typeof author) !== "string" && !(Number.isInteger(pages))){
            throw new Error ("Book params are wrong type!")
        }
        super(rest)
        this.#author = capitalizeSentence(author);
        this.#pages = pages;
    }

    get author () {
        return this.#author
    }

    get pages () {
        return this.#pages
    }

    orderBook = super.orderMedia

    returnBook = super.returnMedia
}

class Movie extends (Media) {
    #director
    #length
    constructor({director, length, ...rest}) {
        if ((typeof director) !== "string" && !(Number.isInteger(length))){
            throw new Error ("Movie params are wrong type!")
        }
        super(rest)
        this.#director = capitalizeSentence(director);
        this.#length = length;
    }

    get director () {
        return this.#director
    }

    get length () {
        return this.#length
    }

    orderMovie = super.orderMedia

    returnMovie = super.returnMedia
}
/**
 * Add media to libraryStore
 * @param {*} param0 
 * @returns *
 */
const addToLibrary = ({type, ...props}) => {
    let media;
    try{
        switch(type) {
            case "book": 
                media = new Book(props);
                break;
            case "movie": 
                media = new Movie(props);
                break;
            default: 
                media = new Media(props);
                break;
        }
        libraryStore.push(media) 
        return media
    } catch (e) {
        console.log("Error: " + e.message)
        return undefined
    }
}

/**
 * Look for element with given title, order it and give feedback if that was possible
 * @param {string} title 
 */
async function order(title) {
    try{
        await libraryStore.find(element => element.title === title).orderMedia()
        console.log("Order completed!")
    } catch (e) {
        console.log("Sorry! Not available")
    }
}

/**
 * Add multiple items stored in array to library
 * @param {Media} arr 
 * @returns 
 */
const bulkAddToLibrary = (arr) => {
    return arr.map(element => {
        addToLibrary(element);
    })
}

/**
 * Order multiple items
 * @param {*} arr 
 * @returns 
 */
const bulkOrder = (arr) => {
    return Promise.all(arr.map(element => {
        return order(element)
    }))
}

async function test(){
    const book = addToLibrary({
        type: 'book',
        title: "alice's adventures in wonderland",
        author: 'lewis carroll',
        pages: 136
      })
    const movie = addToLibrary({
        type: 'movie',
        title: "alice in wonderland",
        director: 'tim burton',
        length: 108
    })
    const media = addToLibrary({
        title: 'Media'
    })
      
    const startTime = Date.now();
    await bulkOrder(["Alice's Adventures In Wonderland", "Alice In Wonderland", "Media"])
    console.log(Date.now() - startTime) // Ok. 1000
    console.log(book.available) // false
    console.log(movie.available) // false
    console.log(media.available) // false
}
test()
