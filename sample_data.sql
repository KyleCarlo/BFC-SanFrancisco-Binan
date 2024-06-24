DELETE FROM `BeverageVariation`;
DELETE FROM `Beverage`;
DELETE FROM `FoodVariation`;
DELETE FROM `Food`;

INSERT INTO `Beverage` (`id`, `name`, `image`, `base`, `feature`, `description`) 
VALUES (1, 'Vietnamese', '/sample', 'Drip', 'Popular', 'A traditional Vietnamese coffee made with sweetened condensed milk and espresso.'),
       (2, 'Cappuccino', '/sample', 'Espresso', 'None', 'A classic Italian coffee made with espresso and steamed milk.');

INSERT INTO `Food` (`id`, `name`, `image`, `category`, `feature`, `description`)
VALUES (1, 'Bake Mac', '/sample', 'Pasta', 'Popular', 'A classic Italian pasta dish made with macaroni and cheese.'),
       (2, 'Biscoff', '/sample', 'Cake', 'None', 'A delicious cake made with Biscoff cookies and cream cheese.');

INSERT INTO `BeverageVariation` (`id`, `beverage_id`, `price`, `serving`, `concentrate`, `hot_cold`, `available`)
VALUES (1, 1, 65, '12 oz', false, 'Hot', true),
       (2, 1, 70, '16 oz', false, 'Cold', true),
       (3, 1, 110, '500 ml', true, null, true),
       (4, 1, 210, '1 L', true, null, true),
       (5, 2, 65, '12 oz', false, 'Hot', true),
       (6, 2, 70, '16 oz', false, 'Cold', true),
       (7, 2, 110, '500 ml', true, null, true),
       (8, 2, 210, '1 L', true, null, true);

INSERT INTO `FoodVariation` (`id`, `food_id`, `price`, `serving`, `available`)
VALUES (1, 1, 180, '1 Tub', true),
       (2, 2, 175, '1 Slice', true),
       (3, 2, 350, '2 Slices', true);