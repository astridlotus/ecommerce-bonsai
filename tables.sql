DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS history;

CREATE TABLE "items" (
	"item_id"	INTEGER,
	"name"	TEXT,
	"description"	TEXT,
	"price"	TEXT,
	"pricing" INTEGER,
	"quantity"	INTEGER,
	"src"	TEXT,
	"size"	TEXT,
	"difficulty" TEXT,
	PRIMARY KEY("item_id" AUTOINCREMENT)
);

CREATE TABLE "reviews" (
	"review_id"	INTEGER,
	"item_id"	INTEGER,
	"username"	TEXT,
	"response"	TEXT,
	"rating"	INTEGER,
	PRIMARY KEY("review_id" AUTOINCREMENT)
);

CREATE TABLE "users" (
	"username"	TEXT,
	"password"	TEXT,
	"email"	TEXT,
	PRIMARY KEY("username")
);

CREATE TABLE "history" (
	"transaction_id"	INTEGER,
	"username"	Text,
	"item_id"	INTEGER,
	"date"	DATETIME DEFAULT (datetime('now', 'localtime')),
	PRIMARY KEY("transaction_id" AUTOINCREMENT)
);


INSERT INTO users(username, password, email) VALUES ('abowde', 'bellow', 'abowde@uw.edu');
INSERT INTO history(transaction_id, username, item_id) VALUES (1000, 'abowde', '1');

