import { Container } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';
import InventorySection from '../../components/InventorySection';

export default function InventoryPage() {
  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <InventorySection />
      </Container>
    </DashboardLayout>
  );
} 