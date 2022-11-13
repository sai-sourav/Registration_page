const person = {

    firstname: 'sai',

    lastname: 'sourav',

    age: 25,

    hobbies: ['music', 'movies', 'sports'],

    address: {

        street: 'nookalamma temple st',

        city: 'RJY',

        state: 'AP'

    }

}

console.log(person.hobbies[1])

console.log(person.address.state)



//destructuring

const {age} = person
console.log(age)

const { address:{state} } = person
console.log(state)


