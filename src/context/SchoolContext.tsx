import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  StudentProfile,
  TeacherProfile,
  AdminProfile,
  AttendanceRecord,
  Assignment,
  Submission,
  SubjectMark,
  TimetableSlot,
  LearningMaterial,
  Announcement,
  NotificationItem,
  LeaveRequest,
  FeeRecord,
  AdmissionApplication,
  SchoolEvent,
  LessonPlan,
  ChatMessage
} from '../types';
import {
  DEMO_CREDENTIALS,
  CURRENT_STUDENT,
  CURRENT_TEACHER,
  CURRENT_ADMIN,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_TIMETABLE,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_MARKS,
  INITIAL_ATTENDANCE,
  INITIAL_MATERIALS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_LEAVES,
  INITIAL_FEES,
  INITIAL_ADMISSIONS,
  INITIAL_EVENTS,
  INITIAL_LESSON_PLANS,
  INITIAL_MESSAGES
} from '../data/mockData';

interface SchoolContextType {
  currentUser: User | null;
  currentStudent: StudentProfile;
  currentTeacher: TeacherProfile;
  currentAdmin: AdminProfile;
  activeRole: UserRole | 'guest';
  isAdminSession: boolean;
  setAdminInspectionMode: (role: UserRole | null) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  login: (role: UserRole, email?: string, password?: string) => boolean;
  logout: () => void;
  switchRoleDemo: (role: UserRole) => void;
  addStudent: (newStudent: Omit<StudentProfile, 'id'>) => StudentProfile;
  addTeacher: (newTeacher: Omit<TeacherProfile, 'id'>) => TeacherProfile;

  // Data lists
  students: StudentProfile[];
  teachers: TeacherProfile[];
  timetable: TimetableSlot[];
  assignments: Assignment[];
  submissions: Submission[];
  marks: SubjectMark[];
  attendance: AttendanceRecord[];
  materials: LearningMaterial[];
  announcements: Announcement[];
  notifications: NotificationItem[];
  leaves: LeaveRequest[];
  fees: FeeRecord[];
  admissions: AdmissionApplication[];
  events: SchoolEvent[];
  lessonPlans: LessonPlan[];
  messages: ChatMessage[];

  // Interconnected Actions
  markAttendance: (records: AttendanceRecord[]) => void;
  createAssignment: (asg: Omit<Assignment, 'id' | 'assignedDate'>) => void;
  submitAssignment: (assignmentId: string, content: string, attachmentName?: string) => void;
  gradeSubmission: (submissionId: string, score: number, feedback: string) => void;
  saveMarks: (newMarkList: SubjectMark[]) => void;
  createAnnouncement: (ann: Omit<Announcement, 'id' | 'date'>) => void;
  requestLeave: (leave: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => void;
  updateLeaveStatus: (leaveId: string, status: 'approved' | 'rejected', adminRemark?: string) => void;
  payFee: (feeId: string, method?: string) => void;
  createFeeRecord: (fee: Omit<FeeRecord, 'id'>) => void;
  createAdmission: (adm: Omit<AdmissionApplication, 'id' | 'submissionDate' | 'status'>) => void;
  updateAdmissionStatus: (admId: string, status: AdmissionApplication['status']) => void;
  markNotificationRead: (notifId: string) => void;
  clearNotifications: () => void;
  sendMessage: (recipientId: string, content: string, subject?: string) => void;
  updateStudentProfile: (updates: Partial<StudentProfile>) => void;
  updateTeacherProfile: (updates: Partial<TeacherProfile>) => void;
  addTimetableSlot: (slot: Omit<TimetableSlot, 'id'>) => void;
  deleteTimetableSlot: (id: string) => void;
  addLearningMaterial: (mat: Omit<LearningMaterial, 'id' | 'uploadDate' | 'downloadCount'>) => void;
  toggleFavoriteMaterial: (id: string) => void;
  resetAllData: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

const STORAGE_KEY = 'CPS_SMARTHUB_PERSISTED_STATE_V2';

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dark mode initialization
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('cps_dark_mode');
    return saved === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('cps_dark_mode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Load or initialize state
  const loadInitialState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return null;
  };

  const savedState = loadInitialState();

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('cps_current_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null; // Start at public / login page
  });

  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(
    savedState?.currentStudent || CURRENT_STUDENT
  );
  const [currentTeacher, setCurrentTeacher] = useState<TeacherProfile>(
    savedState?.currentTeacher || CURRENT_TEACHER
  );
  const [currentAdmin, setCurrentAdmin] = useState<AdminProfile>(
    savedState?.currentAdmin || CURRENT_ADMIN
  );

