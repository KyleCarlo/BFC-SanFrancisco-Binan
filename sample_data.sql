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

INSERT INTO `BeverageVariation` (`id`, `beverage_id`, `price`, `serving`, `concentrate`, `hot_cold`)
VALUES (1, 1, 65, '12 oz', false, 'Hot'),
       (2, 1, 70, '16 oz', false, 'Cold'),
       (3, 1, 110, '500 ml', true, null),
       (4, 1, 210, '1 L', true, null),
       (5, 2, 65, '12 oz', false, 'Hot'),
       (6, 2, 70, '16 oz', false, 'Cold'),
       (7, 2, 110, '500 ml', true, null),
       (8, 2, 210, '1 L', true, null);

INSERT INTO `FoodVariation` (`id`, `food_id`, `price`, `serving`)
VALUES (1, 1, 180, '1 Tub'),
       (2, 2, 175, '1 Slice'),
       (3, 2, 350, '2 Slices');