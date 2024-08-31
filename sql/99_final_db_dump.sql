-- create user table
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- create state table
CREATE TABLE state (
  state_id INT AUTO_INCREMENT PRIMARY KEY,
  state_name VARCHAR(255) UNIQUE NOT NULL
);

-- create home table with foreign key to state
CREATE TABLE home (
  home_id INT AUTO_INCREMENT PRIMARY KEY,
  state INT,
  street_address VARCHAR(255) NOT NULL,
  zip VARCHAR(10) NOT NULL,
  sqft DECIMAL(10, 2) NOT NULL,
  beds INT NOT NULL,
  baths INT NOT NULL,
  list_price DECIMAL(15, 2) NOT NULL,
  FOREIGN KEY (state) REFERENCES state(state_id)
);

-- add data from user_home table to state table
INSERT INTO state (state_name)
SELECT DISTINCT state FROM user_home;

-- add data from user_home table to user table
INSERT INTO user (username, email)
SELECT DISTINCT username, email
FROM user_home;

-- add data from user_home table to home table with foreign key to state
INSERT INTO home (
  state,
  street_address,
  zip,
  sqft,
  beds,
  baths,
  list_price
)
SELECT DISTINCT
    s.state_id,
    h.street_address,
    h.zip,
    h.sqft,
    h.beds,
    h.baths,
    h.list_price
FROM 
    user_home h
JOIN 
    (SELECT * FROM state ORDER BY state_name) s ON h.state = s.state_name;

-- rename user_home table to user_home_old
ALTER TABLE user_home
RENAME TO user_home_old;

-- create new user_home table with foreign keys to user and home
CREATE TABLE user_home (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user INT,
    home INT,
    FOREIGN KEY (user) REFERENCES user(user_id),
    FOREIGN KEY (home) REFERENCES home(home_id)
);

-- add data from user_home_old table to user_home table
INSERT INTO user_home (user, home)
SELECT 
    u.user_id, 
    h.home_id
FROM 
    user_home_old uho
JOIN 
    user u ON u.username = uho.username AND u.email = uho.email
JOIN 
    home h ON h.street_address = uho.street_address 
