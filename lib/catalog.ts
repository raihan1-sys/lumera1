// ---------------------------------------------------------------------------
// Lumera catalog — single source of truth for navigation + products.
// Structure: Category -> Group (only Fashion has real groups: women/men/kids,
// every other department has one hidden "all" group) -> Subcategory -> Products.
// Every product carries explicit category/group/subcategory fields, so a page
// is never guessing which department a product belongs to.
// ---------------------------------------------------------------------------
const U = '?auto=format&fit=crop&w=1400&q=85';
const P = '?auto=format&fit=crop&w=900&q=85';
const img = (id: string, size = P) =>
  `https://images.unsplash.com/${id}${size}`;

export type Sub = { slug: string; name: string };
export type Group = { slug: string; name: string; subs: Sub[] };
export type Category = {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  image: string;
  banner: string;
  groups: Group[];
};
export type Product = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categoryName: string;
  group: string;
  groupName: string;
  gender?: string;
  subcategory: string;
  subcategoryName: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  stock: number;
  badge?: string;
  sizes?: string[];
  colors?: string[];
};

type LeafDef = {
  slug: string;
  name: string;
  images: string[];
  brands: string[];
  models: string[];
  price: [number, number];
  sizes?: string[];
  colors?: string[];
};

type GroupDef = {
  slug: string;
  name: string;
  subs: LeafDef[];
};

type DeptDef = {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  image: string;
  banner: string;
  groups: GroupDef[];
};

const L = (
  slug: string,
  name: string,
  images: string[],
  brands: string[],
  models: string[],
  price: [number, number],
  sizes?: string[],
  colors?: string[]
): LeafDef => ({
  slug,
  name,
  images,
  brands,
  models,
  price,
  sizes,
  colors,
});

// clothing size/color helpers reused across fashion leaves
const AS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const NUM = ['28', '30', '32', '34', '36', '38'];
const SHOE_W = ['5', '6', '7', '8', '9', '10'];
const SHOE_M = ['7', '8', '9', '10', '11', '12'];
const CLR_CLOTH = ['Black', 'White', 'Navy', 'Beige', 'Olive', 'Burgundy'];
const CLR_SHOE = ['Black', 'White', 'Grey', 'Red', 'Tan'];

