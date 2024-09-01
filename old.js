const fs = require('fs');
const { parse } = require('csv-parse');
const { delimiter } = require('path');

fs.readFile('username.csv',  (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // 1. Get a list (use delimiter)
    // 2. Randomize the list (Fisher Yates)
    // 3. Assign 0 -> 1 through 4 -> 0 (done in reduce on assignment with %)

    parse(data, {delimiter: ";"}, (error, rows) => {
        if (error) {
            throw new Error('Cannot open the file')
        }
        const people = rows.map(row => row[0]);
        people.shift()
        console.log(`PEOPLE BEFORE: `, people);

        function shuffleFisherYates(array) {
            for (let i = array.length - 1; i > 0; i--){
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffleFisherYates(people)


        const result = people.reduce((acc, person, index) => {
            acc[person] = people[(index + 1) % people.length];
            return acc;
        }, {});

        for ([giver, receiver] of Object.entries(result)) {
            console.log(`${giver} will be giving present to ${receiver}`)
        }
    })
});
