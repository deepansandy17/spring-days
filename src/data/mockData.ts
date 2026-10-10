import {
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

// Demo Credentials
export const DEMO_CREDENTIALS = {
  student: {
    email: 'student@cps.demo',
    password: 'Student@123',
    name: 'Aarav Sundaram',
    role: 'student' as const,
    id: 'student-demo-01'
  },
  teacher: {
    email: 'teacher@cps.demo',
    password: 'Teacher@123',
    name: 'Dr. Meenakshi Raman',
    role: 'teacher' as const,
    id: 'teacher-demo-01'
  },
  admin: {
    email: 'admin@cps.demo',
    password: 'Admin@123',
    name: 'K. Sivaraman (Vice Principal)',
    role: 'admin' as const,
    id: 'admin-demo-01'
  }
};

// Primary Demo Profiles
export const CURRENT_STUDENT: StudentProfile = {
  id: 'student-demo-01',
  studentId: 'CPS-2024-042',
  name: 'Aarav Sundaram',
  email: 'student@cps.demo',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  phone: '+91 98401 23456',
  joinedDate: '2020-06-15',
  class: '10',
  section: 'A',
  rollNo: 42,
  dob: '2010-04-18',
  bloodGroup: 'B+ Positive',
  address: 'No. 24, 4th Main Road, Anna Nagar West, Chennai - 600040',
  parentName: 'Sundaram Krishnamurthy & Vani Sundaram',
  parentPhone: '+91 94440 98765',
  parentEmail: 'sundaram.k@gmail.com',
  attendanceRate: 92.4,
  feesDue: 0,
  feesPaid: 65000
};

export const CURRENT_TEACHER: TeacherProfile = {
  id: 'teacher-demo-01',
  employeeId: 'CPS-T-108',
  name: 'Dr. Meenakshi Raman',
  email: 'teacher@cps.demo',
  role: 'teacher',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
  phone: '+91 98840 54321',
  joinedDate: '2016-08-01',
  department: 'Mathematics & Computer Science',
  qualifications: 'M.Sc., M.Phil., Ph.D. in Applied Mathematics (Madras University)',
  assignedClasses: [
    { class: '10', section: 'A', subject: 'Mathematics' },
    { class: '10', section: 'B', subject: 'Mathematics' },
    { class: '11', section: 'A', subject: 'Advanced Calculus' },
    { class: '9', section: 'A', subject: 'Mathematics' }
  ],
  isClassTeacherOf: { class: '10', section: 'A' },
  leaveBalance: { casual: 8, medical: 12, duty: 5 }
};

export const CURRENT_ADMIN: AdminProfile = {
  id: 'admin-demo-01',
  adminId: 'CPS-ADM-01',
  name: 'K. Sivaraman, M.A., B.Ed.',
  email: 'admin@cps.demo',
  role: 'admin',
  avatar: '/src/assets/images/principal_portrait_1791637340517.jpg',
  phone: '+91 94441 11222',
  joinedDate: '2012-05-10',
  designation: 'Vice Principal & Chief Administrative Officer',
  permissions: ['view_all', 'manage_students', 'manage_teachers', 'manage_fees', 'approve_leaves', 'manage_exams', 'publish_announcements']
};

// 30 Fictional Teachers
const TEACHER_NAMES = [
  { name: 'Dr. Meenakshi Raman', dept: 'Mathematics', qual: 'Ph.D., M.Sc.', subject: 'Mathematics', id: 'teacher-demo-01' },
  { name: 'Prof. R. Venkatraman', dept: 'Physics', qual: 'M.Sc., B.Ed.', subject: 'Physics', id: 't-02' },
  { name: 'Mrs. Lakshmi Narayanan', dept: 'Chemistry', qual: 'M.Sc., M.Phil.', subject: 'Chemistry', id: 't-03' },
  { name: 'Dr. Anita Selvaraj', dept: 'Biology', qual: 'Ph.D., B.Ed.', subject: 'Biology', id: 't-04' },
  { name: 'Mr. David Rajasekaran', dept: 'English Language & Lit', qual: 'M.A., M.Phil.', subject: 'English', id: 't-05' },
  { name: 'Mrs. S. Gandhimathi', dept: 'Tamil Literature', qual: 'M.A., B.Ed.', subject: 'Tamil', id: 't-06' },
  { name: 'Mr. Karthik Natarajan', dept: 'Computer Science & AI', qual: 'M.Tech., MCA', subject: 'Computer Science', id: 't-07' },
  { name: 'Mrs. Radhika Chandran', dept: 'Social Science & History', qual: 'M.A., B.Ed.', subject: 'Social Science', id: 't-08' },
  { name: 'Mr. Rajeshwar Sharma', dept: 'Hindi', qual: 'M.A. Hindi, B.Ed.', subject: 'Hindi', id: 't-09' },
  { name: 'Coach M. Balaji', dept: 'Physical Education & Athletics', qual: 'M.P.Ed.', subject: 'Physical Education', id: 't-10' },
  { name: 'Mrs. Malathi Srinivasan', dept: 'Fine Arts & Craft', qual: 'M.F.A.', subject: 'Fine Arts', id: 't-11' },
  { name: 'Madame Claire Vimalan', dept: 'French Language', qual: 'M.A. French', subject: 'French', id: 't-12' },
  { name: 'Mr. Suresh Kumar', dept: 'Mathematics', qual: 'M.Sc. B.Ed.', subject: 'Mathematics', id: 't-13' },
  { name: 'Mrs. Preetha Mohan', dept: 'Economics & Commerce', qual: 'M.Com, M.Phil.', subject: 'Economics', id: 't-14' },
  { name: 'Mr. Anand Parthasarathy', dept: 'Accountancy & Business', qual: 'FCA, M.Com', subject: 'Accountancy', id: 't-15' },
  { name: 'Dr. Kavitha Subramanian', dept: 'Environmental Science', qual: 'Ph.D. Ecology', subject: 'Environmental Studies', id: 't-16' },
  { name: 'Mrs. Sunita Verma', dept: 'Primary Mathematics', qual: 'B.Sc., B.Ed.', subject: 'Mathematics', id: 't-17' },
  { name: 'Mr. T. Saravanan', dept: 'Robotics & Maker Lab', qual: 'B.E., M.Tech.', subject: 'Robotics', id: 't-18' },
  { name: 'Mrs. Deepa Krishnan', dept: 'English Language', qual: 'M.A. English', subject: 'English', id: 't-19' },
  { name: 'Mr. Ganesan Pillai', dept: 'Social Science & Geography', qual: 'M.Sc. Geography', subject: 'Geography', id: 't-20' },
  { name: 'Mrs. Jayasree Menon', dept: 'Music & Performing Arts', qual: 'B.Music', subject: 'Music', id: 't-21' },
  { name: 'Mr. Vijayaraghavan R.', dept: 'Physics', qual: 'M.Sc. Physics', subject: 'Physics', id: 't-22' },
  { name: 'Mrs. Revathi Swaminathan', dept: 'Chemistry', qual: 'M.Sc. Chemistry', subject: 'Chemistry', id: 't-23' },
  { name: 'Mrs. Bhuvaneswari K.', dept: 'Tamil Literature', qual: 'M.A. Tamil', subject: 'Tamil', id: 't-24' },
  { name: 'Mr. Noel Fernandez', dept: 'Western Music & Choir', qual: 'Trinity Grade 8', subject: 'Music', id: 't-25' },
  { name: 'Coach Priya Sundaram', dept: 'Yoga & Wellness', qual: 'M.Sc. Yoga', subject: 'Yoga', id: 't-26' },
  { name: 'Mr. Harishankar S.', dept: 'Computer Applications', qual: 'MCA', subject: 'Informatics Practices', id: 't-27' },
  { name: 'Mrs. Usha Raghavan', dept: 'Primary Science', qual: 'M.Sc., B.Ed.', subject: 'General Science', id: 't-28' },
  { name: 'Mr. Balamurugan T.', dept: 'Physical Education', qual: 'B.P.Ed.', subject: 'Physical Education', id: 't-29' },
  { name: 'Mrs. Archana Padmanabhan', dept: 'Psychology & Counselling', qual: 'M.Sc. Counselling', subject: 'Psychology', id: 't-30' }
];

export const INITIAL_TEACHERS: TeacherProfile[] = TEACHER_NAMES.map((t, idx) => ({
  id: t.id,
  employeeId: `CPS-T-${100 + idx + 1}`,
  name: t.name,
  email: idx === 0 ? 'teacher@cps.demo' : `teacher.${idx + 1}@cps.demo`,
  role: 'teacher',
  avatar: `https://images.unsplash.com/photo-${1534528741775 + idx * 50}?auto=format&fit=crop&w=128&q=80`,
  phone: `+91 9840${idx.toString().padStart(2, '0')} 12345`,
  joinedDate: `201${5 + (idx % 8)}-06-01`,
  department: t.dept,
  qualifications: t.qual,
  assignedClasses: [
    { class: `${8 + (idx % 4)}`, section: idx % 2 === 0 ? 'A' : 'B', subject: t.subject },
    { class: `${9 + (idx % 3)}`, section: 'A', subject: t.subject }
  ],
  isClassTeacherOf: idx === 0 ? { class: '10', section: 'A' } : (idx < 10 ? { class: `${idx + 1}`, section: 'A' } : undefined),
  leaveBalance: { casual: 8 - (idx % 4), medical: 12 - (idx % 3), duty: 5 }
}));

// Procedural generation of 500 Students
const FIRST_NAMES = [
  'Aarav', 'Diya', 'Vikram', 'Ananya', 'Keerthana', 'Rohan', 'Priya', 'Ashwin', 'Divya', 'Sanjay',
  'Meera', 'Karthik', 'Swetha', 'Naveen', 'Sanjana', 'Arjun', 'Harini', 'Gautam', 'Kavya', 'Aditya',
  'Ishaan', 'Nithya', 'Rahul', 'Sahana', 'Vishal', 'Pooja', 'Tanvi', 'Varun', 'Deepika', 'Akash',
  'Sneha', 'Manoj', 'Pavithra', 'Siddharth', 'Bhavana', 'Madhav', 'Gayathri', 'Kiran', 'Lavanya', 'Surya'
];

const LAST_NAMES = [
  'Sundaram', 'Krishnan', 'Raman', 'Iyer', 'Natarajan', 'Subramanian', 'Swaminathan', 'Balasubramanian',
  'Venkatesh', 'Chandran', 'Murugesan', 'Rajagopalan', 'Raghavan', 'Srinivasan', 'Pillai', 'Menon',
  'Kumar', 'Sharma', 'Reddy', 'Patel', 'Narayanan', 'Anand', 'Selvan', 'Kannan', 'Sivaraman'
];

export function generateStudentsList(): StudentProfile[] {
  const students: StudentProfile[] = [CURRENT_STUDENT];
  const classes = ['6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B'];

  let count = 2;
  for (const cls of classes) {
    for (const sec of sections) {
      const studentsPerSec = cls === '10' && sec === 'A' ? 35 : 36; // total ~500
      for (let i = 1; i <= studentsPerSec; i++) {
        if (cls === '10' && sec === 'A' && i === 42) continue; // Skip Aarav (already added)
        const fn = FIRST_NAMES[(count * 7) % FIRST_NAMES.length];
        const ln = LAST_NAMES[(count * 11) % LAST_NAMES.length];
        const name = `${fn} ${ln}`;
        const rollNo = i;
        const studentId = `CPS-2024-${cls.padStart(2, '0')}${sec}${rollNo.toString().padStart(2, '0')}`;
        const attRate = Number((86 + ((count * 3) % 13) + Math.random() * 0.9).toFixed(1));
        const feeStatus = count % 7 === 0 ? 15000 : 0; // some have pending fees

        students.push({
          id: `student-${count}`,
          studentId,
          name,
          email: `${fn.toLowerCase()}.${ln.toLowerCase()}@cps.edu.in`,
          role: 'student',
          avatar: `https://images.unsplash.com/photo-${1530000000000 + (count % 30) * 100000}?auto=format&fit=crop&w=128&q=80`,
          phone: `+91 98410 ${Math.floor(10000 + Math.random() * 89999)}`,
          joinedDate: `202${cls === '12' ? '2' : '4'}-06-10`,
          class: cls,
          section: sec,
          rollNo,
          dob: `201${12 - parseInt(cls)}-0${(count % 9) + 1}-1${(count % 8) + 1}`,
          bloodGroup: ['O+', 'A+', 'B+', 'AB+', 'O-'][count % 5],
          address: `Flat ${count + 12}, KKR Avenue, Anna Nagar, Chennai - 600040`,
          parentName: `${ln} & Mrs. ${ln}`,
          parentPhone: `+91 9444${Math.floor(100000 + Math.random() * 899999)}`,
          parentEmail: `parent.${count}@gmail.com`,
          attendanceRate: attRate,
          feesDue: feeStatus,
          feesPaid: 65000 - feeStatus
        });
        count++;
        if (students.length >= 500) break;
      }
      if (students.length >= 500) break;
    }
    if (students.length >= 500) break;
  }
  return students;
}

export const INITIAL_STUDENTS: StudentProfile[] = generateStudentsList();

// Timetable for Class 10-A
export const INITIAL_TIMETABLE: TimetableSlot[] = [
  // Monday
  { id: 'tt-m1', day: 'Monday', period: 1, time: '09:00 - 09:45', class: '10', section: 'A', subject: 'Mathematics', teacherId: 'teacher-demo-01', teacherName: 'Dr. Meenakshi Raman', room: 'Room 304' },
  { id: 'tt-m2', day: 'Monday', period: 2, time: '09:45 - 10:30', class: '10', section: 'A', subject: 'Physics', teacherId: 't-02', teacherName: 'Prof. R. Venkatraman', room: 'Physics Lab 1' },
  { id: 'tt-m3', day: 'Monday', period: 3, time: '10:45 - 11:30', class: '10', section: 'A', subject: 'English', teacherId: 't-05', teacherName: 'Mr. David Rajasekaran', room: 'Room 304' },
  { id: 'tt-m4', day: 'Monday', period: 4, time: '11:30 - 12:15', class: '10', section: 'A', subject: 'Computer Science', teacherId: 't-07', teacherName: 'Mr. Karthik Natarajan', room: 'Computer Lab 2' },
  { id: 'tt-m5', day: 'Monday', period: 5, time: '13:00 - 13:45', class: '10', section: 'A', subject: 'Chemistry', teacherId: 't-03', teacherName: 'Mrs. Lakshmi Narayanan', room: 'Chemistry Lab' },
  { id: 'tt-m6', day: 'Monday', period: 6, time: '13:45 - 14:30', class: '10', section: 'A', subject: 'Social Science', teacherId: 't-08', teacherName: 'Mrs. Radhika Chandran', room: 'Room 304' },
  { id: 'tt-m7', day: 'Monday', period: 7, time: '14:30 - 15:15', class: '10', section: 'A', subject: 'Physical Education', teacherId: 't-10', teacherName: 'Coach M. Balaji', room: 'Playground Ground A' },

  // Tuesday
  { id: 'tt-t1', day: 'Tuesday', period: 1, time: '09:00 - 09:45', class: '10', section: 'A', subject: 'Biology', teacherId: 't-04', teacherName: 'Dr. Anita Selvaraj', room: 'Bio Lab' },
  { id: 'tt-t2', day: 'Tuesday', period: 2, time: '09:45 - 10:30', class: '10', section: 'A', subject: 'Mathematics', teacherId: 'teacher-demo-01', teacherName: 'Dr. Meenakshi Raman', room: 'Room 304' },
  { id: 'tt-t3', day: 'Tuesday', period: 3, time: '10:45 - 11:30', class: '10', section: 'A', subject: 'Tamil / Hindi', teacherId: 't-06', teacherName: 'Mrs. S. Gandhimathi', room: 'Room 304' },
  { id: 'tt-t4', day: 'Tuesday', period: 4, time: '11:30 - 12:15', class: '10', section: 'A', subject: 'Physics', teacherId: 't-02', teacherName: 'Prof. R. Venkatraman', room: 'Room 304' },
  { id: 'tt-t5', day: 'Tuesday', period: 5, time: '13:00 - 13:45', class: '10', section: 'A', subject: 'Computer Science', teacherId: 't-07', teacherName: 'Mr. Karthik Natarajan', room: 'Computer Lab 2' },
  { id: 'tt-t6', day: 'Tuesday', period: 6, time: '13:45 - 14:30', class: '10', section: 'A', subject: 'English', teacherId: 't-05', teacherName: 'Mr. David Rajasekaran', room: 'Room 304' },
  { id: 'tt-t7', day: 'Tuesday', period: 7, time: '14:30 - 15:15', class: '10', section: 'A', subject: 'Library & Research', teacherId: 'teacher-demo-01', teacherName: 'Dr. Meenakshi Raman', room: 'Digital Library' },

  // Wednesday
  { id: 'tt-w1', day: 'Wednesday', period: 1, time: '09:00 - 09:45', class: '10', section: 'A', subject: 'Mathematics', teacherId: 'teacher-demo-01', teacherName: 'Dr. Meenakshi Raman', room: 'Room 304' },
  { id: 'tt-w2', day: 'Wednesday', period: 2, time: '09:45 - 10:30', class: '10', section: 'A', subject: 'Chemistry', teacherId: 't-03', teacherName: 'Mrs. Lakshmi Narayanan', room: 'Room 304' },
  { id: 'tt-w3', day: 'Wednesday', period: 3, time: '10:45 - 11:30', class: '10', section: 'A', subject: 'Social Science', teacherId: 't-08', teacherName: 'Mrs. Radhika Chandran', room: 'Room 304' },
  { id: 'tt-w4', day: 'Wednesday', period: 4, time: '11:30 - 12:15', class: '10', section: 'A', subject: 'English', teacherId: 't-05', teacherName: 'Mr. David Rajasekaran', room: 'Room 304' },
  { id: 'tt-w5', day: 'Wednesday', period: 5, time: '13:00 - 13:45', class: '10', section: 'A', subject: 'Robotics & STEM Lab', teacherId: 't-18', teacherName: 'Mr. T. Saravanan', room: 'Innovation Hub' },
  { id: 'tt-w6', day: 'Wednesday', period: 6, time: '13:45 - 14:30', class: '10', section: 'A', subject: 'Physics', teacherId: 't-02', teacherName: 'Prof. R. Venkatraman', room: 'Room 304' },
  { id: 'tt-w7', day: 'Wednesday', period: 7, time: '14:30 - 15:15', class: '10', section: 'A', subject: 'Fine Arts', teacherId: 't-11', teacherName: 'Mrs. Malathi Srinivasan', room: 'Art Studio' },

  // Thursday
  { id: 'tt-th1', day: 'Thursday', period: 1, time: '09:00 - 09:45', class: '10', section: 'A', subject: 'Social Science', teacherId: 't-08', teacherName: 'Mrs. Radhika Chandran', room: 'Room 304' },
  { id: 'tt-th2', day: 'Thursday', period: 2, time: '09:45 - 10:30', class: '10', section: 'A', subject: 'Mathematics', teacherId: 'teacher-demo-01', teacherName: 'Dr. Meenakshi Raman', room: 'Room 304' },
  { id: 'tt-th3', day: 'Thursday', period: 3, time: '10:45 - 11:30', class: '10', section: 'A', subject: 'Biology', teacherId: 't-04', teacherName: 'Dr. Anita Selvaraj', room: 'Bio Lab' },
  { id: 'tt-th4', day: 'Thursday', period: 4, time: '11:30 - 12:15', class: '10', section: 'A', subject: 'Tamil / Hindi', teacherId: 't-06', teacherName: 'Mrs. S. Gandhimathi', room: 'Room 304' },
  { id: 'tt-th5', day: 'Thursday', period: 5, time: '13:00 - 13:45', class: '10', section: 'A', subject: 'Computer Science', teacherId: 't-07', teacherName: 'Mr. Karthik Natarajan', room: 'Computer Lab 2' },
  { id: 'tt-th6', day: 'Thursday', period: 6, time: '13:45 - 14:30', class: '10', section: 'A', subject: 'Chemistry', teacherId: 't-03', teacherName: 'Mrs. Lakshmi Narayanan', room: 'Room 304' },
  { id: 'tt-th7', day: 'Thursday', period: 7, time: '14:30 - 15:15', class: '10', section: 'A', subject: 'Physical Education', teacherId: 't-10', teacherName: 'Coach M. Balaji', room: 'Playground Ground A' },

  // Friday
  { id: 'tt-f1', day: 'Friday', period: 1, time: '09:00 - 09:45', class: '10', section: 'A', subject: 'Mathematics', teacherId: 'teacher-demo-01', teacherName: 'Dr. Meenakshi Raman', room: 'Room 304' },
  { id: 'tt-f2', day: 'Friday', period: 2, time: '09:45 - 10:30', class: '10', section: 'A', subject: 'Physics', teacherId: 't-02', teacherName: 'Prof. R. Venkatraman', room: 'Room 304' },
  { id: 'tt-f3', day: 'Friday', period: 3, time: '10:45 - 11:30', class: '10', section: 'A', subject: 'English', teacherId: 't-05', teacherName: 'Mr. David Rajasekaran', room: 'Room 304' },
  { id: 'tt-f4', day: 'Friday', period: 4, time: '11:30 - 12:15', class: '10', section: 'A', subject: 'Chemistry', teacherId: 't-03', teacherName: 'Mrs. Lakshmi Narayanan', room: 'Chemistry Lab' },
  { id: 'tt-f5', day: 'Friday', period: 5, time: '13:00 - 13:45', class: '10', section: 'A', subject: 'Biology', teacherId: 't-04', teacherName: 'Dr. Anita Selvaraj', room: 'Room 304' },
  { id: 'tt-f6', day: 'Friday', period: 6, time: '13:45 - 14:30', class: '10', section: 'A', subject: 'Social Science', teacherId: 't-08', teacherName: 'Mrs. Radhika Chandran', room: 'Room 304' },
  { id: 'tt-f7', day: 'Friday', period: 7, time: '14:30 - 15:15', class: '10', section: 'A', subject: 'Club Activity / Debate', teacherId: 't-05', teacherName: 'Mr. David Rajasekaran', room: 'Auditorium Hall' }
];

// Initial Assignments
export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-01',
    title: 'Quadratic Equations & Parabolic Modeling Project',
    subject: 'Mathematics',
    class: '10',
    section: 'A',
    teacherId: 'teacher-demo-01',
    teacherName: 'Dr. Meenakshi Raman',
    description: 'Solve the 12 problems in Problem Set 4.2 and plot real-world projectile trajectories with vertex and discriminant analysis.',
    assignedDate: '2026-10-06',
    dueDate: '2026-10-14',
    maxMarks: 25,
    attachmentName: 'Math_Quadratic_Set_4.2.pdf'
  },
  {
    id: 'asg-02',
    title: 'Wave Optics & Ray Reflection Experimental Log',
    subject: 'Physics',
    class: '10',
    section: 'A',
    teacherId: 't-02',
    teacherName: 'Prof. R. Venkatraman',
    description: 'Submit your laboratory observation table with refractive index measurements for convex lens experiments.',
    assignedDate: '2026-10-04',
    dueDate: '2026-10-11',
    maxMarks: 20,
    attachmentName: 'Optics_Lab_Manual_Sheet.pdf'
  },
  {
    id: 'asg-03',
    title: 'Python Sorting Algorithms & Space Complexity',
    subject: 'Computer Science',
    class: '10',
    section: 'A',
    teacherId: 't-07',
    teacherName: 'Mr. Karthik Natarajan',
    description: 'Implement Bubble Sort and Binary Search in Python with comments explaining big-O runtime efficiency.',
    assignedDate: '2026-10-02',
    dueDate: '2026-10-09',
    maxMarks: 30,
    attachmentName: 'CS_Python_Lab3.py'
  },
  {
    id: 'asg-04',
    title: 'Critical Essay: Portia\'s Speech in Merchant of Venice',
    subject: 'English',
    class: '10',
    section: 'A',
    teacherId: 't-05',
    teacherName: 'Mr. David Rajasekaran',
    description: 'Write an 800-word critical evaluation on the themes of justice versus mercy in Act IV Scene 1.',
    assignedDate: '2026-09-28',
    dueDate: '2026-10-05',
    maxMarks: 25,
    attachmentName: 'English_Merchant_Venice_Rubric.pdf'
  },
  {
    id: 'asg-05',
    title: 'Redox Reactions & Electrochemical Cells Worksheet',
    subject: 'Chemistry',
    class: '10',
    section: 'A',
    teacherId: 't-03',
    teacherName: 'Mrs. Lakshmi Narayanan',
    description: 'Balance the 10 redox equations using the ion-electron method and identify oxidizing agents.',
    assignedDate: '2026-10-08',
    dueDate: '2026-10-16',
    maxMarks: 20,
    attachmentName: 'Chem_Redox_Worksheet.pdf'
  }
];

