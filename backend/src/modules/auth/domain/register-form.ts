import {Gender} from "../../user/domain/gender";

export class RegisterForm {
    firstName: string;

    lastName: string;

    email: string;

    password: string;

    gender?: Gender;

    birthday?: string;

    phoneNumber?: string;

}
