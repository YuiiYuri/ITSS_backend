CREATE TABLE `users` (
  `user_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `mail` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255),
  `role` VARCHAR(255) NOT NULL,
  `auth_method` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
insert into users(user_name, password, mail, role, auth_method) values('admin', '12345678', 'admin@gmail.com', 'admin', '');

CREATE TABLE `tasks` (
  `task_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `task_name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `due_date` TIMESTAMP NOT NULL,
  `user_id` INT NOT NULL,
  `priority_id` INT NOT NULL,
  `label_id` INT,
  `filter_id` INT,
  `is_finished` TINYINT DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `priority` (
  `priority_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `priority_name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `color` VARCHAR(255) NOT NULL
);
insert into priority(priority_name, description, color) values ('1', 'very important very hury', 'red');
insert into priority(priority_name, description, color) values ('2', 'not important very hury', 'yellow');
insert into priority(priority_name, description, color) values ('3', 'important not hury', 'blue');
insert into priority(priority_name, description, color) values ('4', '', 'black');


CREATE TABLE `label` (
  `label_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `label_name` VARCHAR(255) NOT NULL,
  `color` VARCHAR(255) NOT NULL
);

CREATE TABLE `filter` (
  `filter_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `filter_name` VARCHAR(255) NOT NULL,
  `color` VARCHAR(255) NOT NULL
);
insert into filter(filter_name,color) values ("Learn", "red");
insert into filter(filter_name,color) values ("work", "yellow");
insert into filter(filter_name,color) values ("relax", "orange");
insert into filter(filter_name,color) values ("online", "green");
insert into filter(filter_name,color) values ("offine", "teal");


CREATE TABLE `comments` (
  `comment_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `stand` INT NOT NULL,
  `text` VARCHAR(255) NOT NULL,
  `task_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE `tasks` ADD FOREIGN KEY (`priority_id`) REFERENCES `priority` (`priority_id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`label_id`) REFERENCES `label` (`label_id`) ON DELETE SET NULL; 

ALTER TABLE `comments` ADD FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`filter_id`) REFERENCES `filter`(`filter_id`);