INSERT INTO items (item_id, name, description, price, pricing, quantity, src, size, difficulty) VALUES (0, 'THE VIP ITEM', 'Seems to be the mascot of a high school??', '8,000,000.00', 8000000, '1', 'img/prank', 'large', 'difficult');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Japanese White Pine Bonsai', 'With a scientific name Pinus parviflora, this is a non-flowering tree that prefers full sun. In the wild, it may reach up to 90 feet tall but this one is only a fraction of that. This bonsai is best kept outside', '4,500.00', 4500, '1', 'img/bonsai-img/bonsai1', 'medium', 'medium');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Blue Jacaranda Bonsai', 'Commonly known as a Jacaranda mimosifolia, this is once of the most aesthetically pleasing bonsai. It has long lasting purple colored flowers that are bell shaped. This is native to the south central South American region. In nature, they can grow up to 50 feet tall.', '5,500.00', 5500, '1', 'img/bonsai-img/bonsai2', 'medium', 'easy');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Japanese White Pine Bonsai', 'With a scientific name Pinus parviflora, this is a non-flowering tree that prefers full sun. In the wild, it may reach up to 90 feet tall but this one is only a fraction of that. This bonsai is best kept outside', '85.00', 85, '1', 'img/bonsai-img/bonsai3', 'small', 'medium');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Cedar Elm Bonsai', 'This is a deciduous tree native to south-central North America, including Texas, Louisana and neighboring states.With a scientific name of Ulmus crassifolia, it thrives in valleys and can get to 90 feet tall in ideal conditions. This bonsai has beautiful leaves which will change into an orange color before falling in the early winter. ', '4,000.00', 4000, '1', 'img/bonsai-img/bonsai4', 'medium', 'difficult');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Eastern Red Cedar Bonsai', 'With a scientific name of Juniperus virginiana or also called red juniper, this can be found in the region easy of the Great Plains. However this is not a true cedar tree. In the wild, it can grow up to 50 feet tall. They have a very diverse form of growth structure. ', '4,500.00', 4500, '1', 'img/bonsai-img/bonsai5', 'medium', 'easy');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Ficus Ginseng Bonsai', 'This is one of the easiest bonsai to take care of. They have very thick trunks and are a first choice for beginner bonsai enthusiasts. They are native to Malaysia and Taiwan and can grow up to 40 feet tall in ideal conditions. They can produce fruit, which are actually just inverted flowers called figs. ', '85.00', 85, '-1', 'img/bonsai-img/bonsai6', 'small', 'easy');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Japanese Maple Bonsai', 'The Japanese Maple is a deciduous tree native to Japan. As the tree matures, the leaves undergo color changes transitioning from green, to orange and then a deep red color. The branches are very flexible which makes them ideal for bonsai', '4,000.00', 4000, '1', 'img/bonsai-img/bonsai7', 'medium', 'medium');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Eastern Red Cedar Bonsai', 'This is a deciduous tree native to south-central North America, including Texas, Louisana and neighboring states.With a scientific name of Ulmus crassifolia, it thrives in valleys and can get to 90 feet tall in ideal conditions. This bonsai has beautiful leaves which will change into an orange color before falling in the early winter. ', '300.00', 300, '1', 'img/bonsai-img/bonsai8', 'small', 'easy');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Japanese White Pine Bonsai', 'With a scientific name Pinus parviflora, this is a non-flowering tree that prefers full sun. In the wild, it may reach up to 90 feet tall but this one is only a fraction of that. This bonsai is best kept outside but this small variation will be okay indoors.', '30.00', 30, '1', 'img/bonsai-img/bonsai9', 'small', 'easy');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Balsam Fir Bonsai', 'This is an evergreen tree than can grow up to 60 feet tall in the wild. This tree has dense leaves. In this variation, the tree is planted on another tree stump in some water, making the transportation of this tree very expensive. Maybe grow your own next time?', '10,000.00', 10000, '1', 'img/bonsai-img/bonsai10', 'medium', 'difficult');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Green Mound Juniper Bonsai', 'Also called Juniperus procumbens, this variation grows hunter green leaves and a tight growth pattern of classic bonsai. This is a great one for novice growers due to its easy care and maintenance. This bonsai requires periods of cold weather hibernation to remain in stable health. Ideally, below 60 degrees Farenheit for three months.', '85.00', 85, '1', 'img/bonsai-img/bonsai11', 'small', 'easy');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Malpighia Bonsai', 'This is a flowering tree, and was named to honor an Italian botanist and physician in the 17th century. These plants are normally found in rocky hillsides near cool water streams. In the wild, it can only grow about 20 feet tall.', ' 150.00 ', 150, '1', 'img/bonsai-img/bonsai12', 'small', 'easy');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Deadwood Bonsai', 'This is a type of bonsai that are commonly found and collected. Sometimes dead wood can develop on alive trees, but in this case, the entire specimen is dead. This makes it very easy to care for, obviously, and is a aesthetic choice for some.', ' 300.00 ', 300, '1', 'img/bonsai-img/bonsai13', 'medium', 'easy');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Chinese Elm Bonsai Forest', 'Scientific name Ulmus parvifolia, this tree is categorized by its beautiful twisting trunk, small green leaves, strong branches and fine twigs. Native to Korea, Japan, and China they can grow up to 80 feet in the wild. They fair best in warm climates, and kept indoors.', ' 6,000.00 ', 6000, '1', 'img/bonsai-img/bonsai14', 'large', 'easy');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Hinoki Cypress Bonsai', 'Scientific name Chamaecyparis obtusa, this tree is native to central and southern Japan. Since it does not belong to the Cupressus genus, it is sometimes referred to as a false cypress or Japanese Cypress. In the wild, this tree can grow up to 150 feet tall! This tree is now classified as an endangered species', ' 5,000.00 ', 5000, '1', 'img/bonsai-img/bonsai15', 'large', 'medium');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Plastic Boxwood Bonsai', 'Dont have a green thumb? No problem, with this artificial bonsai you can fool all your friends into thinking you have the most patience in the world. Warning: may melt in high temperatures.', ' 5.00 ', 5, '-1', 'img/bonsai-img/bonsai16', 'small', 'easy');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Fukien Tea Bonsai', 'Scientific name Carmona retusa, this tree is not a project for the beginner. This tree will easily develop a thick and knotted trunk, is evergreen and blooms frequently with litter white flowers. If given the right conditions, it will blom every month of the year. ', ' 3,000.00 ', 3000, '1', 'img/bonsai-img/bonsai17', 'small', 'difficult');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Cedar Elm Bonsai Forest', 'This is a deciduous tree native to south-central North America, including Texas, Louisana and neighboring states.With a scientific name of Ulmus crassifolia, it thrives in valleys and can get to 90 feet tall in ideal conditions. This bonsai has beautiful leaves which will change into an orange color before falling in the early winter. This specific pot also contains bamboo which needs to be watched carefully so not to overgrow the bonsai.', ' 8,000.00 ', 8000, '1', 'img/bonsai-img/bonsai18', 'large', 'difficult');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Toringo Crab Apple Bonsai', 'This tree is really a decidous shrub that grows throughout Japans hilly regions. Its green fruit turns a lovely red and yellow after bearing white blooms in April. This tree must be transplanted every two years', ' 3,000.00 ', 3000, '1', 'img/bonsai-img/bonsai19', 'medium', 'medium');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Azalea Bonsai', 'Usually, azalea and other rhododendrons are typically shaped into compact shrubbery, but not in the case of this bonsai. This variety is pink, but can also be found in white and red. These grow best in acidic soil', ' 2,000.00 ', 2000, '1', 'img/bonsai-img/bonsai20', 'small', 'medium');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Eastern Red Cedar Bonsai', 'This is a deciduous tree native to south-central North America, including Texas, Louisana and neighboring states.With a scientific name of Ulmus crassifolia, it thrives in valleys and can get to 90 feet tall in ideal conditions. This bonsai has beautiful leaves which will change into an orange color before falling in the early winter. This specific one has a beautiful white and blue pot', ' 4,000.00 ', 4000, '1', 'img/bonsai-img/bonsai21', 'large', 'medium');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Grevillea robusta Bonsai', 'This tree is native to the eastern coast of Australia. It grows in rivers and subtropical environments. It has a few other common names such as silky oak and silver oak', ' 3,000.00 ', 3000, '1', 'img/bonsai-img/bonsai22', 'medium', 'medium');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Minature Bonsai Forest', 'In this pot there are two species of the Grevillea robusta and they are quite small, less than 6 inches each. They are mounted on rocks so there can be a small stream between them. There is also some moss in addition, which makes this pot a little more high maintenance.', ' 1,000.00 ', 1000, '1', 'img/bonsai-img/bonsai23', 'small', 'difficult');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Cotoneaster Bonsai', 'Cotoneasters are very popular as garden shrubs and can only really grow up to 15 feet in the wild. They are native to the foothills of the Himalayas to North Africa. ', ' 1,000.00 ', 1000, '1', 'img/bonsai-img/bonsai24', 'medium', 'medium');
INSERT INTO items (name, description, price, pricing, quantity, src, size, difficulty) VALUES ('Ficus Ginseng Bonsai', 'This is one of the easiest bonsai to take care of. They have very thick trunks and are a first choice for beginner bonsai enthusiasts. They are native to Malaysia and Taiwan and can grow up to 40 feet tall in ideal conditions. They can produce fruit, which are actually just inverted flowers called figs. This specific tree comes in a beautiful stone pot and is very large and mature.', ' 3,000.00 ', 3000, '-1', 'img/bonsai-img/bonsai25', 'large', 'easy');

