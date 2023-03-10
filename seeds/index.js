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
    const random1000 = Math.floor(Math.random() * 1000) + 1;
    const price= Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      imageURL: await getRandomImage(),
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima et sequi quia molestias beatae similique commodi, ex laudantium inventore itaque accusamus aut. Ea ducimus asperiores temporibus incidunt recusandae, placeat accusamus.',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      price
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
