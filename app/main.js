const app = new App('#app');
const api = new API();

const dogTemplate = (dog) => `
<section class="dog-listing">
  <a href="#/dogs/${dog.id}">
    <h3 class="name">${dog.name}</h3>
    <section>
      <figure>
        <img src="${dog.imageUrl}" alt="${dog.name}"/>
        <figcaption>${dog.imageCaption}</figcaption>
      <figure>
       <p>${dog.description}</p>
    <section>
`

app.addComponent({
    name: 'dogs',
    model: {
        dogs: []
    },
    view(model) {
        const dogsHTML = model.dogs.reduce((html, dog) => html + `<li>${dogTemplate(dog)}</li>`, '')
        return `
            <ul class="dogs">
                ${dogsHTML}
            </ul>
        `
    },
    controller(model) {
        api.getDogs()
        .then(result => {
            console.log(result)
            model.dogs = result.dogs
        })
    }
})

app.addComponent({
    nam: 'dog',
    model: {
        dog: {}
    },
    view(model) {
        return dogTemplate(model.dog)
    },
    controller(model) {
        api.getDog(1)
        .then(result => {
            model.dog = result.dog
        })
    }
})

const router = new Router(app);
router.addRoute('dogs', '^#/dogs$')
router.addRoute('dog', '^#/dogs/([0-9]*)$')