  const [students, setStudents] = useState<StudentProfile[]>(
    savedState?.students || INITIAL_STUDENTS
  );
  const [teachers, setTeachers] = useState<TeacherProfile[]>(
    savedState?.teachers || INITIAL_TEACHERS
  );
  const [timetable, setTimetable] = useState<TimetableSlot[]>(
    savedState?.timetable || INITIAL_TIMETABLE
  );
  const [assignments, setAssignments] = useState<Assignment[]>(
    savedState?.assignments || INITIAL_ASSIGNMENTS
  );
  const [submissions, setSubmissions] = useState<Submission[]>(
    savedState?.submissions || INITIAL_SUBMISSIONS
  );
  const [marks, setMarks] = useState<SubjectMark[]>(
    savedState?.marks || INITIAL_MARKS
  );
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(
    savedState?.attendance || INITIAL_ATTENDANCE
  );
  const [materials, setMaterials] = useState<LearningMaterial[]>(
    savedState?.materials || INITIAL_MATERIALS
  );
  const [announcements, setAnnouncements] = useState<Announcement[]>(
    savedState?.announcements || INITIAL_ANNOUNCEMENTS
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    savedState?.notifications || INITIAL_NOTIFICATIONS
  );
  const [leaves, setLeaves] = useState<LeaveRequest[]>(
    savedState?.leaves || INITIAL_LEAVES
  );
  const [fees, setFees] = useState<FeeRecord[]>(
    savedState?.fees || INITIAL_FEES
  );
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(
    savedState?.admissions || INITIAL_ADMISSIONS
  );
  const [events, setEvents] = useState<SchoolEvent[]>(
    savedState?.events || INITIAL_EVENTS
  );
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(
    savedState?.lessonPlans || INITIAL_LESSON_PLANS
  );
  const [messages, setMessages] = useState<ChatMessage[]>(
    savedState?.messages || INITIAL_MESSAGES
  );