const DEPARTMENTS: DeptDef[] = [
  {
    slug: 'fashion',
    name: 'Fashion',
    icon: '◇',
    tagline: 'A sharper everyday',
    description:
      'Curated wardrobe essentials and elevated pieces for every occasion.',
    image: img('photo-1485230895905-ec40ba36b9bc', U),
    banner: img('photo-1483985988355-763728e1935b', U),
    groups: [
      {
        slug: 'women',
        name: 'Women',
        subs: [
          L(
            'dresses',
            'Dresses',
            [
              img('photo-1595777457583-95e059d581b8'),
              img('photo-1515372039744-b8f02a3ae446'),
              img('photo-1496747611176-843222e1e57c'),
            ],
            ['Zara', 'Reformation', 'Mango', 'H&M'],
            [
              'Wrap Midi Dress',
              'Floral Sundress',
              'Satin Slip Dress',
              'Knit Bodycon Dress',
              'Puff-Sleeve Dress',
            ],
            [45, 190],
            AS,
            CLR_CLOTH
          ),
          L(
            'tops',
            'Tops',
            [
              img('photo-1434389677669-e08b4cac3105'),
              img('photo-1503341504253-dff4815485f1'),
              img('photo-1554568218-0f1715e72254'),
            ],
            ['Zara', 'Uniqlo', 'Everlane', 'Mango'],
            [
              'Silk Blouse',
              'Ribbed Tank',
              'Cropped Cardigan',
              'Linen Shirt',
              'Wrap Top',
            ],
            [20, 95],
            AS,
            CLR_CLOTH
          ),
          L(
            'trousers',
            'Trousers',
            [
              img('photo-1594633312681-425c7b97ccd1'),
              img('photo-1541099649105-f69ad21f3246'),
            ],
            ['Zara', 'Mango', 'Everlane', 'COS'],
            [
              'Tailored Trouser',
              'Wide-Leg Pant',
              'Pleated Chino',
              'High-Rise Straight',
            ],
            [45, 140],
            NUM,
            CLR_CLOTH
          ),
          L(
            'skirts',
            'Skirts',
            [
              img('photo-1583744946564-b6069f7d5d3a'),
              img('photo-1551163943-3f6a855d1153'),
            ],
            ['Zara', 'Mango', 'H&M', 'Reformation'],
            [
              'Pleated Midi Skirt',
              'Denim Mini Skirt',
              'A-Line Skirt',
              'Satin Slip Skirt',
            ],
            [35, 120],
            AS,
            CLR_CLOTH
          ),
          L(
            'jackets',
            'Jackets',
            [
              img('photo-1551028719-00167b16eac5'),
              img('photo-1521572163474-6864f9cf17ab'),
            ],
            ["Levi's", 'Zara', 'Mango', 'COS'],
            [
              'Cropped Denim Jacket',
              'Wool Blazer',
              'Quilted Puffer',
              'Trench Coat',
            ],
            [85, 320],
            AS,
            CLR_CLOTH
          ),
          L(
            'shoes',
            'Shoes',
            [
              img('photo-1543163521-1bf539c55dd2'),
              img('photo-1543163521-1bf539c55dd3'),
              img('photo-1560769629-975ec94e6a86'),
            ],
            ['Nike', 'Adidas', 'Steve Madden', 'Clarks', 'Dr. Martens'],
            [
              'Air Max Sneaker',
              'Ankle Boot',
              'Ballet Flat',
              'Chelsea Boot',
              'Strappy Heel',
            ],
            [55, 220],
            SHOE_W,
            CLR_SHOE
          ),
          L(
            'bags',
            'Bags',
            [
              img('photo-1584917865442-de89df76afd3'),
              img('photo-1548036328-c9fa89d128fa'),
              img('photo-1591561954557-26941169b49e'),
            ],
            ['Coach', 'Michael Kors', 'Fossil', 'Kate Spade'],
            [
              'Structured Tote',
              'Crossbody Bag',
              'Leather Shoulder Bag',
              'Mini Backpack',
            ],
            [90, 650],
            undefined,
            ['Black', 'Tan', 'Cream', 'Burgundy']
          ),
          L(
            'accessories',
            'Accessories',
            [
              img('photo-1611652022419-a9419f74343d'),
              img('photo-1611085583191-a3b181a88401'),
            ],
            ['Mejuri', 'Kate Spade', 'Ray-Ban', 'Anine Bing'],
            [
              'Layered Necklace',
              'Oversized Sunglasses',
              'Silk Scarf',
              'Statement Earrings',
            ],
            [18, 180]
          ),
        ],
      },
      {
        slug: 'men',
        name: 'Men',
        subs: [
          L(
            't-shirts',
            'T-Shirts',
            [
              img('photo-1521572163474-6864f9cf17ab'),
              img('photo-1576566588028-4147f3842f27'),
            ],
            ['Uniqlo', 'Nike', 'Carhartt', 'H&M'],
            [
              'Classic Crew Tee',
              'Graphic Print Tee',
              'Pima Cotton Tee',
              'Pocket Tee',
            ],
            [15, 55],
            AS,
            CLR_CLOTH
          ),
          L(
            'shirts',
            'Shirts',
            [
              img('photo-1602810318383-e386cc2a3ccf'),
              img('photo-1602810319428-019690571b5b'),
            ],
            ['Ralph Lauren', 'Uniqlo', 'COS', 'Brooks Brothers'],
            [
              'Oxford Button-Down',
              'Linen Shirt',
              'Flannel Shirt',
              'Slim-Fit Dress Shirt',
            ],
            [35, 140],
            AS,
            CLR_CLOTH
          ),
          L(
            'trousers',
            'Trousers',
            [
              img('photo-1473966968600-fa801b869a1a'),
              img('photo-1594633312681-425c7b97ccd1'),
            ],
            ['Dockers', 'Zara', 'COS', 'Uniqlo'],
            [
              'Chino Pant',
              'Tailored Trouser',
              'Wool Blend Pant',
              'Cargo Pant',
            ],
            [40, 150],
            NUM,
            CLR_CLOTH
          ),
          L(
            'jeans',
            'Jeans',
            [
              img('photo-1542272604-787c3835535d'),
              img('photo-1541099649105-f69ad21f3246'),
            ],
            ["Levi's", 'Wrangler', 'Diesel', 'Uniqlo'],
            [
              '501 Straight Jean',
              'Slim Tapered Jean',
              'Relaxed Fit Jean',
              'Skinny Jean',
            ],
            [45, 160],
            NUM,
            ['Blue', 'Black', 'Grey']
          ),
          L(
            'jackets',
            'Jackets',
            [
              img('photo-1551028719-00167b16eac5'),
              img('photo-1521223890158-f9f7c3d5d504'),
            ],
            ['The North Face', 'Carhartt', "Levi's", 'Patagonia'],
            [
              'Denim Trucker Jacket',
              'Bomber Jacket',
              'Puffer Jacket',
              'Field Jacket',
            ],
            [70, 320],
            AS,
            CLR_CLOTH
          ),
          L(
            'shoes',
            'Shoes',
            [
              img('photo-1549298916-b41d501d3772'),
              img('photo-1595950653106-6c9ebd614d3a'),
              img('photo-1560343090-f0409e92791a'),
            ],
            ['Nike', 'Adidas', 'New Balance', 'Clarks', 'Dr. Martens'],
            [
              'Air Jordan 1',
              'Ultraboost Runner',
              'Suede Chukka',
              'Chelsea Boot',
              'Court Sneaker',
            ],
            [60, 230],
            SHOE_M,
            CLR_SHOE
          ),
          L(
            'watches',
            'Watches',
            [
              img('photo-1523275335684-37898b6baf30'),
              img('photo-1524805444758-089113d48a6d'),
            ],
            ['Fossil', 'Seiko', 'Citizen', 'Casio'],
            [
              'Chronograph Watch',
              'Automatic Diver',
              'Minimalist Leather Watch',
              'Digital Sport Watch',
            ],
            [65, 650]
          ),
          L(
            'accessories',
            'Accessories',
            [
              img('photo-1553062407-98eeb64c6a62'),
              img('photo-1509941943102-10c232535736'),
            ],
            ['Fossil', 'Ray-Ban', 'Herschel', 'Carhartt'],
            [
              'Leather Belt',
              'Aviator Sunglasses',
              'Canvas Wallet',
              'Wool Beanie',
            ],
            [18, 150]
          ),
        ],
      },
      {
        slug: 'kids',
        name: 'Kids',
        subs: [
          L(
            'boys',
            'Boys',
            [
              img('photo-1519238263530-99bdd11df2ea'),
              img('photo-1503919005314-30d93d07d823'),
            ],
            ["Carter's", 'Gap Kids', 'H&M Kids', 'Nike Kids'],
            [
              'Graphic Tee Set',
              'Jogger Pant',
              'Zip Hoodie',
              'Denim Overall',
            ],
            [15, 60],
            ['2T', '3T', '4T', '5', '6', '7'],
            CLR_CLOTH
          ),
          L(
            'girls',
            'Girls',
            [
              img('photo-1519457851611-b4f47a5c9b2e'),
              img('photo-1522771930-78848d9293e8'),
            ],
            ["Carter's", 'Gap Kids', 'H&M Kids', 'Zara Kids'],
            [
              'Floral Dress',
              'Tulle Skirt',
              'Ruffle Top',
              'Legging Set',
            ],
            [15, 65],
            ['2T', '3T', '4T', '5', '6', '7'],
            CLR_CLOTH
          ),
          L(
            'kids-shoes',
            'Kids Shoes',
            [
              img('photo-1514989940723-e8e51635b782'),
              img('photo-1514989940723-e8e51635b783'),
            ],
            ['Nike', 'Adidas', 'Stride Rite', 'New Balance'],
            [
              'Light-Up Sneaker',
              'Velcro Trainer',
              'School Shoe',
              'Sport Sandal',
            ],
            [25, 80],
            ['10', '11', '12', '13', '1', '2', '3'],
            CLR_SHOE
          ),
          L(
            'kids-clothing',
            'Kids Clothing',
            [
              img('photo-1519238263530-99bdd11df2ea'),
              img('photo-1522771930-78848d9293e8'),
            ],
            ["Carter's", 'Gap Kids', 'Old Navy'],
            [
              'Pajama Set',
              'Winter Coat',
              'Rain Jacket',
              'Play Set',
            ],
            [18, 70],
            ['2T', '3T', '4T', '5', '6', '7']
          ),
        ],
      },
    ],
  },

  {
    slug: 'computers',
    name: 'Computers',
    icon: '◈',
    tagline: 'Power, without compromise',
    description:
      'Professional laptops, creative workstations and essential accessories.',
    image: img('photo-1496181133206-80ce9b88a853', U),
    banner: img('photo-1517336714731-489689fd1ca8', U),
    groups: [
      {
        slug: 'all',
        name: '',
        subs: [
          L(
            'laptops',
            'Laptops',
            [
              img('photo-1496181133206-80ce9b88a853'),
              img('photo-1517336714731-489689fd1ca8'),
              img('photo-1541807084-5c52b6b3adef'),
            ],
            ['Dell', 'Apple', 'HP', 'Lenovo', 'ASUS'],
            [
              'Inspiron 15',
              'MacBook Air 13"',
              'Spectre x360',
              'ThinkPad X1 Carbon',
              'ZenBook 14',
            ],
            [499, 2499]
          ),
          L(
            'desktop-computers',
            'Desktop Computers',
            [
              img('photo-1587831990711-23ca6441447b'),
              img('photo-1593642702821-c8da6771f0c6'),
            ],
            ['Dell', 'HP', 'Apple', 'Lenovo', 'Corsair'],
            [
              'XPS Desktop',
              'Pavilion Tower',
              'Mac Mini M2',
              'IdeaCentre 5',
              'Vengeance Gaming PC',
            ],
            [599, 2999]
          ),
          L(
            'monitors',
            'Monitors',
            [
              img('photo-1527864550417-7fd91fc51a46'),
              img('photo-1527443224154-c4a3942d3acf'),
            ],
            ['LG', 'Samsung', 'Dell', 'ASUS', 'BenQ'],
            [
              '27" UltraGear QHD',
              'Odyssey G7 Curved',
              'UltraSharp 24" IPS',
              'ProArt Display',
              'PD2705Q',
            ],
            [149, 899]
          ),
          L(
            'keyboards',
            'Keyboards',
            [
              img('photo-1587829741301-dc798b83add3'),
              img('photo-1595044426077-d36d9236d54a'),
            ],
            ['Logitech', 'Corsair', 'Razer', 'Keychron'],
            [
              'Mechanical Keyboard K2',
              'MX Keys Wireless',
              'Huntsman TKL',
              'K8 Pro',
            ],
            [29, 199]
          ),
          L(
            'mice',
            'Mice',
            [
              img('photo-1527814050087-3793815479db'),
              img('photo-1615663245857-ac93bb7c39e7'),
            ],
            ['Logitech', 'Razer', 'Corsair'],
            [
              'MX Master 3S',
              'DeathAdder V3',
              'Harpoon Wireless',
              'G305 Lightspeed',
            ],
            [19, 129]
          ),
          L(
            'printers',
            'Printers',
            [
              img('photo-1612815154858-60aa4c59eeaa'),
              img('photo-1611262588024-d12430b98920'),
            ],
            ['HP', 'Canon', 'Epson', 'Brother'],
            [
              'LaserJet Pro',
              'PIXMA All-in-One',
              'EcoTank Printer',
              'HL-L2350DW',
            ],
            [79, 349]
          ),
          L(
            'computer-accessories',
            'Computer Accessories',
            [
              img('photo-1587831990711-23ca6441447b'),
              img('photo-1544244015-0df4b3ffc6b0'),
            ],
            ['Anker', 'Logitech', 'Belkin', 'Kensington'],
            [
              'USB-C Hub',
              'Laptop Stand',
              'Webcam 1080p',
              'Cable Organizer Kit',
            ],
            [15, 120]
          ),
          L(
            'storage',
            'Storage',
            [
              img('photo-1531492746076-161ba9bce798'),
              img('photo-1518333638595-5e4c891c2b34'),
            ],
            ['SanDisk', 'Samsung', 'WD', 'Crucial'],
            [
              '1TB Portable SSD',
              'USB 3.2 Flash Drive',
              'My Passport HDD',
              'MX500 Internal SSD',
            ],
            [19, 229]
          ),
          L(
            'networking',
            'Networking',
            [
              img('photo-1544197150-b99a580bb7a8'),
              img('photo-1591405351990-4726e331f141'),
            ],
            ['TP-Link', 'Netgear', 'ASUS', 'Eero'],
            [
              'AX3000 Wi-Fi Router',
              'Mesh Wi-Fi System',
              'Gigabit Switch',
              'Range Extender',
            ],
            [29, 349]
          ),
        ],
      },
    ],
  },

  {
    slug: 'phones',
    name: 'Phones & Tablets',
    icon: '◍',
    tagline: 'Connected beautifully',
    description:
      'The latest smartphones, tablets and the details that make them yours.',
    image: img('photo-1598327105666-5b89351aff97', U),
    banner: img('photo-1511707171634-5f897ff02aa8', U),
    groups: [
      {
        slug: 'all',
        name: '',
        subs: [
          L(
            'smartphones',
            'Smartphones',
            [
              img('photo-1598327105666-5b89351aff97'),
              img('photo-1511707171634-5f897ff02aa8'),
              img('photo-1580910051074-3eb694886505'),
            ],
            ['Apple', 'Samsung', 'Google', 'OnePlus'],
            [
              'iPhone 15 Pro',
              'Galaxy S24 Ultra',
              'Pixel 8 Pro',
              'OnePlus 12',
            ],
            [399, 1399]
          ),
          L(
            'tablets',
            'Tablets',
            [
              img('photo-1544244015-0df4b3ffc6b0'),
              img('photo-1561154464-82e9adf32764'),
            ],
            ['Apple', 'Samsung', 'Lenovo', 'Amazon'],
            ['iPad Air', 'Galaxy Tab S9', 'Tab P11', 'Fire HD 10'],
            [129, 999]
          ),
          L(
            'cases-covers',
            'Cases & Covers',
            [
              img('photo-1585060544812-6b45742d762f'),
              img('photo-1592286927505-1def25115481'),
            ],
            ['OtterBox', 'Spigen', 'Apple', 'Speck'],
            [
              'Defender Series Case',
              'Ultra Hybrid Case',
              'Silicone MagSafe Case',
              'Presidio Grip Case',
            ],
            [12, 60]
          ),
          L(
            'chargers',
            'Chargers',
            [
              img('photo-1583863788434-e58a36330cf0'),
              img('photo-1591290619762-c15559282f66'),
            ],
            ['Anker', 'Apple', 'Belkin', 'Samsung'],
            [
              '65W GaN Charger',
              'MagSafe Charger',
              '3-in-1 Wireless Pad',
              '20W USB-C Adapter',
            ],
            [15, 89]
          ),
          L(
            'screen-protectors',
            'Screen Protectors',
            [
              img('photo-1585060544812-6b45742d762f'),
              img('photo-1580910051074-3eb694886505'),
            ],
            ['Spigen', 'ZAGG', 'Anker'],
            [
              'Tempered Glass Pack',
              'InvisibleShield',
              'Privacy Screen Guard',
            ],
            [8, 35]
          ),
          L(
            'power-banks',
            'Power Banks',
            [
              img('photo-1591290619762-c15559282f66'),
              img('photo-1583863788434-e58a36330cf0'),
            ],
            ['Anker', 'Belkin', 'RAVPower'],
            [
              'PowerCore 10000mAh',
              '20000mAh Fast Charge',
              'Slim Portable Battery',
            ],
            [19, 79]
          ),
          L(
            'wearables',
            'Wearables',
            [
              img('photo-1523275335684-37898b6baf30'),
              img('photo-1434493789847-2f02dc6ca35d'),
            ],
            ['Apple', 'Samsung', 'Fitbit', 'Garmin'],
            [
              'Apple Watch SE',
              'Galaxy Watch 6',
              'Versa 4',
              'Venu 3',
            ],
            [129, 499]
          ),
        ],
      },
    ],
  },

  {
    slug: 'electronics',
    name: 'Electronics',
    icon: '◉',
    tagline: 'Precision meets possibility',
    description:
      'Flagship technology, refined design and devices built for the way you live.',

    // FIXED: replaced the broken Electronics category image
    image: img('photo-1498049794561-7780e7231661', U),

    banner: img('photo-1498049794561-7780e7231661', U),

    groups: [
      {
        slug: 'all',
        name: '',
        subs: [
          L(
            'tvs',
            'TVs',
            [
              img('photo-1593359677879-a4bb92f829d1'),
              img('photo-1461151304423-40342d0d3e12'),
            ],
            ['Samsung', 'LG', 'Sony', 'TCL'],
            [
              '4K QLED 55"',
              'OLED evo 65"',
              'Bravia XR 50"',
              '6-Series 4K 55"',
            ],
            [349, 2499]
          ),
          L(
            'headphones',
            'Headphones',
            [
              img('photo-1505740420928-5e560c06d30e'),
              img('photo-1546435770-a3e426bf472b'),
            ],
            ['Sony', 'Bose', 'Apple', 'Sennheiser'],
            [
              'WH-1000XM5',
              'QuietComfort Ultra',
              'AirPods Max',
              'Momentum 4 Wireless',
            ],
            [89, 449]
          ),
          L(
            'speakers',
            'Speakers',
            [
              img('photo-1545454675-3531b543be5d'),
              img('photo-1608043152269-423dbba4e7e1'),
            ],
            ['Sonos', 'JBL', 'Bose', 'Marshall'],
            [
              'Sonos One SL',
              'Flip 6',
              'SoundLink Flex',
              'Stanmore II',
            ],
            [59, 399]
          ),
          L(
            'cameras',
            'Cameras',
            [
              img('photo-1516035069371-29a1b244cc32'),
              img('photo-1502920917128-1aa500764cbd'),
            ],
            ['Canon', 'Sony', 'Nikon', 'Fujifilm'],
            [
              'EOS R50',
              'Alpha a6400',
              'Z50 Mirrorless',
              'X-T30 II',
            ],
            [449, 1899]
          ),
          L(
            'smart-watches',
            'Smart Watches',
            [
              img('photo-1523275335684-37898b6baf30'),
              img('photo-1434493789847-2f02dc6ca35d'),
            ],
            ['Apple', 'Garmin', 'Samsung', 'Fitbit'],
            [
              'Apple Watch Series 9',
              'Forerunner 265',
              'Galaxy Watch 6 Classic',
              'Sense 2',
            ],
            [199, 699]
          ),
          L(
            'accessories',
            'Accessories',
            [
              img('photo-1585790050230-5dd28404ccb9'),
              img('photo-1484704849700-f032a568e944'),
            ],
            ['Anker', 'Belkin', 'Logitech'],
            [
              'Multi-Port Hub',
              'Wireless Charging Stand',
              'Bluetooth Adapter',
              'Cable Bundle',
            ],
            [15, 99]
          ),
        ],
      },
    ],
  },

  {
    slug: 'automotive',
    name: 'Automotive',
    icon: '◫',
    tagline: 'Driven by detail',
    description:
      'Premium accessories, tools and technology for the road ahead.',
    image: img('photo-1492144534655-ae79c964c9d7', U),
    banner: img('photo-1503376780353-7e6692767b70', U),
    groups: [
      {
        slug: 'all',
        name: '',
        subs: [
          L(
            'car-accessories',
            'Car Accessories',
            [
              img('photo-1492144534655-ae79c964c9d7'),
              img('photo-1503736334956-4c8f8e92946d'),
            ],
            ['WeatherTech', 'Anker', 'Bell'],
            [
              'All-Weather Floor Mats',
              'Trunk Organizer',
              'Sunshade Kit',
              'Seat Gap Filler',
            ],
            [15, 180]
          ),
          L(
            'car-electronics',
            'Car Electronics',
            [
              img('photo-1553440569-bcc63803a83d'),
              img('photo-1511919884226-fd3cad34687c'),
            ],
            ['Garmin', 'Pioneer', 'Anker'],
            [
              'Dash Cam 4K',
              'Touchscreen Stereo',
              'Bluetooth FM Transmitter',
              'GPS Navigator',
            ],
            [29, 349]
          ),
          L(
            'tires-wheels',
            'Tires & Wheels',
            [
              img('photo-1449965408869-eaa3f722e40d'),
              img('photo-1580414057403-c5f451f30e1c'),
            ],
            ['Michelin', 'Goodyear', 'Bridgestone'],
            [
              'All-Season Tire',
              'Performance Tire',
              'Alloy Wheel Set',
              'Wheel Cover Kit',
            ],
            [89, 399]
          ),
          L(
            'interior-accessories',
            'Interior Accessories',
            [
              img('photo-1503736334956-4c8f8e92946d'),
              img('photo-1502877338535-766e1452684a'),
            ],
            ['WeatherTech', 'FH Group', 'Anker'],
            [
              'Seat Cover Set',
              'Steering Wheel Cover',
              'Car Vacuum',
              'Phone Mount',
            ],
            [12, 150]
          ),
          L(
            'exterior-accessories',
            'Exterior Accessories',
            [
              img('photo-1492144534655-ae79c964c9d7'),
              img('photo-1493238792000-8113da705763'),
            ],
            ['WeatherTech', 'Rain-X', '3M'],
            [
              'Mud Flap Set',
              'Roof Rack Cross Bars',
              'Body Side Molding',
              'Paint Protection Film',
            ],
            [25, 320]
          ),
          L(
            'tools',
            'Tools',
            [
              img('photo-1581147036324-c1c8b5e8f6a2'),
              img('photo-1504148455328-c376907d081c'),
            ],
            ['DEWALT', 'Craftsman', 'Stanley'],
            [
              'Socket Wrench Set',
              'Jump Starter Kit',
              'Tire Pressure Gauge',
              'Mechanic Tool Kit',
            ],
            [19, 220]
          ),
          L(
            'motorcycle',
            'Motorcycle',
            [
              img('photo-1558981806-ec527fa84c39'),
              img('photo-1591637333472-8bb2a5910b98'),
            ],
            ['Bell', 'Alpinestars', 'Icon'],
            [
              'Full-Face Helmet',
              'Riding Gloves',
              'Motorcycle Cover',
              'Saddle Bag',
            ],
            [35, 320]
          ),
          L(
            'car-care',
            'Car Care',
            [
              img('photo-1520340356584-f9917d1eea6f'),
              img('photo-1607860108855-64acf2078ed9'),
            ],
            ['Chemical Guys', "Meguiar's", 'Armor All'],
            [
              'Ceramic Coating Kit',
              'Microfiber Towel Set',
              'Wax & Polish Kit',
              'Interior Cleaner',
            ],
            [10, 120]
          ),
        ],
      },
    ],
  },

  {
    slug: 'home-living',
    name: 'Home & Living',
    icon: '⌂',
    tagline: 'Make space extraordinary',
    description:
      'Furniture, lighting and objects designed to transform your everyday.',
    image: img('photo-1618221195710-dd6b41faaea6', U),
    banner: img('photo-1600210492486-724fe5c67fb0', U),
    groups: [
      {
        slug: 'all',
        name: '',
        subs: [
          L(
            'furniture',
            'Furniture',
            [
              img('photo-1493663284031-b7e3aefcae8e'),
              img('photo-1567016432779-094069958ea5'),
            ],
            ['West Elm', 'IKEA', 'Article'],
            [
              'Mid-Century Sofa',
              'Oak Dining Table',
              'Accent Armchair',
              'Bookshelf Unit',
            ],
            [129, 1899]
          ),
          L(
            'decor',
            'Decor',
            [
              img('photo-1586023492125-27b2c045efd7'),
              img('photo-1618221195710-dd6b41faaea6'),
            ],
            ['CB2', 'West Elm', 'Anthropologie'],
            [
              'Ceramic Vase Set',
              'Woven Wall Hanging',
              'Table Sculpture',
              'Framed Art Print',
            ],
            [18, 180]
          ),
          L(
            'kitchen',
            'Kitchen',
            [
              img('photo-1556911220-e15b29be8c8f'),
              img('photo-1584990347449-a8b0b3d0e5f6'),
            ],
            ['KitchenAid', 'Le Creuset', 'OXO'],
            [
              'Stand Mixer',
              'Dutch Oven',
              'Knife Block Set',
              'Cutting Board Set',
            ],
            [25, 499]
          ),
          L(
            'bedding',
            'Bedding',
            [
              img('photo-1522771739844-6a9f6d5f14af'),
              img('photo-1567016432779-094069958ea5'),
            ],
            ['Brooklinen', 'Parachute', 'Casper'],
            [
              'Percale Sheet Set',
              'Weighted Blanket',
              'Down Alternative Comforter',
              'Memory Foam Pillow',
            ],
            [35, 320]
          ),
          L(
            'lighting',
            'Lighting',
            [
              img('photo-1519710164239-da123dc03ef4'),
              img('photo-1543198126-42482ae4e30f'),
            ],
            ['West Elm', 'Philips', 'CB2'],
            [
              'Arc Floor Lamp',
              'Smart LED Bulb Set',
              'Pendant Light',
              'Table Lamp',
            ],
            [19, 280]
          ),
          L(
            'storage-organization',
            'Storage & Organization',
            [
              img('photo-1586023492125-27b2c045efd7'),
              img('photo-1524758631624-e2822e304c36'),
            ],
            ['IKEA', 'Container Store', 'Yamazaki'],
            [
              'Storage Bin Set',
              'Closet Organizer',
              'Shelving Unit',
              'Under-Bed Storage',
            ],
            [15, 180]
          ),
          L(
            'garden',
            'Garden',
            [
              img('photo-1416879595882-3373a0480b5b'),
              img('photo-1523348837708-15d4a09cfac2'),
            ],
            ['Fiskars', "Gardener's Supply", 'Suncast'],
            [
              'Raised Garden Bed',
              'Pruning Shear Set',
              'Ceramic Planter',
              'Garden Hose Kit',
            ],
            [15, 220]
          ),
          L(
            'appliances',
            'Appliances',
            [
              img('photo-1584990347449-a8b0b3d0e5f6'),
              img('photo-1556911220-e15b29be8c8f'),
            ],
            ['Ninja', 'Instant Pot', 'Dyson'],
            [
              'Air Fryer XL',
              'Multi-Cooker 6QT',
              'Cordless Vacuum',
              'Espresso Machine',
            ],
            [49, 599]
          ),
        ],
      },
    ],
  },

  {
    slug: 'beauty',
    name: 'Beauty',
    icon: '◌',
    tagline: 'Ritual, refined',
    description:
      'Skincare, fragrance and beauty essentials chosen for elevated routines.',
    image: img('photo-1596462502278-27bfdc403348', U),
    banner: img('photo-1594035910387-fea47794261f', U),
    groups: [
      {
        slug: 'all',
        name: '',
        subs: [
          L(
            'skincare',
            'Skincare',
            [
              img('photo-1571781926291-c477ebfd024b'),
              img('photo-1620916566398-39f1143ab7be'),
            ],
            ['CeraVe', 'The Ordinary', 'La Mer', "Kiehl's"],
            [
              'Hydrating Cleanser',
              'Vitamin C Serum',
              'Moisturizing Cream',
              'Retinol Treatment',
            ],
            [12, 220]
          ),
          L(
            'makeup',
            'Makeup',
            [
              img('photo-1522335789203-aabd1fc54bc9'),
              img('photo-1596462502278-27bfdc403348'),
            ],
            ['MAC', 'Fenty Beauty', 'NARS', 'Charlotte Tilbury'],
            [
              'Matte Lipstick',
              'Foundation Stick',
              'Eyeshadow Palette',
              'Highlighter Duo',
            ],
            [18, 68]
          ),
          L(
            'haircare',
            'Haircare',
            [
              img('photo-1585652757173-57de5e9fab42'),
              img('photo-1522337360788-8b13dee7a37e'),
            ],
            ['Olaplex', 'Living Proof', 'Moroccanoil'],
            [
              'No.3 Hair Perfector',
              'Argan Oil Treatment',
              'Volumizing Shampoo',
              'Leave-In Conditioner',
            ],
            [15, 90]
          ),
          L(
            'fragrance',
            'Fragrance',
            [
              img('photo-1541643600914-78b084683601'),
              img('photo-1594035910387-fea47794261f'),
            ],
            ['Dior', 'Chanel', 'Jo Malone', 'Yves Saint Laurent'],
            [
              'Sauvage EDT',
              'Coco Mademoiselle',
              'Wood Sage & Sea Salt',
              'Black Opium',
            ],
            [49, 180]
          ),
          L(
            'tools-accessories',
            'Tools & Accessories',
            [
              img('photo-1522337360788-8b13dee7a37e'),
              img('photo-1522335789203-aabd1fc54bc9'),
            ],
            ['Revlon', 'Tweezerman', 'Dyson'],
            [
              'Hair Dryer',
              'Precision Tweezer',
              'Makeup Brush Set',
              'Facial Roller',
            ],
            [10, 399]
          ),
          L(
            'mens-grooming',
            "Men's Grooming",
            [
              img('photo-1621607512214-68297480165e'),
              img('photo-1503951914875-452162b0f3f1'),
            ],
            ['Gillette', 'Braun', 'Baxter of California'],
            [
              'Precision Trimmer',
              '5-Blade Razor',
              'Beard Oil',
              'Shave Cream',
            ],
            [8, 150]
          ),
        ],
      },
    ],
  },

  {
    slug: 'sports-outdoors',
    name: 'Sports & Outdoors',
    icon: '△',
    tagline: 'Beyond the ordinary',
    description:
      'Performance gear and outdoor equipment built for movement and exploration.',
    image: img('photo-1517836357463-d25dfeac3438', U),
    banner: img('photo-1461896836934-ffe607ba8211', U),
    groups: [
      {
        slug: 'all',
        name: '',
        subs: [
          L(
            'fitness-equipment',
            'Fitness Equipment',
            [
              img('photo-1571019613454-1cb2f99b2d8b'),
              img('photo-1517836357463-d25dfeac3438'),
            ],
            ['Bowflex', 'NordicTrack', 'Rogue'],
            [
              'Adjustable Dumbbell Set',
              'Resistance Band Kit',
              'Kettlebell 20lb',
              'Weight Bench',
            ],
            [19, 899]
          ),
          L(
            'cycling',
            'Cycling',
            [
              img('photo-1485965120184-e220f721d03e'),
              img('photo-1517649763962-0c623066013b'),
            ],
            ['Trek', 'Giant', 'Cannondale'],
            [
              'Road Bike',
              'Mountain Bike Helmet',
              'Bike Lock',
              'Cycling Gloves',
            ],
            [35, 1899]
          ),
          L(
            'camping-hiking',
            'Camping & Hiking',
            [
              img('photo-1504280390367-361c6d9f38f4'),
              img('photo-1517824806704-9040b037703b'),
            ],
            ['REI Co-op', 'Coleman', 'Osprey'],
            [
              '4-Person Tent',
              'Sleeping Bag',
              'Hiking Backpack 40L',
              'Camp Stove',
            ],
            [29, 399]
          ),
          L(
            'team-sports',
            'Team Sports',
            [
              img('photo-1508098682722-e99c43a406b2'),
              img('photo-1519861531473-9200262188bf'),
            ],
            ['Nike', 'Wilson', 'Adidas'],
            [
              'Match Soccer Ball',
              'Basketball',
              'Volleyball Net Set',
              'Shin Guards',
            ],
            [15, 150]
          ),
          L(
            'yoga',
            'Yoga',
            [
              img('photo-1544367567-0f2fcb009e0b'),
              img('photo-1571019613454-1cb2f99b2d8b'),
            ],
            ['Manduka', 'Lululemon', 'Gaiam'],
            [
              'Pro Yoga Mat',
              'Cork Yoga Block Set',
              'Yoga Strap',
              'Meditation Cushion',
            ],
            [15, 120]
          ),
          L(
            'running',
            'Running',
            [
              img('photo-1461896836934-ffe607ba8211'),
              img('photo-1552674605-db6ffd4facb5'),
            ],
            ['Nike', 'Garmin', 'Brooks'],
            [
              'Running Shoe',
              'GPS Running Watch',
              'Reflective Vest',
              'Hydration Belt',
            ],
            [25, 399]
          ),
          L(
            'water-sports',
            'Water Sports',
            [
              img('photo-1502680390469-be75c86b636f'),
              img('photo-1530053969600-caed2596d242'),
            ],
            ["O'Neill", 'Body Glove', 'BOTE'],
            [
              'Wetsuit 3/2mm',
              'Inflatable Paddleboard',
              'Snorkel Set',
              'Swim Goggles',
            ],
            [19, 699]
          ),
          L(
            'sports-accessories',
            'Sports Accessories',
            [
              img('photo-1517649763962-0c623066013b'),
              img('photo-1519861531473-9200262188bf'),
            ],
            ['Nike', 'Under Armour', 'CamelBak'],
            [
              'Duffel Gym Bag',
              'Water Bottle 32oz',
              'Foam Roller',
              'Sport Sunglasses',
            ],
            [10, 90]
          ),
        ],
      },
    ],
  },

  {
    slug: 'books',
    name: 'Books',
    icon: '▤',
    tagline: 'Ideas worth keeping',
    description:
      'Beautiful editions and titles for a more thoughtful shelf.',
    image: img('photo-1495446815901-a7297e633e8d', U),
    banner: img('photo-1497633762265-9d179a990aa6', U),
    groups: [
      {
        slug: 'all',
        name: '',
        subs: [
          L(
            'fiction',
            'Fiction',
            [
              img('photo-1495446815901-a7297e633e8d'),
              img('photo-1512820790803-83ca734da794'),
            ],
            ['Penguin', 'Vintage', 'Knopf'],
            [
              'Contemporary Novel',
              'Literary Fiction Bestseller',
              'Mystery Thriller',
              'Historical Fiction',
            ],
            [9, 28]
          ),
          L(
            'non-fiction',
            'Non-Fiction',
            [
              img('photo-1519682337058-a94d519337bc'),
              img('photo-1544716278-ca5e3f4abd8c'),
            ],
            ['Penguin', 'Harper', 'Norton'],
            [
              'Popular Science Title',
              'Memoir',
              'Essay Collection',
              'Cultural History',
            ],
            [11, 32]
          ),
          L(
            'children',
            "Children's Books",
            [
              img('photo-1481627834876-b7833e8f5570'),
              img('photo-1512820790803-83ca734da794'),
            ],
            ['Scholastic', 'Puffin', 'Golden Books'],
            [
              'Picture Book',
              'Early Reader Set',
              'Bedtime Story Collection',
              'Illustrated Classic',
            ],
            [6, 22]
          ),
          L(
            'comics-graphic-novels',
            'Comics & Graphic Novels',
            [
              img('photo-1544716278-ca5e3f4abd8c'),
              img('photo-1495446815901-a7297e633e8d'),
            ],
            ['Marvel', 'DC', 'Image Comics'],
            [
              'Graphic Novel Vol.1',
              'Collected Comic Series',
              'Manga Box Set',
              'Illustrated Anthology',
            ],
            [10, 35]
          ),
          L(
            'academic',
            'Academic',
            [
              img('photo-1497633762265-9d179a990aa6'),
              img('photo-1519682337058-a94d519337bc'),
            ],
            ['Oxford Press', 'Pearson', 'Cambridge'],
            [
              'Course Textbook',
              'Reference Handbook',
              'Study Guide',
              'Academic Journal Collection',
            ],
            [18, 95]
          ),
          L(
            'self-help',
            'Self-Help',
            [
              img('photo-1512820790803-83ca734da794'),
              img('photo-1481627834876-b7833e8f5570'),
            ],
            ['Penguin Life', 'Harper Wave', 'Portfolio'],
            [
              'Habit-Building Guide',
              'Mindset Bestseller',
              'Productivity Playbook',
              'Wellness Journal Book',
            ],
            [10, 26]
          ),
          L(
            'biography',
            'Biography',
            [
              img('photo-1544716278-ca5e3f4abd8c'),
              img('photo-1495446815901-a7297e633e8d'),
            ],
            ['Simon & Schuster', 'Crown', 'Random House'],
            [
              'Definitive Biography',
              'Memoir of a Icon',
              'Historical Life Story',
              'Autobiography',
            ],
            [12, 34]
          ),
        ],
      },
    ],
  },

  {
    slug: 'groceries',
    name: 'Groceries',
    icon: '▣',
    tagline: 'Fresh, every time',
    description:
      'Pantry staples, fresh picks and everyday essentials delivered.',
    image: img('photo-1542838132-92c53300491e', U),
    banner: img('photo-1542838132-92c53300491e', U),
    groups: [
      {
        slug: 'all',
        name: '',
        subs: [
          L(
            'fresh-produce',
            'Fresh Produce',
            [
              img('photo-1542838132-92c53300491e'),
              img('photo-1610832958506-aa56368176cf'),
            ],
            ['Local Farms', 'Organic Valley', "Nature's Best"],
            [
              'Organic Avocado Pack',
              'Mixed Berry Box',
              'Seasonal Vegetable Bundle',
              'Fresh Herb Set',
            ],
            [2, 15]
          ),
          L(
            'dairy-eggs',
            'Dairy & Eggs',
            [
              img('photo-1550583724-b2692b85b150'),
              img('photo-1563636619-e9143da7973b'),
            ],
            ['Organic Valley', 'Horizon', 'Vital Farms'],
            [
              'Whole Milk 1 Gal',
              'Free-Range Eggs Dozen',
              'Greek Yogurt Pack',
              'Artisan Cheese Block',
            ],
            [3, 14]
          ),
          L(
            'snacks',
            'Snacks',
            [
              img('photo-1599490659213-e2b9527bd087'),
              img('photo-1621939514649-280e2ee25f60'),
            ],
            ['Kind', "Lay's", "Trader Joe's"],
            [
              'Trail Mix Bag',
              'Kettle Chips',
              'Granola Bar Box',
              'Popcorn Multipack',
            ],
            [2, 12]
          ),
          L(
            'beverages',
            'Beverages',
            [
              img('photo-1544145945-f90425340c7e'),
              img('photo-1600271886742-f049cd451bba'),
            ],
            ['Lavazza', 'Coca-Cola', 'Simply'],
            [
              'Ground Coffee Bag',
              'Sparkling Water 12-Pack',
              'Orange Juice Carton',
              'Herbal Tea Box',
            ],
            [3, 18]
          ),
          L(
            'pantry-staples',
            'Pantry Staples',
            [
              img('photo-1584473457406-6240486418e9'),
              img('photo-1509440159596-0249088772ff'),
            ],
            ['Barilla', "Bob's Red Mill", "Rao's"],
            [
              'Organic Pasta Pack',
              'Extra Virgin Olive Oil',
              'Marinara Sauce Jar',
              'Whole Grain Rice Bag',
            ],
            [3, 16]
          ),
          L(
            'frozen-foods',
            'Frozen Foods',
            [
              img('photo-1601050690597-df0568f70950'),
              img('photo-1584473457406-6240486418e9'),
            ],
            ["Amy's", 'Birds Eye', 'Sweet Earth'],
            [
              'Frozen Veggie Mix',
              'Plant-Based Meal',
              'Frozen Berries Bag',
              'Ready-to-Bake Pizza',
            ],
            [4, 12]
          ),
          L(
            'household-essentials',
            'Household Essentials',
            [
              img('photo-1585421514738-01798e348b17'),
              img('photo-1563453392212-326f5e854473'),
            ],
            ['Seventh Generation', 'Method', 'Bounty'],
            [
              'Paper Towel 6-Pack',
              'Dish Soap Refill',
              'Laundry Detergent',
              'All-Purpose Cleaner',
            ],
            [4, 22]
          ),
        ],
      },
    ],
  },

  {
    slug: 'toys-games',
    name: 'Toys & Games',
    icon: '♧',
    tagline: 'Play brilliantly',
    description:
      'Collectibles, games and technology for curious minds of every age.',
    image: img('photo-1558060370-d644479cb6f7', U),
    banner: img('photo-1553481187-be93c21490a9', U),
    groups: [
      {
        slug: 'all',
        name: '',
        subs: [
          L(
            'action-figures',
            'Action Figures',
            [
              img('photo-1558877385-81a1c7e67d72'),
              img('photo-1566576912321-d58ddd7a6088'),
            ],
            ['Hasbro', 'Mattel', 'Bandai'],
            [
              "Collector's Edition Figure",
              'Poseable Action Figure',
              'Deluxe Figure Set',
              'Limited Edition Collectible',
            ],
            [9, 60]
          ),
          L(
            'board-games',
            'Board Games',
            [
              img('photo-1585504198199-20277593b94f'),
              img('photo-1611371805429-8b5c1b2c34ba'),
            ],
            ['Hasbro', 'Ravensburger', 'Asmodee'],
            [
              'Family Strategy Game',
              'Classic Board Game',
              'Cooperative Card Game',
              'Party Game Set',
            ],
            [12, 55]
          ),
          L(
            'puzzles',
            'Puzzles',
            [
              img('photo-1587654780291-39c9404d746b'),
              img('photo-1606503153255-59d8b8b82176'),
            ],
            ['Ravensburger', 'Buffalo Games', 'Melissa & Doug'],
            [
              '1000-Piece Jigsaw',
              'Wooden Puzzle Set',
              '3D Puzzle Model',
              'Kids Floor Puzzle',
            ],
            [8, 40]
          ),
          L(
            'outdoor-toys',
            'Outdoor Toys',
            [
              img('photo-1519669417670-68775a50919a'),
              img('photo-1533560904424-a0c61dc306fc'),
            ],
            ['Little Tikes', 'Hasbro', 'Nerf'],
            [
              'Foam Blaster Set',
              'Trampoline',
              'Water Blaster',
              'Ride-On Scooter',
            ],
            [15, 180]
          ),
          L(
            'educational-toys',
            'Educational Toys',
            [
              img('photo-1587654780291-39c9404d746c'),
              img('photo-1558877385-81a1c7e67d73'),
            ],
            ['LEGO', 'Melissa & Doug', 'VTech'],
            [
              'Building Brick Set',
              'STEM Learning Kit',
              'Wooden Learning Toy',
              'Coding Robot Kit',
            ],
            [12, 120]
          ),
          L(
            'video-games',
            'Video Games',
            [
              img('photo-1550745165-9bc0b252726f'),
              img('photo-1493711662062-fa541adb3fc8'),
            ],
            ['Nintendo', 'PlayStation', 'Xbox'],
            [
              'Adventure Game Title',
              'Sports Simulation Game',
              'Open-World RPG',
              'Multiplayer Party Game',
            ],
            [19, 70]
          ),
        ],
      },
    ],
  },
];

