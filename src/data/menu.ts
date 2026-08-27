import { MenuItem, BusinessInfo } from '../types';

export const BUSINESS_INFO: BusinessInfo = {
  location: "Behind The Coronation Prabhudayal Marg, Airport Rd, near SS JAIN SUBODH GIRLS COLLEGE, Jaipur, Rajasthan",
  phone: "91193 46060",
  phoneRaw: "9119346060",
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=SS+JAIN+SUBODH+GIRLS+COLLEGE+Airport+Rd+Jaipur+Rajasthan",
  heroHeadline: "GOOD FOOD. GREAT SIPS. BETTER MOMENTS.",
  heroTagline: "Chai • Coffee • Chinese • Shakes • Mocktails"
};

export const MENU_ITEMS: MenuItem[] = [
  // NOODLES
  {
    id: "nood-1",
    name: "Veg. Noodles",
    category: "NOODLES",
    price: 70.00,
    description: "Wok-tossed noodles with crisp seasonal vegetables, garlic, and light Asian soy seasoning.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    tags: ["Wok-Tossed", "Fresh Veggies"]
  },
  {
    id: "nood-2",
    name: "Hakka Noodles",
    category: "NOODLES",
    price: 90.00,
    description: "Classic Indo-Chinese style stir-fried hakka noodles with julienned bell peppers, cabbage, and scallions.",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Classic Hakka", "Popular"]
  },
  {
    id: "nood-3",
    name: "Schezwan Noodles",
    category: "NOODLES",
    price: 100.00,
    description: "Spicy and tangy noodles tossed in homemade fiery schezwan sauce with fragrant red chilies and garlic.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    tags: ["Spicy Schezwan", "Chef Special"]
  },

  // SHAKE
  {
    id: "shk-1",
    name: "Banana",
    category: "SHAKE",
    price: 60.00,
    description: "Creamy milkshake blended with ripe golden bananas and velvety chilled milk.",
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=800&q=80",
    tags: ["Creamy", "Fresh Fruit"]
  },
  {
    id: "shk-2",
    name: "Vanilla",
    category: "SHAKE",
    price: 60.00,
    description: "Rich and smooth aromatic vanilla bean shake topped with whipped cream swirl.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    tags: ["Classic Vanilla"]
  },
  {
    id: "shk-3",
    name: "Mango",
    category: "SHAKE",
    price: 60.00,
    description: "Sun-ripened tropical mango pulp blended with chilled whole milk for luscious indulgence.",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80",
    tags: ["Tropical Mango", "Refreshing"]
  },
  {
    id: "shk-4",
    name: "Chocolate",
    category: "SHAKE",
    price: 70.00,
    description: "Decadent Dutch cocoa shake garnished with chocolate drizzle and shaved chocolate curls.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Rich Cocoa", "Indulgent"]
  },
  {
    id: "shk-5",
    name: "Oreo",
    category: "SHAKE",
    price: 70.00,
    description: "Thick cookies-and-cream shake blended with crushed crunchy Oreo cookies.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Cookies & Cream"]
  },
  {
    id: "shk-6",
    name: "Paan",
    category: "SHAKE",
    price: 70.00,
    description: "Traditional refreshing betel leaf essence with gulkand, cardamoms, and aromatic spices.",
    image: "https://images.unsplash.com/photo-1546173159-315724a31d9b?auto=format&fit=crop&w=800&q=80",
    tags: ["Royal Flavours", "Jaipur Special"]
  },
  {
    id: "shk-7",
    name: "Green Apple",
    category: "SHAKE",
    price: 70.00,
    description: "Crisp and tangy green apple delight blended into a silky chilled milkshake.",
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=800&q=80",
    tags: ["Tangy Crisp"]
  },

  // CHINESE
  {
    id: "chin-1",
    name: "Steam Momos",
    category: "CHINESE",
    price: 60.00,
    description: "Delicate steamed dumplings stuffed with finely minced vegetables, served with fiery red chutney.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Steamed Hot", "Spicy Chutney"]
  },
  {
    id: "chin-2",
    name: "Fried Momos",
    category: "CHINESE",
    price: 80.00,
    description: "Golden crispy fried vegetable momos with a crunchy exterior and juicy flavourful filling.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    tags: ["Crispy Fried"]
  },
  {
    id: "chin-3",
    name: "Chilli Momos",
    category: "CHINESE",
    price: 90.00,
    description: "Crispy momos tossed in hot spicy chilli garlic sauce, diced onions, and green bell peppers.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80",
    tags: ["Fiery Chilli", "Customer Favourite"]
  },
  {
    id: "chin-4",
    name: "Veg. Manchurian (Dry)",
    category: "CHINESE",
    price: 90.00,
    description: "Crispy veggie dumplings wok-tossed with ginger, garlic, chopped chilies, and dark soy.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    tags: ["Crispy Dry", "Appetizer"]
  },
  {
    id: "chin-5",
    name: "Veg. Manchurian (Gravy)",
    category: "CHINESE",
    price: 100.00,
    description: "Tender vegetable balls simmered in a luscious, aromatic Indo-Chinese thick spiced gravy.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    tags: ["Rich Gravy"]
  },
  {
    id: "chin-6",
    name: "Chilli Potato",
    category: "CHINESE",
    price: 100.00,
    description: "Crispy potato fingers tossed in spicy sweet-tangy chilli sauce with sesame seeds and herbs.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    tags: ["Crunchy", "Spicy"]
  },
  {
    id: "chin-7",
    name: "Honey Chilli Potato",
    category: "CHINESE",
    price: 110.00,
    description: "Crunchy potato batons glazed with golden honey, fiery chilli paste, and toasted sesame seeds.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Sweet & Spicy", "Must Try"]
  },
  {
    id: "chin-8",
    name: "Chilli Paneer (Dry)",
    category: "CHINESE",
    price: 120.00,
    description: "Succulent cottage cheese cubes sauteed with crunchy capsicum, onions, and spicy chilli glaze.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Fresh Paneer", "Spicy Wok"]
  },
  {
    id: "chin-9",
    name: "Chilli Paneer (Gravy)",
    category: "CHINESE",
    price: 140.00,
    description: "Fresh soft paneer in a flavour-packed Indo-Chinese gravy with bell peppers and green onions.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    tags: ["Savoury Gravy"]
  },
  {
    id: "chin-10",
    name: "Spring Roll",
    category: "CHINESE",
    price: 80.00,
    description: "Crispy golden wrappers stuffed with spiced shredded vegetables, served with sweet chilli dip.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ["Golden Crispy"]
  },

  // MOCKTAILS
  {
    id: "mock-1",
    name: "Fresh Lemonade",
    category: "MOCKTAILS",
    price: 50.00,
    description: "Zesty freshly squeezed lemon juice with mint sprigs, rock salt, and sparkling ice soda.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    tags: ["Citrus Burst", "Cooling"]
  },
  {
    id: "mock-2",
    name: "Mint Mojito",
    category: "MOCKTAILS",
    price: 60.00,
    description: "Muddled fresh garden mint leaves, fresh lime wedges, simple syrup, and fizzy soda over crushed ice.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Fresh Mint", "Signature"]
  },
  {
    id: "mock-3",
    name: "Virgin Mojito",
    category: "MOCKTAILS",
    price: 70.00,
    description: "Classic Cuban-style mocktail with crisp lime, aromatic mint bouquet, and sparkling soda.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    tags: ["Refreshing"]
  },
  {
    id: "mock-4",
    name: "Watermelon",
    category: "MOCKTAILS",
    price: 70.00,
    description: "Juicy fresh red watermelon nectar infused with crushed ice and a hint of fresh basil.",
    image: "https://images.unsplash.com/photo-1587888637140-849b25d80ef9?auto=format&fit=crop&w=800&q=80",
    tags: ["Hydrating", "Fresh Fruit"]
  },
  {
    id: "mock-5",
    name: "Blue Legoon",
    category: "MOCKTAILS",
    price: 70.00,
    description: "Vibrant blue curaçao citrus syrup with sparkling lemon soda, lime, and crushed ice.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Exotic Blue", "Popular"]
  },
  {
    id: "mock-6",
    name: "Bubblegum",
    category: "MOCKTAILS",
    price: 80.00,
    description: "Nostalgic sweet pink bubblegum syrup shaken over crushed ice and sparkling fizz.",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    tags: ["Fun & Sweet"]
  },
  {
    id: "mock-7",
    name: "Chilli Guava",
    category: "MOCKTAILS",
    price: 80.00,
    description: "Ripe pink guava nectar served with a spicy red chilli and black salt rimmed glass.",
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Spiced Rim", "Desi Twist"]
  },

  // TEA
  {
    id: "tea-1",
    name: "Special Tea",
    category: "TEA",
    price: 15.20,
    description: "Authentic slow-brewed Indian spiced milk tea with crushed ginger, cardamom, and fresh tea leaves.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Desi Chai", "Kadak"]
  },
  {
    id: "tea-2",
    name: "Black Tea",
    category: "TEA",
    price: 20.00,
    description: "Pure aromatic Assam black tea liquor brewed to rich amber perfection.",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80",
    tags: ["Aromatic Assam"]
  },
  {
    id: "tea-3",
    name: "Green Tea",
    category: "TEA",
    price: 30.00,
    description: "Antioxidant-rich whole green tea leaves infused with subtle herbal notes.",
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80",
    tags: ["Healthy & Light"]
  },
  {
    id: "tea-4",
    name: "Lemon Tea",
    category: "TEA",
    price: 30.00,
    description: "Warm soothing black tea infused with freshly squeezed lemon juice and a touch of honey.",
    image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=800&q=80",
    tags: ["Soothing Citrus"]
  },
  {
    id: "tea-5",
    name: "Lemon Ice Tea",
    category: "TEA",
    price: 50.00,
    description: "Chilled black tea shaken with lemon juice, mint, and ice cubes for instant refreshment.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
    tags: ["Chilled Brew"]
  },
  {
    id: "tea-6",
    name: "Peach Ice Tea",
    category: "TEA",
    price: 60.00,
    description: "Delicate iced tea infused with sweet juicy peach nectar and mint garnish.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Fruity & Sweet"]
  },

  // COFFEE
  {
    id: "cof-1",
    name: "Black Coffee",
    category: "COFFEE",
    price: 20.00,
    description: "Bold dark-roast coffee extraction delivering intense flavour and deep aroma.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    tags: ["Bold Roast"]
  },
  {
    id: "cof-2",
    name: "Hot Coffee",
    category: "COFFEE",
    price: 30.00,
    description: "Classic freshly frothed Indian style hot coffee with creamy foam on top.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Frothy Milk", "Comforting"]
  },
  {
    id: "cof-3",
    name: "Butter Hot Coffee",
    category: "COFFEE",
    price: 40.00,
    description: "Rich velvety hot coffee whisked with pure dairy butter for a silky smooth finish.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    tags: ["Silky Butter", "Speciality"]
  },
  {
    id: "cof-4",
    name: "Espresso Coffee",
    category: "COFFEE",
    price: 50.00,
    description: "Single concentrated shot of rich espresso with golden crema on top.",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
    tags: ["Intense Crema"]
  },
  {
    id: "cof-5",
    name: "Cold Coffee",
    category: "COFFEE",
    price: 50.00,
    description: "Chilled blended coffee with milk, sugar, and rich coffee froth over ice.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Chilled Favourites"]
  },
  {
    id: "cof-6",
    name: "Hot Chocolate",
    category: "COFFEE",
    price: 60.00,
    description: "Warm melted premium cocoa and steamed whole milk, topped with chocolate dusting.",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80",
    tags: ["Pure Chocolate", "Warm"]
  },
  {
    id: "cof-7",
    name: "Cold Coffee With Ice Cream",
    category: "COFFEE",
    price: 70.00,
    description: "Thick cold coffee topped with a generous scoop of vanilla ice cream and chocolate drizzle.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Ice Cream Scoop", "Best Seller"]
  }
];

export const GALLERY_ITEMS = [
  {
    title: "Special Spiced Chai",
    category: "Chai Culture",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80",
    span: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    title: "Artisanal Espresso & Froth",
    category: "Coffee Craft",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    title: "Steaming Fresh Momos",
    category: "Chinese Specialties",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    title: "Wok-Tossed Hakka Noodles",
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-1 row-span-2"
  },
  {
    title: "Sizzling Chilli Paneer",
    category: "Chinese Specialties",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    title: "Decadent Chocolate & Oreo Shakes",
    category: "Thick Shakes",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    title: "Sparkling Mint & Blue Legoon Mocktails",
    category: "Chilled Mocktails",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    title: "Cozy Café Atmosphere in Jaipur",
    category: "Café Ambiance",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
    span: "col-span-1 md:col-span-2 row-span-1"
  }
];
