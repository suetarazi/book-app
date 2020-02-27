DROP TABLE IF EXISTS books;

CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    isbn VARCHAR(255),
    image_url TEXT,
    description TEXT,
    bookshelf VARCHAR(255)
);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES ('Eat, Pray, Love', 'Elizabeth Gilbert', '9782253126300', 'https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwino8reqvLnAhUT1GQKHQZvDboYABACGgJwag&ohost=www.google.com&cid=CAESQOD20q6Vzq-WUTrDMv9JyaNytx0ftHXgyVKkVAl2Yn6xwEnxE6l8W91SzScaArSkgSL3fCQMbu_HWbshuo97ixY&sig=AOD64_01WX2Kl_s6IKswJaG49pkCCh66kQ&ctype=5&q=&ved=2ahUKEwiQ5r3eqvLnAhWHCjQIHUj5CL0Q8w56BQgcEKMB&adurl=', 'An awesome book about travel and life', 007);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES ('The Four Agreements', 'don Miguel Ruiz', '9781878424310', 'https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiBq-6fq_LnAhWJ12QKHXAQAOoYABADGgJwag&ohost=www.google.com&cid=CAESQOD2iW3a7uf1SlByK6-5XoToM91ByB7h1CwNcfYGCpdFH46wSHkKF0Q0tCEDJalXblcWTDSk_nErr4vox2aweE8&sig=AOD64_1sOh1lXbHEy47k2GVUKEyJvT1l9Q&ctype=5&q=&ved=2ahUKEwj-keKfq_LnAhWBFjQIHaO_BqEQ9aACegQIGBBT&adurl=', 'A book full of infinite wisdom. One to read over and over', 008);