// Initial Submissions
export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-01',
    assignmentId: 'asg-03',
    studentId: 'student-demo-01',
    studentName: 'Aarav Sundaram',
    submittedAt: '2026-10-08 16:30',
    content: 'Attached my python solution script with test cases for bubble sort and binary search with edge case handling.',
    attachmentName: 'Aarav_Python_Sorting_Solution.py',
    status: 'reviewed',
    score: 28,
    feedback: 'Excellent modular code structure and accurate Big-O algorithmic notations! Keep it up.',
    reviewedBy: 'Mr. Karthik Natarajan',
    reviewedAt: '2026-10-09 11:20'
  },
  {
    id: 'sub-02',
    assignmentId: 'asg-04',
    studentId: 'student-demo-01',
    studentName: 'Aarav Sundaram',
    submittedAt: '2026-10-04 18:45',
    content: 'Submitted essay on The Quality of Mercy: Rhetoric and Moral Conflict in Venetian Jurisprudence.',
    attachmentName: 'Aarav_English_Essay_Venice.docx',
    status: 'reviewed',
    score: 24,
    feedback: 'Very thoughtful literary analysis and rich vocabulary. Nuanced argumentation on Shylock and Portia.',
    reviewedBy: 'Mr. David Rajasekaran',
    reviewedAt: '2026-10-06 09:15'
  },
  {
    id: 'sub-03',
    assignmentId: 'asg-02',
    studentId: 'student-demo-01',
    studentName: 'Aarav Sundaram',
    submittedAt: '2026-10-10 08:30',
    content: 'Complete optics observation sheet with refractive indices and ray diagrams drawn to millimeter scale.',
    attachmentName: 'Aarav_Optics_Lab_Observation.pdf',
    status: 'submitted'
  }
];

