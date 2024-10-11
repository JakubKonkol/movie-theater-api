const getById = async (req, res) => {
    const id = req.params.id;

    res.json({
        id: id,
        title: 'The Shawshank Redemption',
        year: 1994,
        genre: 'Drama',
        director: 'Frank Darabont',
        actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton']
    })
}

export { getById };