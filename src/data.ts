import { ExerciseType, Question } from "./types";

export const EXERCISES: Question[] = [
  // PRONUNCIATION (1-15)
  {
    id: "p1",
    type: ExerciseType.PRONUNCIATION,
    question: "Choose the word whose underlined part is pronounced differently: A. liked B. washed C. missed D. played",
    options: ["liked", "washed", "missed", "played"],
    correctAnswer: "played",
    explanation: "liked, washed, missed are pronounced /t/. played is pronounced /d/.",
    category: "Pronunciation"
  },
  {
    id: "p2",
    type: ExerciseType.PRONUNCIATION,
    question: "Choose the word whose underlined part is pronounced differently: A. city B. cat C. center D. cycle",
    options: ["city", "cat", "center", "cycle"],
    correctAnswer: "cat",
    explanation: "city, center, cycle are pronounced /s/. cat is pronounced /k/.",
    category: "Pronunciation"
  },
  {
    id: "p3",
    type: ExerciseType.PRONUNCIATION,
    question: "Choose the word whose underlined part is pronounced differently: A. books B. cats C. dogs D. maps",
    options: ["books", "cats", "dogs", "maps"],
    correctAnswer: "dogs",
    explanation: "books, cats, maps end with /s/. dogs ends with /z/.",
    category: "Pronunciation"
  },
  {
    id: "p4",
    type: ExerciseType.PRONUNCIATION,
    question: "Choose the word whose underlined part is pronounced differently: A. head B. meat C. bread D. heavy",
    options: ["head", "meat", "bread", "heavy"],
    correctAnswer: "meat",
    explanation: "head, bread, heavy are pronounced /e/. meat is pronounced /i:/.",
    category: "Pronunciation"
  },
  {
    id: "p5",
    type: ExerciseType.PRONUNCIATION,
    question: "Choose the word whose underlined part is pronounced differently: A. sugar B. sea C. sun D. soft",
    options: ["sugar", "sea", "sun", "soft"],
    correctAnswer: "sugar",
    explanation: "sea, sun, soft are pronounced /s/. sugar is pronounced /ʃ/.",
    category: "Pronunciation"
  },
  {
    id: "p6",
    type: ExerciseType.PRONUNCIATION,
    question: "Choose the word whose underlined part is pronounced differently: A. school B. chair C. church D. children",
    options: ["school", "chair", "church", "children"],
    correctAnswer: "school",
    explanation: "chair, church, children are pronounced /tʃ/. school is pronounced /k/.",
    category: "Pronunciation"
  },
  {
    id: "p7",
    type: ExerciseType.PRONUNCIATION,
    question: "Choose the word whose underlined part is pronounced differently: A. thank B. they C. thin D. thought",
    options: ["thank", "they", "thin", "thought"],
    correctAnswer: "they",
    explanation: "thank, thin, thought are pronounced /θ/. they is pronounced /ð/.",
    category: "Pronunciation"
  },

  // STRESS (16-30)
  {
    id: "s1",
    type: ExerciseType.STRESS,
    question: "Choose the word that has a different stress pattern: A. teacher B. student C. advice D. table",
    options: ["teacher", "student", "advice", "table"],
    correctAnswer: "advice",
    explanation: "teacher, student, table have stress on the 1st syllable. advice has stress on the 2nd syllable.",
    category: "Stress"
  },
  {
    id: "s2",
    type: ExerciseType.STRESS,
    question: "Choose the word that has a different stress pattern: A. beautiful B. dangerous C. important D. difficult",
    options: ["beautiful", "dangerous", "important", "difficult"],
    correctAnswer: "important",
    explanation: "beautiful, dangerous, difficult have stress on the 1st syllable. important has stress on the 2nd syllable.",
    category: "Stress"
  },
  {
    id: "s3",
    type: ExerciseType.STRESS,
    question: "Choose the word that has a different stress pattern: A. enjoy B. visit C. listen D. happen",
    options: ["enjoy", "visit", "listen", "happen"],
    correctAnswer: "enjoy",
    explanation: "visit, listen, happen have stress on the 1st syllable. enjoy has stress on the 2nd syllable.",
    category: "Stress"
  },
  {
    id: "s4",
    type: ExerciseType.STRESS,
    question: "Choose the word that has a different stress pattern: A. computer B. banana C. library D. umbrella",
    options: ["computer", "banana", "library", "umbrella"],
    correctAnswer: "library",
    explanation: "computer, banana, umbrella have stress on the 2nd syllable. library has stress on the 1st syllable.",
    category: "Stress"
  },

  // MULTIPLE CHOICE (31-60)
  {
    id: "mc1",
    type: ExerciseType.MULTIPLE_CHOICE,
    question: "If I ______ you, I would study harder.",
    options: ["am", "was", "were", "be"],
    correctAnswer: "were",
    explanation: "Conditional sentence type 2: If + S + V2/ed (were for all subjects), S + would + V-inf.",
    category: "Grammar"
  },
  {
    id: "mc2",
    type: ExerciseType.MULTIPLE_CHOICE,
    question: "She has been living here ______ 2010.",
    options: ["for", "since", "in", "during"],
    correctAnswer: "since",
    explanation: "Present perfect continuous with a point in time: since + year.",
    category: "Grammar"
  },
  {
    id: "mc3",
    type: ExerciseType.MULTIPLE_CHOICE,
    question: "The man ______ is standing there is my uncle.",
    options: ["who", "whom", "which", "whose"],
    correctAnswer: "who",
    explanation: "Relative pronoun 'who' replaces a person as a subject.",
    category: "Grammar"
  },
  {
    id: "mc4",
    type: ExerciseType.MULTIPLE_CHOICE,
    question: "I suggest ______ to the cinema tonight.",
    options: ["go", "to go", "going", "goes"],
    correctAnswer: "going",
    explanation: "Suggest + V-ing.",
    category: "Grammar"
  },
  {
    id: "mc5",
    type: ExerciseType.MULTIPLE_CHOICE,
    question: "He is very good ______ playing football.",
    options: ["at", "in", "on", "for"],
    correctAnswer: "at",
    explanation: "Be good at + V-ing.",
    category: "Grammar"
  },
  {
    id: "mc6",
    type: ExerciseType.MULTIPLE_CHOICE,
    question: "We ______ English for five years.",
    options: ["learn", "learned", "have learned", "are learning"],
    correctAnswer: "have learned",
    explanation: "Present perfect tense for an action that started in the past and continues to the present.",
    category: "Grammar"
  },

  // WORD FORM (61-80)
  {
    id: "wf1",
    type: ExerciseType.WORD_FORM,
    question: "The children are playing ______ in the garden. (HAPPY)",
    correctAnswer: "happily",
    explanation: "Adverb is needed to modify the verb 'playing'.",
    category: "Vocabulary"
  },
  {
    id: "wf2",
    type: ExerciseType.WORD_FORM,
    question: "We need to ______ the environment. (PROTECTION)",
    correctAnswer: "protect",
    explanation: "Verb is needed after 'need to'.",
    category: "Vocabulary"
  },
  {
    id: "wf3",
    type: ExerciseType.WORD_FORM,
    question: "He is a very ______ driver. (CARE)",
    correctAnswer: "careful",
    explanation: "Adjective is needed to modify the noun 'driver'.",
    category: "Vocabulary"
  },
  {
    id: "wf4",
    type: ExerciseType.WORD_FORM,
    question: "The ______ of the experiment was unexpected. (SUCCEED)",
    correctAnswer: "success",
    explanation: "Noun is needed as the subject of the sentence.",
    category: "Vocabulary"
  },
  {
    id: "wf5",
    type: ExerciseType.WORD_FORM,
    question: "She is ______ in learning English. (INTEREST)",
    correctAnswer: "interested",
    explanation: "Adjective (ed) is used to describe feelings.",
    category: "Vocabulary"
  },

  // SENTENCE REWRITING (81-100)
  {
    id: "sr1",
    type: ExerciseType.SENTENCE_REWRITING,
    question: "They built this house in 1990. -> This house...",
    correctAnswer: "This house was built in 1990.",
    explanation: "Passive voice: S + was/were + V3/ed.",
    category: "Writing"
  },
  {
    id: "sr2",
    type: ExerciseType.SENTENCE_REWRITING,
    question: "\"I am a student,\" said Nam. -> Nam said that...",
    correctAnswer: "Nam said that he was a student.",
    explanation: "Reported speech: change tense (am -> was) and pronoun (I -> he).",
    category: "Writing"
  },
  {
    id: "sr3",
    type: ExerciseType.SENTENCE_REWRITING,
    question: "It's a pity I can't swim. -> I wish...",
    correctAnswer: "I wish I could swim.",
    explanation: "Wish sentence in the present: S + wish + S + V2/ed (could + V-inf).",
    category: "Writing"
  },
  {
    id: "sr4",
    type: ExerciseType.SENTENCE_REWRITING,
    question: "Because it rained heavily, we stayed at home. -> Because of...",
    correctAnswer: "Because of the heavy rain, we stayed at home.",
    explanation: "Because of + Noun/V-ing.",
    category: "Writing"
  },
  {
    id: "sr5",
    type: ExerciseType.SENTENCE_REWRITING,
    question: "He is too young to drive a car. -> He isn't...",
    correctAnswer: "He isn't old enough to drive a car.",
    explanation: "Too + adj + to V -> Not + adj (opposite) + enough + to V.",
    category: "Writing"
  },
  {
    id: "sr6",
    type: ExerciseType.SENTENCE_REWRITING,
    question: "The last time I saw her was 2 years ago. -> I haven't...",
    correctAnswer: "I haven't seen her for 2 years.",
    explanation: "The last time... was... ago -> S + haven't/hasn't + V3/ed + for...",
    category: "Writing"
  }
];

// I will add more questions to reach 100 in the final implementation or use Gemini to fill the gaps.
// For now, these serve as a template.