// Subject Marks for Student Aarav Sundaram
export const INITIAL_MARKS: SubjectMark[] = [
  {
    id: 'mrk-01',
    studentId: 'student-demo-01',
    class: '10',
    section: 'A',
    subject: 'Mathematics',
    examName: 'Mid-Term Assessment 2026',
    internalMarks: 19,
    testMarks: 28,
    examMarks: 46,
    total: 93,
    grade: 'A+',
    teacherRemarks: 'Outstanding analytical prowess in quadratic theorems and trigonometry.'
  },
  {
    id: 'mrk-02',
    studentId: 'student-demo-01',
    class: '10',
    section: 'A',
    subject: 'Physics',
    examName: 'Mid-Term Assessment 2026',
    internalMarks: 18,
    testMarks: 26,
    examMarks: 44,
    total: 88,
    grade: 'A',
    teacherRemarks: 'Strong conceptual clarity in thermodynamics and optics.'
  },
  {
    id: 'mrk-03',
    studentId: 'student-demo-01',
    class: '10',
    section: 'A',
    subject: 'Chemistry',
    examName: 'Mid-Term Assessment 2026',
    internalMarks: 17,
    testMarks: 25,
    examMarks: 43,
    total: 85,
    grade: 'A',
    teacherRemarks: 'Good experimental lab accuracy and stoichiometry balancing.'
  },
  {
    id: 'mrk-04',
    studentId: 'student-demo-01',
    class: '10',
    section: 'A',
    subject: 'Biology',
    examName: 'Mid-Term Assessment 2026',
    internalMarks: 18,
    testMarks: 27,
    examMarks: 44,
    total: 89,
    grade: 'A',
    teacherRemarks: 'Clear microscopic diagrams and systematic physiological descriptions.'
  },
  {
    id: 'mrk-05',
    studentId: 'student-demo-01',
    class: '10',
    section: 'A',
    subject: 'Computer Science',
    examName: 'Mid-Term Assessment 2026',
    internalMarks: 20,
    testMarks: 29,
    examMarks: 48,
    total: 97,
    grade: 'A+',
    teacherRemarks: 'Top scorer in batch! Exceptional algorithmic design and debugging.'
  },
  {
    id: 'mrk-06',
    studentId: 'student-demo-01',
    class: '10',
    section: 'A',
    subject: 'English Language',
    examName: 'Mid-Term Assessment 2026',
    internalMarks: 18,
    testMarks: 25,
    examMarks: 42,
    total: 85,
    grade: 'A',
    teacherRemarks: 'Expressive essayist with strong rhetorical composition.'
  },
  {
    id: 'mrk-07',
    studentId: 'student-demo-01',
    class: '10',
    section: 'A',
    subject: 'Social Science',
    examName: 'Mid-Term Assessment 2026',
    internalMarks: 16,
    testMarks: 24,
    examMarks: 41,
    total: 81,
    grade: 'B+',
    teacherRemarks: 'Consistent effort. Focus slightly more on historical chronological timelines.'
  }
];

