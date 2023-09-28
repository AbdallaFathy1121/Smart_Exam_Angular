import { SubjectsModel } from "./subjects.model"

export interface SubjectResponse {
    isSuccess: boolean,
    messages: [],
    data: SubjectsModel
}