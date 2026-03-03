export enum ExerciseType {
  PRONUNCIATION = "Pronunciation",
  STRESS = "Stress",
  MULTIPLE_CHOICE = "Multiple Choice",
  WORD_FORM = "Word Form",
  SENTENCE_REWRITING = "Sentence Rewriting",
  READING = "Reading Comprehension",
}

export interface Question {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  category: string;
}

export interface ExerciseSet {
  id: string;
  title: string;
  questions: Question[];
}
