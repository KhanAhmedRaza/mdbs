import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import FinanceSection from '../../components/admin/FinanceSection';

export default function AdminFinance() {
  return (
    <DashboardLayout>
      <FinanceSection />
    </DashboardLayout>
  );
}