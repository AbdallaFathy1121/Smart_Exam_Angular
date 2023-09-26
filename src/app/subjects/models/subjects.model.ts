export interface SubjectsModel {
    id: number,
    name: string,
    teacher: {
        id: string,
        email: string,
        name: string
    }
}