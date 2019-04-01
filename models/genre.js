const Schema =  new mongoose.Schema({
    genreId: {
        type: Number,
        required: true
    },
    genreName: {
        type: String,
        required: true
    }
});   
const genreModel =  mongoose.model('genreStore', Schema);


function validateGenre(genre){
    const schema = {
        genreId: Joi.number().required(),
        genreName: Joi.string().required()
    };

    return Joi.validate(genre, schema);
}
exports.genreModel = genreModel;
exports.validateGenre = validateGenre;