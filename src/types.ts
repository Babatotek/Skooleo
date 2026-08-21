export type UserRole =
  | 'landing'
  | 'school_admin'
  | 'teacher'
  | 'principal'
  | 'super_admin'
  | 'parent'
  | 'student';

export interface UserProfile {
  id: string;
  name: string;
  roleTitle: string;
  role: UserRole;
  avatar: string;
  schoolName: string;
  schoolCode: string;
  email?: string;
  unreadNotifications?: number;
}

export type StudentStatus =
  | 'Active'
  | 'Applicant'
  | 'Suspended'
  | 'Withdrawn'
  | 'Transferred'
  | 'Graduated'
  | 'Alumni'
  | 'Archived';

export interface StudentRecord {
  id: string;
  admissionNo: string;
  name: string;
  firstName: string;
  lastName: string;
  photo: string;
  class: string;
  classArm: string;
  gender: 'Male' | 'Female';
  status: StudentStatus;
  dob: string;
  stateOfOrigin: string;
  nationality: string;
  admissionDate: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelationship: string;
  currentAverage: number;
  attendanceRate: number;
  feesStatus: 'Paid' | 'Partial' | 'Overdue';
  outstandingFees: number;
  trend: 'improving' | 'steady' | 'declining';
  trendPercent: number;
}

export interface ClassScheduleItem {
  id: string;
  time: string;
  class: string;
  subject: string;
  room: string;
  status: 'Upcoming' | 'In Progress' | 'Completed';
  attendanceTaken: boolean;
}

export interface ClassPerformanceItem {
  id: string;
  class: string;
  averageScore: number;
  trend: number;
  sparkline: number[];
}

export interface StudentAttentionItem {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  class: string;
  type: 'attendance' | 'low_score' | 'missing_assignment' | 'declining_performance' | 'fees';
  tag: string;
  detail: string;
  severity: 'high' | 'medium' | 'low';
}

export type NotificationCategory = 'alert' | 'payment' | 'student_update' | 'system';
export type NotificationPriority = 'urgent' | 'high' | 'normal' | 'info';

export interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  subtitle?: string;
  category?: NotificationCategory;
  priority?: NotificationPriority;
  timestamp?: string;
  timeAgo: string;
  isRead?: boolean;
  read?: boolean;
  iconType?: 'assignment' | 'result' | 'parent' | 'meeting' | 'payment' | 'curriculum' | 'alert' | 'student' | string;
  actionLabel?: string;
  actionType?: string;
  targetId?: string;
  metadata?: {
    amount?: number;
    studentName?: string;
    studentClass?: string;
    admissionNo?: string;
    sender?: string;
    badgeText?: string;
  };
}

export interface SchoolRegistrationItem {
  id: string;
  name: string;
  location: string;
  plan: 'Starter' | 'Basic' | 'Standard' | 'Growth' | 'Premium' | 'Enterprise';
  status: 'Active' | 'Trial' | 'Pending';
  created: string;
  studentsCount: number;
}

export interface LessonPlan {
  title: string;
  subject: string;
  className: string;
  duration: string;
  curriculumReference: string;
  learningObjectives: string[];
  previousKnowledge: string;
  instructionalMaterials: string[];
  steps: {
    stepNumber: number;
    title: string;
    duration: string;
    teacherActivity: string;
    studentActivity: string;
    keyPoints: string;
  }[];
  evaluationQuestions: string[];
  homework: string;
  teacherRemarks: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SmartMarkScanResult {
  assessmentId: string;
  detectedStudentId: string;
  studentName: string;
  classArm: string;
  subject: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  status: 'Auto Marked' | 'Review Required';
  flaggedExceptions: number;
  responses: Record<number, {
    selected: string;
    confidence: number;
    isUncertain: boolean;
    correct: string;
  }>;
  scannedAt: string;
}

export interface TerminalReportCard {
  student: StudentRecord;
  school: {
    name: string;
    address: string;
    motto: string;
    logo: string;
    contact: string;
  };
  session: string;
  term: string;
  classAverage: number;
  position: string;
  totalSubjects: number;
  subjects: {
    name: string;
    ca1: number; // /10
    ca2: number; // /10
    assignment: number; // /10
    project: number; // /10
    exam: number; // /60
    total: number; // /100
    grade: string;
    remark: string;
    classAverage: number;
  }[];
  behavioral: {
    punctuality: number; // 1-5
    attentiveness: number;
    neatness: number;
    politeness: number;
    honesty: number;
    leadership: number;
  };
  attendance: {
    daysPresent: number;
    daysSchoolOpened: number;
    daysLate: number;
    daysAbsent: number;
  };
  classTeacherRemarks: string;
  principalRemarks: string;
  nextTermBegins: string;
}

export type ResourceType =
  | 'document'
  | 'presentation'
  | 'worksheet'
  | 'past_question'
  | 'scheme_of_work'
  | 'link'
  | 'video'
  | 'audio';

export type ResourceFolderCategory =
  | 'Syllabus'
  | 'Assignments'
  | 'Exams'
  | 'Lecture Notes'
  | 'Lab & Practicals'
  | 'General'
  | string;

export interface MLClassificationResult {
  predictedCategory: ResourceFolderCategory;
  confidence: number; // 0 - 100
  reasoning: string;
  keyFeatures: string[]; // trigger terms/keywords extracted
  secondaryPredictions: { category: ResourceFolderCategory; probability: number }[];
  suggestedTags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readingTimeMinutes?: number;
  classifiedAt: string;
  modelType: 'ML-Bayes-NLP' | 'Gemini-3.7-Flash' | 'Hybrid-Ensemble';
}

export interface ResourceFolderInfo {
  id: string;
  name: ResourceFolderCategory;
  description: string;
  color: string;
  iconName: string;
  isSystem: boolean;
}

export interface OcrPageResult {
  pageNumber: number;
  text: string;
  confidence: number;
  wordCount: number;
  highlightSnippets?: string[];
}

export interface ResourceAISummary {
  briefSummary: string;
  keyTakeaways: string[];
  coreConcepts: string[];
  studentActionableTip: string;
  readingLevel: string;
  estimatedReadTime: string;
  targetExam?: string;
  generatedAt: string;
  model: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  subject: string;
  classLevels: string[];
  term: string;
  resourceType: ResourceType;
  fileFormat: string;
  fileSize?: string;
  url?: string;
  externalLink?: string;
  tags: string[];
  author: string;
  authorRole: string;
  authorAvatar?: string;
  uploadedAt: string;
  downloadCount: number;
  viewCount: number;
  isPinned?: boolean;
  isSharedWithStudents: boolean;
  isSharedWithParents: boolean;
  curriculumStandard?: string;
  contentPreview?: string;
  weekNumber?: number;
  // AI Summary for student quick preview
  aiSummary?: ResourceAISummary;
  // Folder & ML Categorization properties
  folderCategory?: ResourceFolderCategory;
  mlClassification?: MLClassificationResult;
  // OCR searchable properties
  ocrText?: string;
  ocrPages?: OcrPageResult[];
  ocrStatus?: 'ready' | 'processing' | 'failed' | 'none';
  ocrLanguage?: string;
  ocrConfidence?: number;
}