// ---- derive public categories tree (no leaf metadata leaks to the UI layer) ----
export const categories: Category[] = DEPARTMENTS.map((d) => ({
  slug: d.slug,
  name: d.name,
  icon: d.icon,
  tagline: d.tagline,
  description: d.description,
  image: d.image,
  banner: d.banner,
  groups: d.groups.map((g) => ({
    slug: g.slug,
    name: g.name,
    subs: g.subs.map((s) => ({
      slug: s.slug,
      name: s.name,
    })),
  })),
}));

export function getCategory(slug?: string) {
  return categories.find((c) => c.slug === slug);
}

export function getGroup(category: Category, slug?: string) {
  return category.groups.find((g) => g.slug === slug);
}

export function getSub(group: Group, slug?: string) {
  return group.subs.find((s) => s.slug === slug);
}

// true when this department has real, user-facing groups (currently only Fashion)
export function hasVisibleGroups(category: Category) {
  return category.groups.length > 1;
}

// These photo records were checked against images.unsplash.com. Keeping the
// rejected source IDs here prevents a future catalog edit from reintroducing a
// known 404 through a leaf's legacy gallery list.
const BROKEN_IMAGE_IDS = new Set([
  'photo-1461151304423-40342d0d3e12',
  'photo-1508098682722-e99c43a406b2',
  'photo-1511707171634-5f897ff02aa8',
  'photo-1514989940723-e8e51635b783',
  'photo-1518333638595-5e4c891c2b34',
  'photo-1519457851611-b4f47a5c9b2e',
  'photo-1519669417670-68775a50919a',
  'photo-1531492746076-161ba9bce798',
  'photo-1543163521-1bf539c55dd3',
  'photo-1543198126-42482ae4e30f',
  'photo-1558877385-81a1c7e67d73',
  'photo-1581147036324-c1c8b5e8f6a2',
  'photo-1583744946564-b6069f7d5d3a',
  'photo-1584990347449-a8b0b3d0e5f6',
  'photo-1587654780291-39c9404d746c',
  'photo-1591290619762-c15559282f66',
  'photo-1591637333472-8bb2a5910b98',
  'photo-1592286927505-1def25115481',
  'photo-1612815154858-60aa4c59eeaa',
]);

