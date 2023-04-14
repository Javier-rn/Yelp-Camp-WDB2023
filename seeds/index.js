const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('./../models/campground');
const getRandomImage = require('./getRandomImage');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 30; i++) {
    const author = '6431842c51d93d90f0e0630f';
    const random1000 = Math.floor(Math.random() * 1000) + 1;
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dptejwozn/image/upload/v1681470491/YelpCamp/dlxaibhxatwjedc8d9ly.jpg',
          filename: 'YelpCamp/dlxaibhxatwjedc8d9ly',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima et sequi quia molestias beatae similique commodi, ex laudantium inventore itaque accusamus aut. Ea ducimus asperiores temporibus incidunt recusandae, placeat accusamus.',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      price,
      author,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
