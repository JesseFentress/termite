CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  passhash VARCHAR(255) NOT NULL,
  role VARCHAR(15) NOT NULL
);

CREATE TABLE project (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  admin_id INT NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES users(id)
);

CREATE TABLE project_members (
  project_id INT NOT NULL,
  member_id INT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(id),
  FOREIGN KEY (member_id) REFERENCES users(id),
  PRIMARY KEY (project_id, member_id)
);

CREATE TABLE ticket (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  project_id INT NOT NULL,
  description VARCHAR(255) NOT NULL,
  status VARCHAR(12),
  date_created DATE NOT NULL,
  date_deadline DATE NOT NULL,
  priority INT NOT NULL,
  submitter INT,
  FOREIGN KEY (project_id) REFERENCES project(id),
  FOREIGN KEY (submitter) REFERENCES users(id)
);

CREATE TABLE ticket_comments (
  id SERIAL PRIMARY KEY,
  comment VARCHAR(255),
  ticket_id INT NOT NULL,
  commentor_id INT NOT NULL,
  FOREIGN KEY (ticket_id) REFERENCES ticket(id),
  FOREIGN KEY (commentor_id) REFERENCES users(id)
);



