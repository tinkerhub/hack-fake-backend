import {IDatabase, IMain} from "pg-promise";

import {iAnnotationModel} from "db/models/annotations.model";

import {annotations as sql} from "@db/sql";

/*
 This repository mixes hard-coded and dynamic SQL, just to show how to use both.
*/
export default class AnnotationsRepository {
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
	async all(): Promise<iAnnotationModel[]> {
		return this.db.any("SELECT * FROM annotations");
	}

	// Returns a single annotation by id;
	async findById(id: string): Promise<iAnnotationModel | null> {
		return this.db.oneOrNone("SELECT * FROM annotations WHERE id = $1", id);
	}

	// Returns multiple annotations by ids;
	async findByIds(ids: string[]): Promise<iAnnotationModel[]> {
		return this.db.any("SELECT * FROM annotations WHERE id IN ($1:csv)", [ids]);
	}
}
