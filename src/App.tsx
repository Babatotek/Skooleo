import React, { useState } from 'react';
import { UserRole, StudentRecord } from './types';
import {
  USER_PROFILES,
  INITIAL_STUDENTS,
} from './data/mockData';

// Header & Navigation
import { Header } from './components/Header';
import { RoleSwitcher } from './components/RoleSwitcher';

// Views
import { LandingView } from './components/views/LandingView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { TeacherDashboardView } from './components/views/TeacherDashboardView';
import { PrincipalDashboardView } from './components/views/PrincipalDashboardView';
import { SuperAdminDashboardView } from './components/views/SuperAdminDashboardView';
import { ParentDashboardView } from './components/views/ParentDashboardView';
import { StudentDashboardView } from './components/views/StudentDashboardView';
import { StudentsDirectoryView } from './components/views/StudentsDirectoryView';
import { ResourceLibraryView } from './components/views/ResourceLibraryView';

// Modals
import { SmartMarkModal } from './components/modals/SmartMarkModal';
import { AILessonBuilderModal } from './components/modals/AILessonBuilderModal';
import { RegisterStudentModal } from './components/modals/RegisterStudentModal';
import { AttendanceModal } from './components/modals/AttendanceModal';
import { ReportCardModal } from './components/modals/ReportCardModal';
import { ResultCheckerModal } from './components/modals/ResultCheckerModal';
import { OnboardingWizardModal } from './components/modals/OnboardingWizardModal';
import { MakePaymentModal } from './components/modals/MakePaymentModal';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('school_admin');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);

  // Modal Management
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  const currentUser = USER_PROFILES[currentRole] || USER_PROFILES.school_admin;

  const handleOpenModal = (modalName: string, data?: any) => {
    setActiveModal(modalName);
    setModalData(data || null);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const handleSaveNewStudent = (newStudent: StudentRecord) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    setActiveTab(newRole === 'school_admin' ? 'dashboard' : 'home');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Top Main Navigation Header */}
      <Header
        currentRole={currentRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectTab={setActiveTab}
        onSelectRole={handleRoleChange}
        onOpenModal={handleOpenModal}
        profile={currentUser}
        currentUser={currentUser}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-20">
        {currentRole === 'landing' ? (
          <LandingView
            onSelectRole={handleRoleChange}
            onOpenModal={handleOpenModal}
          />
        ) : activeTab === 'students' ? (
          <StudentsDirectoryView
            students={students}
            onOpenModal={handleOpenModal}
            onNavigateTab={setActiveTab}
          />
        ) : (activeTab === 'resources' || activeTab === 'lessons') ? (
          <ResourceLibraryView
            onOpenModal={handleOpenModal}
            onNavigateTab={setActiveTab}
          />
        ) : (
          <>
            {currentRole === 'school_admin' && (
              <AdminDashboardView
                students={students}
                onOpenModal={handleOpenModal}
                onNavigateTab={setActiveTab}
              />
            )}

            {currentRole === 'teacher' && (
              <TeacherDashboardView
                onOpenModal={handleOpenModal}
                onNavigateTab={setActiveTab}
              />
            )}

            {currentRole === 'principal' && (
              <PrincipalDashboardView
                onOpenModal={handleOpenModal}
                onNavigateTab={setActiveTab}
              />
            )}

            {currentRole === 'super_admin' && (
              <SuperAdminDashboardView
                onOpenModal={handleOpenModal}
                onNavigateTab={setActiveTab}
              />
            )}

            {currentRole === 'parent' && (
              <ParentDashboardView
                onOpenModal={handleOpenModal}
                onNavigateTab={setActiveTab}
              />
            )}

            {currentRole === 'student' && (
              <StudentDashboardView
                onOpenModal={handleOpenModal}
                onNavigateTab={setActiveTab}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Floating Interactive Role Switcher */}
      <RoleSwitcher
        currentRole={currentRole}
        onSelectRole={handleRoleChange}
        onOpenModal={handleOpenModal}
      />

      {/* All Integrated Interactive Modals */}
      <SmartMarkModal
        isOpen={activeModal === 'smartmark_scan' || activeModal === 'smartmark'}
        onClose={handleCloseModal}
      />

      <AILessonBuilderModal
        isOpen={activeModal === 'ai_lesson_builder' || activeModal === 'ai_lesson'}
        onClose={handleCloseModal}
        initialTopic={modalData?.topic}
      />

      <RegisterStudentModal
        isOpen={activeModal === 'register_student'}
        onClose={handleCloseModal}
        onSaveStudent={handleSaveNewStudent}
      />

      <AttendanceModal
        isOpen={activeModal === 'attendance'}
        onClose={handleCloseModal}
        initialClassArm={modalData?.classArm}
      />

      <ReportCardModal
        isOpen={activeModal === 'report_card'}
        onClose={handleCloseModal}
        student={modalData}
      />

      <ResultCheckerModal
        isOpen={activeModal === 'result_checker'}
        onClose={handleCloseModal}
        student={modalData}
        onOpenReportCard={(student) => handleOpenModal('report_card', student)}
      />

      <OnboardingWizardModal
        isOpen={activeModal === 'onboarding_wizard'}
        onClose={handleCloseModal}
      />

      <MakePaymentModal
        isOpen={activeModal === 'make_payment'}
        onClose={handleCloseModal}
        student={modalData}
      />

    </div>
  );
}