// Today's Attendance Initial Records
export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-today-01',
    date: '2026-10-10',
    class: '10',
    section: 'A',
    studentId: 'student-demo-01',
    studentName: 'Aarav Sundaram',
    status: 'present',
    markedByTeacherId: 'teacher-demo-01',
    remark: 'Punctual'
  }
];

// Learning Materials
export const INITIAL_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat-01',
    title: 'NCERT Mathematics Class X — Quadratic Equations & AP Complete Handbook',
    category: 'Textbooks',
    subject: 'Mathematics',
    class: '10',
    uploadedBy: 'Dr. Meenakshi Raman',
    uploadDate: '2026-09-15',
    fileSize: '14.2 MB',
    fileType: 'PDF',
    description: 'Official chapter notes with step-by-step solved exemplars and Board examination question trends.',
    downloadCount: 342,
    isFavorite: true
  },
  {
    id: 'mat-02',
    title: 'Comprehensive Ray Optics & Refraction Diagram Compendium',
    category: 'Lecture Notes',
    subject: 'Physics',
    class: '10',
    uploadedBy: 'Prof. R. Venkatraman',
    uploadDate: '2026-09-20',
    fileSize: '8.7 MB',
    fileType: 'PDF',
    description: 'Hand-annotated ray tracing diagrams, Snell’s law derivation, and mirror equation shortcut guides.',
    downloadCount: 289,
    isFavorite: true
  },
  {
    id: 'mat-03',
    title: 'Python Core Data Structures: Lists, Tuples, Dictionaries & Stacks',
    category: 'Lecture Notes',
    subject: 'Computer Science',
    class: '10',
    uploadedBy: 'Mr. Karthik Natarajan',
    uploadDate: '2026-09-28',
    fileSize: '4.1 MB',
    fileType: 'PDF',
    description: 'Syntax sheets, memory representation diagrams, and 25 practice coding challenge problems.',
    downloadCount: 412,
    isFavorite: false
  },
  {
    id: 'mat-04',
    title: 'Previous 5 Years CBSE Board Mathematics Solved Question Papers',
    category: 'Question Papers',
    subject: 'Mathematics',
    class: '10',
    uploadedBy: 'Dr. Meenakshi Raman',
    uploadDate: '2026-10-01',
    fileSize: '18.9 MB',
    fileType: 'PDF',
    description: 'Compiled past exam question papers with verified marking schemes and common error notes.',
    downloadCount: 512,
    isFavorite: true
  },
  {
    id: 'mat-05',
    title: 'Electrolysis & Metallurgy Fast Revision Mind-Map',
    category: 'Revision Materials',
    subject: 'Chemistry',
    class: '10',
    uploadedBy: 'Mrs. Lakshmi Narayanan',
    uploadDate: '2026-10-03',
    fileSize: '3.6 MB',
    fileType: 'PPT',
    description: 'High-yield color mind-map summarizing extraction reactions, reactivity series, and galvanic cells.',
    downloadCount: 198,
    isFavorite: false
  },
  {
    id: 'mat-06',
    title: 'Official Academic Curriculum & Exam Weightage Blueprint 2026',
    category: 'Syllabus',
    subject: 'All Subjects',
    class: '10',
    uploadedBy: 'K. Sivaraman (Vice Principal)',
    uploadDate: '2026-06-20',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    description: 'CBSE / State board syllabus circular showing unit-wise marks allocation and practical breakdown.',
    downloadCount: 680,
    isFavorite: false
  }
];