// Five leaves had no usable legacy photo after the 404 audit. These are
// distinct, product-appropriate Unsplash records verified during the audit.
const IMAGE_REPLACEMENTS: Record<string, string> = {
  'computers/all/storage': img('photo-1597852074816-d933c7d2b988'),
  'phones/all/power-banks': img('photo-1585995603413-eb35b5f4a50b'),
  'home-living/all/appliances': img('photo-1556911220-bff31c812dba'),
  'books/all/biography': img('photo-1543002588-bfa74002ed7e'),
  'toys-games/all/educational-toys': img('photo-1596461404969-9ae70f2830c1'),
};

const leafKey = (
  dept: DeptDef,
  group: GroupDef,
  leaf: LeafDef
) => `${dept.slug}/${group.slug}/${leaf.slug}`;

const isUsableProductImage = (source: string) =>
  source.startsWith('https://images.unsplash.com/photo-') &&
  ![...BROKEN_IMAGE_IDS].some((id) => source.includes(id));

/**
 * Choose one distinct, audited primary image for every catalog leaf. The
 * small augmenting-path matcher lets leaves that share an old source take
 * their alternative source, rather than silently duplicating an image.
 */
function buildLeafImageMap() {
  const leaves = DEPARTMENTS.flatMap((dept) =>
    dept.groups.flatMap((group) =>
      group.subs.map((leaf) => {
        const key = leafKey(dept, group, leaf);
        const replacement = IMAGE_REPLACEMENTS[key];

        return {
          key,
          candidates: [
            ...leaf.images.filter(isUsableProductImage),
            ...(replacement ? [replacement] : []),
          ],
        };
      })
    )
  );

  const owner = new Map<string, string>();
  const candidatesByKey = new Map(
    leaves.map((leaf) => [leaf.key, leaf.candidates])
  );
  const selected = new Map<string, string>();

  const assign = (
    key: string,
    seen: Set<string>
  ): boolean => {
    for (const source of candidatesByKey.get(key) || []) {
      if (seen.has(source)) continue;

      seen.add(source);

      const currentOwner = owner.get(source);

      if (!currentOwner || assign(currentOwner, seen)) {
        owner.set(source, key);
        selected.set(key, source);
        return true;
      }
    }

    return false;
  };

  for (const leaf of leaves) {
    if (!assign(leaf.key, new Set())) {
      throw new Error(
        `No unique, valid image is available for ${leaf.key}`
      );
    }
  }

  return selected;
}

