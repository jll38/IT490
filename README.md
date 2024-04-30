# The Big Steppers









Things needed for all VMs to function:
OS- Ubuntu 22.04 - match your cpu type. For example Macbooks use arm so make sure to install the arm64 version.
Hardware - 4 cores 4 GB of RAM and 90 gb of storage. This is all dependant on your resources avaiable for each machine. You can lower the storage if needed and the amount of cores as well.

Basic setup for each server:
- su root
- sudo adduser <username> sudo - this is because some times the new user in the virtual machine would not be added to the sudo group.
- sudo apt install git - fork repos and checking out branches
- sudo apt install gitk
- sudo apt install php-amqp - for rabbitmq
- sudo apt install mysql-server - database we chose to use
- sudo apt install rabbitmq-server - messaging system for this course
- sudo rabbitmq-plugins enable rabbitmq_management - the gui for rabbitmq
- sudo apt install curl - alternative wget
- curl -s https://install.zerotier.com | sudo bash - vpn used for all machines
- sudo ufw allow 5672, 22 ( this is unsecure but how we setup the servers initially), 3306, 15672, backend ip, front end ip, database ip, dmz ip
- Once zerotier is installed use `sudo zerotier-cli status` to check your id.
- `sudo zerotier-cli join networkID` The id is given to you by the network admin or they can add you via your zerotier id.

# For each specific enviroment:
**Dev**:
- All the prior mentioned setup EXCEPT the ufw rules. You need 5672 and 15672. Those are for rabbitmq.
- sudo ufw allow from server ip address (for other servers) to any port 22 and on port 3306.
- **for running the backend**:
- pip3 install -r requirements.txt (uvicorn, pika, fastapi, mysql-connector-python, email-validator)
- python3 main.py - in the backend directory
- python3 consumer.py - ./backend/app/workers
- For **frontend**:
- Sudo apt install node - installs node.js
- sudo npm install - installs react
- npm start - this will start the react project

- For **Database**:
- again mysql-server
- There are a few tables that are needed across all enviorments.
# tables
Table 1 forum_comments:
- comment_id int NOT NULL AUTO_INCREMENT,
- post_id int DEFAULT NULL,
- user_id int DEFAULT NULL,
- content text NOT NULL,
- created_at datetime NOT NULL,
- PRIMARY KEY (comment_id)
Table 2 Forum_Posts
- post_id int NOT NULL AUTO_INCREMENT,
- user_id int DEFAULT NULL,
- title varchar(255) NOT NULL,
- content text NOT NULL,
- created_at datetime NOT NULL,
- PRIMARY KEY (post_id)
Table 3 Ingredients
- ingredient_id int NOT NULL AUTO_INCREMENT,
- name varchar(255) NOT NULL,
- type varchar(50) DEFAULT NULL,
- recipe_id int DEFAULT NULL,
- PRIMARY KEY (ingredient_id)
Table 4 Ratings
- rating_id int NOT NULL AUTO_INCREMENT,
- recipe_id int DEFAULT NULL,
- user_id int DEFAULT NULL,
- rating int DEFAULT NULL,
- PRIMARY KEY (rating_id)

Table 5 Recipes
- recipe_id int NOT NULL AUTO_INCREMENT,
- recipe_name varchar(255) NOT NULL,
- instructions text NOT NULL,
- cuisine varchar(50) DEFAULT NULL,
- diet_type varchar(50) DEFAULT NULL,
- preparation_time int DEFAULT NULL,
- cooking_time int DEFAULT NULL,
- views int DEFAULT '0',
- calories int DEFAULT NULL,
- protein decimal(5,2) DEFAULT NULL,
- fat decimal(5,2) DEFAULT NULL,
- carbs decimal(5,2) DEFAULT NULL,
- image_url text,
- PRIMARY KEY (recipe_id)

Table 6 Users
- user_id int NOT NULL AUTO_INCREMENT,
- username varchar(255) NOT NULL,
- email varchar(255) NOT NULL,
- password_hash varchar(255) NOT NULL,
- salt varchar(255) DEFAULT NULL,
- onboarding_complete tinyint(1) NOT NULL DEFAULT '0',
- dietary_restrictions varchar(255) DEFAULT NULL,
- TDEE int DEFAULT NULL,
- PRIMARY KEY (user_id),
- UNIQUE KEY username (username),
- UNIQUE KEY email (email)
    
That should be it for the Dev machine.












            

    