// Announcements
export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Term 1 Mid-Year Examination Schedule & Seating Allotment Released',
    content: 'The official timetable for Term 1 Mid-Year Assessments commencing November 3rd has been published on the portal. Hall tickets and personalized desk seating numbers are available under Academics.',
    category: 'Academic',
    targetAudience: 'all',
    publishedBy: 'K. Sivaraman',
    publishedRole: 'Vice Principal & Admin',
    date: '2026-10-09',
    isPinned: true
  },
  {
    id: 'ann-02',
    title: 'Chennai Inter-School Robotics & AI Olympiad 2026',
    content: 'CPS Innovation Lab is proud to host the 9th South Zone Robotics Challenge on October 25th. Teams from Grades 8–12 can register via the Innovation Hub portal with their project abstract.',
    category: 'Events',
    targetAudience: 'students',
    publishedBy: 'Mr. Karthik Natarajan',
    publishedRole: 'STEM Coordinator',
    date: '2026-10-07',
    isPinned: true
  },
  {
    id: 'ann-03',
    title: 'Parent-Teacher Consultative Conference (PTC) — Grades 9 & 10',
    content: 'The Term 1 Parent-Teacher meeting is scheduled for Saturday, October 18th from 09:00 AM to 01:30 PM. Parents may book specific 10-minute slots with subject faculties via the Communication tab.',
    category: 'General',
    targetAudience: 'all',
    publishedBy: 'Dr. Meenakshi Raman',
    publishedRole: 'Academic Coordinator',
    date: '2026-10-05',
    isPinned: false
  },
  {
    id: 'ann-04',
    title: 'Staff Faculty Development Workshop on Computational Thinking',
    content: 'A mandatory pedagogical seminar for all middle and high school faculty members will be conducted in the Mini Auditorium on Friday afternoon following period 4.',
    category: 'Academic',
    targetAudience: 'teachers',
    publishedBy: 'Dr. Vasundhara Sharma',
    publishedRole: 'Principal',
    date: '2026-10-04',
    isPinned: false
  }
];

