DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

-- tää on kommentti 
CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- add users
INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);
INSERT INTO Users VALUES (null, 'Donatelloqq2w2', 'secret234', 'dona2dcsdcs@example.com', 1, null);

-- FK constraint fails, user_id 1606 does not exist
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', '', 1606, 'image/jpeg', null);
-- this works
 INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
   VALUES ('ffd18.jpg', 787574, 'Favorite drink 1', '', 260, 'image/jpeg', null),
   VALUES ('ffd18.jpg', 128774, 'Favorite drink 2', '', 260, 'image/jpeg', null);

-- Inserting multiple records at once
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg', null),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg', null),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg', null);


CREATE TABLE Messages (
  message_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  sender_id INT NOT NULL,
  recipient_id INT NOT NULL,
  message_text TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES Users(user_id),
  FOREIGN KEY (recipient_id) REFERENCES Users(user_id)
);

CREATE TABLE Comments (
  comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  media_id INT NOT NULL,
  user_id INT NOT NULL,
  parent_comment_id INT,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO Comments (content, media_id, user_id, created_at) 
  VALUES ('beautiful', 2, 260, null);

INSERT INTO Comments (content, media_id, user_id, parent_comment_id, created_at) 
  VALUES ('thanks', 2, 305, 1, null);


INSERT INTO Messages (sender_id, recipient_id, message_text, created_at) 
  VALUES (305, 260, 'hello there', null),
   (260, 305, 'hello', null),
   (306, 305, 'message', null);

SELECT * from comments WHERE media_id=2;
SELECT * from comments WHERE media_id=2 AND parent_comment_id IS NULL;
SELECT * from messages WHERE recipient_id=305;
SELECT * from messages 
WHERE recipient_id=305 OR recipient_id= 260 
AND sender_id=260 OR sender_id=305;


SELECT filename, title, username, mediaitems.created_at AS Uploaded 
from mediaitems JOIN users
ON users.user_id = mediaitems.user_id;

SELECT filename, title, username, mediaitems.created_at AS Uploaded 
from mediaitems RIGHTs JOIN users
ON users.user_id = mediaitems.user_id;

UPDATE users SET username='Uusinimi'
WHERE user_id=260;

DELETE FROM Messages WHERE user_id=305;
DELETE from MediaItems WHERE user_id=305;
DELETE FROM Users WHERE user_id=305;

-- vo mysql
mysql
mysql -u root -p;
-- dung de cai dat db o he thong khac
mysqldump mediashare;
-- lam ban sao luu. Sau do co the pack zip no lai
mysqldump mediashare > dumpep_db.sql