const LEAF_PRODUCT_IMAGES = buildLeafImageMap();

// ---- build the full, finite product catalog once at module load ----
function buildProducts(): Product[] {
  const out: Product[] = [];
  let id = 1;

  for (const dept of DEPARTMENTS) {
    for (const group of dept.groups) {
      for (const leaf of group.subs) {
        const gender =
          dept.slug === 'fashion' ? group.slug : undefined;

        const combos: Array<[string, string]> = [];

        for (const b of leaf.brands) {
          for (const m of leaf.models) {
            combos.push([b, m]);
          }
        }

        // A product is only published when it has its own primary image. The
        // former nine-item expansion rotated 2–3 photos across unrelated SKUs.
        const count = 1;

        for (let i = 0; i < count; i++) {
          const idx = (id * 7) % combos.length;
          const [brand, model] = combos[idx];

          const span = leaf.price[1] - leaf.price[0];

          const price =
            Math.round(
              (leaf.price[0] +
                ((id * 53) % Math.max(1, span))) *
                100
            ) / 100;

          const discountRoll = id % 5 === 0;

          const oldPrice = discountRoll
            ? Math.round(price * 1.25 * 100) / 100
            : undefined;

          const discount = oldPrice
            ? Math.round(100 - (price / oldPrice) * 100)
            : 0;

          const rating =
            Math.round(
              (3.8 + ((id * 13) % 12) / 10) * 10
            ) / 10;

          const reviews = 40 + (id * 29) % 4800;
          const stock = 3 + (id % 60);

          const primaryImage = LEAF_PRODUCT_IMAGES.get(
            leafKey(dept, group, leaf)
          );

          if (!primaryImage) {
            throw new Error(
              `Missing primary image for ${leafKey(
                dept,
                group,
                leaf
              )}`
            );
          }

          const images = [primaryImage];

          const badge =
            id % 13 === 0
              ? 'NEW'
              : id % 9 === 0
              ? 'BEST SELLER'
              : oldPrice
              ? `-${discount}%`
              : undefined;

          const nameParts = [brand, model].join(' ');

          out.push({
            id,
            slug: `${dept.slug}-${leaf.slug}-${id}`,
            name: nameParts,
            brand,
            category: dept.slug,
            categoryName: dept.name,
            group: group.slug,
            groupName: group.name,
            gender,
            subcategory: leaf.slug,
            subcategoryName: leaf.name,
            price,
            oldPrice,
            rating,
            reviews,
            image: primaryImage,
            images,
            description: `The ${model.toLowerCase()} from ${brand} — a ${leaf.name.toLowerCase()} piece chosen for quality, comfort and everyday reliability.`,
            stock,
            badge,
            sizes: leaf.sizes,
            colors: leaf.colors,
          });

          id++;
        }
      }
    }
  }

  return out;
}