  // Sync to localStorage
  useEffect(() => {
    const stateToSave = {
      currentStudent,
      currentTeacher,
      currentAdmin,
      students,
      teachers,
      timetable,
      assignments,
      submissions,
      marks,
      attendance,
      materials,
      announcements,
      notifications,
      leaves,
      fees,
      admissions,
      events,
      lessonPlans,
      messages
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // ignore storage quota limit
    }
  }, [
    currentStudent,
    currentTeacher,
    currentAdmin,
    students,
    teachers,
    timetable,
    assignments,
    submissions,
    marks,
    attendance,
    materials,
    announcements,
    notifications,
    leaves,
    fees,
    admissions,
    events,
    lessonPlans,
    messages
  ]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('cps_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('cps_current_user');
    }
  }, [currentUser]);

  const [isAdminSession, setIsAdminSession] = useState<boolean>(() => {
    return localStorage.getItem('cps_is_admin_session') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('cps_is_admin_session', String(isAdminSession));
  }, [isAdminSession]);

  const setAdminInspectionMode = (role: UserRole | null) => {
    if (!isAdminSession) return;
    if (role === 'student') setCurrentUser(currentStudent);
    else if (role === 'teacher') setCurrentUser(currentTeacher);
    else setCurrentUser(currentAdmin);
  };

  // Auth
  const login = (role: UserRole, email?: string, password?: string): boolean => {
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const cleanPass = password ? password.trim() : '';

    if (role === 'admin') {
      const adminCred = DEMO_CREDENTIALS.admin;
      if (cleanEmail && cleanEmail !== adminCred.email.toLowerCase()) return false;
      if (cleanPass && cleanPass !== adminCred.password) return false;
      setCurrentUser(currentAdmin);
      setIsAdminSession(true);
      return true;
    }

    if (role === 'student') {
      setIsAdminSession(false);
      // Check default demo
      if (!cleanEmail || cleanEmail === DEMO_CREDENTIALS.student.email.toLowerCase() || cleanEmail === 'student') {
        if (cleanPass && cleanPass !== DEMO_CREDENTIALS.student.password) return false;
        setCurrentUser(currentStudent);
        return true;
      }
      // Check any enrolled student in system (including newly added)
      const matched = students.find(
        (s) =>
          s.email.toLowerCase() === cleanEmail ||
          s.studentId.toLowerCase() === cleanEmail ||
          s.id.toLowerCase() === cleanEmail
      );
      if (matched) {
        const expectedPass = matched.password || 'Student@123';
        if (cleanPass && cleanPass !== expectedPass && cleanPass !== DEMO_CREDENTIALS.student.password) {
          return false;
        }
        setCurrentUser(matched);
        return true;
      }
      return false;
    }

    if (role === 'teacher') {
      setIsAdminSession(false);
      // Check default demo
      if (!cleanEmail || cleanEmail === DEMO_CREDENTIALS.teacher.email.toLowerCase() || cleanEmail === 'teacher') {
        if (cleanPass && cleanPass !== DEMO_CREDENTIALS.teacher.password) return false;
        setCurrentUser(currentTeacher);
        return true;
      }
      // Check any enrolled teacher in system (including newly added)
      const matched = teachers.find(
        (t) =>
          t.email.toLowerCase() === cleanEmail ||
          t.employeeId.toLowerCase() === cleanEmail ||
          t.id.toLowerCase() === cleanEmail
      );
      if (matched) {
        const expectedPass = matched.password || 'Teacher@123';
        if (cleanPass && cleanPass !== expectedPass && cleanPass !== DEMO_CREDENTIALS.teacher.password) {
          return false;
        }
        setCurrentUser(matched);
        return true;
      }
      return false;
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdminSession(false);
  };

  const switchRoleDemo = (role: UserRole) => {
    if (role === 'student') setCurrentUser(currentStudent);
    else if (role === 'teacher') setCurrentUser(currentTeacher);
    else if (role === 'admin') setCurrentUser(currentAdmin);
  };

  const activeRole: UserRole | 'guest' = currentUser ? currentUser.role : 'guest';

  // Interconnected actions
  const markAttendance = (records: AttendanceRecord[]) => {
    // 1. Update attendance history
    setAttendance((prev) => {
      const datesAndStudents = new Set(records.map((r) => `${r.date}_${r.studentId}`));
      const filtered = prev.filter((r) => !datesAndStudents.has(`${r.date}_${r.studentId}`));
      return [...records, ...filtered];
    });

    // 2. Recalculate student attendance percentage
    setStudents((prev) =>
      prev.map((stu) => {
        const matching = records.find((r) => r.studentId === stu.id);
        if (!matching) return stu;
        let delta = 0;
        if (matching.status === 'present') delta = 0.5;
        else if (matching.status === 'absent') delta = -1.2;
        const newRate = Math.min(100, Math.max(70, Number((stu.attendanceRate + delta).toFixed(1))));
        return {
          ...stu,
          attendanceRate: newRate
        };
      })
    );

    // If current student was updated, keep in sync
    const currentRecord = records.find((r) => r.studentId === currentStudent.id);
    if (currentRecord) {
      const delta = currentRecord.status === 'present' ? 0.4 : -1.2;
      const newRate = Math.min(100, Math.max(70, Number((currentStudent.attendanceRate + delta).toFixed(1))));
      setCurrentStudent((prev) => ({ ...prev, attendanceRate: newRate }));

      // Add student notification
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: currentStudent.id,
        targetRole: 'student',
        title: 'Daily Attendance Recorded',
        message: `Your attendance for ${currentRecord.date} has been marked as ${currentRecord.status.toUpperCase()} by ${currentTeacher.name}.`,
        timestamp: 'Just now',
        type: 'attendance',
        read: false,
        actionUrl: '/student/dashboard'
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const createAssignment = (asg: Omit<Assignment, 'id' | 'assignedDate'>) => {
    const newAsg: Assignment = {
      ...asg,
      id: `asg-${Date.now()}`,
      assignedDate: new Date().toISOString().split('T')[0]
    };
    setAssignments((prev) => [newAsg, ...prev]);

    // Notify students of that class
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: 'student-demo-01',
      targetRole: 'student',
      title: `New Assignment: ${newAsg.subject}`,
      message: `${newAsg.title} has been assigned by ${newAsg.teacherName}. Due by ${newAsg.dueDate}.`,
      timestamp: 'Just now',
      type: 'assignment',
      read: false,
      actionUrl: '/student/assignments'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const submitAssignment = (assignmentId: string, content: string, attachmentName?: string) => {
    const student = currentStudent;
    const existingIndex = submissions.findIndex(
      (s) => s.assignmentId === assignmentId && s.studentId === student.id
    );

    const newSub: Submission = {
      id: existingIndex >= 0 ? submissions[existingIndex].id : `sub-${Date.now()}`,
      assignmentId,
      studentId: student.id,
      studentName: student.name,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      content,
      attachmentName: attachmentName || 'Project_Work_Submission.pdf',
      status: 'submitted'
    };

    if (existingIndex >= 0) {
      setSubmissions((prev) => prev.map((s, idx) => (idx === existingIndex ? newSub : s)));
    } else {
      setSubmissions((prev) => [newSub, ...prev]);
    }

    // Notify teacher
    const asg = assignments.find((a) => a.id === assignmentId);
    const teacherNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: asg?.teacherId || 'teacher-demo-01',
      targetRole: 'teacher',
      title: 'New Student Submission',
      message: `${student.name} submitted assignment '${asg?.title || 'Coursework'}' for evaluation.`,
      timestamp: 'Just now',
      type: 'assignment',
      read: false,
      actionUrl: '/teacher/assignments'
    };
    setNotifications((prev) => [teacherNotif, ...prev]);
  };

  const gradeSubmission = (submissionId: string, score: number, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) => {
        if (s.id !== submissionId) return s;
        return {
          ...s,
          score,
          feedback,
          status: 'reviewed',
          reviewedBy: currentTeacher.name,
          reviewedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
        };
      })
    );

    const sub = submissions.find((s) => s.id === submissionId);
    if (sub) {
      const asg = assignments.find((a) => a.id === sub.assignmentId);
      const studentNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: sub.studentId,
        targetRole: 'student',
        title: 'Assignment Graded & Feedback Available',
        message: `${currentTeacher.name} evaluated '${asg?.title || 'Assignment'}'. Score: ${score}/${asg?.maxMarks || 25}.`,
        timestamp: 'Just now',
        type: 'assignment',
        read: false,
        actionUrl: '/student/assignments'
      };
      setNotifications((prev) => [studentNotif, ...prev]);
    }
  };

  const saveMarks = (newMarkList: SubjectMark[]) => {
    setMarks((prev) => {
      const existingKeys = new Set(newMarkList.map((m) => `${m.studentId}_${m.subject}_${m.examName}`));
      const filtered = prev.filter((m) => !existingKeys.has(`${m.studentId}_${m.subject}_${m.examName}`));
      return [...newMarkList, ...filtered];
    });

    // Notify affected students
    const studentNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentStudent.id,
      targetRole: 'student',
      title: 'Examination Gradebook Updated',
      message: `Official marks for ${newMarkList[0]?.examName || 'Assessment'} have been updated by ${currentTeacher.name}.`,
      timestamp: 'Just now',
      type: 'exam',
      read: false,
      actionUrl: '/student/academics'
    };
    setNotifications((prev) => [studentNotif, ...prev]);
  };

  const createAnnouncement = (ann: Omit<Announcement, 'id' | 'date'>) => {
    const newAnn: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements((prev) => [newAnn, ...prev]);

    // School-wide notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: 'all',
      targetRole: 'all',
      title: `Notice: ${newAnn.title}`,
      message: newAnn.content.slice(0, 100) + '...',
      timestamp: 'Just now',
      type: 'general',
      read: false,
      actionUrl: '/student/announcements'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const requestLeave = (leave: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => {
    const newLeave: LeaveRequest = {
      ...leave,
      id: `lve-${Date.now()}`,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setLeaves((prev) => [newLeave, ...prev]);

    // Admin notification
    const adminNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: 'admin-demo-01',
      targetRole: 'admin',
      title: 'New Teacher Leave Application',
      message: `${leave.teacherName} requested ${leave.days} day(s) ${leave.leaveType} leave starting ${leave.startDate}.`,
      timestamp: 'Just now',
      type: 'leave',
      read: false,
      actionUrl: '/admin/teachers'
    };
    setNotifications((prev) => [adminNotif, ...prev]);
  };

  const updateLeaveStatus = (leaveId: string, status: 'approved' | 'rejected', adminRemark?: string) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === leaveId ? { ...l, status, adminRemark } : l))
    );

    const leave = leaves.find((l) => l.id === leaveId);
    if (leave) {
      const teacherNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: leave.teacherId,
        targetRole: 'teacher',
        title: `Leave Request ${status === 'approved' ? 'Approved' : 'Rejected'}`,
        message: `Your ${leave.leaveType} leave application for ${leave.startDate} was ${status} by School Administration. ${adminRemark ? `Note: ${adminRemark}` : ''}`,
        timestamp: 'Just now',
        type: 'leave',
        read: false,
        actionUrl: '/teacher/leave'
      };
      setNotifications((prev) => [teacherNotif, ...prev]);
    }
  };

  const payFee = (feeId: string, method = 'UPI / NetBanking') => {
    const receiptNo = `CPS/2026-27/REC-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];

    setFees((prev) =>
      prev.map((f) => {
        if (f.id !== feeId) return f;
        return {
          ...f,
          amountPaid: f.amountDue,
          status: 'paid',
          paidDate: today,
          receiptNo,
          paymentMethod: method as FeeRecord['paymentMethod']
        };
      })
    );

    const fee = fees.find((f) => f.id === feeId);
    if (fee && fee.studentId === currentStudent.id) {
      setCurrentStudent((prev) => ({
        ...prev,
        feesDue: Math.max(0, prev.feesDue - fee.amountDue),
        feesPaid: prev.feesPaid + fee.amountDue
      }));
    }

    // Confirmation notification
    const feeNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentStudent.id,
      targetRole: 'student',
      title: 'Fee Payment Verified & Receipt Generated',
      message: `Payment of ₹${fee?.amountDue.toLocaleString() || '0'} for ${fee?.term || 'Tuition'} confirmed. Receipt #${receiptNo}.`,
      timestamp: 'Just now',
      type: 'fee',
      read: false,
      actionUrl: '/student/dashboard'
    };
    setNotifications((prev) => [feeNotif, ...prev]);
  };

  const createFeeRecord = (fee: Omit<FeeRecord, 'id'>) => {
    const newFee: FeeRecord = {
      ...fee,
      id: `fee-${Date.now()}`
    };
    setFees((prev) => [newFee, ...prev]);
  };

  const createAdmission = (adm: Omit<AdmissionApplication, 'id' | 'submissionDate' | 'status'>) => {
    const newAdm: AdmissionApplication = {
      ...adm,
      id: `adm-${Date.now()}`,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setAdmissions((prev) => [newAdm, ...prev]);

    // Admin alert
    const adminNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: 'admin-demo-01',
      targetRole: 'admin',
      title: 'New Admission Application Submitted',
      message: `Application received for ${adm.applicantName} for ${adm.appliedClass}.`,
      timestamp: 'Just now',
      type: 'general',
      read: false,
      actionUrl: '/admin/admissions'
    };
    setNotifications((prev) => [adminNotif, ...prev]);
  };

  const updateAdmissionStatus = (admId: string, status: AdmissionApplication['status']) => {
    setAdmissions((prev) =>
      prev.map((a) => (a.id === admId ? { ...a, status } : a))
    );
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const sendMessage = (recipientId: string, content: string, subject = 'School Query') => {
    const sender = currentUser || currentStudent;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: sender.id,
      senderName: sender.name,
      senderRole: sender.role,
      recipientId,
      content,
      timestamp: 'Just now',
      subject
    };
    setMessages((prev) => [...prev, newMsg]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: recipientId,
      title: `New Message from ${sender.name}`,
      message: content.slice(0, 80) + '...',
      timestamp: 'Just now',
      type: 'general',
      read: false,
      actionUrl: sender.role === 'teacher' ? '/student/communication' : '/teacher/communication'
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    setCurrentStudent((prev) => {
      const updated = { ...prev, ...updates };
      setStudents((all) => all.map((s) => (s.id === updated.id ? updated : s)));
      if (currentUser?.id === updated.id) {
        setCurrentUser(updated);
      }
      return updated;
    });
  };

  const updateTeacherProfile = (updates: Partial<TeacherProfile>) => {
    setCurrentTeacher((prev) => {
      const updated = { ...prev, ...updates };
      setTeachers((all) => all.map((t) => (t.id === updated.id ? updated : t)));
      if (currentUser?.id === updated.id) {
        setCurrentUser(updated);
      }
      return updated;
    });
  };

  const addTimetableSlot = (slot: Omit<TimetableSlot, 'id'>) => {
    const newSlot: TimetableSlot = { ...slot, id: `tt-${Date.now()}` };
    setTimetable((prev) => [...prev, newSlot]);
  };

  const deleteTimetableSlot = (id: string) => {
    setTimetable((prev) => prev.filter((t) => t.id !== id));
  };

  const addLearningMaterial = (mat: Omit<LearningMaterial, 'id' | 'uploadDate' | 'downloadCount'>) => {
    const newMat: LearningMaterial = {
      ...mat,
      id: `mat-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
      downloadCount: 1
    };
    setMaterials((prev) => [newMat, ...prev]);
  };

  const toggleFavoriteMaterial = (id: string) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))
    );
  };

  const addStudent = (newStudentData: Omit<StudentProfile, 'id'>): StudentProfile => {
    const timestamp = Date.now();
    const created: StudentProfile = {
      ...newStudentData,
      id: `stu-${timestamp}`,
      role: 'student',
      isNewlyJoined: true,
      password: newStudentData.password || 'Student@123',
      joinedDate: newStudentData.joinedDate || new Date().toISOString().split('T')[0],
      avatar:
        newStudentData.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'
    };
    setStudents((prev) => [created, ...prev]);

    // Add alert notification for Admin
    const newNotif: NotificationItem = {
      id: `notif-${timestamp}`,
      userId: 'admin-demo-01',
      targetRole: 'admin',
      title: 'New Student Enrolled',
      message: `${created.name} enrolled in Grade ${created.class}-${created.section} (Roll #${created.rollNo}). Portal login credentials generated.`,
      timestamp: 'Just now',
      type: 'general',
      read: false,
      actionUrl: '/admin/students'
    };
    setNotifications((prev) => [newNotif, ...prev]);
    return created;
  };

  const addTeacher = (newTeacherData: Omit<TeacherProfile, 'id'>): TeacherProfile => {
    const timestamp = Date.now();
    const created: TeacherProfile = {
      ...newTeacherData,
      id: `tea-${timestamp}`,
      role: 'teacher',
      isNewlyJoined: true,
      password: newTeacherData.password || 'Teacher@123',
      joinedDate: newTeacherData.joinedDate || new Date().toISOString().split('T')[0],
      avatar:
        newTeacherData.avatar ||
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&q=80'
    };
    setTeachers((prev) => [created, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${timestamp}`,
      userId: 'admin-demo-01',
      targetRole: 'admin',
      title: 'New Faculty Member Appointed',
      message: `${created.name} appointed to Department of ${created.department} (${created.employeeId}). Portal login credentials generated.`,
      timestamp: 'Just now',
      type: 'general',
      read: false,
      actionUrl: '/admin/teachers'
    };
    setNotifications((prev) => [newNotif, ...prev]);
    return created;
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStudent(CURRENT_STUDENT);
    setCurrentTeacher(CURRENT_TEACHER);
    setCurrentAdmin(CURRENT_ADMIN);
    setStudents(INITIAL_STUDENTS);
    setTeachers(INITIAL_TEACHERS);
    setTimetable(INITIAL_TIMETABLE);
    setAssignments(INITIAL_ASSIGNMENTS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setMarks(INITIAL_MARKS);
    setAttendance(INITIAL_ATTENDANCE);
    setMaterials(INITIAL_MATERIALS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setLeaves(INITIAL_LEAVES);
    setFees(INITIAL_FEES);
    setAdmissions(INITIAL_ADMISSIONS);
    setEvents(INITIAL_EVENTS);
    setLessonPlans(INITIAL_LESSON_PLANS);
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <SchoolContext.Provider
      value={{
        currentUser,
        currentStudent,
        currentTeacher,
        currentAdmin,
        activeRole,
        isAdminSession,
        setAdminInspectionMode,
        darkMode,
        toggleDarkMode,
        login,
        logout,
        switchRoleDemo,
        addStudent,
        addTeacher,
        students,
        teachers,
        timetable,
        assignments,
        submissions,
        marks,
        attendance,
        materials,
        announcements,
        notifications,
        leaves,
        fees,
        admissions,
        events,
        lessonPlans,
        messages,
        markAttendance,
        createAssignment,
        submitAssignment,
        gradeSubmission,
        saveMarks,
        createAnnouncement,
        requestLeave,
        updateLeaveStatus,
        payFee,
        createFeeRecord,
        createAdmission,
        updateAdmissionStatus,
        markNotificationRead,
        clearNotifications,
        sendMessage,
        updateStudentProfile,
        updateTeacherProfile,
        addTimetableSlot,
        deleteTimetableSlot,
        addLearningMaterial,
        toggleFavoriteMaterial,
        resetAllData
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
