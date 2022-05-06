const express = require('express');
const { Image } = require('./models/image');

const uploadToS3 = require('./utils/s3-upload');
const app = express();

const multer = require('multer');
const upload = multer({ dest: 'tmp'});

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('public'));

app.get('/', async (req, res) => {
    const images = await Image.findAll();
    console.log({total: images.length});
    res.render('initial', { images });
});

app.post('/', upload.single('image'), async (req, res) => {
    console.log({ 
        body: req.body,
        file: req.file
    })
    
    let urlS3 = await uploadToS3(req.file.filename);
    
    await Image.create({
        title: req.body.title,
        url: urlS3
    });
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Listening at 3000");
})