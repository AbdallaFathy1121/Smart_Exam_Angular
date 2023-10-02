import { StudentDegree } from "./student-degree.model";

export interface StudentDegreesResponse {
    isSuccess: boolean,
    messages: [],
    data: StudentDegree[]
}