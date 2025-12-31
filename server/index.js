require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// --- Menu Items Routes ---

// Get all menu items
app.get('/api/menu-items', (req, res) => {
    const sql = 'SELECT * FROM menu_items';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// Add a menu item
app.post('/api/menu-items', (req, res) => {
    const { id, name, description, price, image, category } = req.body;
    const sql = 'INSERT INTO menu_items (id, name, description, price, image, category) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [id, name, description, price, image, category];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Menu item created', id: id });
    });
});

// Update a menu item
app.put('/api/menu-items/:id', (req, res) => {
    const { name, description, price, image, category } = req.body;
    const sql = `UPDATE menu_items SET name = ?, description = ?, price = ?, image = ?, category = ? WHERE id = ?`;
    const params = [name, description, price, image, category, req.params.id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Menu item updated', changes: this.changes });
    });
});

// Delete a menu item
app.delete('/api/menu-items/:id', (req, res) => {
    const sql = 'DELETE FROM menu_items WHERE id = ?';
    db.run(sql, req.params.id, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Menu item deleted', changes: this.changes });
    });
});

// --- Offers Routes ---

// Get all offers
app.get('/api/offers', (req, res) => {
    const sql = 'SELECT * FROM offers';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        // Convert active (0/1) to boolean for frontend consistency if needed, 
        // or handle 0/1 in frontend. Let's send as is for now, 
        // but typically SQLite stores bools as integers.
        const offers = rows.map(offer => ({
            ...offer,
            active: !!offer.active
        }));
        res.json({ data: offers });
    });
});

// Add an offer
app.post('/api/offers', (req, res) => {
    const { id, title, description, image, discount, originalPrice, active } = req.body;
    const sql = 'INSERT INTO offers (id, title, description, image, discount, originalPrice, active) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const params = [id, title, description, image, discount, originalPrice, active ? 1 : 0];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Offer created', id: id });
    });
});

// Update an offer
app.put('/api/offers/:id', (req, res) => {
    const { title, description, image, discount, originalPrice, active } = req.body;
    const sql = `UPDATE offers SET title = ?, description = ?, image = ?, discount = ?, originalPrice = ?, active = ? WHERE id = ?`;
    const params = [title, description, image, discount, originalPrice, active ? 1 : 0, req.params.id];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Offer updated', changes: this.changes });
    });
});

// Delete an offer
app.delete('/api/offers/:id', (req, res) => {
    const sql = 'DELETE FROM offers WHERE id = ?';
    db.run(sql, req.params.id, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Offer deleted', changes: this.changes });
    });
});

// --- Payment Routes ---

app.post('/api/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects amount in cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
