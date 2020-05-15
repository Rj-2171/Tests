export interface ILoginResponse {
    success: boolean,
    msg: string,
    token: string,
    refreshToken: string,
    user: IUser
}

export interface IUser {
    _id: string,
    name: string,
    email: string,
    userType: string,
    phoneNo: string,
    dob: string,
    gender: string,
    parentsName: string,
    parentsEmail: string,
    parentsPhNo: string,
    parentsQual: string,
    stuClass: IClasses,
    stuInstitute: IInstitutes,
    medium: string
}

export class ITokens {
    jwt: string;
    refreshToken: string;
}

//get all insitute
export interface IGetAllInstitutes {
    success: boolean,
    Institutes: IInstitutes[]
};
export interface IInstitutes {
    _id: string,
    instituteName: string,
    instituteCity: string,
    instituteState: string
};
export interface IGetAllClasses {
    success: boolean,
    Classes: IClasses[]
};
export interface IClasses {
    _id: string,
    className: string
};
export interface IGetAllSubjects {
    success: boolean,
    Subjects: ISubjects[]
};
export interface ISubjects {
    _id: string,
    subjectName: string
}

export interface IAllQualification {
    success: boolean,
    Classes: ITQualification[]
}
//Registration for student
export interface IStudentDetail {
    _id?: string,
    name: string,
    email: string,
    userType: string,
    password: string,
    phoneNo: string,
    dob: string,
    gender: string,
    parentsName: string,
    parentsEmail: string,
    parentsPhNo: string,
    parentsQual: string,
    stuClass_id: string,
    stuInstitute_id: string,
    medium: string
}

export interface IRegistrationResponse {
    success: boolean,
    msg: string
}

export interface ITeacherDetail {
    name: string,
    email: string,
    userType: string,
    password: string,
    phoneNo: string,
    dob: string,
    gender: string,
    qualification_id: string,
    institute_id: string,
    yearOfExp: string
}

export interface IQualification {
    _id: string,
    qualification_name: string
}
export interface ITQualification {
    _id: string,
    qualification: string
}
