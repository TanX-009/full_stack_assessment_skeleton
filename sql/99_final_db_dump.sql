ALTER TABLE user_home
RENAME TO user_home_old;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE address (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    street_address VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    UNIQUE(street_address, state, zip)
);

CREATE TABLE home (
    home_id INT AUTO_INCREMENT PRIMARY KEY,
    address_id INT,
    sqft DECIMAL(10, 2) NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    list_price DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE user_home (
    user_id INT,
    home_id INT,
    PRIMARY KEY(user_id, home_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (home_id) REFERENCES home(home_id)
);


INSERT INTO user (username, email)
SELECT DISTINCT username, email
FROM user_home_old;

INSERT INTO address (street_address, state, zip)
SELECT DISTINCT street_address, state, zip
FROM user_home_old;

INSERT INTO home (address_id, sqft, beds, baths, list_price)
SELECT 
    address.address_id,
    user_home_old.sqft,
    user_home_old.beds,
    user_home_old.baths,
    user_home_old.list_price
FROM 
    user_home_old
JOIN 
    address ON user_home_old.street_address = address.street_address
              AND user_home_old.state = address.state
              AND user_home_old.zip = address.zip;

INSERT INTO user_home (user_id, home_id)
SELECT 
    user.user_id,
    home.home_id
FROM 
    user_home_old
JOIN 
    user ON user_home_old.username = user.username
          AND user_home_old.email = user.email
JOIN 
    home ON home.sqft = user_home_old.sqft
               AND home.beds = user_home_old.beds
               AND home.baths = user_home_old.baths
               AND home.list_price = user_home_old.list_price
JOIN 
    address ON address.address_id = home.address_id
              AND user_home_old.street_address = address.street_address
              AND user_home_old.state = address.state
              AND user_home_old.zip = address.zip;
