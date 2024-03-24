/*
    Creates table annotations.
*/
CREATE TABLE annotations
(
    id UUID PRIMARY KEY,
	name VARCHAR(225) NOT NULL,
    created_at TIMESTAMPTZ
)
