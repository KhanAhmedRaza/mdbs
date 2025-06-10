import { Container } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';
import CashflowSection from '../../components/CashflowSection';
import { useTenant } from '../../contexts/TenantContext';

export default function RevenuePage() {
  const { currentTenant } = useTenant();

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <CashflowSection stores={currentTenant.stores} />
      </Container>
    </DashboardLayout>
  );
} 