export const ALL_PRODUCTS: Product[] = buildProducts();

export type CatalogImageAudit = {
  missingImageSlugs: string[];
  invalidImageSlugs: string[];
  duplicateImageGroups: Record<string, string[]>;
  categoryImageRepeats: Record<string, string[]>;
  galleryMismatches: string[];
};

/**
 * Development-time catalog guard: it is static and makes no network calls.
 */
export function auditCatalogImages(
  products: Product[] = ALL_PRODUCTS
): CatalogImageAudit {
  const byImage = new Map<string, string[]>();
  const byCategoryImage = new Map<string, string[]>();

  const missingImageSlugs: string[] = [];
  const invalidImageSlugs: string[] = [];
  const galleryMismatches: string[] = [];

  for (const product of products) {
    if (!product.image) {
      missingImageSlugs.push(product.slug);
    } else if (!isUsableProductImage(product.image)) {
      invalidImageSlugs.push(product.slug);
    }

    if (
      !product.images.includes(product.image) ||
      new Set(product.images).size !== product.images.length
    ) {
      galleryMismatches.push(product.slug);
    }

    byImage.set(product.image, [
      ...(byImage.get(product.image) || []),
      product.slug,
    ]);

    const categoryKey = `${product.category}:${product.image}`;

    byCategoryImage.set(categoryKey, [
      ...(byCategoryImage.get(categoryKey) || []),
      product.slug,
    ]);
  }

  const groups = (
    entries: Map<string, string[]>
  ) =>
    Object.fromEntries(
      [...entries].filter(([, slugs]) => slugs.length > 1)
    );

  return {
    missingImageSlugs,
    invalidImageSlugs,
    duplicateImageGroups: groups(byImage),
    categoryImageRepeats: groups(byCategoryImage),
    galleryMismatches,
  };
}

