// import modules: express, body-parser, fs
const express = require("express");
const PORT = process.env.PORT || 3030;
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();


// set the app
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));

// set the get method
app.get("/", function(req, res){
    // set default variables
    words_input = "";
    words_length = 11;
    words = "";
    // render the template, and paste variables into it
    res.render('list', {anagrams: words, words_length, words_input});
});

// set the post method
app.post("/", function(req, res){
    // get the input values from the form
    let words_input = req.body.field1.toLowerCase();
    let words_length = parseInt(req.body.field4);
    let letters = words_input.split("");
    let words = search_engine(letters, words_length);
    // render the template, and paste variables into it
    res.render('list', {anagrams: words, words_length, words_input})
})

// anagram search function
function search_engine(letters, length){
    // open the text file
    let data = fs.readFileSync('spell_checked_sorted_words_data/words_length_' + length + '.txt', 'latin1');
    // convert the content into an array
    let arr = data.split(/\r?\n/);
    let words = [];
    // loop through the words array
    for (line in arr){
        let count = 0
        // copy the original letters array from the user input form
        let char_arr = [...letters];
        // convert the words line to lowercase
        lowercase_word = arr[line].toLowerCase();
        // loop through the word and compare with the user input
        for (char in lowercase_word){
            if (char_arr.includes(lowercase_word[char])){
                count ++;
                let index = char_arr.indexOf(lowercase_word[char]);
                char_arr.splice(index, 1);
            } else {
                continue
            }
        }
        // if every letter exists in the user input, add the word into an array
        if (count > length - 1) {
            words.push(' ' + lowercase_word); 
        }
    }
    words.sort()
    if (words.length > 0) {
        words[0] = words[0].trim();
    }
    // return the array
    return words;
}

// start the server
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});