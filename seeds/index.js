const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedsHelper');
const Campground = require('../model/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once('open', () => { console.log('Database connected') });

const sample = arr => arr[Math.floor(Math.random() * arr.length)];
const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '67d7033c4a0ffb38b560cc3c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium incidunt suscipit neque enim eveniet quidem, saepe modi molestias deserunt reiciendis possimus doloremque architecto. Nostrum dolorem quia, sed velit deserunt deleniti!',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dqksibfze/image/upload/v1742269988/YelpCamp/y7tyul76qvknrbuxxabp.jpg',
                    filename: 'YelpCamp/y7tyul76qvknrbuxxabp',
                },
                {
                    url: 'https://res.cloudinary.com/dqksibfze/image/upload/v1742269989/YelpCamp/ll9zuknqbbvm8skoxpfi.jpg',
                    filename: 'YelpCamp/ll9zuknqbbvm8skoxpfi',
                },
                {
                    url: 'https://res.cloudinary.com/dqksibfze/image/upload/v1742269988/YelpCamp/onirmpijc86ikbddyxi4.jpg',
                    filename: 'YelpCamp/onirmpijc86ikbddyxi4',
                }
            ]
        })
        await camp.save();
    }
}

seedDb();