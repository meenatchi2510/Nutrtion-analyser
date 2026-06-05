// ═══════════════════════════════════════════════════════
//  foodData.js  –  Nutritional Dataset (65+ food items)
// ═══════════════════════════════════════════════════════
const FOOD_DATABASE = [
  // ── GRAINS & CARBS ───────────────────────────────────
  {
    id: 'f001', name: 'White Rice', category: 'Grains', emoji: '🍚',
    keywords: ['rice', 'white rice', 'steamed rice', 'fried rice', 'biryani'],
    calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fiber: 0.4, sugar: 0.1,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (250g)', value: 250 }, { label: 'Bowl (350g)', value: 350 }
    ]
  },
  {
    id: 'f002', name: 'Brown Rice', category: 'Grains', emoji: '🍚',
    keywords: ['brown rice', 'whole grain rice', 'multigrain rice'],
    calories: 112, protein: 2.6, carbs: 23.5, fat: 0.9, fiber: 1.8, sugar: 0.4,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (250g)', value: 250 }
    ]
  },
  {
    id: 'f003', name: 'Whole Wheat Bread', category: 'Grains', emoji: '🍞',
    keywords: ['bread', 'wheat bread', 'whole wheat', 'toast', 'sandwich', 'slice'],
    calories: 247, protein: 13.0, carbs: 41.3, fat: 3.4, fiber: 6.0, sugar: 5.6,
    defaultPortion: 60, portionOptions: [
      { label: '1 slice (30g)', value: 30 }, { label: '2 slices (60g)', value: 60 },
      { label: '3 slices (90g)', value: 90 }
    ]
  },
  {
    id: 'f004', name: 'Chapati / Roti', category: 'Grains', emoji: '🫓',
    keywords: ['chapati', 'roti', 'flatbread', 'wheat roti', 'phulka'],
    calories: 297, protein: 9.1, carbs: 55.8, fat: 5.2, fiber: 2.3, sugar: 0.9,
    defaultPortion: 60, portionOptions: [
      { label: '1 piece (30g)', value: 30 }, { label: '2 pieces (60g)', value: 60 },
      { label: '3 pieces (90g)', value: 90 }
    ]
  },
  {
    id: 'f005', name: 'Oatmeal', category: 'Grains', emoji: '🥘',
    keywords: ['oatmeal', 'oats', 'porridge', 'rolled oats', 'overnight oats'],
    calories: 68, protein: 2.4, carbs: 12.0, fat: 1.4, fiber: 1.7, sugar: 0.3,
    defaultPortion: 240, portionOptions: [
      { label: 'Small bowl (180g)', value: 180 }, { label: 'Regular bowl (240g)', value: 240 },
      { label: 'Large bowl (300g)', value: 300 }
    ]
  },
  {
    id: 'f006', name: 'Pasta', category: 'Grains', emoji: '🍝',
    keywords: ['pasta', 'spaghetti', 'noodles', 'penne', 'fettuccine', 'macaroni'],
    calories: 158, protein: 5.8, carbs: 30.9, fat: 0.9, fiber: 1.8, sugar: 0.6,
    defaultPortion: 200, portionOptions: [
      { label: 'Small (150g)', value: 150 }, { label: 'Regular (200g)', value: 200 },
      { label: 'Large (300g)', value: 300 }
    ]
  },
  {
    id: 'f007', name: 'Quinoa', category: 'Grains', emoji: '🌾',
    keywords: ['quinoa', 'superfood', 'grain bowl'],
    calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.8, sugar: 0.9,
    defaultPortion: 185, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (185g)', value: 185 },
      { label: 'Large (250g)', value: 250 }
    ]
  },
  // ── PROTEIN SOURCES ──────────────────────────────────
  {
    id: 'f008', name: 'Chicken Breast', category: 'Protein', emoji: '🍗',
    keywords: ['chicken', 'chicken breast', 'grilled chicken', 'chicken fillet', 'poultry'],
    calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, fiber: 0.0, sugar: 0.0,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Medium (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }, { label: 'XL (250g)', value: 250 }
    ]
  },
  {
    id: 'f009', name: 'Eggs', category: 'Protein', emoji: '🍳',
    keywords: ['egg', 'eggs', 'omelette', 'omelet', 'scrambled', 'boiled egg', 'fried egg'],
    calories: 155, protein: 13.0, carbs: 1.1, fat: 11.0, fiber: 0.0, sugar: 1.1,
    defaultPortion: 100, portionOptions: [
      { label: '1 egg (50g)', value: 50 }, { label: '2 eggs (100g)', value: 100 },
      { label: '3 eggs (150g)', value: 150 }
    ]
  },
  {
    id: 'f010', name: 'Salmon', category: 'Protein', emoji: '🐟',
    keywords: ['salmon', 'fish', 'grilled fish', 'baked fish', 'seafood', 'tuna'],
    calories: 208, protein: 20.0, carbs: 0.0, fat: 13.0, fiber: 0.0, sugar: 0.0,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Fillet (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  {
    id: 'f011', name: 'Greek Yogurt', category: 'Protein', emoji: '🥛',
    keywords: ['yogurt', 'greek yogurt', 'curd', 'dahi', 'hung curd'],
    calories: 59, protein: 10.0, carbs: 3.6, fat: 0.4, fiber: 0.0, sugar: 3.2,
    defaultPortion: 200, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (200g)', value: 200 },
      { label: 'Large (300g)', value: 300 }
    ]
  },
  {
    id: 'f012', name: 'Lentils (Dal)', category: 'Protein', emoji: '🫘',
    keywords: ['dal', 'lentils', 'daal', 'moong', 'masoor', 'toor dal', 'chana dal'],
    calories: 116, protein: 9.0, carbs: 20.1, fat: 0.4, fiber: 7.9, sugar: 1.8,
    defaultPortion: 200, portionOptions: [
      { label: 'Small bowl (150g)', value: 150 }, { label: 'Regular bowl (200g)', value: 200 },
      { label: 'Large bowl (300g)', value: 300 }
    ]
  },
  {
    id: 'f013', name: 'Chickpeas', category: 'Protein', emoji: '🫘',
    keywords: ['chickpeas', 'chana', 'chole', 'hummus', 'garbanzo'],
    calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6, fiber: 7.6, sugar: 4.8,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  {
    id: 'f014', name: 'Tofu', category: 'Protein', emoji: '🧀',
    keywords: ['tofu', 'soy', 'paneer', 'cottage cheese', 'soya'],
    calories: 76, protein: 8.0, carbs: 1.9, fat: 4.2, fiber: 0.3, sugar: 0.6,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  {
    id: 'f015', name: 'Beef (Lean)', category: 'Protein', emoji: '🥩',
    keywords: ['beef', 'steak', 'meat', 'ground beef', 'burger patty', 'minced meat'],
    calories: 250, protein: 26.0, carbs: 0.0, fat: 15.0, fiber: 0.0, sugar: 0.0,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  // ── DAIRY ────────────────────────────────────────────
  {
    id: 'f016', name: 'Milk (Whole)', category: 'Dairy', emoji: '🥛',
    keywords: ['milk', 'whole milk', 'dairy', 'glass of milk'],
    calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0.0, sugar: 5.1,
    defaultPortion: 250, portionOptions: [
      { label: 'Half glass (125ml)', value: 125 }, { label: 'Glass (250ml)', value: 250 },
      { label: 'Large (350ml)', value: 350 }
    ]
  },
  {
    id: 'f017', name: 'Cheese', category: 'Dairy', emoji: '🧀',
    keywords: ['cheese', 'cheddar', 'mozzarella', 'paneer', 'feta'],
    calories: 402, protein: 25.0, carbs: 1.3, fat: 33.0, fiber: 0.0, sugar: 0.5,
    defaultPortion: 40, portionOptions: [
      { label: 'Slice (20g)', value: 20 }, { label: 'Regular (40g)', value: 40 },
      { label: 'Large (80g)', value: 80 }
    ]
  },
  {
    id: 'f018', name: 'Butter', category: 'Dairy', emoji: '🧈',
    keywords: ['butter', 'ghee', 'margarine'],
    calories: 717, protein: 0.9, carbs: 0.1, fat: 81.1, fiber: 0.0, sugar: 0.1,
    defaultPortion: 14, portionOptions: [
      { label: '1 tsp (5g)', value: 5 }, { label: '1 tbsp (14g)', value: 14 },
      { label: '2 tbsp (28g)', value: 28 }
    ]
  },
  // ── VEGETABLES ───────────────────────────────────────
  {
    id: 'f019', name: 'Broccoli', category: 'Vegetables', emoji: '🥦',
    keywords: ['broccoli', 'green vegetable', 'cruciferous'],
    calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, fiber: 2.6, sugar: 1.7,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  {
    id: 'f020', name: 'Spinach', category: 'Vegetables', emoji: '🥬',
    keywords: ['spinach', 'palak', 'greens', 'leafy greens', 'salad greens'],
    calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, sugar: 0.4,
    defaultPortion: 100, portionOptions: [
      { label: 'Small (50g)', value: 50 }, { label: 'Regular (100g)', value: 100 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  {
    id: 'f021', name: 'Carrot', category: 'Vegetables', emoji: '🥕',
    keywords: ['carrot', 'carrots', 'gajar'],
    calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, sugar: 4.7,
    defaultPortion: 100, portionOptions: [
      { label: 'Small (50g)', value: 50 }, { label: 'Regular (100g)', value: 100 },
      { label: 'Large (150g)', value: 150 }
    ]
  },
  {
    id: 'f022', name: 'Tomato', category: 'Vegetables', emoji: '🍅',
    keywords: ['tomato', 'tomatoes', 'cherry tomato'],
    calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, sugar: 2.6,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (80g)', value: 80 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  {
    id: 'f023', name: 'Sweet Potato', category: 'Vegetables', emoji: '🍠',
    keywords: ['sweet potato', 'shakarkand', 'yam'],
    calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1, fiber: 3.0, sugar: 4.2,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  {
    id: 'f024', name: 'Cucumber', category: 'Vegetables', emoji: '🥒',
    keywords: ['cucumber', 'kheera', 'salad'],
    calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, sugar: 1.7,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (300g)', value: 300 }
    ]
  },
  {
    id: 'f025', name: 'Avocado', category: 'Vegetables', emoji: '🥑',
    keywords: ['avocado', 'guacamole'],
    calories: 160, protein: 2.0, carbs: 8.5, fat: 14.7, fiber: 6.7, sugar: 0.7,
    defaultPortion: 100, portionOptions: [
      { label: 'Half (75g)', value: 75 }, { label: 'Whole (150g)', value: 150 },
      { label: 'Small (100g)', value: 100 }
    ]
  },
  {
    id: 'f026', name: 'Mixed Salad', category: 'Vegetables', emoji: '🥗',
    keywords: ['salad', 'mixed salad', 'green salad', 'garden salad', 'caesar'],
    calories: 20, protein: 1.5, carbs: 3.5, fat: 0.3, fiber: 2.0, sugar: 1.8,
    defaultPortion: 200, portionOptions: [
      { label: 'Small bowl (150g)', value: 150 }, { label: 'Regular bowl (200g)', value: 200 },
      { label: 'Large bowl (300g)', value: 300 }
    ]
  },
  // ── FRUITS ───────────────────────────────────────────
  {
    id: 'f027', name: 'Banana', category: 'Fruits', emoji: '🍌',
    keywords: ['banana', 'kela'],
    calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6, sugar: 12.2,
    defaultPortion: 120, portionOptions: [
      { label: 'Small (80g)', value: 80 }, { label: 'Medium (120g)', value: 120 },
      { label: 'Large (180g)', value: 180 }
    ]
  },
  {
    id: 'f028', name: 'Apple', category: 'Fruits', emoji: '🍎',
    keywords: ['apple', 'seb', 'green apple', 'red apple'],
    calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4, sugar: 10.4,
    defaultPortion: 182, portionOptions: [
      { label: 'Small (130g)', value: 130 }, { label: 'Medium (182g)', value: 182 },
      { label: 'Large (240g)', value: 240 }
    ]
  },
  {
    id: 'f029', name: 'Orange', category: 'Fruits', emoji: '🍊',
    keywords: ['orange', 'mosambi', 'citrus', 'tangerine', 'mandarin'],
    calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, fiber: 2.4, sugar: 9.4,
    defaultPortion: 180, portionOptions: [
      { label: 'Small (130g)', value: 130 }, { label: 'Medium (180g)', value: 180 },
      { label: 'Large (230g)', value: 230 }
    ]
  },
  {
    id: 'f030', name: 'Mango', category: 'Fruits', emoji: '🥭',
    keywords: ['mango', 'aam', 'alphonso', 'tropical fruit'],
    calories: 60, protein: 0.8, carbs: 15.0, fat: 0.4, fiber: 1.6, sugar: 13.7,
    defaultPortion: 200, portionOptions: [
      { label: 'Small (150g)', value: 150 }, { label: 'Half (200g)', value: 200 },
      { label: 'Whole (300g)', value: 300 }
    ]
  },
  {
    id: 'f031', name: 'Strawberries', category: 'Fruits', emoji: '🍓',
    keywords: ['strawberry', 'strawberries', 'berries'],
    calories: 33, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2.0, sugar: 4.9,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  {
    id: 'f032', name: 'Watermelon', category: 'Fruits', emoji: '🍉',
    keywords: ['watermelon', 'tarbooz', 'melon', 'fruit juice'],
    calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, fiber: 0.4, sugar: 6.2,
    defaultPortion: 300, portionOptions: [
      { label: 'Small slice (200g)', value: 200 }, { label: 'Regular slice (300g)', value: 300 },
      { label: 'Large slice (400g)', value: 400 }
    ]
  },
  {
    id: 'f033', name: 'Blueberries', category: 'Fruits', emoji: '🫐',
    keywords: ['blueberry', 'blueberries', 'blue berry', 'berries'],
    calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3, fiber: 2.4, sugar: 10.0,
    defaultPortion: 100, portionOptions: [
      { label: 'Small (75g)', value: 75 }, { label: 'Regular (100g)', value: 100 },
      { label: 'Large (150g)', value: 150 }
    ]
  },
  // ── FAST FOOD & SNACKS ───────────────────────────────
  {
    id: 'f034', name: 'Pizza (Margherita)', category: 'Fast Food', emoji: '🍕',
    keywords: ['pizza', 'margherita', 'cheese pizza', 'pepperoni'],
    calories: 266, protein: 11.0, carbs: 33.0, fat: 10.0, fiber: 2.3, sugar: 3.6,
    defaultPortion: 200, portionOptions: [
      { label: '1 slice (100g)', value: 100 }, { label: '2 slices (200g)', value: 200 },
      { label: '3 slices (300g)', value: 300 }
    ]
  },
  {
    id: 'f035', name: 'Burger', category: 'Fast Food', emoji: '🍔',
    keywords: ['burger', 'hamburger', 'cheeseburger', 'beef burger', 'veggie burger'],
    calories: 295, protein: 17.0, carbs: 24.0, fat: 14.0, fiber: 1.2, sugar: 5.2,
    defaultPortion: 200, portionOptions: [
      { label: 'Small (150g)', value: 150 }, { label: 'Regular (200g)', value: 200 },
      { label: 'Double (300g)', value: 300 }
    ]
  },
  {
    id: 'f036', name: 'French Fries', category: 'Fast Food', emoji: '🍟',
    keywords: ['fries', 'french fries', 'chips', 'fried potato'],
    calories: 312, protein: 3.4, carbs: 41.4, fat: 15.0, fiber: 3.8, sugar: 0.3,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  {
    id: 'f037', name: 'Hot Dog', category: 'Fast Food', emoji: '🌭',
    keywords: ['hot dog', 'hotdog', 'sausage', 'frankfurter'],
    calories: 290, protein: 10.0, carbs: 23.0, fat: 17.0, fiber: 0.9, sugar: 5.1,
    defaultPortion: 130, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (130g)', value: 130 }
    ]
  },
  {
    id: 'f038', name: 'Samosa', category: 'Fast Food', emoji: '🥟',
    keywords: ['samosa', 'pakora', 'kachori', 'fried snack', 'puff'],
    calories: 262, protein: 5.0, carbs: 32.0, fat: 13.0, fiber: 2.1, sugar: 1.4,
    defaultPortion: 100, portionOptions: [
      { label: '1 piece (60g)', value: 60 }, { label: '2 pieces (120g)', value: 120 },
      { label: '3 pieces (180g)', value: 180 }
    ]
  },
  {
    id: 'f039', name: 'Potato Chips', category: 'Snacks', emoji: '🥔',
    keywords: ['chips', 'crisps', 'potato chips', 'lays', 'doritos', 'snack'],
    calories: 536, protein: 7.0, carbs: 55.0, fat: 34.0, fiber: 4.8, sugar: 0.4,
    defaultPortion: 30, portionOptions: [
      { label: 'Small bag (30g)', value: 30 }, { label: 'Regular bag (60g)', value: 60 },
      { label: 'Large bag (100g)', value: 100 }
    ]
  },
  {
    id: 'f040', name: 'Almonds', category: 'Snacks', emoji: '🌰',
    keywords: ['almonds', 'badam', 'nuts', 'mixed nuts', 'cashew', 'walnuts'],
    calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9, fiber: 12.5, sugar: 4.4,
    defaultPortion: 30, portionOptions: [
      { label: 'Small (15g)', value: 15 }, { label: 'Regular (30g)', value: 30 },
      { label: 'Large (50g)', value: 50 }
    ]
  },
  {
    id: 'f041', name: 'Dark Chocolate', category: 'Snacks', emoji: '🍫',
    keywords: ['chocolate', 'dark chocolate', 'cocoa', 'candy bar'],
    calories: 546, protein: 5.5, carbs: 59.4, fat: 31.3, fiber: 11.0, sugar: 36.7,
    defaultPortion: 30, portionOptions: [
      { label: 'Small (20g)', value: 20 }, { label: 'Regular (30g)', value: 30 },
      { label: 'Half bar (50g)', value: 50 }
    ]
  },
  {
    id: 'f042', name: 'Granola Bar', category: 'Snacks', emoji: '🍫',
    keywords: ['granola', 'granola bar', 'energy bar', 'cereal bar', 'muesli bar'],
    calories: 471, protein: 8.9, carbs: 64.2, fat: 19.0, fiber: 4.0, sugar: 21.0,
    defaultPortion: 47, portionOptions: [
      { label: '1 bar (47g)', value: 47 }, { label: '2 bars (94g)', value: 94 }
    ]
  },
  // ── BEVERAGES ────────────────────────────────────────
  {
    id: 'f043', name: 'Smoothie (Fruit)', category: 'Beverages', emoji: '🥤',
    keywords: ['smoothie', 'fruit smoothie', 'shake', 'milkshake', 'blend'],
    calories: 80, protein: 1.5, carbs: 18.0, fat: 0.5, fiber: 1.5, sugar: 14.0,
    defaultPortion: 350, portionOptions: [
      { label: 'Small (250ml)', value: 250 }, { label: 'Regular (350ml)', value: 350 },
      { label: 'Large (500ml)', value: 500 }
    ]
  },
  {
    id: 'f044', name: 'Coffee (Black)', category: 'Beverages', emoji: '☕',
    keywords: ['coffee', 'black coffee', 'espresso', 'americano', 'cappuccino'],
    calories: 2, protein: 0.3, carbs: 0.0, fat: 0.0, fiber: 0.0, sugar: 0.0,
    defaultPortion: 240, portionOptions: [
      { label: 'Espresso (30ml)', value: 30 }, { label: 'Cup (240ml)', value: 240 },
      { label: 'Large (360ml)', value: 360 }
    ]
  },
  {
    id: 'f045', name: 'Orange Juice', category: 'Beverages', emoji: '🍊',
    keywords: ['orange juice', 'juice', 'fruit juice', 'fresh juice'],
    calories: 45, protein: 0.7, carbs: 10.4, fat: 0.2, fiber: 0.2, sugar: 8.4,
    defaultPortion: 250, portionOptions: [
      { label: 'Small (150ml)', value: 150 }, { label: 'Regular (250ml)', value: 250 },
      { label: 'Large (400ml)', value: 400 }
    ]
  },
  {
    id: 'f046', name: 'Green Tea', category: 'Beverages', emoji: '🍵',
    keywords: ['green tea', 'tea', 'chai', 'herbal tea', 'matcha'],
    calories: 2, protein: 0.0, carbs: 0.0, fat: 0.0, fiber: 0.0, sugar: 0.0,
    defaultPortion: 240, portionOptions: [
      { label: 'Cup (240ml)', value: 240 }, { label: 'Mug (350ml)', value: 350 }
    ]
  },
  {
    id: 'f047', name: 'Soda / Cola', category: 'Beverages', emoji: '🥤',
    keywords: ['soda', 'cola', 'pepsi', 'coke', 'soft drink', 'fizzy', 'sprite'],
    calories: 41, protein: 0.0, carbs: 10.6, fat: 0.0, fiber: 0.0, sugar: 10.6,
    defaultPortion: 355, portionOptions: [
      { label: 'Can (355ml)', value: 355 }, { label: 'Bottle (500ml)', value: 500 },
      { label: 'Large (700ml)', value: 700 }
    ]
  },
  {
    id: 'f048', name: 'Protein Shake', category: 'Beverages', emoji: '💪',
    keywords: ['protein shake', 'protein powder', 'whey', 'protein drink', 'gym shake'],
    calories: 130, protein: 25.0, carbs: 5.0, fat: 2.0, fiber: 1.0, sugar: 3.0,
    defaultPortion: 300, portionOptions: [
      { label: 'Small (250ml)', value: 250 }, { label: 'Regular (300ml)', value: 300 },
      { label: 'Large (400ml)', value: 400 }
    ]
  },
  // ── INDIAN / ASIAN MEALS ─────────────────────────────
  {
    id: 'f049', name: 'Biryani', category: 'Meals', emoji: '🍛',
    keywords: ['biryani', 'pulao', 'dum biryani', 'chicken biryani', 'mutton biryani'],
    calories: 250, protein: 12.0, carbs: 38.0, fat: 6.8, fiber: 1.2, sugar: 1.8,
    defaultPortion: 250, portionOptions: [
      { label: 'Small (200g)', value: 200 }, { label: 'Regular (250g)', value: 250 },
      { label: 'Large (350g)', value: 350 }
    ]
  },
  {
    id: 'f050', name: 'Butter Chicken Curry', category: 'Meals', emoji: '🍛',
    keywords: ['butter chicken', 'murgh makhani', 'chicken curry', 'tikka masala', 'curry'],
    calories: 150, protein: 12.0, carbs: 8.0, fat: 8.0, fiber: 1.0, sugar: 5.5,
    defaultPortion: 250, portionOptions: [
      { label: 'Small bowl (150g)', value: 150 }, { label: 'Regular bowl (250g)', value: 250 },
      { label: 'Large bowl (350g)', value: 350 }
    ]
  },
  {
    id: 'f051', name: 'Idli & Sambar', category: 'Meals', emoji: '🫓',
    keywords: ['idli', 'sambar', 'dosa', 'south indian', 'uttpam'],
    calories: 58, protein: 1.8, carbs: 11.9, fat: 0.5, fiber: 1.0, sugar: 0.8,
    defaultPortion: 150, portionOptions: [
      { label: '2 pieces (100g)', value: 100 }, { label: '3 pieces (150g)', value: 150 },
      { label: '4 pieces (200g)', value: 200 }
    ]
  },
  {
    id: 'f052', name: 'Sushi', category: 'Meals', emoji: '🍣',
    keywords: ['sushi', 'sashimi', 'maki', 'roll', 'nigiri', 'japanese'],
    calories: 143, protein: 5.0, carbs: 27.0, fat: 1.8, fiber: 0.9, sugar: 5.2,
    defaultPortion: 200, portionOptions: [
      { label: '4 pieces (100g)', value: 100 }, { label: '8 pieces (200g)', value: 200 },
      { label: '12 pieces (300g)', value: 300 }
    ]
  },
  {
    id: 'f053', name: 'Noodles / Ramen', category: 'Meals', emoji: '🍜',
    keywords: ['noodles', 'ramen', 'instant noodles', 'chow mein', 'lo mein', 'udon'],
    calories: 138, protein: 4.5, carbs: 25.0, fat: 2.1, fiber: 1.0, sugar: 0.8,
    defaultPortion: 250, portionOptions: [
      { label: 'Small (200g)', value: 200 }, { label: 'Regular (250g)', value: 250 },
      { label: 'Large (350g)', value: 350 }
    ]
  },
  {
    id: 'f054', name: 'Tacos', category: 'Meals', emoji: '🌮',
    keywords: ['tacos', 'taco', 'burrito', 'wrap', 'tortilla', 'mexican'],
    calories: 218, protein: 11.0, carbs: 23.0, fat: 9.0, fiber: 3.2, sugar: 2.1,
    defaultPortion: 200, portionOptions: [
      { label: '1 taco (100g)', value: 100 }, { label: '2 tacos (200g)', value: 200 },
      { label: '3 tacos (300g)', value: 300 }
    ]
  },
  // ── BREAKFAST ────────────────────────────────────────
  {
    id: 'f055', name: 'Pancakes', category: 'Breakfast', emoji: '🥞',
    keywords: ['pancakes', 'pancake', 'crepes', 'waffles', 'hotcakes'],
    calories: 227, protein: 6.0, carbs: 38.0, fat: 6.4, fiber: 1.5, sugar: 9.4,
    defaultPortion: 150, portionOptions: [
      { label: '2 small (100g)', value: 100 }, { label: '3 regular (150g)', value: 150 },
      { label: '4 large (200g)', value: 200 }
    ]
  },
  {
    id: 'f056', name: 'Cereal & Milk', category: 'Breakfast', emoji: '🥣',
    keywords: ['cereal', 'cornflakes', 'muesli', 'bran flakes', 'granola'],
    calories: 150, protein: 5.0, carbs: 29.0, fat: 2.2, fiber: 2.5, sugar: 11.0,
    defaultPortion: 250, portionOptions: [
      { label: 'Small bowl (200g)', value: 200 }, { label: 'Regular bowl (250g)', value: 250 },
      { label: 'Large bowl (300g)', value: 300 }
    ]
  },
  {
    id: 'f057', name: 'Poha', category: 'Breakfast', emoji: '🍚',
    keywords: ['poha', 'aval', 'beaten rice', 'flattened rice'],
    calories: 180, protein: 3.5, carbs: 37.0, fat: 3.0, fiber: 1.5, sugar: 1.0,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  {
    id: 'f058', name: 'Upma', category: 'Breakfast', emoji: '🫓',
    keywords: ['upma', 'rava', 'semolina', 'suji'],
    calories: 145, protein: 3.8, carbs: 24.0, fat: 4.5, fiber: 2.0, sugar: 1.5,
    defaultPortion: 150, portionOptions: [
      { label: 'Small (100g)', value: 100 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  // ── DESSERTS ─────────────────────────────────────────
  {
    id: 'f059', name: 'Ice Cream', category: 'Desserts', emoji: '🍦',
    keywords: ['ice cream', 'gelato', 'sorbet', 'frozen yogurt', 'kulfi'],
    calories: 207, protein: 3.5, carbs: 24.0, fat: 11.0, fiber: 0.7, sugar: 21.0,
    defaultPortion: 150, portionOptions: [
      { label: 'Small scoop (75g)', value: 75 }, { label: 'Regular (150g)', value: 150 },
      { label: 'Large (200g)', value: 200 }
    ]
  },
  {
    id: 'f060', name: 'Cake (Chocolate)', category: 'Desserts', emoji: '🎂',
    keywords: ['cake', 'chocolate cake', 'brownie', 'cupcake', 'muffin', 'pastry'],
    calories: 371, protein: 5.5, carbs: 52.0, fat: 16.0, fiber: 2.6, sugar: 36.0,
    defaultPortion: 100, portionOptions: [
      { label: 'Small slice (80g)', value: 80 }, { label: 'Regular slice (100g)', value: 100 },
      { label: 'Large slice (150g)', value: 150 }
    ]
  },
  {
    id: 'f061', name: 'Gulab Jamun', category: 'Desserts', emoji: '🍮',
    keywords: ['gulab jamun', 'kheer', 'halwa', 'ladoo', 'barfi', 'mithai', 'indian sweet'],
    calories: 387, protein: 5.8, carbs: 66.0, fat: 11.5, fiber: 0.3, sugar: 52.0,
    defaultPortion: 80, portionOptions: [
      { label: '1 piece (40g)', value: 40 }, { label: '2 pieces (80g)', value: 80 },
      { label: '3 pieces (120g)', value: 120 }
    ]
  },
  // ── DEFAULT / MIXED ──────────────────────────────────
  {
    id: 'f062', name: 'Mixed Vegetables', category: 'Vegetables', emoji: '🥘',
    keywords: ['vegetables', 'veggies', 'stir fry', 'mixed', 'sabzi'],
    calories: 65, protein: 3.5, carbs: 11.5, fat: 0.6, fiber: 4.0, sugar: 5.0,
    defaultPortion: 200, portionOptions: [
      { label: 'Small (150g)', value: 150 }, { label: 'Regular (200g)', value: 200 },
      { label: 'Large (300g)', value: 300 }
    ]
  },
  {
    id: 'f063', name: 'Peanut Butter', category: 'Snacks', emoji: '🥜',
    keywords: ['peanut butter', 'peanuts', 'groundnut', 'nut butter'],
    calories: 588, protein: 25.1, carbs: 20.0, fat: 50.4, fiber: 6.0, sugar: 9.2,
    defaultPortion: 32, portionOptions: [
      { label: '1 tbsp (16g)', value: 16 }, { label: '2 tbsp (32g)', value: 32 },
      { label: '4 tbsp (64g)', value: 64 }
    ]
  },
  {
    id: 'f064', name: 'Soup (Vegetable)', category: 'Meals', emoji: '🍲',
    keywords: ['soup', 'vegetable soup', 'broth', 'bowl', 'tomato soup'],
    calories: 35, protein: 1.8, carbs: 7.0, fat: 0.4, fiber: 1.5, sugar: 3.2,
    defaultPortion: 300, portionOptions: [
      { label: 'Small bowl (200ml)', value: 200 }, { label: 'Regular bowl (300ml)', value: 300 },
      { label: 'Large bowl (400ml)', value: 400 }
    ]
  },
  {
    id: 'f065', name: 'Sandwich', category: 'Meals', emoji: '🥪',
    keywords: ['sandwich', 'sub', 'club sandwich', 'blt', 'wrap'],
    calories: 250, protein: 12.0, carbs: 32.0, fat: 8.0, fiber: 2.5, sugar: 4.5,
    defaultPortion: 200, portionOptions: [
      { label: 'Half (100g)', value: 100 }, { label: 'Whole (200g)', value: 200 }
    ]
  },
  // indian foods
  {
  id: 'f066', name: 'Masala Dosa', category: 'Meals', emoji: '🥞',
  keywords: ['dosa', 'masala dosa', 'south indian dosa', 'potato dosa'],
  calories: 173, protein: 4.5, carbs: 26.0, fat: 5.5, fiber: 2.0, sugar: 1.5,
  defaultPortion: 180, portionOptions: [
    { label: '1 dosa (180g)', value: 180 },
    { label: '2 dosa (360g)', value: 360 }
  ]
},
{
  id: 'f067', name: 'Plain Dosa', category: 'Meals', emoji: '🥞',
  keywords: ['plain dosa', 'dosa', 'paper dosa'],
  calories: 168, protein: 4.0, carbs: 27.0, fat: 4.0, fiber: 1.5, sugar: 0.8,
  defaultPortion: 150, portionOptions: [
    { label: '1 dosa (150g)', value: 150 },
    { label: '2 dosa (300g)', value: 300 }
  ]
},
{
  id: 'f068', name: 'Medu Vada', category: 'Fast Food', emoji: '🍩',
  keywords: ['vada', 'medu vada', 'ulundu vada', 'south indian snack'],
  calories: 255, protein: 6.0, carbs: 30.0, fat: 12.0, fiber: 4.0, sugar: 1.0,
  defaultPortion: 80, portionOptions: [
    { label: '1 piece (80g)', value: 80 },
    { label: '2 pieces (160g)', value: 160 }
  ]
},
{
  id: 'f069', name: 'Pongal', category: 'Breakfast', emoji: '🍚',
  keywords: ['pongal', 'ven pongal', 'khara pongal'],
  calories: 160, protein: 5.0, carbs: 25.0, fat: 4.5, fiber: 2.2, sugar: 1.2,
  defaultPortion: 200, portionOptions: [
    { label: 'Small bowl (150g)', value: 150 },
    { label: 'Regular bowl (200g)', value: 200 },
    { label: 'Large bowl (300g)', value: 300 }
  ]
},
{
  id: 'f070', name: 'Curd Rice', category: 'Meals', emoji: '🍚',
  keywords: ['curd rice', 'yogurt rice', 'thayir sadam'],
  calories: 120, protein: 3.5, carbs: 18.0, fat: 3.0, fiber: 0.8, sugar: 2.5,
  defaultPortion: 250, portionOptions: [
    { label: 'Small bowl (200g)', value: 200 },
    { label: 'Regular bowl (250g)', value: 250 },
    { label: 'Large bowl (350g)', value: 350 }
  ]
},
{
  id: 'f071', name: 'Lemon Rice', category: 'Meals', emoji: '🍋',
  keywords: ['lemon rice', 'chitranna', 'elumichai sadam'],
  calories: 181, protein: 3.0, carbs: 28.0, fat: 6.0, fiber: 1.5, sugar: 1.2,
  defaultPortion: 250, portionOptions: [
    { label: 'Small bowl (200g)', value: 200 },
    { label: 'Regular bowl (250g)', value: 250 },
    { label: 'Large bowl (350g)', value: 350 }
  ]
},
{
  id: 'f072', name: 'Sambar', category: 'Meals', emoji: '🥘',
  keywords: ['sambar', 'south indian curry', 'lentil stew'],
  calories: 60, protein: 3.5, carbs: 10.0, fat: 1.5, fiber: 2.5, sugar: 2.0,
  defaultPortion: 200, portionOptions: [
    { label: 'Small bowl (150g)', value: 150 },
    { label: 'Regular bowl (200g)', value: 200 },
    { label: 'Large bowl (300g)', value: 300 }
  ]
},
{
  id: 'f073', name: 'Rasam', category: 'Meals', emoji: '🍲',
  keywords: ['rasam', 'pepper rasam', 'south indian soup'],
  calories: 35, protein: 1.2, carbs: 6.0, fat: 0.5, fiber: 1.0, sugar: 2.0,
  defaultPortion: 200, portionOptions: [
    { label: 'Cup (200ml)', value: 200 },
    { label: 'Large bowl (300ml)', value: 300 }
  ]
},
{
  id: 'f074', name: 'Vegetable Biryani', category: 'Meals', emoji: '🍛',
  keywords: ['veg biryani', 'vegetable biryani', 'pulao'],
  calories: 210, protein: 6.0, carbs: 35.0, fat: 5.5, fiber: 2.8, sugar: 2.0,
  defaultPortion: 250, portionOptions: [
    { label: 'Small (200g)', value: 200 },
    { label: 'Regular (250g)', value: 250 },
    { label: 'Large (350g)', value: 350 }
  ]
},
{
  id: 'f075', name: 'Paneer Butter Masala', category: 'Meals', emoji: '🍛',
  keywords: ['paneer butter masala', 'paneer curry', 'paneer makhani'],
  calories: 265, protein: 10.0, carbs: 8.0, fat: 21.0, fiber: 1.2, sugar: 4.5,
  defaultPortion: 200, portionOptions: [
    { label: 'Small bowl (150g)', value: 150 },
    { label: 'Regular bowl (200g)', value: 200 },
    { label: 'Large bowl (300g)', value: 300 }
  ]
},
{
  id: 'f076', name: 'Chapati with Dal', category: 'Meals', emoji: '🫓',
  keywords: ['chapati dal', 'roti dal', 'indian meal'],
  calories: 190, protein: 7.0, carbs: 30.0, fat: 4.5, fiber: 4.0, sugar: 1.5,
  defaultPortion: 200, portionOptions: [
    { label: '1 roti + dal (200g)', value: 200 },
    { label: '2 roti + dal (350g)', value: 350 }
  ]
},
{
  id: 'f077', name: 'Parotta', category: 'Grains', emoji: '🫓',
  keywords: ['parotta', 'kerala parotta', 'malabar parotta'],
  calories: 300, protein: 6.0, carbs: 40.0, fat: 14.0, fiber: 2.0, sugar: 1.0,
  defaultPortion: 120, portionOptions: [
    { label: '1 piece (120g)', value: 120 },
    { label: '2 pieces (240g)', value: 240 }
  ]
},
{
  id: 'f078', name: 'Chicken Curry (Indian)', category: 'Meals', emoji: '🍗',
  keywords: ['chicken curry', 'indian chicken curry', 'gravy chicken'],
  calories: 180, protein: 20.0, carbs: 5.0, fat: 9.0, fiber: 1.2, sugar: 2.0,
  defaultPortion: 200, portionOptions: [
    { label: 'Small bowl (150g)', value: 150 },
    { label: 'Regular bowl (200g)', value: 200 },
    { label: 'Large bowl (300g)', value: 300 }
  ]
},
{
  id: 'f079', name: 'Vegetable Upma', category: 'Breakfast', emoji: '🥘',
  keywords: ['vegetable upma', 'rava upma', 'south indian breakfast'],
  calories: 150, protein: 4.0, carbs: 25.0, fat: 4.5, fiber: 2.5, sugar: 1.5,
  defaultPortion: 200, portionOptions: [
    { label: 'Small (150g)', value: 150 },
    { label: 'Regular (200g)', value: 200 },
    { label: 'Large (300g)', value: 300 }
  ]
}
];
// ── Recommended Daily Values ──────────────────────────────
const RECOMMENDED_DAILY = {
  calories: 2000,
  protein:  50,    // grams
  carbs:    275,   // grams
  fat:      78,    // grams
  fiber:    28,    // grams
  sugar:    50     // grams (added sugars limit)
};
// ── Nutrient color + label map ────────────────────────────
const NUTRIENT_META = {
  calories: { label: 'Calories',       unit: 'kcal', color: '#f59e0b', icon: '🔥' },
  protein:  { label: 'Protein',        unit: 'g',    color: '#10b981', icon: '💪' },
  carbs:    { label: 'Carbohydrates',  unit: 'g',    color: '#6366f1', icon: '🌾' },
  fat:      { label: 'Fats',           unit: 'g',    color: '#ec4899', icon: '🫙' },
  fiber:    { label: 'Fiber',          unit: 'g',    color: '#84cc16', icon: '🌿' },
  sugar:    { label: 'Sugar',          unit: 'g',    color: '#f97316', icon: '🍬' },
};
// ── Helper: scale nutrition by portion ───────────────────
function scaledNutrition(food, portionGrams) {
  const scale = portionGrams / 100;
  return {
    calories: +(food.calories * scale).toFixed(1),
    protein:  +(food.protein  * scale).toFixed(1),
    carbs:    +(food.carbs    * scale).toFixed(1),
    fat:      +(food.fat      * scale).toFixed(1),
    fiber:    +(food.fiber    * scale).toFixed(1),
    sugar:    +(food.sugar    * scale).toFixed(1),
  };
}
// ── Helper: find food by id ───────────────────────────────
function getFoodById(id) {
  return FOOD_DATABASE.find(f => f.id === id) || null;
}
