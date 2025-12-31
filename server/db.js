const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'ecommerce.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

const initialMenuItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    category: 'Pizza'
  },
  {
    id: '2',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with seasonal vegetables',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    category: 'Main Course'
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crispy romaine lettuce with parmesan and croutons',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    category: 'Salad'
  },
  {
    id: '4',
    name: 'Beef Burger',
    description: 'Angus beef patty with cheese, lettuce, and special sauce',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'Burgers'
  },
  {
    id: '5',
    name: 'Pasta Carbonara',
    description: 'Creamy Italian pasta with bacon and parmesan',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
    category: 'Pasta'
  },
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    category: 'Dessert'
  }
];

const initialOffers = [
  {
    id: '1',
    title: '50% OFF Pizza Week',
    description: 'Get 50% off on all pizza orders this week only!',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop',
    discount: 50,
    originalPrice: 25.99,
    active: 1
  },
  {
    id: '2',
    title: 'Family Feast Special',
    description: 'Complete family meal with appetizers, mains, and desserts',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=400&fit=crop',
    discount: 30,
    originalPrice: 59.99,
    active: 1
  },
  {
    id: '3',
    title: 'Happy Hour Special',
    description: 'Buy 1 Get 1 Free on selected items from 4-6 PM',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
    discount: 50,
    originalPrice: 19.99,
    active: 1
  }
];

db.serialize(() => {
  // Menu Items Table
  db.run(`CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    name TEXT,
    description TEXT,
    price REAL,
    image TEXT,
    category TEXT
  )`);

  // Offers Table
  db.run(`CREATE TABLE IF NOT EXISTS offers (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    image TEXT,
    discount REAL,
    originalPrice REAL,
    active INTEGER
  )`);

  // Check if data exists, if not seed
  db.get("SELECT count(*) as count FROM menu_items", (err, row) => {
    if (row.count === 0) {
      console.log("Seeding menu items...");
      const stmt = db.prepare("INSERT INTO menu_items VALUES (?, ?, ?, ?, ?, ?)");
      initialMenuItems.forEach(item => {
        stmt.run(item.id, item.name, item.description, item.price, item.image, item.category);
      });
      stmt.finalize();
    }
  });

  db.get("SELECT count(*) as count FROM offers", (err, row) => {
    if (row.count === 0) {
      console.log("Seeding offers...");
      const stmt = db.prepare("INSERT INTO offers VALUES (?, ?, ?, ?, ?, ?, ?)");
      initialOffers.forEach(offer => {
        stmt.run(offer.id, offer.title, offer.description, offer.image, offer.discount, offer.originalPrice, offer.active);
      });
      stmt.finalize();
    }
  });
});

module.exports = db;
