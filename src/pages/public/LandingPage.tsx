import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import {
  School,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Users,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Send,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  FlaskConical,
  Trophy,
  Compass,
  Layers,
  Heart
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { announcements, events, createAdmission } = useSchool();

  // Admission form state
  const [admissionForm, setAdmissionForm] = useState({
    applicantName: '',
    appliedClass: '11 Science (PCMC)',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    previousSchool: '',
    notes: ''
  });
  const [admissionSuccess, setAdmissionSuccess] = useState(false);

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admissionForm.applicantName || !admissionForm.parentName) return;
    createAdmission(admissionForm);
    setAdmissionSuccess(true);
    setTimeout(() => {
      setAdmissionSuccess(false);
      setAdmissionForm({
        applicantName: '',
        appliedClass: '11 Science (PCMC)',
        parentName: '',
        parentPhone: '',
        parentEmail: '',
        previousSchool: '',
        notes: ''
      });
    }, 4000);
  };

  // Gallery category filter
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'academic' | 'sports' | 'cultural'>('all');

  const galleryItems = [
    {
      title: 'Modern Academic Quadrangle',
      category: 'academic',
      image: '/src/assets/images/hero_school_campus_1791637300796.jpg',
      caption: 'Main administrative block and green quadrangle'
    },
    {
      title: 'STEM Robotics & Electronics Lab',
      category: 'academic',
      image: '/src/assets/images/facility_stem_lab_1791637315291.jpg',
      caption: 'Grade 10 students building autonomous rovers'
    },
    {
      title: 'Collaborative Digital Library',
      category: 'academic',
      image: '/src/assets/images/facility_digital_library_1791637329209.jpg',
      caption: 'Quiet research sanctuary with high-speed digital catalog'
    },
    {
      title: 'South Zone Athletic Championship',
      category: 'sports',
      image: '/src/assets/images/hero_school_campus_1791637300796.jpg',
      caption: 'Inter-house relay championship ceremony'
    },
    {
      title: 'Annual Margazhi Classical Recital',
      category: 'cultural',
      image: '/src/assets/images/facility_digital_library_1791637329209.jpg',
      caption: 'High school choir and classical dance performance'
    },
    {
      title: 'Dr. Kalam Science Innovation Expo',
      category: 'academic',
      image: '/src/assets/images/facility_stem_lab_1791637315291.jpg',
      caption: 'Renewable energy working prototype displays'
    }
  ];

  const filteredGallery =
    galleryFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === galleryFilter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors">
      <Navbar onNavigate={onNavigate} />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 rounded-full text-xs font-semibold text-sky-800 dark:text-sky-300">
                <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Admissions Open for Academic Year 2026–2027</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-white tracking-tight leading-[1.1]">
                Empowering Young Minds for a <span className="text-sky-600 dark:text-sky-400">Smarter Tomorrow</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Where knowledge meets innovation, creativity meets opportunity, and every student is empowered to grow into a visionary leader.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#about"
                  className="px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl transition-all shadow-xs"
                >
                  Explore Our School
                </a>
                <button
                  onClick={() => onNavigate('/login')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-lg shadow-sky-600/25 transition-all"
                >
                  <span>Access SmartHub Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>CBSE Senior Secondary (Grades 1–12)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Smart AI & STEM Laboratories</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% Board Pass Distinction</span>
                </div>
              </div>
            </div>

            {/* Right Column: Campus Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 group">
                <img
                  src="/src/assets/images/hero_school_campus_1791637300796.jpg"
                  alt="Chennai Public School Campus"
                  className="w-full h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                    SDI Campus · Anna Nagar, Chennai
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mt-1">
                    State-of-the-Art Green Infrastructure
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Equipped with interactive digital smartboards, advanced science labs, and sustainable architecture.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-center md:text-left border-r border-slate-100 dark:border-slate-800 last:border-0 p-2">
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-sky-600 dark:text-sky-400 tabular-nums">
                500+
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                Active Enrolled Students
              </p>
            </div>
            <div className="text-center md:text-left border-r border-slate-100 dark:border-slate-800 last:border-0 p-2">
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tabular-nums">
                30+
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                Distinguished Expert Faculty
              </p>
            </div>
            <div className="text-center md:text-left border-r border-slate-100 dark:border-slate-800 last:border-0 p-2">
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400 tabular-nums">
                100%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                Board Exam Pass Track Record
              </p>
            </div>
            <div className="text-center md:text-left p-2">
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-indigo-600 dark:text-indigo-400 tabular-nums">
                18+
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                Specialized Labs & Studios
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Principal Quote & Portrait */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800">
                <img
                  src="/src/assets/images/principal_portrait_1791637340517.jpg"
                  alt="Dr. Vasundhara Sharma, Principal"
                  className="w-full h-80 object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    Dr. Vasundhara Sharma, Ph.D.
                  </h4>
                  <p className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                    Principal & Senior Educational Director
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Recipients of National Teacher Excellence Award
                  </p>
                </div>
              </div>
            </div>

            {/* About Prose & Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                About Chennai Public School
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-950 dark:text-white tracking-tight">
                Nurturing Global Competence Rooted in Enduring Human Values
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Founded with a visionary commitment to academic distinction, Chennai Public School provides a transformative learning journey for students from Grade 1 through Senior Secondary. Our dynamic curriculum pairs national educational benchmarks with 21st-century problem-solving, digital literacy, and civic responsibility.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-2.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white">Our Mission</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                    To cultivate critical thinking, curiosity, and ethical conviction in every child.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white">Our Vision</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                    To emerge as South India's premier benchmark for transformative school education.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
                    <Heart className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white">Our Values</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                    Integrity, empathy, excellence, diversity, and environmental stewardship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACADEMIC EXCELLENCE */}
      <section id="academics" className="py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Curricular Pathways
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-950 dark:text-white mt-1">
              Rigorous Academic Frameworks (Grades 1 to 12)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Designed around experiential inquiry, foundational mastery, and comprehensive competitive readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                Primary School (Grades 1–5)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Foundational numeracy, linguistic phonics, bilingual immersion (Tamil/Hindi/English), visual art, and activity-led environmental curiosity.
              </p>
              <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Hands-on Math Manipulatives</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Reading Comprehension Circles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Interactive Smartboard Classes</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                Middle School (Grades 6–8)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Interdisciplinary scientific investigations, algebra & geometry foundations, third languages (French/Sanskrit), coding algorithms, and social debates.
              </p>
              <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Physics & Chemistry Wet Labs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Python & Block Coding Projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Model United Nations (MUN) Training</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                Secondary & Senior (Grades 9–12)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                CBSE Board curriculum with streams in Science (PCMB / PCMC), Commerce (Accountancy, Business, Economics), and Humanities with integrated entrance coaching.
              </p>
              <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>JEE / NEET / CUET Competitive Cell</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Advanced Computer Science & AI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Career Guidance & University Advisory</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MODERN FACILITIES */}
      <section id="facilities" className="py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Campus Infrastructure
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-950 dark:text-white mt-1">
              Purpose-Built Spaces Inspiring Discovery
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Every square foot is engineered to support active learning, physical wellness, and creative expression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col">
              <img
                src="/src/assets/images/facility_stem_lab_1791637315291.jpg"
                alt="STEM Robotics & AI Lab"
                className="w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 space-y-2 flex-1">
                <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wide">
                  Innovation Hub
                </span>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  STEM 2.0 & Robotics Maker Lab
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Equipped with 3D printers, microcontroller boards (Arduino & Raspberry Pi), sensor telemetry kits, and interactive digital oscilloscope workstations for real engineering prototypes.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col">
              <img
                src="/src/assets/images/facility_digital_library_1791637329209.jpg"
                alt="Digital Library & Research Sanctuary"
                className="w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 space-y-2 flex-1">
                <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wide">
                  Knowledge Sanctuary
                </span>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Collaborative Digital Library
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Home to over 25,000 print volumes, JSTOR & EBSCO academic digital subscriptions, high-speed terminal kiosks, and ergonomic study pods for focused independent research.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACHIEVEMENTS & ANNOUNCEMENTS PREVIEW */}
      <section className="py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Achievements */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Our Accolades
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-950 dark:text-white">
                Celebrating Academic & Sporting Laurels
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-xs">
                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                      1st Place — Tamil Nadu Inter-School Robotics Olympiad 2026
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Our Senior High School Rover Team secured Gold out of 68 participating schools.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                      100% First Class & 42 School Toppers in CBSE Grade 10
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Average school aggregate of 88.6% across Mathematics, Science and Computer Applications.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-xs">
                  <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                      South Zone CBSE Athletic Champions 2025–26
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      14 medals in track and field events with 3 athletes qualifying for national selection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Real-time School Notices */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    Notice Board
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-950 dark:text-white">
                    Official Announcements
                  </h2>
                </div>
                <button
                  onClick={() => onNavigate('/login')}
                  className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                >
                  <span>Portal View</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {announcements.slice(0, 3).map((ann) => (
                  <div
                    key={ann.id}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                        {ann.category}
                      </span>
                      <span className="text-[11px] text-slate-400">{ann.date}</span>
                    </div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                      {ann.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {ann.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SCHOOL GALLERY */}
      <section className="py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Visual Showcase
              </span>
              <h2 className="font-display font-bold text-3xl text-slate-950 dark:text-white mt-1">
                Campus Life in Frame
              </h2>
            </div>

            {/* Segmented filter */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start md:self-auto">
              {(['all', 'academic', 'sports', 'cultural'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                    galleryFilter === cat
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  {cat === 'all' ? 'All Glimpses' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs relative"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-slate-900">
                  <p className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wide">
                    {item.category}
                  </p>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ADMISSIONS FORM (INTERCONNECTED TO ADMIN DESK!) */}
      <section id="admissions" className="py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Join Chennai Public School
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-950 dark:text-white">
                Admissions Open for 2026–2027
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Take the first step toward unlocking your child's highest potential. Submit an online expression of interest, and our Academic Advisory Counsellor will reach out within 24 hours.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <span>Submit online registration form below</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <span>Campus walk-through & friendly diagnostic interaction</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <span>Provisional offer & document verification</span>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-1">
                  Online Admission Registration
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Submissions are directly routed to the Admin Admissions Desk in real time.
                </p>

                {admissionSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                    <span>
                      Application successfully submitted! Ref #ADM-2026. The Admin Desk has received your application.
                    </span>
                  </div>
                )}

                <form onSubmit={handleAdmissionSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Harini Subramanian"
                        value={admissionForm.applicantName}
                        onChange={(e) => setAdmissionForm({ ...admissionForm, applicantName: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Seeking Grade / Stream *
                      </label>
                      <select
                        value={admissionForm.appliedClass}
                        onChange={(e) => setAdmissionForm({ ...admissionForm, appliedClass: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:border-sky-500"
                      >
                        <option value="Grade 1">Grade 1 (Primary)</option>
                        <option value="Grade 6">Grade 6 (Middle School)</option>
                        <option value="Grade 9">Grade 9 (Secondary)</option>
                        <option value="11 Science (PCMC)">Grade 11 Science (PCMC / AI)</option>
                        <option value="11 Commerce (CEBA)">Grade 11 Commerce & Economics</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. K. Subramanian"
                        value={admissionForm.parentName}
                        onChange={(e) => setAdmissionForm({ ...admissionForm, parentName: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98400 00000"
                        value={admissionForm.parentPhone}
                        onChange={(e) => setAdmissionForm({ ...admissionForm, parentPhone: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="parent@example.com"
                        value={admissionForm.parentEmail}
                        onChange={(e) => setAdmissionForm({ ...admissionForm, parentEmail: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Current / Previous School
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DAV / Chettinad Vidyashram"
                      value={admissionForm.previousSchool}
                      onChange={(e) => setAdmissionForm({ ...admissionForm, previousSchool: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Additional Notes or Elective Preferences
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Special interests, athletic accomplishments, second language preference..."
                      value={admissionForm.notes}
                      onChange={(e) => setAdmissionForm({ ...admissionForm, notes: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:border-sky-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all shadow-md shadow-sky-600/25 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Admission Application</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT SECTION */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Get in Touch
            </span>
            <h2 className="font-display font-bold text-3xl text-slate-950 dark:text-white mt-1">
              Visit Our Anna Nagar Campus
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              We welcome prospective parents and educational delegates for scheduled campus tours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Campus Address</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                SDI Campus, TVS Avenue, Anna Nagar West Extension, Chennai, Tamil Nadu — 600101
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Contact Helplines</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Admissions: +91 44 2615 3700<br />
                Administrative Desk: +91 44 2615 8200<br />
                Student Support: +91 98401 22334
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Official Correspondence</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Admissions: admissions@chennaipublicschool.com<br />
                Principal: principal@chennaipublicschool.com<br />
                SmartHub Portal: smarthub@cps.edu.in
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
