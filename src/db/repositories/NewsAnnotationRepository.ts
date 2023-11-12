import {IDatabase, IMain} from "pg-promise";

// import {iAnnotationModel} from "db/models/annotations.model"; -- to be uncommented with correct model

// import {annotations as sql} from "@db/sql"; -- to be uncommented with correct sql

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
	 * Creates the news annotations table.
	 *
	 * @returns null
	 */
	// async create(): Promise<null> {  -- uncomment with correct sql
	// return this.db.none(sql.create);
	// }

	// Annotates news;
	async annotate(): Promise<void> {
		this.db.any("SELECT * FROM annotations");
	}
}
