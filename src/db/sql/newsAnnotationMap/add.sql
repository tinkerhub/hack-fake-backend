/*
    Inserts a new news_annotation_map record.
*/
INSERT INTO news_annotations_map(id, news_id, annotation_id, annotated_by, user_id, created_at)
VALUES(${id}, ${newsId}, ${annotationId}, ${annotatedBy}, ${userId}, CURRENT_TIMESTAMP)
RETURNING *;