// Notifications
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    userId: 'student-demo-01',
    title: 'Assignment Due Soon',
    message: 'Quadratic Equations & Parabolic Modeling due in 4 days.',
    timestamp: '10 minutes ago',
    type: 'assignment',
    read: false,
    actionUrl: '/student/assignments'
  },
  {
    id: 'notif-02',
    userId: 'student-demo-01',
    title: 'Grade Published',
    message: 'Mr. Karthik Natarajan graded Python Sorting Algorithms: 28/30.',
    timestamp: '1 hour ago',
    type: 'assignment',
    read: false,
    actionUrl: '/student/academics'
  },
  {
    id: 'notif-03',
    userId: 'student-demo-01',
    title: 'Attendance Confirmed',
    message: 'Morning attendance recorded: Present (Class 10-A).',
    timestamp: 'Today at 09:10 AM',
    type: 'attendance',
    read: true,
    actionUrl: '/student/dashboard'
  },
  {
    id: 'notif-04',
    userId: 'teacher-demo-01',
    title: 'New Student Submission',
    message: 'Aarav Sundaram submitted Optics Lab Observation for review.',
    timestamp: '1 hour ago',
    type: 'assignment',
    read: false,
    actionUrl: '/teacher/assignments'
  },
  {
    id: 'notif-05',
    userId: 'teacher-demo-01',
    title: 'Leave Application Status',
    message: 'Your Casual Leave for Nov 2 has been Approved by Vice Principal.',
    timestamp: 'Yesterday',
    type: 'leave',
    read: true,
    actionUrl: '/teacher/leave'
  },
  {
    id: 'notif-06',
    userId: 'admin-demo-01',
    title: 'Pending Leave Request',
    message: 'Prof. R. Venkatraman applied for 2 days Medical Leave.',
    timestamp: '3 hours ago',
    type: 'leave',
    read: false,
    actionUrl: '/admin/teachers'
  },
  {
    id: 'notif-07',
    userId: 'admin-demo-01',
    title: 'New Admission Inquiry',
    message: 'Application received for Grade 11 Science (Applicant: Harish V).',
    timestamp: 'Today at 08:45 AM',
    type: 'general',
    read: false,
    actionUrl: '/admin/admissions'
  }
];

