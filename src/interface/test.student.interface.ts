import * as LoginInterface from "../interface/login.signup.interface";

export interface ITestListDetail {
    success: boolean,
    TestList: ITestList[]
}

export interface ITestList {
    _id: string,
    testTitle: string,
    startDate: string,
    endDate: string,
    startTime?: string,
    duration?: number,
    public: boolean,
    description: string,
    subjectName: string,
    subjectImage: string,
    activeTest?: boolean
}

// export interface IObjTestList {
//     _id: string,
//     testTitle: string,
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     duration: number,
//     public: boolean,
//     description: string,
//     subjectName: string,
//     subjectImage: string,
//     activeTest: boolean,
// }

//start test
export interface IQuestionPaperDetail {
    success: boolean,
    msg: string,
    testTitle: string,
    duration: number,
    questionsList: IQuestionPaper[]
}

export interface IQuestionPaper {
    question_id: string;
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    selectedOption?: string,
    image: string
}

export interface ISavedAnswer {
    question_id: string,
    answer: string
}
export interface ISubmitAnswer {
    test_id: string;
    student_id: string;
    answersList: ISavedAnswer[];
}

export interface ITestResult {
    success: boolean,
    result: IResult
}
export interface IResult {
    _id: string,
    testId: string,
    totalAttempted: number,
    totalCorrect: number,
    totalQuestions: number
}


export interface IStudentResultResponse {
    success: boolean,
    msg: string,
    pastResults: IStudentPastResult[]
}

export interface IStudentPastResult {
    testId?: string,
    title: string,
    correct: number,
    total: number,
    timeOfTest: string
}
//get Video
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
    createdBy: ICreatorDetail,
    subjectId: LoginInterface.ISubjects,
    classId: LoginInterface.IClasses,
    instituteId: LoginInterface.IInstitutes,
    createdAt: string,
    __v: number
}

export interface ICreatorDetail {
    _id: string,
    name: string
}

//Subjective

export interface IGetSubjectivePaper{
        success: boolean,
        TestList: ISubjectiveTestList[]
}

export interface ISubjectiveTestList{
    _id: string,
    testTitle: string,
    startDate: string,
    endDate: string,
    startTime?: string,
    duration?: number,
    public: boolean,
    description: string,
    subjectName: string,
    subjectImage: string,
    activeTest?: boolean
}

