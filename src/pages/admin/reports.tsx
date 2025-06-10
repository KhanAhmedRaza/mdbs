import { Container } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';
import ReportsSection from '../../components/ReportsSection';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <ReportsSection />
      </Container>
    </DashboardLayout>
  );
} 