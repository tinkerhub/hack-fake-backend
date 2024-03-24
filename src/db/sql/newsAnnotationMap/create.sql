CREATE TABLE news_annotations_map
(
	id UUID PRIMARY KEY,
    news_id UUID NOT NULL,
    annotation_id UUID NOT NULL,
    annotated_by VARCHAR(10) NOT NULL,
    user_id UUID, -- This column will be filled with the user's ID when annotated_by is 'user'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);