// Leave Requests
export const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: 'lve-01',
    teacherId: 'teacher-demo-01',
    teacherName: 'Dr. Meenakshi Raman',
    department: 'Mathematics',
    leaveType: 'Casual',
    startDate: '2026-11-02',
    endDate: '2026-11-02',
    days: 1,
    reason: 'Family ceremony in Madurai.',
    status: 'approved',
    appliedDate: '2026-10-06',
    adminRemark: 'Approved. Relieving period handled by Mr. Suresh Kumar.'
  },
  {
    id: 'lve-02',
    teacherId: 't-02',
    teacherName: 'Prof. R. Venkatraman',
    department: 'Physics',
    leaveType: 'Medical',
    startDate: '2026-10-14',
    endDate: '2026-10-15',
    days: 2,
    reason: 'Prescheduled ophthalmic health checkup and rest.',
    status: 'pending',
    appliedDate: '2026-10-09'
  },
  {
    id: 'lve-03',
    teacherId: 't-10',
    teacherName: 'Coach M. Balaji',
    department: 'Physical Education',
    leaveType: 'On-Duty',
    startDate: '2026-10-22',
    endDate: '2026-10-23',
    days: 2,
    reason: 'Accompanying school athletic delegation for CBSE Regional Meet in Coimbatore.',
    status: 'approved',
    appliedDate: '2026-10-05',
    adminRemark: 'Approved. Official school contingent travel sanction.'
  }
];

// Fee Records
export const INITIAL_FEES: FeeRecord[] = [
  {
    id: 'fee-01',
    studentId: 'student-demo-01',
    studentName: 'Aarav Sundaram',
    class: '10',
    section: 'A',
    term: 'Term 1',
    amountDue: 65000,
    amountPaid: 65000,
    dueDate: '2026-07-15',
    paidDate: '2026-07-10',
    status: 'paid',
    receiptNo: 'CPS/2026-27/REC-4821',
    paymentMethod: 'UPI / NetBanking'
  },
  {
    id: 'fee-02',
    studentId: 'student-demo-01',
    studentName: 'Aarav Sundaram',
    class: '10',
    section: 'A',
    term: 'Term 2',
    amountDue: 45000,
    amountPaid: 45000,
    dueDate: '2026-10-31',
    paidDate: '2026-10-02',
    status: 'paid',
    receiptNo: 'CPS/2026-27/REC-7193',
    paymentMethod: 'UPI / NetBanking'
  },
  {
    id: 'fee-03',
    studentId: 'student-demo-01',
    studentName: 'Aarav Sundaram',
    class: '10',
    section: 'A',
    term: 'Term 3',
    amountDue: 35000,
    amountPaid: 0,
    dueDate: '2027-01-15',
    status: 'pending'
  },
  {
    id: 'fee-04',
    studentId: 'student-2',
    studentName: 'Diya Krishnan',
    class: '10',
    section: 'A',
    term: 'Term 2',
    amountDue: 45000,
    amountPaid: 45000,
    dueDate: '2026-10-31',
    paidDate: '2026-10-05',
    status: 'paid',
    receiptNo: 'CPS/2026-27/REC-7204',
    paymentMethod: 'Card'
  },
  {
    id: 'fee-05',
    studentId: 'student-3',
    studentName: 'Vikram Raman',
    class: '10',
    section: 'A',
    term: 'Term 2',
    amountDue: 45000,
    amountPaid: 30000,
    dueDate: '2026-10-31',
    status: 'partial'
  },
  {
    id: 'fee-06',
    studentId: 'student-7',
    studentName: 'Priya Venkatesh',
    class: '10',
    section: 'A',
    term: 'Term 2',
    amountDue: 45000,
    amountPaid: 0,
    dueDate: '2026-10-01',
    status: 'overdue'
  }
];

// Admission Applications
export const INITIAL_ADMISSIONS: AdmissionApplication[] = [
  {
    id: 'adm-01',
    applicantName: 'Harish Varma',
    appliedClass: '11 Science (PCMC)',
    parentName: 'Varma S. & Dr. Geetha Varma',
    parentPhone: '+91 98402 77112',
    parentEmail: 'varma.family@gmail.com',
    previousSchool: 'DAV Boys Senior Secondary School, Gopalapuram',
    submissionDate: '2026-10-08',
    status: 'new',
    notes: 'Scored 94% in Class 10 Pre-Boards. Seeking Computer Science elective.'
  },
  {
    id: 'adm-02',
    applicantName: 'Nandhini Soundararajan',
    appliedClass: '9',
    parentName: 'Soundararajan K.',
    parentPhone: '+91 94443 88990',
    parentEmail: 'soundar.k@yahoo.com',
    previousSchool: 'Bala Vidya Mandir, Adyar',
    submissionDate: '2026-10-05',
    status: 'under_review',
    notes: 'Transfer due to parent corporate relocation to Anna Nagar.'
  },
  {
    id: 'adm-03',
    applicantName: 'Siddharth Chari',
    appliedClass: '6',
    parentName: 'Raghavan Chari & Shanthi Chari',
    parentPhone: '+91 98841 33221',
    parentEmail: 'chari.s@gmail.com',
    previousSchool: 'The Schram Academy, Maduravoyal',
    submissionDate: '2026-09-29',
    status: 'approved',
    notes: 'Entrance assessment cleared with distinction. Seat offered.'
  },
  {
    id: 'adm-04',
    applicantName: 'Ananya Bharadwaj',
    appliedClass: '1',
    parentName: 'Bharadwaj M.',
    parentPhone: '+91 98418 99110',
    parentEmail: 'bharadwaj.m@outlook.com',
    previousSchool: 'CPS Junior Kindergarten',
    submissionDate: '2026-09-20',
    status: 'enrolled',
    notes: 'Fee deposit completed. Roll number allotted.'
  }
];

