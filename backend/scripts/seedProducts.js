const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'Samsung Galaxy S23 Ultra 5G',
    description: 'Latest flagship smartphone with 200MP camera, 12GB RAM, 256GB storage, and 5000mAh battery. Features Dynamic AMOLED 2X display and S Pen support.',
    price: 124999,
    originalPrice: 134999,
    category: 'Electronics',
    subcategory: 'Smartphones',
    brand: 'Samsung',
    stock: 50,
    gst: 18,
    images: ['https://images.samsung.com/is/image/samsung/p6pim/in/sm-s918bzkdins/gallery/in-galaxy-s23-s918-sm-s918bzkdins-534864209'],
    rating: 4.5
  },
  {
    name: 'Apple iPhone 15 Pro Max',
    description: 'Premium iPhone with A17 Pro chip, 48MP main camera, Titanium design, and all-day battery life. Available in Natural Titanium, Blue Titanium, White Titanium, and Black Titanium.',
    price: 159900,
    originalPrice: 169900,
    category: 'Electronics',
    subcategory: 'Smartphones',
    brand: 'Apple',
    stock: 30,
    gst: 18,
    images: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-natural-titanium'],
    rating: 4.7
  },
  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise cancellation with 30-hour battery life. Premium sound quality with LDAC codec support and quick charge feature.',
    price: 28990,
    originalPrice: 34990,
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'Sony',
    stock: 75,
    gst: 18,
    images: ['https://www.sony.co.in/image/5c0e0e0e8e8e8e8e8e8e8e8e8e8e8e8e8'],
    rating: 4.6
  },
  {
    name: 'MacBook Pro 14-inch M3',
    description: 'Powerful laptop with M3 chip, 18GB unified memory, 512GB SSD, and Liquid Retina XDR display. Perfect for professionals and creators.',
    price: 199900,
    originalPrice: 219900,
    category: 'Electronics',
    subcategory: 'Laptops',
    brand: 'Apple',
    stock: 25,
    gst: 18,
    images: ['https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-select-202310'],
    rating: 4.8
  },
  {
    name: 'Nike Air Max 90',
    description: 'Classic running shoes with visible Air cushioning, durable rubber outsole, and breathable mesh upper. Available in multiple colorways.',
    price: 8999,
    originalPrice: 10999,
    category: 'Fashion',
    subcategory: 'Footwear',
    brand: 'Nike',
    stock: 100,
    gst: 18,
    images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b2010ec5fc80/air-max-90-shoes-6n3vKB.png'],
    rating: 4.4
  },
  {
    name: 'Levi\'s 511 Slim Fit Jeans',
    description: 'Classic slim fit jeans in dark wash. Made with premium denim, stretch comfort, and signature Levi\'s quality. Perfect for everyday wear.',
    price: 2999,
    originalPrice: 3999,
    category: 'Fashion',
    subcategory: 'Clothing',
    brand: 'Levi\'s',
    stock: 150,
    gst: 18,
    images: ['https://lsco.scene7.com/is/image/lsco/005010237-front-pdp'],
    rating: 4.3
  },
  {
    name: 'Samsung 55-inch 4K Smart TV',
    description: 'Crystal 4K UHD Smart TV with HDR, Tizen OS, and built-in streaming apps. Features PurColor technology and Motion Xcelerator.',
    price: 54999,
    originalPrice: 69999,
    category: 'Electronics',
    subcategory: 'Televisions',
    brand: 'Samsung',
    stock: 40,
    gst: 28,
    images: ['https://images.samsung.com/is/image/samsung/p6pim/in/ua55au7700pxxl/gallery/in-crystal-4k-ua55au7700pxxl-532175256'],
    rating: 4.5
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: '7-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté Pan, Yogurt Maker, and Warmer. 6 Quart capacity.',
    price: 8999,
    originalPrice: 11999,
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    brand: 'Instant Pot',
    stock: 60,
    gst: 18,
    images: ['https://www.instantpot.com/wp-content/uploads/2020/05/DUO60_V2_1.jpg'],
    rating: 4.6
  },
  {
    name: 'OnePlus 12 5G',
    description: 'Flagship killer with Snapdragon 8 Gen 3, 16GB RAM, 256GB storage, 100W fast charging, and 50MP triple camera system.',
    price: 64999,
    originalPrice: 69999,
    category: 'Electronics',
    subcategory: 'Smartphones',
    brand: 'OnePlus',
    stock: 80,
    gst: 18,
    images: ['https://www.oneplus.in/cdn/shop/files/oneplus-12-5g_1.png'],
    rating: 4.5
  },
  {
    name: 'Canon EOS R6 Mark II',
    description: 'Full-frame mirrorless camera with 24.2MP sensor, 4K video recording, and advanced autofocus. Perfect for photography enthusiasts.',
    price: 219999,
    originalPrice: 249999,
    category: 'Electronics',
    subcategory: 'Cameras',
    brand: 'Canon',
    stock: 15,
    gst: 18,
    images: ['https://www.canon.co.in/media/eos-r6-mark-ii_body_angle1_s1.png'],
    rating: 4.7
  },
  {
    name: 'Adidas Ultraboost 22',
    description: 'Premium running shoes with Boost midsole technology, Primeknit upper, and Continental rubber outsole for superior grip.',
    price: 12999,
    originalPrice: 15999,
    category: 'Fashion',
    subcategory: 'Footwear',
    brand: 'Adidas',
    stock: 90,
    gst: 18,
    images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/abc123/ultraboost-22-shoes.png'],
    rating: 4.5
  },
  {
    name: 'Dell XPS 13 Plus',
    description: 'Ultra-thin laptop with Intel Core i7, 16GB RAM, 512GB SSD, and 13.4-inch OLED touch display. Premium build quality.',
    price: 149999,
    originalPrice: 169999,
    category: 'Electronics',
    subcategory: 'Laptops',
    brand: 'Dell',
    stock: 35,
    gst: 18,
    images: ['https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-plus-9320/media-gallery/notebook-xps-13-plus-9320-nt-black-gallery-1.psd'],
    rating: 4.6
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/amazon-clone', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products (optional - comment out if you want to keep existing)
    // await Product.deleteMany({});
    // console.log('Cleared existing products');

    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log(`Found ${existingProducts} existing products. Adding new products...`);
    }

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${insertedProducts.length} products!`);
    console.log('\nProducts added:');
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price.toLocaleString('en-IN')}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database seeding completed!');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();

