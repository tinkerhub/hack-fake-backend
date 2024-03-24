import {IDatabase, IMain} from "pg-promise";

import {iNewsModel} from "db/models/news.model";

import {news as sql} from "@db/sql";

/*
 This repository mixes hard-coded and dynamic SQL, just to show how to use both.
*/
export default class NewsRepository {
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
	 * Creates the annotations table.
	 *
	 * @returns null
	 */
	async create(): Promise<null> {
		return this.db.none(sql.create);
	}

	// Returns all annotations records;
	async all(): Promise<iNewsModel[]> {
		return this.db.any("SELECT * FROM news");
	}

	// Finds a news record by its ID;
	async findById(id: string): Promise<iNewsModel | null> {
		return this.db.oneOrNone("SELECT * FROM news WHERE id = $1", id);
	}

	// Adds a new news record, and returns the new object;
	async add(
		id: string,
		publishedDate: string,
		url: string,
		title: string,
		content: string
	): Promise<iNewsModel> {
		return this.db.one(sql.add, {
			id,
			publishedDate,
			url,
			title,
			content,
		});
	}
}
