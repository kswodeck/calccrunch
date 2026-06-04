// Pet Name Generator
(function() {
  'use strict';

  // Pet name database organized by type, gender, theme
  const PET_NAMES = {
    dog: {
      male: {
        food: ['Biscuit', 'Waffles', 'Taco', 'Nacho', 'Pepper', 'Ginger', 'Basil', 'Oreo', 'Churro', 'Pretzel', 'Mochi', 'Dumpling', 'Noodle', 'Bean', 'Chip'],
        human: ['Max', 'Charlie', 'Cooper', 'Buddy', 'Jack', 'Rocky', 'Bear', 'Duke', 'Tucker', 'Oliver', 'Leo', 'Finn', 'Oscar', 'Teddy', 'Winston'],
        nature: ['Storm', 'River', 'Bear', 'Wolf', 'Ash', 'Flint', 'Thunder', 'Blaze', 'Forest', 'Ridge', 'Cedar', 'Hawk', 'Cliff', 'Birch', 'Canyon'],
        mythology: ['Thor', 'Zeus', 'Apollo', 'Odin', 'Atlas', 'Loki', 'Ares', 'Titan', 'Hercules', 'Mercury', 'Mars', 'Neptune', 'Pluto', 'Anubis', 'Fenrir'],
        popculture: ['Simba', 'Gandalf', 'Chewie', 'Rocket', 'Yoda', 'Thor', 'Loki', 'Bucky', 'Dobby', 'Groot', 'Sonic', 'Mario', 'Pikachu', 'Snoopy', 'Scooby'],
        colors: ['Shadow', 'Jet', 'Rusty', 'Copper', 'Goldie', 'Smokey', 'Blue', 'Red', 'Silver', 'Onyx', 'Slate', 'Cocoa', 'Mocha', 'Ivory', 'Amber'],
        classic: ['Rex', 'Buddy', 'Max', 'Rover', 'Spot', 'Lucky', 'Duke', 'King', 'Prince', 'Champ', 'Scout', 'Bandit', 'Rusty', 'Ace', 'Tank']
      },
      female: {
        food: ['Cookie', 'Honey', 'Maple', 'Cinnamon', 'Sugar', 'Peaches', 'Mochi', 'Olive', 'Rosemary', 'Sage', 'Truffle', 'Brownie', 'Butterscotch', 'Caramel', 'Ginger'],
        human: ['Bella', 'Lucy', 'Daisy', 'Sadie', 'Molly', 'Maggie', 'Sophie', 'Chloe', 'Lily', 'Zoey', 'Stella', 'Nala', 'Ruby', 'Penny', 'Rosie'],
        nature: ['Willow', 'Ivy', 'Daisy', 'Rose', 'Fern', 'Luna', 'Sunny', 'Blossom', 'Clover', 'Coral', 'Misty', 'Meadow', 'Brook', 'Rain', 'Flora'],
        mythology: ['Athena', 'Luna', 'Artemis', 'Freya', 'Hera', 'Iris', 'Aurora', 'Cleo', 'Pandora', 'Aphrodite', 'Diana', 'Persephone', 'Selene', 'Nyx', 'Calypso'],
        popculture: ['Leia', 'Arya', 'Elsa', 'Nala', 'Khaleesi', 'Moana', 'Hermione', 'Zelda', 'Xena', 'Buffy', 'Ripley', 'Sansa', 'Merida', 'Mulan', 'Raven'],
        colors: ['Ebony', 'Ivory', 'Amber', 'Scarlet', 'Ginger', 'Sandy', 'Goldie', 'Hazel', 'Ruby', 'Pearl', 'Cocoa', 'Coral', 'Sienna', 'Blanca', 'Raven'],
        classic: ['Lady', 'Princess', 'Daisy', 'Ginger', 'Missy', 'Queenie', 'Duchess', 'Bella', 'Lassie', 'Precious', 'Angel', 'Sugar', 'Honey', 'Sweetie', 'Dixie']
      }
    },
    cat: {
      male: {
        food: ['Mochi', 'Sushi', 'Biscuit', 'Tofu', 'Waffles', 'Nacho', 'Taco', 'Noodle', 'Dumpling', 'Pudding', 'Crouton', 'Cashew', 'Peanut', 'Mango', 'Fig'],
        human: ['Oliver', 'Leo', 'Milo', 'Charlie', 'Felix', 'Oscar', 'Simon', 'George', 'Arthur', 'Theodore', 'Sebastian', 'Jasper', 'Alfie', 'Archie', 'Louis'],
        nature: ['Shadow', 'Storm', 'Ash', 'Fern', 'Moss', 'Sage', 'Flint', 'Cedar', 'Stone', 'Creek', 'Frost', 'Cloud', 'Breeze', 'Thistle', 'Rain'],
        mythology: ['Loki', 'Apollo', 'Odin', 'Anubis', 'Osiris', 'Bastet', 'Ra', 'Hermes', 'Pan', 'Sphinx', 'Phoenix', 'Griffin', 'Merlin', 'Salem', 'Jinx'],
        popculture: ['Salem', 'Garfield', 'Simba', 'Bagheera', 'Hobbes', 'Cheshire', 'Felix', 'Tom', 'Sylvester', 'Binx', 'Crookshanks', 'Figaro', 'Mufasa', 'Aslan', 'Rajah'],
        colors: ['Shadow', 'Midnight', 'Smokey', 'Ash', 'Ginger', 'Onyx', 'Jet', 'Coal', 'Silver', 'Ghost', 'Slate', 'Graphite', 'Charcoal', 'Copper', 'Ivory'],
        classic: ['Whiskers', 'Mittens', 'Tiger', 'Tom', 'Felix', 'Kitty', 'Boots', 'Socks', 'Patches', 'Shadow', 'Smokey', 'Lucky', 'Paws', 'Fluffy', 'Garfield']
      },
      female: {
        food: ['Cookie', 'Honey', 'Biscuit', 'Mochi', 'Cinnamon', 'Maple', 'Sugar', 'Olive', 'Ginger', 'Peaches', 'Nutmeg', 'Clementine', 'Truffle', 'Cocoa', 'Butterscotch'],
        human: ['Luna', 'Chloe', 'Lily', 'Stella', 'Sophie', 'Nala', 'Bella', 'Cleo', 'Zoe', 'Mia', 'Ella', 'Ivy', 'Grace', 'Willow', 'Daisy'],
        nature: ['Luna', 'Willow', 'Ivy', 'Fern', 'Blossom', 'Lily', 'Misty', 'Clover', 'Petal', 'Meadow', 'Rain', 'Dawn', 'Star', 'Flora', 'Violet'],
        mythology: ['Luna', 'Cleo', 'Isis', 'Freya', 'Athena', 'Bastet', 'Nyx', 'Selene', 'Calypso', 'Pandora', 'Echo', 'Circe', 'Medusa', 'Persephone', 'Minerva'],
        popculture: ['Nala', 'Luna', 'Elsa', 'Arya', 'Hermione', 'Zelda', 'Khaleesi', 'Leia', 'Sansa', 'Eleven', 'Raven', 'Xena', 'Catwoman', 'Duchess', 'Marie'],
        colors: ['Shadow', 'Midnight', 'Pearl', 'Ivory', 'Ebony', 'Amber', 'Ruby', 'Hazel', 'Ginger', 'Snowball', 'Misty', 'Raven', 'Sienna', 'Blanca', 'Goldie'],
        classic: ['Kitty', 'Mittens', 'Whiskers', 'Princess', 'Missy', 'Fluffy', 'Patches', 'Calico', 'Tabby', 'Cleo', 'Queenie', 'Angel', 'Lady', 'Precious', 'Bella']
      }
    },
    bird: {
      male: {
        food: ['Mango', 'Kiwi', 'Peanut', 'Cashew', 'Cracker', 'Noodle', 'Pepper', 'Bean', 'Fig', 'Pistachio', 'Coconut', 'Berry', 'Sage', 'Basil', 'Chip'],
        human: ['Charlie', 'Oscar', 'Jack', 'Felix', 'Oliver', 'Max', 'George', 'Alfie', 'Archie', 'Louie', 'Eddie', 'Frankie', 'Sammy', 'Buddy', 'Joey'],
        nature: ['Sky', 'Storm', 'Cloud', 'Breeze', 'Thunder', 'Rain', 'Sunny', 'Wind', 'Frost', 'Flint', 'Ash', 'Sage', 'Fern', 'Cedar', 'Birch'],
        mythology: ['Phoenix', 'Mercury', 'Apollo', 'Hermes', 'Icarus', 'Griffin', 'Zephyr', 'Aeolus', 'Ra', 'Garuda', 'Roc', 'Horus', 'Thor', 'Odin', 'Loki'],
        popculture: ['Tweety', 'Zazu', 'Iago', 'Hedwig', 'Fawkes', 'Woodstock', 'Rio', 'Blu', 'Nigel', 'Kevin', 'Diablo', 'Archimedes', 'Scuttle', 'Daffy', 'Donald'],
        colors: ['Blue', 'Jade', 'Sunny', 'Goldie', 'Scarlet', 'Emerald', 'Azure', 'Ruby', 'Cobalt', 'Indigo', 'Crimson', 'Silver', 'Copper', 'Amber', 'Onyx'],
        classic: ['Tweety', 'Polly', 'Chirpy', 'Buddy', 'Sunny', 'Lucky', 'Angel', 'Rio', 'Coco', 'Skye', 'Pip', 'Peep', 'Tiki', 'Kiki', 'Echo']
      },
      female: {
        food: ['Kiwi', 'Mango', 'Berry', 'Peaches', 'Honey', 'Clementine', 'Cookie', 'Sugar', 'Olive', 'Cherry', 'Fig', 'Maple', 'Nutmeg', 'Cinnamon', 'Ginger'],
        human: ['Chloe', 'Lucy', 'Lily', 'Daisy', 'Rosie', 'Stella', 'Pearl', 'Ruby', 'Grace', 'Ivy', 'Mia', 'Ella', 'Sophie', 'Zoe', 'Emma'],
        nature: ['Sky', 'Star', 'Dawn', 'Sunny', 'Willow', 'Blossom', 'Petal', 'Misty', 'Rain', 'Breeze', 'Meadow', 'Flora', 'Iris', 'Violet', 'Fern'],
        mythology: ['Iris', 'Aurora', 'Luna', 'Celeste', 'Phoenix', 'Echo', 'Siren', 'Hera', 'Athena', 'Freya', 'Venus', 'Flora', 'Aria', 'Lyra', 'Stella'],
        popculture: ['Hedwig', 'Jewel', 'Daisy', 'Stella', 'Duchess', 'Angel', 'Tinkerbell', 'Dory', 'Nemo', 'Luna', 'Raven', 'Phoebe', 'Ariel', 'Belle', 'Elsa'],
        colors: ['Ruby', 'Pearl', 'Jade', 'Amber', 'Coral', 'Ivory', 'Scarlet', 'Azure', 'Goldie', 'Hazel', 'Sunny', 'Rose', 'Violet', 'Indigo', 'Sienna'],
        classic: ['Polly', 'Tweety', 'Angel', 'Sweet Pea', 'Sunny', 'Birdie', 'Coco', 'Kiki', 'Tiki', 'Skye', 'Feather', 'Chirpy', 'Melody', 'Harmony', 'Song']
      }
    },
    fish: {
      male: {
        food: ['Sushi', 'Nemo', 'Wasabi', 'Ginger', 'Tofu', 'Miso', 'Sake', 'Nori', 'Taco', 'Nacho', 'Bean', 'Chip', 'Cracker', 'Nugget', 'Popcorn'],
        human: ['Jack', 'Finn', 'Oscar', 'Nemo', 'Gil', 'Marlin', 'Bruce', 'Albert', 'Neptune', 'Poseidon', 'Calvin', 'Walter', 'Henry', 'Larry', 'Bob'],
        nature: ['Splash', 'Wave', 'Reef', 'Tide', 'Current', 'Stream', 'Brook', 'River', 'Ocean', 'Neptune', 'Coral', 'Pebble', 'Drift', 'Shore', 'Bay'],
        mythology: ['Neptune', 'Poseidon', 'Triton', 'Leviathan', 'Kraken', 'Atlas', 'Aquarius', 'Nereus', 'Oceanus', 'Proteus', 'Pontus', 'Hydra', 'Typhon', 'Charybdis', 'Scylla'],
        popculture: ['Nemo', 'Marlin', 'Dory', 'Bruce', 'Gill', 'Flounder', 'Sebastian', 'Wanda', 'Klaus', 'Blinky', 'Jaws', 'Sharky', 'Flipper', 'Goldie', 'Bubbles'],
        colors: ['Blue', 'Goldie', 'Silver', 'Scarlet', 'Coral', 'Azure', 'Crimson', 'Indigo', 'Sapphire', 'Ruby', 'Jet', 'Onyx', 'Amber', 'Copper', 'Pearl'],
        classic: ['Nemo', 'Bubbles', 'Goldie', 'Finn', 'Splash', 'Flipper', 'Guppy', 'Gill', 'Flash', 'Ziggy', 'Scamp', 'Sparky', 'Dash', 'Captain', 'Skipper']
      },
      female: {
        food: ['Sushi', 'Ginger', 'Olive', 'Honey', 'Cookie', 'Maple', 'Berry', 'Peaches', 'Mochi', 'Sugar', 'Clementine', 'Cinnamon', 'Nutmeg', 'Truffle', 'Caramel'],
        human: ['Dory', 'Pearl', 'Coral', 'Marina', 'Ariel', 'Shelly', 'Sandy', 'Crystal', 'Misty', 'Brooke', 'Lily', 'Stella', 'Ruby', 'Grace', 'Ivy'],
        nature: ['Coral', 'Pearl', 'Wave', 'Tide', 'Marina', 'Lagoon', 'Misty', 'Splash', 'Ripple', 'Brook', 'Crystal', 'Rain', 'Star', 'Shell', 'Reef'],
        mythology: ['Ariel', 'Siren', 'Calypso', 'Amphitrite', 'Tethys', 'Nereid', 'Undine', 'Melusine', 'Selkie', 'Lorelei', 'Nixie', 'Naiad', 'Marina', 'Sedna', 'Venus'],
        popculture: ['Dory', 'Nemo', 'Ariel', 'Pearl', 'Cleo', 'Flounder', 'Angel', 'Destiny', 'Jewel', 'Crystal', 'Wanda', 'Dorothy', 'Goldie', 'Coral', 'Marina'],
        colors: ['Pearl', 'Coral', 'Ruby', 'Sapphire', 'Goldie', 'Silver', 'Azure', 'Ivory', 'Scarlet', 'Jade', 'Amber', 'Opal', 'Rose', 'Violet', 'Indigo'],
        classic: ['Goldie', 'Bubbles', 'Pearl', 'Angel', 'Dory', 'Shimmer', 'Sparkle', 'Glitter', 'Star', 'Coral', 'Splash', 'Ripple', 'Jewel', 'Princess', 'Queenie']
      }
    },
    hamster: {
      male: {
        food: ['Peanut', 'Cashew', 'Walnut', 'Biscuit', 'Nugget', 'Chip', 'Cookie', 'Muffin', 'Popcorn', 'Pretzel', 'Cracker', 'Waffle', 'Bean', 'Nacho', 'Dumpling'],
        human: ['Hammy', 'Teddy', 'Chester', 'Oliver', 'Henry', 'George', 'Albert', 'Winston', 'Theodore', 'Arthur', 'Charlie', 'Alfie', 'Archie', 'Oscar', 'Felix'],
        nature: ['Acorn', 'Pebble', 'Twig', 'Seed', 'Leaf', 'Moss', 'Fern', 'Birch', 'Sunny', 'Cloud', 'Breeze', 'Pine', 'Oak', 'Willow', 'Sage'],
        mythology: ['Mercury', 'Hermes', 'Pan', 'Pip', 'Sprite', 'Pixie', 'Hobbit', 'Gnome', 'Imp', 'Elf', 'Puck', 'Robin', 'Loki', 'Jester', 'Merlin'],
        popculture: ['Hamtaro', 'Pikachu', 'Stuart', 'Remy', 'Mickey', 'Jerry', 'Fievel', 'Gus', 'Rhino', 'Bolt', 'Scooter', 'Turbo', 'Sonic', 'Flash', 'Dash'],
        colors: ['Snowball', 'Smokey', 'Ginger', 'Copper', 'Goldie', 'Sandy', 'Cocoa', 'Caramel', 'Cinnamon', 'Honey', 'Toffee', 'Rusty', 'Patches', 'Ivory', 'Jet'],
        classic: ['Hammy', 'Nibbles', 'Squeaky', 'Whiskers', 'Fuzzy', 'Fluffy', 'Speedy', 'Tiny', 'Pip', 'Scooter', 'Zippy', 'Dash', 'Buttons', 'Patches', 'Snickers']
      },
      female: {
        food: ['Cookie', 'Sugar', 'Honey', 'Peanut', 'Cinnamon', 'Maple', 'Berry', 'Peaches', 'Muffin', 'Cupcake', 'Biscuit', 'Truffle', 'Caramel', 'Toffee', 'Nutmeg'],
        human: ['Daisy', 'Rosie', 'Lily', 'Chloe', 'Sophie', 'Lucy', 'Bella', 'Mia', 'Ella', 'Zoe', 'Ruby', 'Pearl', 'Grace', 'Ivy', 'Stella'],
        nature: ['Petal', 'Blossom', 'Daisy', 'Clover', 'Sunny', 'Misty', 'Fern', 'Ivy', 'Willow', 'Meadow', 'Rain', 'Star', 'Dawn', 'Breeze', 'Flora'],
        mythology: ['Pixie', 'Fairy', 'Sprite', 'Tinker', 'Nymph', 'Aurora', 'Luna', 'Iris', 'Flora', 'Echo', 'Celeste', 'Aria', 'Lyra', 'Venus', 'Freya'],
        popculture: ['Minnie', 'Daisy', 'Bianca', 'Miss Bianca', 'Gadget', 'Angel', 'Pinky', 'Lola', 'Dot', 'Bubbles', 'Blossom', 'Buttercup', 'Elsa', 'Belle', 'Ariel'],
        colors: ['Snowball', 'Pearl', 'Ivory', 'Ginger', 'Sandy', 'Honey', 'Goldie', 'Cocoa', 'Cinnamon', 'Caramel', 'Hazel', 'Amber', 'Rose', 'Copper', 'Toffee'],
        classic: ['Nibbles', 'Squeaky', 'Tiny', 'Fluffy', 'Fuzzy', 'Whiskers', 'Buttons', 'Pebbles', 'Patches', 'Precious', 'Angel', 'Princess', 'Sweetie', 'Baby', 'Pip']
      }
    },
    rabbit: {
      male: {
        food: ['Biscuit', 'Muffin', 'Waffle', 'Peanut', 'Oreo', 'Cookie', 'Brownie', 'Caramel', 'Mocha', 'Bean', 'Chip', 'Nugget', 'Pretzel', 'Crouton', 'Toast'],
        human: ['Peter', 'Benjamin', 'Oliver', 'Jasper', 'Theodore', 'Winston', 'Arthur', 'George', 'Henry', 'Edward', 'Felix', 'Oscar', 'Archie', 'Alfie', 'Charlie'],
        nature: ['Clover', 'Willow', 'Fern', 'Thistle', 'Bramble', 'Moss', 'Sage', 'Basil', 'Ash', 'Birch', 'Meadow', 'Cloud', 'Sunny', 'Storm', 'Frost'],
        mythology: ['Pan', 'Loki', 'Puck', 'Hermes', 'Mercury', 'Robin', 'Sprite', 'Oberon', 'Lepus', 'Hare', 'Jackalope', 'Moon', 'Silver', 'Star', 'Orion'],
        popculture: ['Thumper', 'Peter', 'Bugs', 'Roger', 'Rabbit', 'Snowball', 'Fiver', 'Hazel', 'Bigwig', 'Dandelion', 'Watership', 'Velveteen', 'Buster', 'Hop', 'Cinnabun'],
        colors: ['Snowball', 'Shadow', 'Smokey', 'Cocoa', 'Mocha', 'Caramel', 'Ginger', 'Copper', 'Goldie', 'Silver', 'Jet', 'Patches', 'Toffee', 'Ivory', 'Ebony'],
        classic: ['Thumper', 'Hopper', 'Flopsy', 'Cottontail', 'Bunny', 'Nibbles', 'Hopscotch', 'Bounce', 'Clover', 'Lucky', 'Snowball', 'Cotton', 'Fuzzy', 'Fluffy', 'Whiskers']
      },
      female: {
        food: ['Cookie', 'Honey', 'Sugar', 'Cinnamon', 'Maple', 'Peaches', 'Berry', 'Muffin', 'Cupcake', 'Cocoa', 'Truffle', 'Caramel', 'Butterscotch', 'Nutmeg', 'Ginger'],
        human: ['Lily', 'Daisy', 'Rosie', 'Bella', 'Sophie', 'Chloe', 'Lucy', 'Ruby', 'Pearl', 'Grace', 'Ivy', 'Stella', 'Mia', 'Ella', 'Zoe'],
        nature: ['Clover', 'Daisy', 'Willow', 'Fern', 'Ivy', 'Blossom', 'Petal', 'Meadow', 'Violet', 'Poppy', 'Lily', 'Rose', 'Flora', 'Iris', 'Dawn'],
        mythology: ['Luna', 'Aurora', 'Flora', 'Iris', 'Pixie', 'Fairy', 'Nymph', 'Celeste', 'Diana', 'Selene', 'Artemis', 'Freya', 'Titania', 'Ophelia', 'Persephone'],
        popculture: ['Flopsy', 'Mopsy', 'Cottontail', 'Judy', 'Lola', 'Angel', 'Duchess', 'Daisy', 'Belle', 'Elsa', 'Ariel', 'Snow', 'Bambi', 'Tinkerbell', 'Thumperina'],
        colors: ['Snowball', 'Pearl', 'Ivory', 'Honey', 'Goldie', 'Ginger', 'Cocoa', 'Caramel', 'Sandy', 'Hazel', 'Amber', 'Rose', 'Copper', 'Cinnamon', 'Toffee'],
        classic: ['Flopsy', 'Cottontail', 'Bunny', 'Hoppy', 'Nibbles', 'Snowball', 'Cotton', 'Clover', 'Daisy', 'Angel', 'Princess', 'Sweet Pea', 'Honey Bun', 'Fluffy', 'Fuzzy']
      }
    },
    reptile: {
      male: {
        food: ['Pickle', 'Bean', 'Wasabi', 'Nacho', 'Taco', 'Pepper', 'Basil', 'Ginger', 'Chip', 'Nugget', 'Crouton', 'Mango', 'Kiwi', 'Fig', 'Olive'],
        human: ['Rex', 'Spike', 'Leo', 'Oscar', 'George', 'Monty', 'Steve', 'Irwin', 'Darwin', 'Newton', 'Einstein', 'Pascal', 'Yoshi', 'Draco', 'Scales'],
        nature: ['Stone', 'Slate', 'Flint', 'Rock', 'Moss', 'Fern', 'Ash', 'Ember', 'Blaze', 'Storm', 'Thunder', 'Cliff', 'Canyon', 'Ridge', 'Boulder'],
        mythology: ['Draco', 'Hydra', 'Basilisk', 'Titan', 'Sobek', 'Quetzal', 'Jormungandr', 'Apophis', 'Typhon', 'Ladon', 'Nidhogg', 'Smaug', 'Fafnir', 'Tiamat', 'Orochi'],
        popculture: ['Yoshi', 'Godzilla', 'Reptar', 'Pascal', 'Rango', 'Toothless', 'Spike', 'Rex', 'Raptor', 'Draco', 'Mushu', 'Charizard', 'Shenron', 'Falkor', 'Norbert'],
        colors: ['Jade', 'Emerald', 'Onyx', 'Obsidian', 'Copper', 'Bronze', 'Gold', 'Silver', 'Amber', 'Slate', 'Charcoal', 'Olive', 'Forest', 'Midnight', 'Cobalt'],
        classic: ['Spike', 'Rex', 'Scales', 'Snapper', 'Slider', 'Speedy', 'Tank', 'Gator', 'Croc', 'Iggy', 'Ziggy', 'Chomper', 'Bitey', 'Slither', 'Coil']
      },
      female: {
        food: ['Olive', 'Ginger', 'Sage', 'Berry', 'Kiwi', 'Mango', 'Fig', 'Honey', 'Cookie', 'Pepper', 'Rosemary', 'Basil', 'Clementine', 'Cinnamon', 'Maple'],
        human: ['Cleo', 'Stella', 'Ivy', 'Ruby', 'Pearl', 'Jade', 'Esmeralda', 'Athena', 'Diana', 'Vera', 'Hazel', 'Olive', 'Fern', 'Willow', 'Sage'],
        nature: ['Ivy', 'Fern', 'Willow', 'Moss', 'Jade', 'Stone', 'Ember', 'Coral', 'Flora', 'Terra', 'Gaia', 'Sahara', 'Desert', 'Oasis', 'Dune'],
        mythology: ['Medusa', 'Naga', 'Hydra', 'Echidna', 'Scylla', 'Lamia', 'Tiamat', 'Jormungandr', 'Basilisk', 'Serpentina', 'Viper', 'Cleopatra', 'Isis', 'Wadjet', 'Renenutet'],
        popculture: ['Pascal', 'Nagini', 'Kaida', 'Rhaegal', 'Viserion', 'Drogon', 'Norbert', 'Toothless', 'Mushu', 'Charizard', 'Yoshi', 'Elsa', 'Rapunzel', 'Ariel', 'Scales'],
        colors: ['Jade', 'Emerald', 'Amber', 'Olive', 'Coral', 'Ruby', 'Pearl', 'Ivory', 'Obsidian', 'Onyx', 'Gold', 'Silver', 'Copper', 'Bronze', 'Sapphire'],
        classic: ['Scales', 'Slither', 'Snappy', 'Shell', 'Speedy', 'Slider', 'Ziggy', 'Coily', 'Twisty', 'Jewel', 'Princess', 'Queenie', 'Lady', 'Duchess', 'Gem']
      }
    },
    horse: {
      male: {
        food: ['Biscuit', 'Ginger', 'Pepper', 'Sugar', 'Oats', 'Barley', 'Brandy', 'Whiskey', 'Cocoa', 'Mocha', 'Caramel', 'Toffee', 'Butterscotch', 'Maple', 'Nutmeg'],
        human: ['Duke', 'Prince', 'King', 'Baron', 'Winston', 'Arthur', 'Henry', 'George', 'William', 'Charles', 'Edward', 'James', 'Alexander', 'Sebastian', 'Theodore'],
        nature: ['Storm', 'Thunder', 'Blaze', 'Shadow', 'River', 'Wind', 'Lightning', 'Tornado', 'Cyclone', 'Frost', 'Flint', 'Canyon', 'Ridge', 'Summit', 'Cliff'],
        mythology: ['Pegasus', 'Apollo', 'Thor', 'Zeus', 'Ares', 'Atlas', 'Titan', 'Hercules', 'Poseidon', 'Neptune', 'Mars', 'Mercury', 'Odin', 'Fenrir', 'Sleipnir'],
        popculture: ['Spirit', 'Shadowfax', 'Roach', 'Epona', 'Maximus', 'Khan', 'Bullseye', 'Tornado', 'Silver', 'Trigger', 'Hidalgo', 'Seabiscuit', 'Secretariat', 'Artax', 'Phillipe'],
        colors: ['Shadow', 'Midnight', 'Ebony', 'Jet', 'Silver', 'Goldie', 'Copper', 'Rusty', 'Smokey', 'Dusty', 'Sandy', 'Cocoa', 'Mocha', 'Ivory', 'Ghost'],
        classic: ['Thunder', 'Lightning', 'Storm', 'Spirit', 'Champion', 'Champ', 'Ace', 'Duke', 'Prince', 'King', 'Stallion', 'Mustang', 'Charger', 'Gallop', 'Blaze']
      },
      female: {
        food: ['Sugar', 'Honey', 'Ginger', 'Cinnamon', 'Maple', 'Brandy', 'Cocoa', 'Caramel', 'Toffee', 'Butterscotch', 'Clover', 'Sage', 'Rosemary', 'Nutmeg', 'Peaches'],
        human: ['Duchess', 'Princess', 'Lady', 'Queen', 'Victoria', 'Charlotte', 'Elizabeth', 'Grace', 'Rose', 'Bella', 'Stella', 'Ruby', 'Pearl', 'Ivy', 'Daisy'],
        nature: ['Willow', 'Storm', 'Breeze', 'Misty', 'Rain', 'Dawn', 'Star', 'Luna', 'Meadow', 'Blossom', 'Fern', 'Ivy', 'Clover', 'Flora', 'Aurora'],
        mythology: ['Athena', 'Artemis', 'Epona', 'Freya', 'Valkyrie', 'Aurora', 'Diana', 'Hera', 'Aphrodite', 'Persephone', 'Rhiannon', 'Macha', 'Selene', 'Luna', 'Iris'],
        popculture: ['Spirit', 'Rain', 'Maximus', 'Flicka', 'Black Beauty', 'Misty', 'Elsa', 'Belle', 'Merida', 'Mulan', 'Arwen', 'Daenerys', 'Xena', 'Buttercup', 'Starlight'],
        colors: ['Shadow', 'Midnight', 'Ebony', 'Pearl', 'Ivory', 'Silver', 'Goldie', 'Copper', 'Sandy', 'Misty', 'Dusty', 'Cocoa', 'Mocha', 'Ginger', 'Honey'],
        classic: ['Star', 'Lady', 'Duchess', 'Princess', 'Queen', 'Beauty', 'Grace', 'Spirit', 'Storm', 'Misty', 'Angel', 'Dreamer', 'Dancer', 'Prancer', 'Majesty']
      }
    }
  };

  // Meanings database
  const MEANINGS = {
    'Luna': 'Moon', 'Bella': 'Beautiful', 'Max': 'The greatest', 'Rex': 'King',
    'Storm': 'Powerful force of nature', 'Shadow': 'Dark companion', 'Willow': 'Graceful & flexible',
    'Phoenix': 'Rebirth & immortality', 'Atlas': 'Endurance & strength', 'Luna': 'The moon',
    'Athena': 'Wisdom & courage', 'Thor': 'God of thunder', 'Loki': 'Trickster',
    'Apollo': 'Light & music', 'Freya': 'Love & beauty', 'Odin': 'Wisdom & war',
    'Nala': 'Gift', 'Simba': 'Lion', 'Mochi': 'Sweet rice cake', 'Clover': 'Good luck',
    'Sage': 'Wise one', 'Pearl': 'Precious gem', 'Ruby': 'Deep red gemstone',
    'Ivy': 'Faithfulness', 'Daisy': 'Day\'s eye', 'Stella': 'Star',
    'Cooper': 'Barrel maker', 'Buddy': 'Friend', 'Lucky': 'Fortunate',
    'Pepper': 'Spicy & energetic', 'Ginger': 'Lively & spirited', 'Honey': 'Sweet & golden',
    'Biscuit': 'Twice-baked treat', 'Cookie': 'Sweet delight', 'Mango': 'Tropical sweetness',
    'Bear': 'Strong & cuddly', 'Tiger': 'Fierce & striped', 'Duke': 'Noble leader',
    'Prince': 'Royal son', 'King': 'Ruler', 'Angel': 'Heavenly messenger',
    'Zeus': 'King of the gods', 'Hercules': 'Divine hero', 'Merlin': 'Wise wizard'
  };

  // Personality-pet suggestions
  const PERFECT_FOR = {
    playful: ['a puppy that never stops wagging', 'an energetic kitten', 'a bouncy bunny', 'a pet that loves to play fetch'],
    regal: ['a proud Persian cat', 'a dignified Great Dane', 'a majestic horse', 'a show-quality pet'],
    fierce: ['a protective guard dog', 'a bold adventurer', 'a reptile with attitude', 'a fearless explorer'],
    cute: ['a tiny teacup puppy', 'a fluffy kitten', 'a baby bunny', 'an adorable hamster'],
    lazy: ['a couch potato cat', 'a laid-back bulldog', 'a sleepy hamster', 'a chill fish'],
    smart: ['a Border Collie', 'a clever cat', 'a problem-solving parrot', 'a quick learner'],
    adventurous: ['an outdoor-loving dog', 'a curious cat', 'a free-spirited horse', 'an exploring rabbit']
  };

  // Defaults
  const DEFAULTS = {
    petType: 'dog',
    gender: 'either',
    personality: 'any',
    theme: 'any',
    nameLength: 'any',
    startsWith: '',
    count: 10
  };

  let state = { ...DEFAULTS };
  let generatedNames = [];
  let favorites = [];
  let elements = {};

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    cacheElements();
    if (!elements.generateBtn) {
      console.error('Pet Name Generator: Generate button not found');
      return;
    }
    loadFromURL();
    loadFavorites();
    attachEventListeners();
  }

  function cacheElements() {
    elements = {
      generateBtn: document.getElementById('generate-btn'),
      shareBtn: document.getElementById('share-btn'),
      resetBtn: document.getElementById('reset-btn'),
      resultDiv: document.getElementById('pet-name-result'),
      gender: document.getElementById('gender'),
      personality: document.getElementById('personality'),
      theme: document.getElementById('theme'),
      nameLength: document.getElementById('name-length'),
      startsWith: document.getElementById('starts-with'),
      count: document.getElementById('count')
    };
  }

  function attachEventListeners() {
    elements.generateBtn.addEventListener('click', generateResults);
    elements.shareBtn.addEventListener('click', shareSettings);
    elements.resetBtn.addEventListener('click', resetForm);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('type')) state.petType = params.get('type');
    if (params.has('gender')) state.gender = params.get('gender');
    if (params.has('personality')) state.personality = params.get('personality');
    if (params.has('theme')) state.theme = params.get('theme');
    if (params.has('length')) state.nameLength = params.get('length');
    if (params.has('starts')) state.startsWith = params.get('starts');
    if (params.has('count')) state.count = parseInt(params.get('count')) || 10;

    // Apply to form
    const petRadio = document.querySelector('input[name="pet-type"][value="' + state.petType + '"]');
    if (petRadio) petRadio.checked = true;
    elements.gender.value = state.gender;
    elements.personality.value = state.personality;
    elements.theme.value = state.theme;
    elements.nameLength.value = state.nameLength;
    elements.startsWith.value = state.startsWith;
    elements.count.value = state.count;
  }

  function saveToURL() {
    const params = new URLSearchParams();
    if (state.petType !== 'dog') params.set('type', state.petType);
    if (state.gender !== 'either') params.set('gender', state.gender);
    if (state.personality !== 'any') params.set('personality', state.personality);
    if (state.theme !== 'any') params.set('theme', state.theme);
    if (state.nameLength !== 'any') params.set('length', state.nameLength);
    if (state.startsWith) params.set('starts', state.startsWith);
    if (state.count !== 10) params.set('count', state.count);
    const url = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState(null, '', url);
  }

  function readFormState() {
    const petRadio = document.querySelector('input[name="pet-type"]:checked');
    state.petType = petRadio ? petRadio.value : 'dog';
    state.gender = elements.gender.value;
    state.personality = elements.personality.value;
    state.theme = elements.theme.value;
    state.nameLength = elements.nameLength.value;
    state.startsWith = elements.startsWith.value.trim().toUpperCase();
    state.count = parseInt(elements.count.value) || 10;
  }

  function loadFavorites() {
    try {
      const stored = localStorage.getItem('petNameFavorites');
      if (stored) favorites = JSON.parse(stored);
    } catch(e) { favorites = []; }
  }

  function saveFavorites() {
    try {
      localStorage.setItem('petNameFavorites', JSON.stringify(favorites));
    } catch(e) {}
  }

  function shareSettings() {
    readFormState();
    saveToURL();
    navigator.clipboard.writeText(window.location.href).then(() => {
      elements.shareBtn.textContent = 'Copied!';
      setTimeout(() => {
        elements.shareBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> Share Settings';
      }, 2000);
    });
  }

  function resetForm() {
    state = { ...DEFAULTS };
    const dogRadio = document.querySelector('input[name="pet-type"][value="dog"]');
    if (dogRadio) dogRadio.checked = true;
    elements.gender.value = 'either';
    elements.personality.value = 'any';
    elements.theme.value = 'any';
    elements.nameLength.value = 'any';
    elements.startsWith.value = '';
    elements.count.value = '10';
    elements.resultDiv.classList.add('hidden');
    elements.resultDiv.innerHTML = '';
    saveToURL();
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function countSyllables(name) {
    name = name.toLowerCase();
    if (name.length <= 3) return 1;
    let count = 0;
    let vowels = 'aeiouy';
    let prevVowel = false;
    for (let i = 0; i < name.length; i++) {
      let isVowel = vowels.indexOf(name[i]) >= 0;
      if (isVowel && !prevVowel) count++;
      prevVowel = isVowel;
    }
    if (name.endsWith('e') && count > 1) count--;
    return Math.max(1, count);
  }

  function getNamePool() {
    const petData = PET_NAMES[state.petType];
    if (!petData) return [];

    let genders = [];
    if (state.gender === 'either') {
      genders = ['male', 'female'];
    } else {
      genders = [state.gender];
    }

    let themes = [];
    if (state.theme === 'any') {
      themes = ['food', 'human', 'nature', 'mythology', 'popculture', 'colors', 'classic'];
    } else {
      themes = [state.theme];
    }

    let pool = [];
    genders.forEach(g => {
      if (petData[g]) {
        themes.forEach(t => {
          if (petData[g][t]) {
            pool = pool.concat(petData[g][t].map(name => ({ name, gender: g, theme: t })));
          }
        });
      }
    });

    return pool;
  }

  function filterNames(pool) {
    return pool.filter(item => {
      // Starting letter filter
      if (state.startsWith && !item.name.toUpperCase().startsWith(state.startsWith)) {
        return false;
      }
      // Length filter
      const syllables = countSyllables(item.name);
      if (state.nameLength === 'short' && syllables > 1) return false;
      if (state.nameLength === 'medium' && (syllables < 2 || syllables > 2)) return false;
      if (state.nameLength === 'long' && syllables < 3) return false;

      return true;
    });
  }

  function generateResults() {
    readFormState();
    saveToURL();

    let pool = getNamePool();
    pool = filterNames(pool);

    // Shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Remove duplicates by name
    const seen = new Set();
    const unique = [];
    for (const item of pool) {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        unique.push(item);
      }
    }

    generatedNames = unique.slice(0, state.count);
    renderResults();
  }

  function renderResults() {
    if (generatedNames.length === 0) {
      elements.resultDiv.innerHTML = '<p style="text-align:center;color:var(--color-gray-dark);">No names found matching your criteria. Try broadening your filters.</p>';
      elements.resultDiv.classList.remove('hidden');
      return;
    }

    const themeLabels = { food: 'Food', human: 'Human', nature: 'Nature', mythology: 'Mythology', popculture: 'Pop Culture', colors: 'Colors', classic: 'Classic' };
    const personalityLabel = state.personality !== 'any' ? state.personality : '';

    let html = '<div class="results-header"><h3>Pet Name Suggestions</h3>';
    html += '<p class="results-subtitle">' + generatedNames.length + ' names for your ' + state.petType + '</p></div>';

    if (favorites.length > 0) {
      html += '<div class="favorites-section"><h4>Saved Favorites (' + favorites.length + ')</h4><div class="favorites-list">';
      favorites.forEach((fav, i) => {
        html += '<span class="favorite-tag">' + fav + '<button onclick="window._petRemoveFav(' + i + ')">x</button></span>';
      });
      html += '</div></div>';
    }

    html += '<div class="names-grid">';
    generatedNames.forEach((item, idx) => {
      const isFav = favorites.includes(item.name);
      const meaning = MEANINGS[item.name] || '';
      const perfectFor = state.personality !== 'any' && PERFECT_FOR[state.personality]
        ? pick(PERFECT_FOR[state.personality])
        : '';

      html += '<div class="name-card' + (isFav ? ' favorited' : '') + '">';
      html += '<div class="name-card-header">';
      html += '<span class="pet-name-display">' + item.name + '</span>';
      html += '<div class="name-card-actions">';
      html += '<button class="icon-btn' + (isFav ? ' active' : '') + '" onclick="window._petToggleFav(' + idx + ')" title="Favorite">' + (isFav ? '★' : '☆') + '</button>';
      html += '<button class="icon-btn" onclick="window._petCopy(' + idx + ', this)" title="Copy">\u{1F4CB}</button>';
      html += '</div></div>';
      if (meaning) html += '<div class="name-meaning">"' + meaning + '"</div>';
      if (perfectFor) html += '<div class="name-perfect-for">Perfect for ' + perfectFor + '</div>';
      html += '<div class="name-meta">';
      html += '<span class="meta-badge theme-tag">' + (themeLabels[item.theme] || item.theme) + '</span>';
      html += '<span class="meta-badge">' + item.gender + '</span>';
      html += '<span class="meta-badge">' + countSyllables(item.name) + ' syl.</span>';
      html += '</div></div>';
    });
    html += '</div>';

    html += '<div class="result-actions">';
    html += '<button class="action-btn regenerate-btn" onclick="document.getElementById(\'generate-btn\').click()">Generate More</button>';
    html += '</div>';

    elements.resultDiv.innerHTML = html;
    elements.resultDiv.classList.remove('hidden');
    elements.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  window._petToggleFav = function(idx) {
    const name = generatedNames[idx].name;
    const i = favorites.indexOf(name);
    if (i >= 0) favorites.splice(i, 1);
    else favorites.push(name);
    saveFavorites();
    renderResults();
  };

  window._petRemoveFav = function(idx) {
    favorites.splice(idx, 1);
    saveFavorites();
    renderResults();
  };

  window._petCopy = function(idx, btn) {
    navigator.clipboard.writeText(generatedNames[idx].name).then(() => {
      btn.textContent = '✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '\u{1F4CB}'; btn.classList.remove('copied'); }, 1500);
    });
  };

})();
