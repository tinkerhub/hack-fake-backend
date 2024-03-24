import config from "@config";

type AnnotationResult = Record<string, string>; // Changed to string type to reflect your input
type AnnotationToIdMap = Record<string, string>;

// FIXME: this is a jugad fix. Ideally, the API should return the UUIDs
const annotationToIdMap: AnnotationToIdMap = {
	Hate: "3f3b4e21-87e2-4f8e-927e-3ad776bb1c2a",
	Misleading: "5ae7a81f-9d74-49b8-a72b-b4c2a7a24fa9",
	Disinformation: "c05e89a3-9dd7-40ad-a86a-aa127aae3237",
	Rumour: "b09c5b25-d85d-49f2-8424-117c1c40dc8e",
	Sensationalism: "40a97383-c3f3-4de9-98e8-58191cf2c23a",
};

function getHighScoringAnnotationIds(result: AnnotationResult): string[] {
	return Object.entries(result)
		.filter(([, value]) => {
			return parseFloat(value) > config.aiModelConfig.newsPredictionThreshold;
		}) // Convert string to number and check if greater than 0.7
		.map(([key]) => {
			return annotationToIdMap[key];
		}) // Map to their corresponding UUIDs
		.filter((id): id is string => {
			return id !== undefined;
		}); // Type guard to filter out undefined entries
}

export default {
	getHighScoringAnnotationIds,
};
