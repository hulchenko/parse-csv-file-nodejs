const fs = require('fs');
const { parse } = require('csv-parse');
const { delimiter } = require('path');

fs.readFile('oscar_age_male.csv', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // 1. Get a list (use delimiter)
    // 2. Randomize the list (Fisher Yates)
    // 3. Assign 0 -> 1 through 4 -> 0 (done in reduce on assignment with %)

    parse(data, {columns: true, trim: true, skip_empty_lines: true}, (error, rows) => {
        if (error) {
            throw new Error(`Cannot open the file: ${error}`)
        }
        const people = rows.map((data) => data.Name);

        function shuffleFisherYates(array) {
            for (let a = array.length - 1; a > 0; a--){
                const b = Math.floor(Math.random() * (a + 1));
                [array[a], array[b]] = [array[b], array[a]];
            }
        }
        shuffleFisherYates(people)

        const mapping = people.reduce((obj, person, index) => {
            const nextIndex = (index + 1) % people.length;
            obj[person] = people[nextIndex];
            return obj
        }, {})


        for ([giver, receiver] of Object.entries(mapping)) {
            console.log(`${giver} gives gift to ${receiver}`)
        }
    })
});
