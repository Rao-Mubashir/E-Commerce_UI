require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const stripe = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;
if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('Warning: STRIPE_SECRET_KEY is not set. Payment features will not work.');
}

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
        const data = rows.map(row => ({
            ...row,
            detailPageDescription: row.detail_page_description,
            detail_page_description: undefined // Clean up
        }));
        res.json({ data });
    });
});

// Add a menu item
app.post('/api/menu-items', (req, res) => {
    const { id, name, description, detailPageDescription, price, image, category } = req.body;
    const sql = 'INSERT INTO menu_items (id, name, description, detail_page_description, price, image, category) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const params = [id, name, description, detailPageDescription, price, image, category];
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
    const { name, description, detailPageDescription, price, image, category } = req.body;
    const sql = `UPDATE menu_items SET name = ?, description = ?, detail_page_description = ?, price = ?, image = ?, category = ? WHERE id = ?`;
    const params = [name, description, detailPageDescription, price, image, category, req.params.id];
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
            active: !!offer.active,
            detailPageDescription: offer.detail_page_description,
            detail_page_description: undefined
        }));
        res.json({ data: offers });
    });
});

// Add an offer
app.post('/api/offers', (req, res) => {
    const { id, title, description, detailPageDescription, image, discount, originalPrice, active } = req.body;
    const sql = 'INSERT INTO offers (id, title, description, detail_page_description, image, discount, originalPrice, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [id, title, description, detailPageDescription, image, discount, originalPrice, active ? 1 : 0];
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
    const { title, description, detailPageDescription, image, discount, originalPrice, active } = req.body;
    const sql = `UPDATE offers SET title = ?, description = ?, detail_page_description = ?, image = ?, discount = ?, originalPrice = ?, active = ? WHERE id = ?`;
    const params = [title, description, detailPageDescription, image, discount, originalPrice, active ? 1 : 0, req.params.id];
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

// --- Admin Routes ---

// Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM admins WHERE username = ? AND password = ?';
    db.get(sql, [username, password], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.json({ message: 'Login successful', username: row.username });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// Update Password
app.put('/api/admin/update-password', (req, res) => {
    const { username, newPassword } = req.body;
    const sql = 'UPDATE admins SET password = ? WHERE username = ?';
    db.run(sql, [newPassword, username], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes > 0) {
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// --- Payment Routes ---

app.post('/api/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        if (!stripe) {
            throw new Error('Stripe is not configured on the server');
        }
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
