import {StringArray} from "customTypes/commonTypes";

export interface iNewsSubmissionDTO {
	title: string;
	content: string;
	url: string;
	publishedDate: string;
}

interface iNews {
	id: string;
	publishedDate: string;
	url: string;
	title: string;
	content: string;
	createdAt: string;
}

type MultiNews = {
	ids: StringArray;

	items: {
		[key in string]: iNews;
	};
};

export type {iNews, MultiNews};
