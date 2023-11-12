/*
    Inserts a new news record.
*/
INSERT INTO news(id, published_date, url, title, content, created_at)
VALUES(${id}, ${publishedDate}, ${url}, ${title}, ${content}, CURRENT_TIMESTAMP)
RETURNING *
