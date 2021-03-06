DROP DATABASE IF EXISTS oneTeam;
CREATE DATABASE oneTeam;
USE oneTeam;
CREATE TABLE timeStamps (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  videoId varchar(255) NOT NULL,
  userId INT NOT NULL,
  timeStamp INT(11) NOT NULL,
  comment varchar(255)
);
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL UNIQUE KEY,
  owner BOOLEAN NOT NULL
);
CREATE TABLE videos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  videoId varchar(255) NOT NULL UNIQUE KEY,
  title varchar(255) NOT NULL,
  description varchar(255),
  image varchar(255),
  userId INT(11) NOT NULL,
  duration INT(11)
);
INSERT INTO timeStamps (videoId, userId, timeStamp, comment) VALUES ('ZK3O402wf1c', 2, 132, 'hello so confused.');
INSERT IGNORE INTO users (name, owner) VALUES ('Jun Yoo', true);
INSERT IGNORE INTO users (name, owner) VALUES ('Brian', false);
INSERT IGNORE INTO videos (videoId, title, userId, description, image, duration) VALUES ('ZK3O402wf1c', 'Lec 1 | MIT 18.06 Linear Algebra, Spring 2005', 1, 'Lecture 1: The Geometry of Linear Equations. View …e information at http://ocw.mit.edu/terms More...', 'https://i.ytimg.com/vi/ZK3O402wf1c/default.jpg', 2389);
