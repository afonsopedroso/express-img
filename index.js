const Joi = require('joi')
const express = require('express');
const app = express();

app.use(express.json())

const movies = [{
    id:1,
    movie:'Mobie Dick'
},
{   
    id:2,
    movie:"Harry Potter",
},
{
    id:3,
    movie:"Jurassic Parks"
}];

app.get('/api/movies' ,(req, res) => {
    res.send(movies)
})

//Put

app.put('/api/movies/:id', (req, res) => {
    const movie = movies.find((movie) => movie.id === parseInt(req.params.id))
    if (!movie) 
      return res.status(404).send('The Movie with the given ID does not exist');    

    const {error} = ValidateMovie(req.body);
    if(error)
       return res.send(400).send(result.error)
    
   
    movie.movie = req.body.movie;
    res.send(movie)

})


app.post('/api/movies', (req, res) => {
    
    const {error} = ValidateMovie(req.body)
    if(error){
        // 400 Bad Request
        res.status(400).send(result.error);
        return
    }
    const movie = {
        id: movies.length +1,
        movie: req.body.movie,
    }
    movies.push(movie)
    res.send(movie)
})

app.get('/' , (req, res) => {
    res.send('Hello World')
})

function ValidateMovie(movie) {
    const schema = Joi.object({       
        movie: Joi.string().required()
    })

    return schema.validate(movie);
}
// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))