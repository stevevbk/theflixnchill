const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
const products = [
  {
    id: 'burger-flix',
    name: 'Burger Flix',
    description: 'Le classique indémodable, avec notre sauce secrète.',
    price: 8.50,
    category: 'burgers',
    image: 'https://placehold.co/600x400/000000/FFFFFF?text=Burger+Flix'
  },
  {
    id: 'pizza-chill',
    name: 'Pizza Chill',
    description: 'Pepperoni, fromage fondant et une touche de piment.',
    price: 12.00,
    category: 'pizzas',
    image: 'https://placehold.co/600x400/000000/FFFFFF?text=Pizza+Chill'
  },
  {
    id: 'box-series',
    name: 'Box Séries',
    description: 'Nuggets, frites et boisson pour vos nuits de binge-watching.',
    price: 15.50,
    category: 'boxes',
    image: 'https://placehold.co/600x400/000000/FFFFFF?text=Box+Séries'
  },
  {
    id: 'milkshake-oreo',
    name: 'Milkshake Oreo',
    description: 'Le plaisir coupable parfait pour accompagner votre film.',
    price: 6.00,
    category: 'boissons',
    image: 'https://placehold.co/600x400/000000/FFFFFF?text=Milkshake'
  }
];

const movies = [
  {
    id: 'film-1',
    title: 'Film A',
    type: 'film',
    image: 'https://placehold.co/500x750/1a1a1a/ffffff?text=Film+A',
    votes: 45
  },
  {
    id: 'film-2',
    title: 'Film B',
    type: 'film',
    image: 'https://placehold.co/500x750/1a1a1a/ffffff?text=Film+B',
    votes: 75
  },
  {
    id: 'serie-x',
    title: 'Série X',
    type: 'serie',
    image: 'https://placehold.co/500x750/1a1a1a/ffffff?text=Série+X',
    votes: 60
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'The Flix n\' Chill API is running!' });
});

// Products routes
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  if (category) {
    const filteredProducts = products.filter(product => product.category === category);
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Movies routes
app.get('/api/movies', (req, res) => {
  const { type } = req.query;
  if (type) {
    const filteredMovies = movies.filter(movie => movie.type === type);
    res.json(filteredMovies);
  } else {
    res.json(movies);
  }
});

app.post('/api/movies/:id/vote', (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (movie) {
    movie.votes += 1;
    res.json({ success: true, votes: movie.votes });
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Orders routes
app.post('/api/orders', (req, res) => {
  const { items, total, customerInfo } = req.body;
  
  // Simulate order creation
  const order = {
    id: `FC${Date.now()}`,
    items,
    total,
    customerInfo,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  res.json({ success: true, order });
});

// Reservations routes
app.post('/api/reservations', (req, res) => {
  const { date, time, guests, customerInfo } = req.body;
  
  // Simulate reservation creation
  const reservation = {
    id: `RES${Date.now()}`,
    date,
    time,
    guests,
    customerInfo,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  
  res.json({ success: true, reservation });
});

// Admin routes
app.get('/api/admin/orders', (req, res) => {
  // Simulate admin orders data
  const orders = [
    {
      id: 'FC1024',
      customer: 'Jean Dupont',
      date: '22/06/2025',
      amount: 25.50,
      status: 'delivered'
    },
    {
      id: 'FC1023',
      customer: 'Marie Claire',
      date: '22/06/2025',
      amount: 42.00,
      status: 'preparing'
    }
  ];
  
  res.json(orders);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 