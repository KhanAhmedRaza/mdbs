import { Container, Typography } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Typography>
          System settings and configuration coming soon...
        </Typography>
      </Container>
    </DashboardLayout>
  );
} 