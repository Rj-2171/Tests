import * as LoginInterface from "../interface/login.signup.interface";
//Test creation for teacher

//old objective paper creation
// export interface ITestPaperDetail {
//     questions: IQuestionDetail[],
//     testTitle: string | undefined,
//     public: boolean,
//     startDate: string,
//     endDate: string,
//     description: string,
//     class_id: string,
//     subject_id: string,
//     institute_id: string,
//     teacher_id: string
// }
// export interface IQuestionDetail {
//     question: string,
//     option1: string,
//     option2: string,
//     option3: string,
//     option4: string,
//     answer: string,
//     image: string
// }
export interface ITestPaperDetail {
    questionsUrl: string,
    testTitle: string,
    public: boolean,
    startDate: string,
    endDate: string,
    duration: number,
    description: string,
    class_id: string,
    subject_id: string,
    institute_id: string,
    teacher_id: string,
    unitDistribution: IUnitWiseQuestion[]
    startTime: string,
    totalMarks: number
}

export interface IUnitWiseQuestion{
        unit: string,
        noOfQuestion: number
}
export interface ISubjectWiseUnit{
    success: boolean,
    msg: string,
    unitList: IUnit[]      
}
export interface IUnit{
    unitName: string
}

//image response
export interface IImageUploadResponse {
    success: boolean,
    msg: string,
    fileName: string
}
export interface IMyTestListResponse {
    success: string,
    msg: string,
    testList: IMyTestList[]
}
export interface IMyTestList {
    _id: string,
    testTitle: string,
    startDate: string,
    endDate: string,
    public: boolean,
    description: string,
    subjectName: string,
    subject_id: {
        _id: string,
        subjectName?: string
        isDeleted?: boolean,
        subjectImage?: string
    },
    institute_id: {
        _id: string,
        instituteName?: string
    },
    class_id: {
        _id: string,
        className?: string
    },

}

export interface ITestPaperSubmissionResponse {
    success: boolean,
    msg: string
}

export interface ITeacherResultResponse {
    success: boolean,
    data: {
        _id: string,
        testId: {
            _id: string,
            testTitle: string
        },
        testAttempted: ITestAttempted[]
    }
}



export interface ITestAttempted {
    _id: string,
    userId: {
        _id: string,
        name: string,
        registrationId: string
    },
    totalAttempted: number,
    totalCorrect: number,
    totalQuestions: number,
    testGivenAt: string
}


//add video

export interface IAddVideo {
    videoTitle: string,
    videoDesc: string,
    videoLink: string,
    createdBy: string,
    subjectId: string,
    classId: string,
    instituteId: string,
}
export interface IVideoSubmissionResponse {
    success: boolean,
    msg: string
}
export interface IVideoUploadResponse {
    success: boolean,
    msg: string,
    videoLink: string
}

export interface IMyVideoResponse {
    success: true,
    count: number,
    data: IVideoList[]
}

export interface IVideoList {
    isLive: boolean,
    isDeleted: boolean,
    _id: string,
    videoTitle: string,
    videoDesc: string,
    videoLink: string,
    createdBy: string,
    subjectId: LoginInterface.ISubjects,
    classId: LoginInterface.IClasses,
    instituteId: LoginInterface.IInstitutes,
    createdAt: string,
    __v: number
}

//subjective test paper detail

export interface ISubjectiveTestPaperDetail {
    questionPaperUrl: string,
    testTitle: string,
    public: boolean,
    startDate: string,
    endDate: string,
    startTime: string,
    duration: number,
    description: string,
    class_id: string,
    subject_id: string,
    institute_id: string,
    teacher_id: string,
    totalMarks: number
}

export interface ISubmissionResponse {
    success: boolean,
    msg: string
}

export interface IGetSubjectiveTest {
    success: boolean,
    msg: string,
    testListSubjective: ISubjectiveTestDetail[]
}

export interface ISubjectiveTestDetail {
    _id: string,
    questionPaperUrl: string,
    testTitle: string,
    public: boolean,
    startDate: string,
    endDate: string,
    startTime: string,
    duration: number,
    description: string,
    class_id: {
        _id: string,
        className?: string
    },
    subject_id: {
        _id: string,
        subjectName?: string
        subjectImage?: string
    },
    institute_id: {
        _id: string,
        instituteName?: string
    },
    teacher_id: string,
    totalMarks: number,
    __v: number
}