if (process.env.NODE_ENV !== 'production') {
  const audit = auditCatalogImages();

  if (
    audit.missingImageSlugs.length ||
    audit.invalidImageSlugs.length ||
    Object.keys(audit.duplicateImageGroups).length ||
    audit.galleryMismatches.length
  ) {
    throw new Error('Catalog image audit failed');
  }
}

export type ProductFilters = {
  categorySlug?: string;
  groupSlug?: string;
  subSlug?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  size?: string;
  color?: string;
  sort?: string;
};

export function queryProducts(
  f: ProductFilters
): Product[] {
  let arr = ALL_PRODUCTS;

  if (f.categorySlug) {
    arr = arr.filter(
      (p) => p.category === f.categorySlug
    );
  }

  if (f.groupSlug) {
    arr = arr.filter(
      (p) => p.group === f.groupSlug
    );
  }

  if (f.subSlug) {
    arr = arr.filter(
      (p) => p.subcategory === f.subSlug
    );
  }

  if (f.brands && f.brands.length) {
    arr = arr.filter(
      (p) => f.brands!.includes(p.brand)
    );
  }

  if (typeof f.minPrice === 'number') {
    arr = arr.filter(
      (p) => p.price >= f.minPrice!
    );
  }

  if (typeof f.maxPrice === 'number') {
    arr = arr.filter(
      (p) => p.price <= f.maxPrice!
    );
  }

  if (typeof f.minRating === 'number') {
    arr = arr.filter(
      (p) => p.rating >= f.minRating!
    );
  }

  if (f.size) {
    arr = arr.filter(
      (p) => p.sizes?.includes(f.size!)
    );
  }

  if (f.color) {
    arr = arr.filter(
      (p) => p.colors?.includes(f.color!)
    );
  }

  arr = arr.slice();

  switch (f.sort) {
    case 'Price: low to high':
      arr.sort((a, b) => a.price - b.price);
      break;

    case 'Price: high to low':
      arr.sort((a, b) => b.price - a.price);
      break;

    case 'Best rated':
      arr.sort((a, b) => b.rating - a.rating);
      break;

    case 'Most popular':
      arr.sort((a, b) => b.reviews - a.reviews);
      break;

    case 'Newest':
      arr.sort((a, b) => b.id - a.id);
      break;

    default:
      break;
  }

  return arr;
}

