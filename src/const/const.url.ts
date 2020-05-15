export class UrlConstants {
    // private BASE_URL = "http://ec2-13-233-55-91.ap-south-1.compute.amazonaws.com:3000/";
    // public IMAGE_BASE_URL = "http://ec2-13-232-146-55.ap-south-1.compute.amazonaws.com/queImages/";

    //localIP
    // public IMAGE_BASE_URL = "http://192.168.31.106:3001/queImages/"
    private BASE_URL = "https://prep-ease.herokuapp.com/";
    private BASE_URL_NEW = "https://prep-ease.herokuapp.com/api/v1/";
    // private BASE_URL = "http://192.168.31.106:3000/";
    // private BASE_URL_NEW = "http://192.168.31.106:3000/api/v1/";

    public ALL_INSTITUTES = this.BASE_URL + "registrationData/getAllInstitutes";
    public ALL_CLASSES = this.BASE_URL + "registrationData/getAllClasses";
    public ALL_SUBJECT = this.BASE_URL + "registrationData/getAllSubjects";
    public ALL_QUALIFICATIONS = this.BASE_URL + "registrationData/getAllQualifications";
    public USER_AUTHENTICATION = this.BASE_URL + "users/authenticate";
    public STUDENT_REGISTRATION = this.BASE_URL + "users/registerStudent";
    public TEACHER_REGISTRATION = this.BASE_URL + "users/registerTeacher";
    public CREATE_TEST_PAPER = this.BASE_URL + "testRoute/addSingleTest";
    public UPLOAD_IMAGE = this.BASE_URL + "upload/image";
    public GET_All_TEST_STUDENTS = this.BASE_URL + "student/getAllTests";
    public START_TEST = this.BASE_URL + "student/getSingleTestQuestions";
    public SUBMIT_TEST = this.BASE_URL + "student/submitTest";
    public GET_TEACHER_MYTESTS = this.BASE_URL + "teacher/getMyTestForTeacher";
    public GET_PUBLIC_TESTS_STUDENTS = this.BASE_URL + "student/getAllPublicTests";
    public GET_RESULT_FOR_STUDENTS = this.BASE_URL + "student/getPastResults";
    public GET_RESULT_FOR_TEACHER = this.BASE_URL + "teacher/getResultOfIndividualTest";
    public ADD_VIDEO = this.BASE_URL_NEW + "videos";
    public UPLOAD_VIDEO = this.BASE_URL_NEW + "videos/video-upload";
    public GET_TEACHER_MYVIDEOS = this.BASE_URL_NEW + "videos/teacher";
    public GET_STUDENT_MYVIDEOS = this.BASE_URL_NEW + "videos";
    public CREATE_SUBJECTIVE_TEST = this.BASE_URL_NEW + "subjectiveTest/createTest";
    public GET_SUBJECTIVE_TEST_FOR_TEACHER = this.BASE_URL_NEW + "subjectiveTest/getMySubjectiveTestTeacher";
    public GET_SUBJECTIVE_TEST_FOR_STUDENT = this.BASE_URL_NEW + "subjectiveTest/getMySubjectiveTestStudent";

    public GET_SUBJECT_UNIT = this.BASE_URL + "teacher/getUnitForTestCreation";
    public CREATE_OBJ_TEST = this.BASE_URL + "teacher/createTestFromBulk";
}