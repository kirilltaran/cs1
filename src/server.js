const axios = require('axios');
const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

// In-memory database to store materials
let materials = [];

// Generate a unique ID for materials
let nextMaterialId = 1;

// GET /api/materials - Get all materials
app.get('/api/materials', (req, res) => {
    res.json(materials);
});

// POST /api/materials - Create a new material
app.post('/api/materials', (req, res) => {
    const { name, color } = req.body;
    const material = {
        id: nextMaterialId++,
        name,
        color,
    };
    materials.push(material);
    res.status(201).json(material);
});

// PUT /api/materials/:id - Update a material
app.put('/api/materials/:id', (req, res) => {
    const { id } = req.params;
    const { name, color } = req.body;
    const material = materials.find((m) => m.id === parseInt(id));
    if (!material) {
        res.status(404).json({ error: 'Material not found' });
    } else {
        material.name = name;
        material.color = color;
        res.json(material);
    }
});

// DELETE /api/materials/:id - Delete a material
app.delete('/api/materials/:id', (req, res) => {
    const { id } = req.params;
    const index = materials.findIndex((m) => m.id === parseInt(id));
    if (index === -1) {
        res.status(404).json({ error: 'Material not found' });
    } else {
        const deletedMaterial = materials.splice(index, 1)[0];
        res.json(deletedMaterial);
    }
});

// Serve the static files
app.use(express.static('src/public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