// School Events
export const INITIAL_EVENTS: SchoolEvent[] = [
  {
    id: 'evt-01',
    title: 'South Zone Inter-School Robotics Olympiad 2026',
    date: '2026-10-25',
    time: '09:00 AM - 05:00 PM',
    venue: 'CPS Central Auditorium & Maker Hub',
    category: 'Academic',
    description: 'Over 40 leading schools across Tamil Nadu competing in autonomous rover line-following and AI drone pathfinding.',
    image: '/src/assets/images/facility_stem_lab_1791637315291.jpg'
  },
  {
    id: 'evt-02',
    title: 'Annual Athletic Meet & Sports Day 2026',
    date: '2026-11-14',
    time: '08:00 AM - 03:30 PM',
    venue: 'Jawaharlal Nehru Stadium & School Grounds',
    category: 'Sports',
    description: 'House march past, track and field championships, relay spectacles, and martial arts demonstrations.',
    image: '/src/assets/images/hero_school_campus_1791637300796.jpg'
  },
  {
    id: 'evt-03',
    title: 'Dr. A.P.J. Abdul Kalam Science & Innovation Expo',
    date: '2026-11-28',
    time: '09:30 AM - 04:00 PM',
    venue: 'Campus Open Quadrangle',
    category: 'Academic',
    description: 'Student-led working prototypes featuring green renewable energy, tidal power models, and biotechnology exhibits.',
    image: '/src/assets/images/facility_digital_library_1791637329209.jpg'
  },
  {
    id: 'evt-04',
    title: 'CPS Grand Margazhi Cultural Fest & Classical Arts',
    date: '2026-12-19',
    time: '05:00 PM - 08:30 PM',
    venue: 'School Amphitheatre',
    category: 'Cultural',
    description: 'Carnatic vocal ensemble, Bharatanatyam recital by high school troupe, and thematic Western orchestra.',
    image: '/src/assets/images/hero_school_campus_1791637300796.jpg'
  }
];

// Lesson Plans
export const INITIAL_LESSON_PLANS: LessonPlan[] = [
  {
    id: 'lp-01',
    teacherId: 'teacher-demo-01',
    class: '10',
    subject: 'Mathematics',
    unit: 'Unit 4: Quadratic Equations',
    topic: 'Nature of Roots & Discriminant Invariants',
    date: '2026-10-10',
    learningObjectives: 'Students will determine real, distinct, or imaginary roots using b² - 4ac and apply conditions to engineering projectile problems.',
    activities: 'Interactive GeoGebra parabola simulation on smartboard followed by paired problem solving.',
    homework: 'Exercises 4.4 Questions 1 to 5 in NCERT Mathematics workbook.',
    syllabusProgress: 100,
    status: 'completed'
  },
  {
    id: 'lp-02',
    teacherId: 'teacher-demo-01',
    class: '10',
    subject: 'Mathematics',
    unit: 'Unit 5: Arithmetic Progressions',
    topic: 'Derivation of Sum of n Terms (Sn formula)',
    date: '2026-10-12',
    learningObjectives: 'Prove Sn = n/2 [2a + (n-1)d] using Gauss pairing methodology and apply to financial compound installment models.',
    activities: 'Historical visual proof using dot grid arrays and collaborative staircase puzzle.',
    homework: 'Problems 1 to 8 in Chapter 5.3.',
    syllabusProgress: 75,
    status: 'in_progress'
  },
  {
    id: 'lp-03',
    teacherId: 'teacher-demo-01',
    class: '10',
    subject: 'Mathematics',
    unit: 'Unit 8: Introduction to Trigonometry',
    topic: 'Trigonometric Ratios of Specific Angles (30°, 45°, 60°)',
    date: '2026-10-16',
    learningObjectives: 'Geometric derivation using equilateral and isosceles right triangles.',
    activities: 'Hand mnemonic technique and paper folding proof.',
    homework: 'Memorize standard angle table and solve Exercise 8.2.',
    syllabusProgress: 35,
    status: 'planned'
  }
];

// Messages
export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-01',
    senderId: 'teacher-demo-01',
    senderName: 'Dr. Meenakshi Raman',
    senderRole: 'teacher',
    recipientId: 'student-demo-01',
    content: 'Aarav, please ensure you review the parabola vertex symmetry notes before tomorrow’s formative quiz.',
    timestamp: 'Yesterday at 04:15 PM',
    subject: 'Mathematics Quiz Preparation'
  },
  {
    id: 'msg-02',
    senderId: 'student-demo-01',
    senderName: 'Aarav Sundaram',
    senderRole: 'student',
    recipientId: 'teacher-demo-01',
    content: 'Thank you Ma\'am! I have finished solving Question 8 and plotted the graph as instructed.',
    timestamp: 'Yesterday at 05:40 PM',
    subject: 'Mathematics Quiz Preparation'
  },
  {
    id: 'msg-03',
    senderId: 't-07',
    senderName: 'Mr. Karthik Natarajan',
    senderRole: 'teacher',
    recipientId: 'student-demo-01',
    content: 'Great effort on your Python sorting lab script. We would like to nominate you for the South Zone Hackathon.',
    timestamp: 'Today at 09:30 AM',
    subject: 'Robotics & Hackathon Nomination'
  }
];
