import api from './api';

// Fungsi untuk menambah item ke keranjang
export const addItemToCart = async (waste_id, quantity) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari local storage
    const response = await api.post('/cart/add', {
      waste_id,
      quantity,
    }, {
      headers: {
        'Authorization': `Bearer ${token}` // Menambahkan token ke header
      }
    });
    return response.data; // Mengembalikan data dari API
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error; // Melempar error untuk ditangani di tempat lain
  }
};

// Fungsi untuk mengurangi item di keranjang
export const decreaseItemInCart = async (waste_id, quantity) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari local storage
    const response = await api.post('/cart/decrease', {
      waste_id,
      quantity,
    }, {
      headers: {
        'Authorization': `Bearer ${token}` // Menambahkan token ke header
      }
    });
    return response.data; // Mengembalikan data dari API
  } catch (error) {
    console.error('Error decreasing item in cart:', error);
    throw error; // Melempar error untuk ditangani di tempat lain
  }
};

// Fungsi untuk mengambil semua item di keranjang
export const fetchCartItems = async () => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari local storage
    const response = await api.get('/cart/view', {
      headers: {
        'Authorization': `Bearer ${token}` // Menambahkan token ke header
      }
    });
    return response.data; // Mengembalikan data dari API
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error; // Melempar error untuk ditangani di tempat lain
  }
};

// Fungsi untuk menghapus item dari keranjang
export const deleteItemFromCart = async (waste_id) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari local storage
    const response = await api.delete('/cart/delete', {
      headers: {
        'Authorization': `Bearer ${token}` // Menambahkan token ke header
      },
      data: { waste_id }, // Mengirimkan data untuk penghapusan
    });
    return response.data; // Mengembalikan data dari API
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    throw error; // Melempar error untuk ditangani di tempat lain
  }
};