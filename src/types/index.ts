export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  title?: string;
  joinedDate?: string;
}

export interface StudentProfile extends User {
  role: 'student';
  studentId: string; // e.g. CPS-2024-042
  class: string;     // e.g. "10"
  section: string;   // e.g. "A"
  rollNo: number;
  dob: string;
  bloodGroup: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  attendanceRate: number; // e.g. 94.2
  feesDue: number;
  feesPaid: number;
  isNewlyJoined?: boolean;
  password?: string;
}

export interface TeacherProfile extends User {
  role: 'teacher';
  employeeId: string; // e.g. CPS-T-108
  department: string;
  qualifications: string;
  assignedClasses: { class: string; section: string; subject: string }[];
  isClassTeacherOf?: { class: string; section: string };
  leaveBalance: { casual: number; medical: number; duty: number };
  isNewlyJoined?: boolean;
  password?: string;
}

export interface AdminProfile extends User {
  role: 'admin';
  adminId: string;
  designation: string;
  permissions: string[];
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  class: string;
  section: string;
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late';
  markedByTeacherId: string;
  remark?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  section: string;
  teacherId: string;
  teacherName: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  maxMarks: number;
  attachmentName?: string;
  attachmentUrl?: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  content: string;
  attachmentName?: string;
  status: 'submitted' | 'reviewed';
  score?: number;
  feedback?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface ExamRecord {
  id: string;
  examName: string; // e.g. "Term 1 Mid-Year Examination"
  class: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'published';
  subjects: {
    subject: string;
    date: string;
    time: string;
    room: string;
    maxMarks: number;
  }[];
}

export interface SubjectMark {
  id: string;
  studentId: string;
  class: string;
  section: string;
  subject: string;
  examName: string;
  internalMarks: number; // out of 20
  testMarks: number;     // out of 30
  examMarks: number;     // out of 50
  total: number;         // out of 100
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  teacherRemarks?: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number; // 1 to 7
  time: string;   // "09:00 - 09:45"
  class: string;
  section: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  room: string;
}

export interface LearningMaterial {
  id: string;
  title: string;
  category: 'Textbooks' | 'Lecture Notes' | 'Syllabus' | 'Recorded Lessons' | 'Question Papers' | 'Revision Materials';
  subject: string;
  class: string;
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'VIDEO' | 'PPT';
  description: string;
  downloadUrl?: string;
  downloadCount: number;
  isFavorite?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Academic' | 'Events' | 'Urgent' | 'General' | 'Holidays';
  targetAudience: 'all' | 'students' | 'teachers' | 'class-10';
  publishedBy: string;
  publishedRole: string;
  date: string;
  isPinned?: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string; // or 'all' or role
  targetRole?: UserRole | 'all';
  title: string;
  message: string;
  timestamp: string;
  type: 'assignment' | 'attendance' | 'exam' | 'fee' | 'leave' | 'general';
  read: boolean;
  actionUrl?: string;
}

export interface LeaveRequest {
  id: string;
  teacherId: string;
  teacherName: string;
  department: string;
  leaveType: 'Casual' | 'Medical' | 'On-Duty';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  adminRemark?: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  term: 'Term 1' | 'Term 2' | 'Term 3' | 'Annual';
  amountDue: number;
  amountPaid: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  receiptNo?: string;
  paymentMethod?: 'UPI / NetBanking' | 'Card' | 'Bank Cheque' | 'Cash';
}

export interface AdmissionApplication {
  id: string;
  applicantName: string;
  appliedClass: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  previousSchool: string;
  submissionDate: string;
  status: 'new' | 'under_review' | 'approved' | 'rejected' | 'enrolled';
  notes?: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: 'Sports' | 'Cultural' | 'Academic' | 'Celebration';
  description: string;
  image?: string;
}

export interface LessonPlan {
  id: string;
  teacherId: string;
  class: string;
  subject: string;
  unit: string;
  topic: string;
  date: string;
  learningObjectives: string;
  activities: string;
  homework: string;
  syllabusProgress: number; // percentage
  status: 'planned' | 'in_progress' | 'completed';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string; // or class groupId
  content: string;
  timestamp: string;
  subject?: string;
}