export function findProduct(slug: string) {
  return (
    ALL_PRODUCTS.find((p) => p.slug === slug) ||
    ALL_PRODUCTS[0]
  );
}

export function searchProducts(
  q: string,
  limit = 48,
  cat?: string
) {
  const s = q.toLowerCase();

  return ALL_PRODUCTS.filter(
    (p) =>
      (!cat ||
        cat === 'All Categories' ||
        p.category === cat) &&
      `${p.name} ${p.brand} ${p.categoryName} ${p.subcategoryName}`
        .toLowerCase()
        .includes(s)
  ).slice(0, limit);
}

export function breadcrumbFor(
  categorySlug?: string,
  groupSlug?: string,
  subSlug?: string
) {
  const trail: {
    label: string;
    href: string;
  }[] = [
    {
      label: 'Home',
      href: '/',
    },
  ];

  const cat = categorySlug
    ? getCategory(categorySlug)
    : undefined;

  if (!cat) return trail;

  trail.push({
    label: cat.name,
    href: '/shop/' + cat.slug,
  });

  const multiGroup = hasVisibleGroups(cat);

  if (multiGroup && groupSlug) {
    const g = getGroup(cat, groupSlug);

    if (g) {
      trail.push({
        label: g.name,
        href: `/shop/${cat.slug}/${g.slug}`,
      });
    }
  }

  if (subSlug) {
    const g = multiGroup
      ? getGroup(cat, groupSlug)
      : cat.groups[0];

    const s = g
      ? getSub(g, subSlug)
      : undefined;

    if (s) {
      trail.push({
        label: s.name,
        href: multiGroup
          ? `/shop/${cat.slug}/${groupSlug}/${s.slug}`
          : `/shop/${cat.slug}/${s.slug}`,
      });
    }
  }

  return trail;
}
