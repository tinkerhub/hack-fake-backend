/*
    Creates table news.
*/
CREATE TABLE news
(
    id UUID PRIMARY KEY,
    published_date TIMESTAMPTZ,
    url TEXT NOT NULL,
	title VARCHAR(225) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ
)
