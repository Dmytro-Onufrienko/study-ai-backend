export interface ITopicResponse {
  name: string;
  subtopics: string[]
}

export interface ICourseResponse {
  topics: ITopicResponse[]
}