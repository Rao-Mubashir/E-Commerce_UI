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
    name: 'Advanced Pain Relief Gel',
    description: 'Fast-acting topical gel for muscle and joint pain relief',
    detailPageDescription: 'This advanced pain relief gel is formulated with powerful analgesics to provide instant relief from muscle aches, joint pain, and inflammation. Its non-greasy formula absorbs quickly, making it perfect for daily use.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1550572017-edb201a0cb8b?q=80&w=2070&auto=format&fit=crop',
    category: 'Pain Relief'
  },
  {
    id: '2',
    name: 'Multivitamin Complex',
    description: 'Daily essential vitamins and minerals for overall health',
    detailPageDescription: 'Our comprehensive multivitamin complex supports your immune system, energy levels, and overall well-being. Packed with essential nutrients like Vitamin C, D, and Zinc, it is your daily shield against fatigue.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1551241852-51aef9121773?q=80&w=2070&auto=format&fit=crop',
    category: 'Vitamins'
  },
  {
    id: '3',
    name: 'Digital Thermometer',
    description: 'Accurate and fast readings with fever alarm',
    detailPageDescription: 'A must-have for every household, this digital thermometer gives precise temperature readings in seconds. Features a fever alarm, memory recall, and a flexible tip for comfort.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=2069&auto=format&fit=crop',
    category: 'Devices'
  },
  {
    id: '4',
    name: 'Immunity Booster Pack',
    description: 'Vitamin C, Zinc, and Elderberry supplement pack',
    detailPageDescription: 'Boost your body\'s natural defenses with our Immunity Booster Pack. Combining the power of Vitamin C, Zinc, and Elderberry, this supplement is designed to keep you healthy during flu season and beyond.',
    price: 34.99,
    image: 'https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?q=80&w=2070&auto=format&fit=crop',
    category: 'Immunity'
  },
  {
    id: '5',
    name: 'First Aid Kit Professional',
    description: 'Comprehensive kit for home and travel emergencies',
    detailPageDescription: 'Be prepared for any emergency with our Professional First Aid Kit. It includes bandages, antiseptics, scissors, and other essential medical supplies, organized in a durable, portable case.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=2070&auto=format&fit=crop',
    category: 'First Aid'
  },
  {
    id: '6',
    name: 'Probiotic Support',
    description: 'Advanced digestive health formula',
    detailPageDescription: 'Restore balance to your gut with our Probiotic Support supplement. Formulated with 50 billion CFUs and multiple strains of beneficial bacteria, it promotes healthy digestion and improved nutrient absorption.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1626425988358-150cc88af133?q=80&w=1974&auto=format&fit=crop',
    category: 'Digestion'
  }
];

const initialOffers = [
  {
    id: '1',
    title: 'Vitamin Essentials',
    description: 'Get 25% off on all daily vitamin supplements!',
    detailPageDescription: 'Take charge of your health with our Vitamin Essentials sale! For a limited time, enjoy a flat 25% discount on our entire range of daily vitamins. Whether you need Vitamin D for immunity or B-Complex for energy, now is the perfect time to stock up.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop',
    discount: 25,
    originalPrice: 39.99,
    active: 1
  },
  {
    id: '2',
    title: 'Family Health Bundle',
    description: 'Complete health check kit and first aid essentials',
    detailPageDescription: 'Ensure your family\'s safety with our Family Health Bundle. This exclusive package includes a digital thermometer, pulse oximeter, and a fully stocked first aid kit—everything you need to handle minor health concerns at home.',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1979&auto=format&fit=crop',
    discount: 30,
    originalPrice: 89.99,
    active: 1
  },
  {
    id: '3',
    title: 'Senior Care Special',
    description: 'Exclusive discounts on supplements for seniors',
    detailPageDescription: 'We care about our seniors! Get special discounts on supplements tailored for joint health, heart support, and energy. Our Senior Care Special ensures you get premium quality health products at affordable prices.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    discount: 20,
    originalPrice: 45.99,
    active: 1
  }
];

db.serialize(() => {
  // Menu Items Table
  db.run(`CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    name TEXT,
    description TEXT,
    detail_page_description TEXT,
    price REAL,
    image TEXT,
    category TEXT
  )`);

  // Offers Table
  db.run(`CREATE TABLE IF NOT EXISTS offers (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    detail_page_description TEXT,
    image TEXT,
    discount REAL,
    originalPrice REAL,
    active INTEGER
  )`);

  // Admins Table
  db.run(`CREATE TABLE IF NOT EXISTS admins (
    username TEXT PRIMARY KEY,
    password TEXT
  )`);

  // Check if data exists, if not seed
  db.get("SELECT count(*) as count FROM menu_items", (err, row) => {
    if (row && row.count === 0) {
      console.log("Seeding menu items...");
      const stmt = db.prepare("INSERT INTO menu_items VALUES (?, ?, ?, ?, ?, ?, ?)");
      initialMenuItems.forEach(item => {
        stmt.run(item.id, item.name, item.description, item.detailPageDescription, item.price, item.image, item.category);
      });
      stmt.finalize();
    }
  });

  db.get("SELECT count(*) as count FROM offers", (err, row) => {
    if (row && row.count === 0) {
      console.log("Seeding offers...");
      const stmt = db.prepare("INSERT INTO offers VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      initialOffers.forEach(offer => {
        stmt.run(offer.id, offer.title, offer.description, offer.detailPageDescription, offer.image, offer.discount, offer.originalPrice, offer.active);
      });
      stmt.finalize();
    }
  });

  db.get("SELECT count(*) as count FROM admins", (err, row) => {
    if (row && row.count === 0) {
      console.log("Seeding admin...");
      const stmt = db.prepare("INSERT INTO admins VALUES (?, ?)");
      stmt.run('admin', 'admin123');
      stmt.finalize();
    }
  });
});

module.exports = db;
