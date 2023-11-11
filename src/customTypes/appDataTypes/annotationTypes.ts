import {StringArray} from "customTypes/commonTypes";

interface iAnnotation {
	id: string;
	name: string;
}

type MultiAnnotation = {
	ids: StringArray;

	items: {
		[key in string]: iAnnotation;
	};
};

export type {iAnnotation, MultiAnnotation};
