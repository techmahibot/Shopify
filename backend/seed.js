const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/product.model");
const Customer = require("./models/customer.model");

// 210 products. Images: cdn.dummyjson.com (most) and covers.openlibrary.org (Books)
const products = [
 {
  "name": "Essence Mascara Lash Princess",
  "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  "price": 829,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  "stock": 99
 },
 {
  "name": "Eyeshadow Palette with Mirror",
  "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
  "price": 1659,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
  "stock": 34
 },
 {
  "name": "Powder Canister",
  "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
  "price": 1244,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
  "stock": 89
 },
 {
  "name": "Red Lipstick",
  "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
  "price": 1078,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
  "stock": 91
 },
 {
  "name": "Red Nail Polish",
  "description": "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
  "price": 746,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
  "stock": 79
 },
 {
  "name": "Calvin Klein CK One",
  "description": "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
  "price": 4149,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
  "stock": 29
 },
 {
  "name": "Chanel Coco Noir Eau De",
  "description": "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
  "price": 10789,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
  "stock": 58
 },
 {
  "name": "Dior J'adore",
  "description": "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
  "price": 7469,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
  "stock": 98
 },
 {
  "name": "Dolce Shine Eau de",
  "description": "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
  "price": 5809,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp",
  "stock": 4
 },
 {
  "name": "Gucci Bloom Eau de",
  "description": "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
  "price": 6639,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp",
  "stock": 91
 },
 {
  "name": "Annibale Colombo Bed",
  "description": "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
  "price": 157699,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
  "stock": 88
 },
 {
  "name": "Annibale Colombo Sofa",
  "description": "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
  "price": 207499,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp",
  "stock": 60
 },
 {
  "name": "Bedside Table African Cherry",
  "description": "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
  "price": 24899,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp",
  "stock": 64
 },
 {
  "name": "Knoll Saarinen Executive Conference Chair",
  "description": "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
  "price": 41499,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp",
  "stock": 26
 },
 {
  "name": "Wooden Bathroom Sink With Mirror",
  "description": "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
  "price": 66399,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp",
  "stock": 7
 },
 {
  "name": "Apple",
  "description": "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
  "price": 165,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
  "stock": 8
 },
 {
  "name": "Beef Steak",
  "description": "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
  "price": 1078,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp",
  "stock": 86
 },
 {
  "name": "Cat Food",
  "description": "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
  "price": 746,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp",
  "stock": 46
 },
 {
  "name": "Chicken Meat",
  "description": "Fresh and tender chicken meat, suitable for various culinary preparations.",
  "price": 829,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp",
  "stock": 97
 },
 {
  "name": "Cooking Oil",
  "description": "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
  "price": 414,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp",
  "stock": 10
 },
 {
  "name": "Cucumber",
  "description": "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
  "price": 124,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp",
  "stock": 84
 },
 {
  "name": "Dog Food",
  "description": "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
  "price": 912,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp",
  "stock": 71
 },
 {
  "name": "Eggs",
  "description": "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
  "price": 248,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp",
  "stock": 9
 },
 {
  "name": "Fish Steak",
  "description": "Quality fish steak, suitable for grilling, baking, or pan-searing.",
  "price": 1244,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
  "stock": 74
 },
 {
  "name": "Green Bell Pepper",
  "description": "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
  "price": 107,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp",
  "stock": 0
 },
 {
  "name": "Green Chili Pepper",
  "description": "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
  "price": 82,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp",
  "stock": 3
 },
 {
  "name": "Honey Jar",
  "description": "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
  "price": 580,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp",
  "stock": 34
 },
 {
  "name": "Ice Cream",
  "description": "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
  "price": 456,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp",
  "stock": 27
 },
 {
  "name": "Juice",
  "description": "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
  "price": 331,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp",
  "stock": 50
 },
 {
  "name": "Kiwi",
  "description": "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
  "price": 207,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp",
  "stock": 99
 },
 {
  "name": "Lemon",
  "description": "Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.",
  "price": 66,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/lemon/thumbnail.webp",
  "stock": 31
 },
 {
  "name": "Milk",
  "description": "Fresh and nutritious milk, a staple for various recipes and daily consumption.",
  "price": 290,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/milk/thumbnail.webp",
  "stock": 27
 },
 {
  "name": "Mulberry",
  "description": "Sweet and juicy mulberries, perfect for snacking or adding to desserts and cereals.",
  "price": 414,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/mulberry/thumbnail.webp",
  "stock": 99
 },
 {
  "name": "Nescafe Coffee",
  "description": "Quality coffee from Nescafe, available in various blends for a rich and satisfying cup.",
  "price": 663,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/nescafe-coffee/thumbnail.webp",
  "stock": 57
 },
 {
  "name": "Potatoes",
  "description": "Versatile and starchy potatoes, great for roasting, mashing, or as a side dish.",
  "price": 190,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/potatoes/thumbnail.webp",
  "stock": 13
 },
 {
  "name": "Protein Powder",
  "description": "Nutrient-packed protein powder, ideal for supplementing your diet with essential proteins.",
  "price": 1659,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/protein-powder/thumbnail.webp",
  "stock": 80
 },
 {
  "name": "Red Onions",
  "description": "Flavorful and aromatic red onions, perfect for adding depth to your savory dishes.",
  "price": 165,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/red-onions/thumbnail.webp",
  "stock": 82
 },
 {
  "name": "Rice",
  "description": "High-quality rice, a staple for various cuisines and a versatile base for many dishes.",
  "price": 497,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/rice/thumbnail.webp",
  "stock": 59
 },
 {
  "name": "Soft Drinks",
  "description": "Assorted soft drinks in various flavors, perfect for refreshing beverages.",
  "price": 165,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/soft-drinks/thumbnail.webp",
  "stock": 53
 },
 {
  "name": "Strawberry",
  "description": "Sweet and succulent strawberries, great for snacking, desserts, or blending into smoothies.",
  "price": 331,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/strawberry/thumbnail.webp",
  "stock": 46
 },
 {
  "name": "Tissue Paper Box",
  "description": "Convenient tissue paper box for everyday use, providing soft and absorbent tissues.",
  "price": 207,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/thumbnail.webp",
  "stock": 86
 },
 {
  "name": "Water",
  "description": "Pure and refreshing bottled water, essential for staying hydrated throughout the day.",
  "price": 82,
  "category": "Groceries",
  "image": "https://cdn.dummyjson.com/product-images/groceries/water/thumbnail.webp",
  "stock": 53
 },
 {
  "name": "Decoration Swing",
  "description": "The Decoration Swing is a charming addition to your home decor. Crafted with intricate details, it adds a touch of elegance and whimsy to any room.",
  "price": 4979,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp",
  "stock": 47
 },
 {
  "name": "Family Tree Photo Frame",
  "description": "The Family Tree Photo Frame is a sentimental and stylish way to display your cherished family memories. With multiple photo slots, it tells the story of your loved ones.",
  "price": 2489,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp",
  "stock": 77
 },
 {
  "name": "House Showpiece Plant",
  "description": "The House Showpiece Plant is an artificial plant that brings a touch of nature to your home without the need for maintenance. It adds greenery and style to any space.",
  "price": 3319,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/thumbnail.webp",
  "stock": 28
 },
 {
  "name": "Plant Pot",
  "description": "The Plant Pot is a stylish container for your favorite plants. With a sleek design, it complements your indoor or outdoor garden, adding a modern touch to your plant display.",
  "price": 1244,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/thumbnail.webp",
  "stock": 59
 },
 {
  "name": "Table Lamp",
  "description": "The Table Lamp is a functional and decorative lighting solution for your living space. With a modern design, it provides both ambient and task lighting, enhancing the atmosphere.",
  "price": 4149,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp",
  "stock": 9
 },
 {
  "name": "Bamboo Spatula",
  "description": "The Bamboo Spatula is a versatile kitchen tool made from eco-friendly bamboo. Ideal for flipping, stirring, and serving various dishes.",
  "price": 663,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
  "stock": 37
 },
 {
  "name": "Black Aluminium Cup",
  "description": "The Black Aluminium Cup is a stylish and durable cup suitable for both hot and cold beverages. Its sleek black design adds a modern touch to your drinkware collection.",
  "price": 497,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/thumbnail.webp",
  "stock": 75
 },
 {
  "name": "Black Whisk",
  "description": "The Black Whisk is a kitchen essential for whisking and beating ingredients. Its ergonomic handle and sleek design make it a practical and stylish tool.",
  "price": 829,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/thumbnail.webp",
  "stock": 0
 },
 {
  "name": "Boxed Blender",
  "description": "The Boxed Blender is a powerful and compact blender perfect for smoothies, shakes, and more. Its convenient design and multiple functions make it a versatile kitchen appliance.",
  "price": 3319,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/thumbnail.webp",
  "stock": 9
 },
 {
  "name": "Carbon Steel Wok",
  "description": "The Carbon Steel Wok is a versatile cooking pan suitable for stir-frying, sautéing, and deep frying. Its sturdy construction ensures even heat distribution for delicious meals.",
  "price": 2489,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/thumbnail.webp",
  "stock": 40
 },
 {
  "name": "Chopping Board",
  "description": "The Chopping Board is an essential kitchen accessory for food preparation. Made from durable material, it provides a safe and hygienic surface for cutting and chopping.",
  "price": 1078,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/thumbnail.webp",
  "stock": 14
 },
 {
  "name": "Citrus Squeezer Yellow",
  "description": "The Citrus Squeezer in Yellow is a handy tool for extracting juice from citrus fruits. Its vibrant color adds a cheerful touch to your kitchen gadgets.",
  "price": 746,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/citrus-squeezer-yellow/thumbnail.webp",
  "stock": 22
 },
 {
  "name": "Egg Slicer",
  "description": "The Egg Slicer is a convenient tool for slicing boiled eggs evenly. It's perfect for salads, sandwiches, and other dishes where sliced eggs are desired.",
  "price": 580,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/egg-slicer/thumbnail.webp",
  "stock": 40
 },
 {
  "name": "Electric Stove",
  "description": "The Electric Stove provides a portable and efficient cooking solution. Ideal for small kitchens or as an additional cooking surface for various culinary needs.",
  "price": 4149,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/thumbnail.webp",
  "stock": 21
 },
 {
  "name": "Fine Mesh Strainer",
  "description": "The Fine Mesh Strainer is a versatile tool for straining liquids and sifting dry ingredients. Its fine mesh ensures efficient filtering for smooth cooking and baking.",
  "price": 829,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/fine-mesh-strainer/thumbnail.webp",
  "stock": 85
 },
 {
  "name": "Fork",
  "description": "The Fork is a classic utensil for various dining and serving purposes. Its durable and ergonomic design makes it a reliable choice for everyday use.",
  "price": 331,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/fork/thumbnail.webp",
  "stock": 7
 },
 {
  "name": "Glass",
  "description": "The Glass is a versatile and elegant drinking vessel suitable for a variety of beverages. Its clear design allows you to enjoy the colors and textures of your drinks.",
  "price": 414,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/glass/thumbnail.webp",
  "stock": 46
 },
 {
  "name": "Grater Black",
  "description": "The Grater in Black is a handy kitchen tool for grating cheese, vegetables, and more. Its sleek design and sharp blades make food preparation efficient and easy.",
  "price": 912,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/grater-black/thumbnail.webp",
  "stock": 84
 },
 {
  "name": "Hand Blender",
  "description": "The Hand Blender is a versatile kitchen appliance for blending, pureeing, and mixing. Its compact design and powerful motor make it a convenient tool for various recipes.",
  "price": 2904,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/thumbnail.webp",
  "stock": 84
 },
 {
  "name": "Ice Cube Tray",
  "description": "The Ice Cube Tray is a practical accessory for making ice cubes in various shapes. Perfect for keeping your drinks cool and adding a fun element to your beverages.",
  "price": 497,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/thumbnail.webp",
  "stock": 13
 },
 {
  "name": "Kitchen Sieve",
  "description": "The Kitchen Sieve is a versatile tool for sifting and straining dry and wet ingredients. Its fine mesh design ensures smooth results in your cooking and baking.",
  "price": 663,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/thumbnail.webp",
  "stock": 68
 },
 {
  "name": "Knife",
  "description": "The Knife is an essential kitchen tool for chopping, slicing, and dicing. Its sharp blade and ergonomic handle make it a reliable choice for food preparation.",
  "price": 1244,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/thumbnail.webp",
  "stock": 7
 },
 {
  "name": "Lunch Box",
  "description": "The Lunch Box is a convenient and portable container for packing and carrying your meals. With compartments for different foods, it's perfect for on-the-go dining.",
  "price": 1078,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/thumbnail.webp",
  "stock": 94
 },
 {
  "name": "Microwave Oven",
  "description": "The Microwave Oven is a versatile kitchen appliance for quick and efficient cooking, reheating, and defrosting. Its compact size makes it suitable for various kitchen setups.",
  "price": 7469,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/thumbnail.webp",
  "stock": 59
 },
 {
  "name": "Mug Tree Stand",
  "description": "The Mug Tree Stand is a stylish and space-saving solution for organizing your mugs. Keep your favorite mugs easily accessible and neatly displayed in your kitchen.",
  "price": 1327,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/thumbnail.webp",
  "stock": 88
 },
 {
  "name": "Pan",
  "description": "The Pan is a versatile and essential cookware item for frying, sautéing, and cooking various dishes. Its non-stick coating ensures easy food release and cleanup.",
  "price": 2074,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/thumbnail.webp",
  "stock": 90
 },
 {
  "name": "Plate",
  "description": "The Plate is a classic and essential dishware item for serving meals. Its durable and stylish design makes it suitable for everyday use or special occasions.",
  "price": 331,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/thumbnail.webp",
  "stock": 66
 },
 {
  "name": "Red Tongs",
  "description": "The Red Tongs are versatile kitchen tongs suitable for various cooking and serving tasks. Their vibrant color adds a pop of excitement to your kitchen utensils.",
  "price": 580,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/red-tongs/thumbnail.webp",
  "stock": 82
 },
 {
  "name": "Silver Pot With Glass Cap",
  "description": "The Silver Pot with Glass Cap is a stylish and functional cookware item for boiling, simmering, and preparing delicious meals. Its glass cap allows you to monitor cooking progress.",
  "price": 3319,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-glass-cap/thumbnail.webp",
  "stock": 40
 },
 {
  "name": "Slotted Turner",
  "description": "The Slotted Turner is a kitchen utensil designed for flipping and turning food items. Its slotted design allows excess liquid to drain, making it ideal for frying and sautéing.",
  "price": 746,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/slotted-turner/thumbnail.webp",
  "stock": 88
 },
 {
  "name": "Spice Rack",
  "description": "The Spice Rack is a convenient organizer for your spices and seasonings. Keep your kitchen essentials within reach and neatly arranged with this stylish spice rack.",
  "price": 1659,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/thumbnail.webp",
  "stock": 79
 },
 {
  "name": "Spoon",
  "description": "The Spoon is a versatile kitchen utensil for stirring, serving, and tasting. Its ergonomic design and durable construction make it an essential tool for every kitchen.",
  "price": 414,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/spoon/thumbnail.webp",
  "stock": 59
 },
 {
  "name": "Tray",
  "description": "The Tray is a functional and decorative item for serving snacks, appetizers, or drinks. Its stylish design makes it a versatile accessory for entertaining guests.",
  "price": 1410,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/tray/thumbnail.webp",
  "stock": 0
 },
 {
  "name": "Wooden Rolling Pin",
  "description": "The Wooden Rolling Pin is a classic kitchen tool for rolling out dough for baking. Its smooth surface and sturdy handles make it easy to achieve uniform thickness.",
  "price": 995,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-rolling-pin/thumbnail.webp",
  "stock": 80
 },
 {
  "name": "Yellow Peeler",
  "description": "The Yellow Peeler is a handy tool for peeling fruits and vegetables with ease. Its bright yellow color adds a cheerful touch to your kitchen gadgets.",
  "price": 497,
  "category": "Home",
  "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/yellow-peeler/thumbnail.webp",
  "stock": 35
 },
 {
  "name": "Apple MacBook Pro 14 Inch Space Grey",
  "description": "The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple's M1 Pro chip for exceptional performance and a stunning Retina display.",
  "price": 165999,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
  "stock": 24
 },
 {
  "name": "Asus Zenbook Pro Dual Screen Laptop",
  "description": "The Asus Zenbook Pro Dual Screen Laptop is a high-performance device with dual screens, providing productivity and versatility for creative professionals.",
  "price": 149399,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp",
  "stock": 45
 },
 {
  "name": "Huawei Matebook X Pro",
  "description": "The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.",
  "price": 116199,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp",
  "stock": 75
 },
 {
  "name": "Lenovo Yoga 920",
  "description": "The Lenovo Yoga 920 is a 2-in-1 convertible laptop with a flexible hinge, allowing you to use it as a laptop or tablet, offering versatility and portability.",
  "price": 91299,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp",
  "stock": 40
 },
 {
  "name": "New DELL XPS 13 9300 Laptop",
  "description": "The New DELL XPS 13 9300 Laptop is a compact and powerful device, featuring a virtually borderless InfinityEdge display and high-end performance for various tasks.",
  "price": 124499,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp",
  "stock": 74
 },
 {
  "name": "Blue & Black Check Shirt",
  "description": "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
  "price": 2489,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp",
  "stock": 38
 },
 {
  "name": "Gigabyte Aorus Men Tshirt",
  "description": "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style.",
  "price": 2074,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp",
  "stock": 90
 },
 {
  "name": "Man Plaid Shirt",
  "description": "The Man Plaid Shirt is a timeless and versatile men's shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions.",
  "price": 2904,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/thumbnail.webp",
  "stock": 82
 },
 {
  "name": "Man Short Sleeve Shirt",
  "description": "The Man Short Sleeve Shirt is a breezy and stylish option for warm days. With a comfortable fit and short sleeves, it's perfect for a laid-back yet polished look.",
  "price": 1659,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/thumbnail.webp",
  "stock": 3
 },
 {
  "name": "Men Check Shirt",
  "description": "The Men Check Shirt is a classic and versatile shirt featuring a stylish check pattern. Suitable for various occasions, it adds a smart and polished touch to your wardrobe.",
  "price": 2323,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/thumbnail.webp",
  "stock": 95
 },
 {
  "name": "Nike Air Jordan 1 Red And Black",
  "description": "The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker known for its stylish design and high-performance features, making it a favorite among sneaker enthusiasts and athletes.",
  "price": 12449,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp",
  "stock": 7
 },
 {
  "name": "Nike Baseball Cleats",
  "description": "Nike Baseball Cleats are designed for maximum traction and performance on the baseball field. They provide stability and support for players during games and practices.",
  "price": 6639,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/thumbnail.webp",
  "stock": 12
 },
 {
  "name": "Puma Future Rider Trainers",
  "description": "The Puma Future Rider Trainers offer a blend of retro style and modern comfort. Perfect for casual wear, these trainers provide a fashionable and comfortable option for everyday use.",
  "price": 7469,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/thumbnail.webp",
  "stock": 90
 },
 {
  "name": "Sports Sneakers Off White & Red",
  "description": "The Sports Sneakers in Off White and Red combine style and functionality, making them a fashionable choice for sports enthusiasts. The red and off-white color combination adds a bold and energetic touch.",
  "price": 9959,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/thumbnail.webp",
  "stock": 17
 },
 {
  "name": "Sports Sneakers Off White Red",
  "description": "Another variant of the Sports Sneakers in Off White Red, featuring a unique design. These sneakers offer style and comfort for casual occasions.",
  "price": 9129,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/thumbnail.webp",
  "stock": 62
 },
 {
  "name": "Brown Leather Belt Watch",
  "description": "The Brown Leather Belt Watch is a stylish timepiece with a classic design. Featuring a genuine leather strap and a sleek dial, it adds a touch of sophistication to your look.",
  "price": 7469,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp",
  "stock": 32
 },
 {
  "name": "Longines Master Collection",
  "description": "The Longines Master Collection is an elegant and refined watch known for its precision and craftsmanship. With a timeless design, it's a symbol of luxury and sophistication.",
  "price": 124499,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/thumbnail.webp",
  "stock": 100
 },
 {
  "name": "Rolex Cellini Date Black Dial",
  "description": "The Rolex Cellini Date with Black Dial is a classic and prestigious watch. With a black dial and date complication, it exudes sophistication and is a symbol of Rolex's heritage.",
  "price": 746999,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/thumbnail.webp",
  "stock": 40
 },
 {
  "name": "Rolex Cellini Moonphase",
  "description": "The Rolex Cellini Moonphase is a masterpiece of horology, featuring a moon phase complication and exquisite design. It reflects Rolex's commitment to precision and elegance.",
  "price": 1078999,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/thumbnail.webp",
  "stock": 36
 },
 {
  "name": "Rolex Datejust",
  "description": "The Rolex Datejust is an iconic and versatile timepiece with a date window. Known for its timeless design and reliability, it's a symbol of Rolex's watchmaking excellence.",
  "price": 912999,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/thumbnail.webp",
  "stock": 86
 },
 {
  "name": "Rolex Submariner Watch",
  "description": "The Rolex Submariner is a legendary dive watch with a rich history. Known for its durability and water resistance, it's a symbol of adventure and exploration.",
  "price": 1161999,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/thumbnail.webp",
  "stock": 55
 },
 {
  "name": "Amazon Echo Plus",
  "description": "The Amazon Echo Plus is a smart speaker with built-in Alexa voice control. It features premium sound quality and serves as a hub for controlling smart home devices.",
  "price": 8299,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/thumbnail.webp",
  "stock": 61
 },
 {
  "name": "Apple Airpods",
  "description": "The Apple Airpods offer a seamless wireless audio experience. With easy pairing, high-quality sound, and Siri integration, they are perfect for on-the-go listening.",
  "price": 10789,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/thumbnail.webp",
  "stock": 0
 },
 {
  "name": "Apple AirPods Max Silver",
  "description": "The Apple AirPods Max in Silver are premium over-ear headphones with high-fidelity audio, adaptive EQ, and active noise cancellation. Experience immersive sound in style.",
  "price": 45649,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
  "stock": 59
 },
 {
  "name": "Apple Airpower Wireless Charger",
  "description": "The Apple AirPower Wireless Charger provides a convenient way to charge your compatible Apple devices wirelessly. Simply place your devices on the charging mat for effortless charging.",
  "price": 6639,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/thumbnail.webp",
  "stock": 3
 },
 {
  "name": "Apple HomePod Mini Cosmic Grey",
  "description": "The Apple HomePod Mini in Cosmic Grey is a compact smart speaker that delivers impressive audio and integrates seamlessly with the Apple ecosystem for a smart home experience.",
  "price": 8299,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/thumbnail.webp",
  "stock": 27
 },
 {
  "name": "Apple iPhone Charger",
  "description": "The Apple iPhone Charger is a high-quality charger designed for fast and efficient charging of your iPhone. Ensure your device stays powered up and ready to go.",
  "price": 1659,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp",
  "stock": 31
 },
 {
  "name": "Apple MagSafe Battery Pack",
  "description": "The Apple MagSafe Battery Pack is a portable and convenient way to add extra battery life to your MagSafe-compatible iPhone. Attach it magnetically for a secure connection.",
  "price": 8299,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/thumbnail.webp",
  "stock": 3
 },
 {
  "name": "Apple Watch Series 4 Gold",
  "description": "The Apple Watch Series 4 in Gold is a stylish and advanced smartwatch with features like heart rate monitoring, fitness tracking, and a beautiful Retina display.",
  "price": 29049,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp",
  "stock": 33
 },
 {
  "name": "Beats Flex Wireless Earphones",
  "description": "The Beats Flex Wireless Earphones offer a comfortable and versatile audio experience. With magnetic earbuds and up to 12 hours of battery life, they are ideal for everyday use.",
  "price": 4149,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp",
  "stock": 50
 },
 {
  "name": "iPhone 12 Silicone Case with MagSafe Plum",
  "description": "The iPhone 12 Silicone Case with MagSafe in Plum is a stylish and protective case designed for the iPhone 12. It features MagSafe technology for easy attachment of accessories.",
  "price": 2489,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/thumbnail.webp",
  "stock": 69
 },
 {
  "name": "Monopod",
  "description": "The Monopod is a versatile camera accessory for stable and adjustable shooting. Perfect for capturing selfies, group photos, and videos with ease.",
  "price": 1659,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/monopod/thumbnail.webp",
  "stock": 48
 },
 {
  "name": "Selfie Lamp with iPhone",
  "description": "The Selfie Lamp with iPhone is a portable and adjustable LED light designed to enhance your selfies and video calls. Attach it to your iPhone for well-lit photos.",
  "price": 1244,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-lamp-with-iphone/thumbnail.webp",
  "stock": 58
 },
 {
  "name": "Selfie Stick Monopod",
  "description": "The Selfie Stick Monopod is a extendable and foldable device for capturing the perfect selfie or group photo. Compatible with smartphones and cameras.",
  "price": 1078,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-stick-monopod/thumbnail.webp",
  "stock": 11
 },
 {
  "name": "TV Studio Camera Pedestal",
  "description": "The TV Studio Camera Pedestal is a professional-grade camera support system for smooth and precise camera movements in a studio setting. Ideal for broadcast and production.",
  "price": 41499,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/mobile-accessories/tv-studio-camera-pedestal/thumbnail.webp",
  "stock": 15
 },
 {
  "name": "Generic Motorcycle",
  "description": "The Generic Motorcycle is a versatile and reliable bike suitable for various riding preferences. With a balanced design, it provides a comfortable and efficient riding experience.",
  "price": 331999,
  "category": "Automotive",
  "image": "https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/thumbnail.webp",
  "stock": 34
 },
 {
  "name": "Kawasaki Z800",
  "description": "The Kawasaki Z800 is a powerful and agile sportbike known for its striking design and performance. It's equipped with advanced features, making it a favorite among motorcycle enthusiasts.",
  "price": 746999,
  "category": "Automotive",
  "image": "https://cdn.dummyjson.com/product-images/motorcycle/kawasaki-z800/thumbnail.webp",
  "stock": 52
 },
 {
  "name": "MotoGP CI.H1",
  "description": "The MotoGP CI.H1 is a high-performance motorcycle inspired by MotoGP racing technology. It offers cutting-edge features and precision engineering for an exhilarating riding experience.",
  "price": 1244999,
  "category": "Automotive",
  "image": "https://cdn.dummyjson.com/product-images/motorcycle/motogp-ci.h1/thumbnail.webp",
  "stock": 10
 },
 {
  "name": "Scooter Motorcycle",
  "description": "The Scooter Motorcycle is a practical and fuel-efficient bike ideal for urban commuting. It features a step-through design and user-friendly controls for easy maneuverability.",
  "price": 248999,
  "category": "Automotive",
  "image": "https://cdn.dummyjson.com/product-images/motorcycle/scooter-motorcycle/thumbnail.webp",
  "stock": 84
 },
 {
  "name": "Sportbike Motorcycle",
  "description": "The Sportbike Motorcycle is designed for speed and agility, with a sleek and aerodynamic profile. It's suitable for riders looking for a dynamic and thrilling riding experience.",
  "price": 622499,
  "category": "Automotive",
  "image": "https://cdn.dummyjson.com/product-images/motorcycle/sportbike-motorcycle/thumbnail.webp",
  "stock": 3
 },
 {
  "name": "Attitude Super Leaves Hand Soap",
  "description": "Attitude Super Leaves Hand Soap is a natural and nourishing hand soap enriched with the goodness of super leaves. It cleanses and moisturizes your hands, leaving them feeling fresh and soft.",
  "price": 746,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/thumbnail.webp",
  "stock": 94
 },
 {
  "name": "Olay Ultra Moisture Shea Butter Body Wash",
  "description": "Olay Ultra Moisture Shea Butter Body Wash is a luxurious body wash that hydrates and nourishes your skin with the moisturizing power of shea butter. Enjoy a rich lather and silky-smooth skin.",
  "price": 1078,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/thumbnail.webp",
  "stock": 34
 },
 {
  "name": "Vaseline Men Body and Face Lotion",
  "description": "Vaseline Men Body and Face Lotion is a specially formulated lotion designed to provide long-lasting moisture to men's skin. It absorbs quickly and helps keep the skin hydrated and healthy.",
  "price": 829,
  "category": "Beauty",
  "image": "https://cdn.dummyjson.com/product-images/skin-care/vaseline-men-body-and-face-lotion/thumbnail.webp",
  "stock": 95
 },
 {
  "name": "iPhone 5s",
  "description": "The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it's an older model, it still provides a reliable user experience.",
  "price": 16599,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp",
  "stock": 25
 },
 {
  "name": "iPhone 6",
  "description": "The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time.",
  "price": 24899,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/thumbnail.webp",
  "stock": 60
 },
 {
  "name": "iPhone 13 Pro",
  "description": "The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.",
  "price": 91299,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
  "stock": 56
 },
 {
  "name": "iPhone X",
  "description": "The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.",
  "price": 74699,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp",
  "stock": 37
 },
 {
  "name": "Oppo A57",
  "description": "The Oppo A57 is a mid-range smartphone known for its sleek design and capable features. It offers a balance of performance and affordability, making it a popular choice.",
  "price": 20749,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/thumbnail.webp",
  "stock": 0
 },
 {
  "name": "Oppo F19 Pro Plus",
  "description": "The Oppo F19 Pro Plus is a feature-rich smartphone with a focus on camera capabilities. It boasts advanced photography features and a powerful performance for a premium user experience.",
  "price": 33199,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/thumbnail.webp",
  "stock": 78
 },
 {
  "name": "Oppo K1",
  "description": "The Oppo K1 series offers a range of smartphones with various features and specifications. Known for their stylish design and reliable performance, the Oppo K1 series caters to diverse user preferences.",
  "price": 24899,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/thumbnail.webp",
  "stock": 55
 },
 {
  "name": "Realme C35",
  "description": "The Realme C35 is a budget-friendly smartphone with a focus on providing essential features for everyday use. It offers a reliable performance and user-friendly experience.",
  "price": 12449,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/realme-c35/thumbnail.webp",
  "stock": 48
 },
 {
  "name": "Realme X",
  "description": "The Realme X is a mid-range smartphone known for its sleek design and impressive display. It offers a good balance of performance and camera capabilities for users seeking a quality device.",
  "price": 24899,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/realme-x/thumbnail.webp",
  "stock": 12
 },
 {
  "name": "Realme XT",
  "description": "The Realme XT is a feature-rich smartphone with a focus on camera technology. It comes equipped with advanced camera sensors, delivering high-quality photos and videos for photography enthusiasts.",
  "price": 29049,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/realme-xt/thumbnail.webp",
  "stock": 80
 },
 {
  "name": "Samsung Galaxy S7",
  "description": "The Samsung Galaxy S7 is a flagship smartphone known for its sleek design and advanced features. It features a high-resolution display, powerful camera, and robust performance.",
  "price": 24899,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/thumbnail.webp",
  "stock": 67
 },
 {
  "name": "Samsung Galaxy S8",
  "description": "The Samsung Galaxy S8 is a premium smartphone with an Infinity Display, offering a stunning visual experience. It boasts advanced camera capabilities and cutting-edge technology.",
  "price": 41499,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/thumbnail.webp",
  "stock": 3
 },
 {
  "name": "Samsung Galaxy S10",
  "description": "The Samsung Galaxy S10 is a flagship device featuring a dynamic AMOLED display, versatile camera system, and powerful performance. It represents innovation and excellence in smartphone technology.",
  "price": 58099,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp",
  "stock": 19
 },
 {
  "name": "Vivo S1",
  "description": "The Vivo S1 is a stylish and mid-range smartphone offering a blend of design and performance. It features a vibrant display, capable camera system, and reliable functionality.",
  "price": 20749,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/thumbnail.webp",
  "stock": 50
 },
 {
  "name": "Vivo V9",
  "description": "The Vivo V9 is a smartphone known for its sleek design and emphasis on capturing high-quality selfies. It features a notch display, dual-camera setup, and a modern design.",
  "price": 24899,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/thumbnail.webp",
  "stock": 82
 },
 {
  "name": "Vivo X21",
  "description": "The Vivo X21 is a premium smartphone with a focus on cutting-edge technology. It features an in-display fingerprint sensor, a high-resolution display, and advanced camera capabilities.",
  "price": 41499,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/thumbnail.webp",
  "stock": 7
 },
 {
  "name": "American Football",
  "description": "The American Football is a classic ball used in American football games. It is designed for throwing and catching, making it an essential piece of equipment for the sport.",
  "price": 1659,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/american-football/thumbnail.webp",
  "stock": 53
 },
 {
  "name": "Baseball Ball",
  "description": "The Baseball Ball is a standard baseball used in baseball games. It features a durable leather cover and is designed for pitching, hitting, and fielding in the game of baseball.",
  "price": 746,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-ball/thumbnail.webp",
  "stock": 100
 },
 {
  "name": "Baseball Glove",
  "description": "The Baseball Glove is a protective glove worn by baseball players. It is designed to catch and field the baseball, providing players with comfort and control during the game.",
  "price": 2074,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/thumbnail.webp",
  "stock": 22
 },
 {
  "name": "Basketball",
  "description": "The Basketball is a standard ball used in basketball games. It is designed for dribbling, shooting, and passing in the game of basketball, suitable for both indoor and outdoor play.",
  "price": 1244,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/basketball/thumbnail.webp",
  "stock": 75
 },
 {
  "name": "Basketball Rim",
  "description": "The Basketball Rim is a sturdy hoop and net assembly mounted on a basketball backboard. It provides a target for shooting and scoring in the game of basketball.",
  "price": 3319,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/basketball-rim/thumbnail.webp",
  "stock": 43
 },
 {
  "name": "Cricket Ball",
  "description": "The Cricket Ball is a hard leather ball used in the sport of cricket. It is bowled and batted in the game, and its hardness and seam contribute to the dynamics of cricket play.",
  "price": 1078,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-ball/thumbnail.webp",
  "stock": 30
 },
 {
  "name": "Cricket Bat",
  "description": "The Cricket Bat is an essential piece of cricket equipment used by batsmen to hit the cricket ball. It is made of wood and comes in various sizes and designs.",
  "price": 2489,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-bat/thumbnail.webp",
  "stock": 98
 },
 {
  "name": "Cricket Helmet",
  "description": "The Cricket Helmet is a protective headgear worn by cricket players, especially batsmen and wicketkeepers. It provides protection against fast bowling and bouncers.",
  "price": 3734,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/thumbnail.webp",
  "stock": 10
 },
 {
  "name": "Cricket Wicket",
  "description": "The Cricket Wicket is a set of three stumps and two bails, forming a wicket used in the sport of cricket. Batsmen aim to protect the wicket while scoring runs.",
  "price": 2489,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-wicket/thumbnail.webp",
  "stock": 25
 },
 {
  "name": "Feather Shuttlecock",
  "description": "The Feather Shuttlecock is used in the sport of badminton. It features natural feathers and is designed for high-speed play, providing stability and accuracy during matches.",
  "price": 497,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/feather-shuttlecock/thumbnail.webp",
  "stock": 95
 },
 {
  "name": "Football",
  "description": "The Football, also known as a soccer ball, is the standard ball used in the sport of football (soccer). It is designed for kicking and passing in the game.",
  "price": 1493,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/football/thumbnail.webp",
  "stock": 96
 },
 {
  "name": "Golf Ball",
  "description": "The Golf Ball is a small ball used in the sport of golf. It features dimples on its surface, providing aerodynamic lift and distance when struck by a golf club.",
  "price": 829,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/golf-ball/thumbnail.webp",
  "stock": 84
 },
 {
  "name": "Iron Golf",
  "description": "The Iron Golf is a type of golf club designed for various golf shots. It features a solid metal head and is used for approach shots, chipping, and other golfing techniques.",
  "price": 4149,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/iron-golf/thumbnail.webp",
  "stock": 90
 },
 {
  "name": "Metal Baseball Bat",
  "description": "The Metal Baseball Bat is a durable and lightweight baseball bat made from metal alloys. It is commonly used in baseball games for hitting and batting practice.",
  "price": 2489,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/metal-baseball-bat/thumbnail.webp",
  "stock": 0
 },
 {
  "name": "Tennis Ball",
  "description": "The Tennis Ball is a standard ball used in the sport of tennis. It is designed for bouncing and hitting with tennis rackets during matches or practice sessions.",
  "price": 580,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/tennis-ball/thumbnail.webp",
  "stock": 28
 },
 {
  "name": "Tennis Racket",
  "description": "The Tennis Racket is an essential piece of equipment used in the sport of tennis. It features a frame with strings and a grip, allowing players to hit the tennis ball.",
  "price": 4149,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/tennis-racket/thumbnail.webp",
  "stock": 6
 },
 {
  "name": "Volleyball",
  "description": "The Volleyball is a standard ball used in the sport of volleyball. It is designed for passing, setting, and spiking over the net during volleyball matches.",
  "price": 995,
  "category": "Sports",
  "image": "https://cdn.dummyjson.com/product-images/sports-accessories/volleyball/thumbnail.webp",
  "stock": 3
 },
 {
  "name": "Black Sun Glasses",
  "description": "The Black Sun Glasses are a classic and stylish choice, featuring a sleek black frame and tinted lenses. They provide both UV protection and a fashionable look.",
  "price": 2489,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/thumbnail.webp",
  "stock": 60
 },
 {
  "name": "Classic Sun Glasses",
  "description": "The Classic Sun Glasses offer a timeless design with a neutral frame and UV-protected lenses. These sunglasses are versatile and suitable for various occasions.",
  "price": 2074,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/thumbnail.webp",
  "stock": 3
 },
 {
  "name": "Green and Black Glasses",
  "description": "The Green and Black Glasses feature a bold combination of green and black colors, adding a touch of vibrancy to your eyewear collection. They are both stylish and eye-catching.",
  "price": 2904,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/thumbnail.webp",
  "stock": 24
 },
 {
  "name": "Party Glasses",
  "description": "The Party Glasses are designed to add flair to your party outfit. With unique shapes or colorful frames, they're perfect for adding a playful touch to your look during celebrations.",
  "price": 1659,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/sunglasses/party-glasses/thumbnail.webp",
  "stock": 86
 },
 {
  "name": "Sunglasses",
  "description": "The Sunglasses offer a classic and simple design with a focus on functionality. These sunglasses provide essential UV protection while maintaining a timeless look.",
  "price": 1908,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/sunglasses/sunglasses/thumbnail.webp",
  "stock": 27
 },
 {
  "name": "iPad Mini 2021 Starlight",
  "description": "The iPad Mini 2021 in Starlight is a compact and powerful tablet from Apple. Featuring a stunning Retina display, powerful A-series chip, and a sleek design, it offers a premium tablet experience.",
  "price": 41499,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/thumbnail.webp",
  "stock": 47
 },
 {
  "name": "Samsung Galaxy Tab S8 Plus Grey",
  "description": "The Samsung Galaxy Tab S8 Plus in Grey is a high-performance Android tablet by Samsung. With a large AMOLED display, powerful processor, and S Pen support, it's ideal for productivity and entertainment.",
  "price": 49799,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/thumbnail.webp",
  "stock": 62
 },
 {
  "name": "Samsung Galaxy Tab White",
  "description": "The Samsung Galaxy Tab in White is a sleek and versatile Android tablet. With a vibrant display, long-lasting battery, and a range of features, it offers a great user experience for various tasks.",
  "price": 29049,
  "category": "Electronics",
  "image": "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/thumbnail.webp",
  "stock": 92
 },
 {
  "name": "Blue Frock",
  "description": "The Blue Frock is a charming and stylish dress for various occasions. With a vibrant blue color and a comfortable design, it adds a touch of elegance to your wardrobe.",
  "price": 2489,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/tops/blue-frock/thumbnail.webp",
  "stock": 52
 },
 {
  "name": "Girl Summer Dress",
  "description": "The Girl Summer Dress is a cute and breezy dress designed for warm weather. With playful patterns and lightweight fabric, it's perfect for keeping cool and stylish during the summer.",
  "price": 1659,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/thumbnail.webp",
  "stock": 43
 },
 {
  "name": "Gray Dress",
  "description": "The Gray Dress is a versatile and chic option for various occasions. With a neutral gray color, it can be dressed up or down, making it a wardrobe staple for any fashion-forward individual.",
  "price": 2904,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/tops/gray-dress/thumbnail.webp",
  "stock": 55
 },
 {
  "name": "Short Frock",
  "description": "The Short Frock is a playful and trendy dress with a shorter length. Ideal for casual outings or special occasions, it combines style and comfort for a fashionable look.",
  "price": 2074,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/tops/short-frock/thumbnail.webp",
  "stock": 22
 },
 {
  "name": "Tartan Dress",
  "description": "The Tartan Dress features a classic tartan pattern, bringing a timeless and sophisticated touch to your wardrobe. Perfect for fall and winter, it adds a hint of traditional charm.",
  "price": 3319,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/tops/tartan-dress/thumbnail.webp",
  "stock": 73
 },
 {
  "name": "300 Touring",
  "description": "The 300 Touring is a stylish and comfortable sedan, known for its luxurious features and smooth performance.",
  "price": 2406999,
  "category": "Automotive",
  "image": "https://cdn.dummyjson.com/product-images/vehicle/300-touring/thumbnail.webp",
  "stock": 54
 },
 {
  "name": "Charger SXT RWD",
  "description": "The Charger SXT RWD is a powerful and sporty rear-wheel-drive sedan, offering a blend of performance and practicality.",
  "price": 2738999,
  "category": "Automotive",
  "image": "https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/thumbnail.webp",
  "stock": 57
 },
 {
  "name": "Dodge Hornet GT Plus",
  "description": "The Dodge Hornet GT Plus is a compact and agile hatchback, perfect for urban driving with a touch of sportiness.",
  "price": 2074999,
  "category": "Automotive",
  "image": "https://cdn.dummyjson.com/product-images/vehicle/dodge-hornet-gt-plus/thumbnail.webp",
  "stock": 82
 },
 {
  "name": "Durango SXT RWD",
  "description": "The Durango SXT RWD is a spacious and versatile SUV, known for its strong performance and family-friendly features.",
  "price": 3070999,
  "category": "Automotive",
  "image": "https://cdn.dummyjson.com/product-images/vehicle/durango-sxt-rwd/thumbnail.webp",
  "stock": 95
 },
 {
  "name": "Pacifica Touring",
  "description": "The Pacifica Touring is a stylish and well-equipped minivan, offering comfort and convenience for family journeys.",
  "price": 2655999,
  "category": "Automotive",
  "image": "https://cdn.dummyjson.com/product-images/vehicle/pacifica-touring/thumbnail.webp",
  "stock": 53
 },
 {
  "name": "Blue Women's Handbag",
  "description": "The Blue Women's Handbag is a stylish and spacious accessory for everyday use. With a vibrant blue color and multiple compartments, it combines fashion and functionality.",
  "price": 4149,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/thumbnail.webp",
  "stock": 76
 },
 {
  "name": "Heshe Women's Leather Bag",
  "description": "The Heshe Women's Leather Bag is a luxurious and high-quality leather bag for the sophisticated woman. With a timeless design and durable craftsmanship, it's a versatile accessory.",
  "price": 10789,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/thumbnail.webp",
  "stock": 99
 },
 {
  "name": "Prada Women Bag",
  "description": "The Prada Women Bag is an iconic designer bag that exudes elegance and luxury. Crafted with precision and featuring the Prada logo, it's a statement piece for fashion enthusiasts.",
  "price": 49799,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/thumbnail.webp",
  "stock": 75
 },
 {
  "name": "White Faux Leather Backpack",
  "description": "The White Faux Leather Backpack is a trendy and practical backpack for the modern woman. With a sleek white design and ample storage space, it's perfect for both casual and on-the-go styles.",
  "price": 3319,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/thumbnail.webp",
  "stock": 0
 },
 {
  "name": "Women Handbag Black",
  "description": "The Women Handbag in Black is a classic and versatile accessory that complements various outfits. With a timeless black color and functional design, it's a must-have in every woman's wardrobe.",
  "price": 4979,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/thumbnail.webp",
  "stock": 11
 },
 {
  "name": "Black Women's Gown",
  "description": "The Black Women's Gown is an elegant and timeless evening gown. With a sleek black design, it's perfect for formal events and special occasions, exuding sophistication and style.",
  "price": 10789,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/thumbnail.webp",
  "stock": 25
 },
 {
  "name": "Corset Leather With Skirt",
  "description": "The Corset Leather With Skirt is a bold and edgy ensemble that combines a stylish corset with a matching skirt. Ideal for fashion-forward individuals, it makes a statement at any event.",
  "price": 7469,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/thumbnail.webp",
  "stock": 30
 },
 {
  "name": "Corset With Black Skirt",
  "description": "The Corset With Black Skirt is a chic and versatile outfit that pairs a fashionable corset with a classic black skirt. It offers a trendy and coordinated look for various occasions.",
  "price": 6639,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/thumbnail.webp",
  "stock": 33
 },
 {
  "name": "Dress Pea",
  "description": "The Dress Pea is a stylish and comfortable dress with a pea pattern. Perfect for casual outings, it adds a playful and fun element to your wardrobe, making it a great choice for day-to-day wear.",
  "price": 4149,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/thumbnail.webp",
  "stock": 6
 },
 {
  "name": "Marni Red & Black Suit",
  "description": "The Marni Red & Black Suit is a sophisticated and fashion-forward suit ensemble. With a combination of red and black tones, it showcases a modern design for a bold and confident look.",
  "price": 14939,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/thumbnail.webp",
  "stock": 62
 },
 {
  "name": "Green Crystal Earring",
  "description": "The Green Crystal Earring is a dazzling accessory that features a vibrant green crystal. With a classic design, it adds a touch of elegance to your ensemble, perfect for formal or special occasions.",
  "price": 2489,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/thumbnail.webp",
  "stock": 54
 },
 {
  "name": "Green Oval Earring",
  "description": "The Green Oval Earring is a stylish and versatile accessory with a unique oval shape. Whether for casual or dressy occasions, its green hue and contemporary design make it a standout piece.",
  "price": 2074,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-jewellery/green-oval-earring/thumbnail.webp",
  "stock": 73
 },
 {
  "name": "Tropical Earring",
  "description": "The Tropical Earring is a fun and playful accessory inspired by tropical elements. Featuring vibrant colors and a lively design, it's perfect for adding a touch of summer to your look.",
  "price": 1659,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/thumbnail.webp",
  "stock": 3
 },
 {
  "name": "Black & Brown Slipper",
  "description": "The Black & Brown Slipper is a comfortable and stylish choice for casual wear. Featuring a blend of black and brown colors, it adds a touch of sophistication to your relaxation.",
  "price": 1659,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/thumbnail.webp",
  "stock": 3
 },
 {
  "name": "Calvin Klein Heel Shoes",
  "description": "Calvin Klein Heel Shoes are elegant and sophisticated, designed for formal occasions. With a classic design and high-quality materials, they complement your stylish ensemble.",
  "price": 6639,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/thumbnail.webp",
  "stock": 93
 },
 {
  "name": "Golden Shoes Woman",
  "description": "The Golden Shoes for Women are a glamorous choice for special occasions. Featuring a golden hue and stylish design, they add a touch of luxury to your outfit.",
  "price": 4149,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/thumbnail.webp",
  "stock": 88
 },
 {
  "name": "Pampi Shoes",
  "description": "Pampi Shoes offer a blend of comfort and style for everyday use. With a versatile design, they are suitable for various casual occasions, providing a trendy and relaxed look.",
  "price": 2489,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-shoes/pampi-shoes/thumbnail.webp",
  "stock": 49
 },
 {
  "name": "Red Shoes",
  "description": "The Red Shoes make a bold statement with their vibrant red color. Whether for a party or a casual outing, these shoes add a pop of color and style to your wardrobe.",
  "price": 2904,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-shoes/red-shoes/thumbnail.webp",
  "stock": 7
 },
 {
  "name": "IWC Ingenieur Automatic Steel",
  "description": "The IWC Ingenieur Automatic Steel watch is a durable and sophisticated timepiece. With a stainless steel case and automatic movement, it combines precision and style for watch enthusiasts.",
  "price": 414999,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/thumbnail.webp",
  "stock": 90
 },
 {
  "name": "Rolex Cellini Moonphase",
  "description": "The Rolex Cellini Moonphase watch is a masterpiece of horology. Featuring a moon phase complication, it showcases the craftsmanship and elegance that Rolex is renowned for.",
  "price": 1327999,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/thumbnail.webp",
  "stock": 52
 },
 {
  "name": "Rolex Datejust Women",
  "description": "The Rolex Datejust Women's watch is an iconic timepiece designed for women. With a timeless design and a date complication, it offers both elegance and functionality.",
  "price": 912999,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-watches/rolex-datejust-women/thumbnail.webp",
  "stock": 4
 },
 {
  "name": "Watch Gold for Women",
  "description": "The Gold Women's Watch is a stunning accessory that combines luxury and style. Featuring a gold-plated case and a chic design, it adds a touch of glamour to any outfit.",
  "price": 66399,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/thumbnail.webp",
  "stock": 3
 },
 {
  "name": "Women's Wrist Watch",
  "description": "The Women's Wrist Watch is a versatile and fashionable timepiece for everyday wear. With a comfortable strap and a simple yet elegant design, it complements various styles.",
  "price": 10789,
  "category": "Fashion",
  "image": "https://cdn.dummyjson.com/product-images/womens-watches/women's-wrist-watch/thumbnail.webp",
  "stock": 12
 },
 {
  "name": "Clean Code",
  "description": "Robert C. Martin's handbook of agile software craftsmanship.",
  "price": 899,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
  "stock": 5
 },
 {
  "name": "Atomic Habits",
  "description": "James Clear on building good habits and breaking bad ones.",
  "price": 499,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  "stock": 12
 },
 {
  "name": "Sapiens",
  "description": "Yuval Noah Harari's brief history of humankind.",
  "price": 599,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9780062316110-L.jpg",
  "stock": 19
 },
 {
  "name": "The Pragmatic Programmer",
  "description": "Your journey to mastery, 20th anniversary edition.",
  "price": 1299,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg",
  "stock": 26
 },
 {
  "name": "Deep Work",
  "description": "Cal Newport on focused success in a distracted world.",
  "price": 549,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
  "stock": 33
 },
 {
  "name": "The Alchemist",
  "description": "Paulo Coelho's fable about following your dream.",
  "price": 350,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
  "stock": 40
 },
 {
  "name": "Thinking, Fast and Slow",
  "description": "Daniel Kahneman on the two systems that drive how we think.",
  "price": 699,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg",
  "stock": 7
 },
 {
  "name": "Rich Dad Poor Dad",
  "description": "Robert Kiyosaki on what the rich teach their kids about money.",
  "price": 399,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
  "stock": 14
 },
 {
  "name": "The Psychology of Money",
  "description": "Morgan Housel's timeless lessons on wealth and greed.",
  "price": 449,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
  "stock": 21
 },
 {
  "name": "Ikigai",
  "description": "The Japanese secret to a long and happy life.",
  "price": 379,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg",
  "stock": 28
 },
 {
  "name": "Zero to One",
  "description": "Peter Thiel's notes on startups, or how to build the future.",
  "price": 599,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg",
  "stock": 35
 },
 {
  "name": "Wings of Fire",
  "description": "A.P.J. Abdul Kalam's autobiography.",
  "price": 299,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9788173711466-L.jpg",
  "stock": 42
 },
 {
  "name": "Introduction to Algorithms",
  "description": "The classic CLRS algorithms textbook, 4th edition.",
  "price": 3499,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9780262046305-L.jpg",
  "stock": 9
 },
 {
  "name": "JavaScript: The Good Parts",
  "description": "Douglas Crockford on the beautiful subset of JavaScript.",
  "price": 799,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9780596517748-L.jpg",
  "stock": 16
 },
 {
  "name": "Eloquent JavaScript",
  "description": "Marijn Haverbeke's modern introduction to programming.",
  "price": 1099,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9781593279509-L.jpg",
  "stock": 23
 },
 {
  "name": "Don't Make Me Think",
  "description": "Steve Krug's common sense approach to web usability.",
  "price": 999,
  "category": "Books",
  "image": "https://covers.openlibrary.org/b/isbn/9780321965516-L.jpg",
  "stock": 30
 }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    // new product _ids make old cart and wishlist rows point at nothing, so clear them
    await Customer.updateMany({}, { $set: { cart: [], wishlist: [] } });
    console.log(`Seeded ${products.length} products`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });