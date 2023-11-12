import {IDatabase, IMain} from "pg-promise";

import {iNewsAnnotationMapModel} from "db/models/newsAnnotationMap.model";

import {newsAnnotationMap as sql} from "@db/sql";
import {NullableString} from "customTypes/commonTypes";

/*
 This repository mixes hard-coded and dynamic SQL, just to show how to use both.
*/
export default class NewsAnnotationRepository {
	/**
	 * @param db
	 * Automated database connection context/interface.
	 *
	 * If you ever need to access other repositories from this one,
	 * you will have to replace type 'IDatabase<any>' with 'any'.
	 *
	 * @param pgp
	 * Library's root, if ever needed, like to access 'helpers'
	 * or other namespaces available from the root.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(private db: IDatabase<any>, private pgp: IMain) {
		/*
          If your repository needs to use helpers like ColumnSet,
          you should create it conditionally, inside the constructor,
          i.e. only once, as a singleton.
        */
	}

	/**
	 * Creates the news_annotation_map table.
	 *
	 * @returns null
	 */
	async create(): Promise<null> {
		return this.db.none(sql.create);
	}

	// Returns all news_annotation_map records;
	async all(): Promise<iNewsAnnotationMapModel[]> {
		return this.db.any("SELECT * FROM news_annotation_map");
	}

	// Finds a news_annotation_map record by its ID;
	async findById(id: string): Promise<iNewsAnnotationMapModel | null> {
		return this.db.oneOrNone(
			"SELECT * FROM news_annotation_map WHERE id = $1",
			id
		);
	}

	// Adds a new news_annotation_map record, and returns the new object;
	async add(
		id: string,
		newsId: string,
		annotationId: string,
		annotatedBy: string,
		userId: NullableString
	): Promise<iNewsAnnotationMapModel> {
		return this.db.one(sql.add, {
			id,
			newsId,
			annotationId,
			annotatedBy,
			userId,
		});
	}

	// Add multiple news_annotation_map records, and returns the new objects;
	async addMultiple(
		newsAnnotationMapRecords: iNewsAnnotationMapModel[]
	): Promise<iNewsAnnotationMapModel[]> {
		return this.db.tx("add-multiple-news-annotation-map", async (t) => {
			const queries = newsAnnotationMapRecords.map((record) => {
				return t.none(sql.add, record);
			});

			return t.batch(queries);
		});
	}
}
