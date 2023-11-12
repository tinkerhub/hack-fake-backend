import pgPromise from "pg-promise";

import UsersRepository from "./UsersRepository";
import EmailLogsRepository from "./EmailLogsRepository";
import ResetPasswordRepository from "./ResetPasswordRepository";
import EmailVerificationRequestLogsRepository from "./EmailVerificationRequestLogsRepository";
import AnnotationsRepository from "./AnnotationsRepository";
import NewsRepository from "./NewsRepository";

/**
 * Database Interface Extensions:
 */
interface iDBInterfaceExtensions {
	users: UsersRepository;
	emailLogs: EmailLogsRepository;
	resetPasswordLogs: ResetPasswordRepository;
	emailVerificationRequestLogs: EmailVerificationRequestLogsRepository;
	annotations: AnnotationsRepository;
	news: NewsRepository;
}

type DBTaskType = pgPromise.ITask<iDBInterfaceExtensions> &
	iDBInterfaceExtensions;

type NullableDBTaskType = DBTaskType | null;

export {
	iDBInterfaceExtensions,
	UsersRepository,
	EmailLogsRepository,
	ResetPasswordRepository,
	EmailVerificationRequestLogsRepository,
	AnnotationsRepository,
	NewsRepository,
};

export type {DBTaskType, NullableDBTaskType};
