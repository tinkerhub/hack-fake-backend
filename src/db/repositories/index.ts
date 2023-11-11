import pgPromise from "pg-promise";

import UsersRepository from "./UsersRepository";
import EmailLogsRepository from "./EmailLogsRepository";
import ResetPasswordRepository from "./ResetPasswordRepository";
import EmailVerificationRequestLogsRepository from "./EmailVerificationRequestLogsRepository";
import AnnotationsRepository from "./AnnotationsRepository";

/**
 * Database Interface Extensions:
 */
interface iDBInterfaceExtensions {
	users: UsersRepository;
	emailLogs: EmailLogsRepository;
	resetPasswordLogs: ResetPasswordRepository;
	emailVerificationRequestLogs: EmailVerificationRequestLogsRepository;
	annotations: AnnotationsRepository;
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
};

export type {DBTaskType, NullableDBTaskType};