INSERT INTO users (username, password, email) VALUES ('betrothbonsai', 'wedbonsai', 'betroth@gmail.com');
-- INSERT INTO users (username, password, email) VALUES ('bonsaitrumpery', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaiditty', );
-- INSERT INTO users (username, password, email) VALUES ('thwartbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaiswain', );
-- INSERT INTO users (username, password, email) VALUES ('forswearbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bushelbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaibesmirch', );
-- INSERT INTO users (username, password, email) VALUES ('bonsailiverish', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaibanshee', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaipiddock', );
-- INSERT INTO users (username, password, email) VALUES ('oftbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('draybonsai', );
-- INSERT INTO users (username, password, email) VALUES ('heirbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaimizzen', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaiforsooth', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaitouchstone', );
-- INSERT INTO users (username, password, email) VALUES ('bightbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('nessbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaibedight', );
-- INSERT INTO users (username, password, email) VALUES ('hitherbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('plentybonsai', );
-- INSERT INTO users (username, password, email) VALUES ('wightbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bonsairobot', );
-- INSERT INTO users (username, password, email) VALUES ('staircasebonsai', );
-- INSERT INTO users (username, password, email) VALUES ('spectrumbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bonsairope', );
-- INSERT INTO users (username, password, email) VALUES ('bookbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('stomachbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaimist', );
-- INSERT INTO users (username, password, email) VALUES ('gatebonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaidrum', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaiskeleton', );
-- INSERT INTO users (username, password, email) VALUES ('mouthbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('compactdiscbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('chiselbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bowlbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('cometbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaifamily', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaiknife', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaichessboard', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaileatherjacket', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaislave', );
-- INSERT INTO users (username, password, email) VALUES ('churchbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bonsaiballoon', );
-- INSERT INTO users (username, password, email) VALUES ('crystalbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('explosivebonsai', );
-- INSERT INTO users (username, password, email) VALUES ('planetbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('girlbonsai', );
-- INSERT INTO users (username, password, email) VALUES ('bananabonsai', );

INSERT INTO [reviews] ([review_id], [item_id], [username], [response], [rating]) VALUES (1000, '0', 'abowde', 'got it as a gift for my friend marina and she loves it', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('1', 'betrothbonsai', 'This bonsai tree is like having a tiny zen master in my living room, silently judging my gardening skills.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('2', 'bonsaitrumpery', 'I can''t help but feel like a bonsai tree whisperer. I talk to it, and it responds with subtle leaf nods.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('3', 'bonsaiditty', 'My friends thought I was pruning a tiny hedge, but it turns out it''s just my bonsai tree. It''s the ultimate optical illusion.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('4', 'thwartbonsai', 'This bonsai tree is proof that good things come in small packages. It''s like a miniature forest with a big personality.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('5', 'bonsaiswain', 'I bought this bonsai tree to add some ''tree-mendous'' puns to my life. It hasn''t disappointed!', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('6', 'forswearbonsai', 'The bonsai tree arrived with a note saying it''s a distant relative of the Ents from ''The Lord of the Rings.'' I''m still waiting for it to start talking.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('7', 'bushelbonsai', 'My bonsai tree has become the star of my Instagram feed. It''s a mini influencer with major plant power.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('8', 'bonsaibesmirch', 'I named my bonsai tree ''Branch Connery'' because it''s always ''shaken, not stirred'' by the slightest breeze.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('9', 'bonsailiverish', 'Forget yoga, I''ve found my zen in shaping bonsai trees. It''s like tree yoga with a twist... literally.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('10', 'bonsaibanshee', 'My bonsai tree is my secret weapon against stress. Whenever life gets tough, I stare at its calm leaves and remember not to ''leaf'' things unresolved.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('11', 'bonsaipiddock', 'I caught my bonsai tree throwing shade at my other plants. I guess it takes ''tree competition'' seriously.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('12', 'oftbonsai', 'This bonsai tree is like a personal trainer for my patience. It reminds me that good things take time... and plenty of pruning.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('13', 'draybonsai', 'The bonsai tree has become the star of my living room. It''s like having a tiny celebrity plant without the paparazzi.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('14', 'heirbonsai', 'I never thought I''d have a pet tree, but here I am, playing hide-and-seek with my bonsai tree''s branches. Spoiler alert: It always wins.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('15', 'bonsaimizzen', 'I''ve decided to teach my bonsai tree to play guitar. So far, it''s mastered ''tree-chords'' and ''leaf-solos.'' Rock on, little tree!', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('16', 'bonsaiforsooth', 'This bonsai tree is the ultimate multitasker. It''s a source of tranquility, a conversation starter, and an expert at making my friends say, ''Aww!''', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('17', 'bonsaitouchstone', 'I caught my bonsai tree having a leaf party with the other plants in my garden. It knows how to make friends and leaf an impression.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('18', 'bightbonsai', 'My bonsai tree is like a tiny forest manager. It keeps all the other plants in line with its ''tree-mendous'' leadership skills.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('19', 'nessbonsai', 'I''m convinced my bonsai tree has a green thumb. It''s always waving its little branches in approval when I water the other plants.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('20', 'bonsaibedight', 'My bonsai tree is the star of my plant comedy club. Its one-liners? All leafy greens, of course!', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('21', 'hitherbonsai', 'I secretly suspect my bonsai tree is practicing Tai Chi when I''m not looking. It has mastered the art of ''tree-chi.''', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('22', 'plentybonsai', 'I thought I was buying a bonsai tree, but it turns out it''s a tiny art gallery. Each leaf is a masterpiece in itself.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('23', 'wightbonsai', 'This bonsai tree is the superhero of plants. It fights off boredom and brings joy with its ''leaf-tacular'' presence.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('24', 'bonsairobot', 'My bonsai tree has mastered the art of camouflage. Sometimes I can''t find it amidst the other plants, and it''s the ultimate game of ''Where''s Tree-y?''', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('25', 'staircasebonsai', 'I am in love with this bonsai tree! It adds such a serene and elegant touch to my home.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('1', 'spectrumbonsai', 'The bonsai tree I received is absolutely stunning. It exceeded my expectations.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('2', 'bonsairope', 'This bonsai tree is the perfect size for my office desk. It brings a sense of tranquility to my workspace.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('3', 'bookbonsai', 'The craftsmanship of this bonsai tree is remarkable. Each detail is meticulously designed.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('4', 'stomachbonsai', 'I''ve always wanted a bonsai tree, and this one is a fantastic choice. It''s a beautiful addition to my garden.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('5', 'bonsaimist', 'The bonsai tree arrived well-packaged and in excellent condition. It shows the care put into its delivery.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('6', 'gatebonsai', 'I appreciate the clear care instructions that came with the bonsai tree. It has helped me maintain its health and beauty.', '3');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('7', 'bonsaidrum', 'This bonsai tree has become the centerpiece of my living room. It''s a conversation starter for sure.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('8', 'bonsaiskeleton', 'The bonsai tree''s vibrant green leaves create a refreshing and peaceful ambiance in my home.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('9', 'mouthbonsai', 'I am impressed by the resilience of this bonsai tree. It has thrived in various weather conditions.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('10', 'compactdiscbonsai', 'The size of this bonsai tree is perfect for my small apartment. It fits perfectly on my windowsill.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('11', 'chiselbonsai', 'The bonsai tree''s intricate shaping and pruning make it a true work of art.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('12', 'bowlbonsai', 'I enjoy spending time tending to my bonsai tree. It has become a therapeutic hobby.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('13', 'cometbonsai', 'The bonsai tree has brought a touch of nature into my urban apartment. It''s a delightful contrast.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('14', 'bonsaifamily', 'The quality of this bonsai tree is outstanding. It''s clear that it was grown with expertise and care.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('15', 'bonsaiknife', 'I love how the bonsai tree changes with the seasons. It''s like having a miniature tree in my home.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('16', 'bonsaichessboard', 'This bonsai tree has quickly become a focal point in my garden. It adds a sense of tranquility.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('17', 'bonsaileatherjacket', 'The bonsai tree''s twisted trunk and delicate branches give it a unique and captivating appearance.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('18', 'bonsaislave', 'I appreciate the variety of bonsai tree species available. It allows me to create a diverse collection.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('19', 'churchbonsai', 'The bonsai tree''s gentle curves and graceful posture make it a true symbol of beauty and harmony.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('20', 'bonsaiballoon', 'I''m impressed by how quickly this bonsai tree has grown and matured. It''s a testament to its health and vitality.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('21', 'crystalbonsai', 'The bonsai tree has become my meditation companion. It helps me find peace and mindfulness.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('22', 'explosivebonsai', 'This bonsai tree is an ideal gift for any nature enthusiast. It''s a memorable and meaningful present.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('23', 'planetbonsai', 'The bonsai tree''s container is elegant and complements its natural beauty. It''s a perfect combination.', '4');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('24', 'girlbonsai', 'I''ve received many compliments on my bonsai tree. It''s a unique and eye-catching addition to my home decor.', '5');
INSERT INTO [reviews] ([item_id], [username], [response], [rating]) VALUES ('25', 'bananabonsai', 'Was NOT a banana', '1');
