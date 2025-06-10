import { useEffect, useState } from 'react';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import { useTenant } from '../../contexts/TenantContext';
import { BUSINESS_CONFIGS } from '../../types/tenant';
import BusinessSwitcher from '../../components/BusinessSwitcher';
import DashboardLayout from '../../components/DashboardLayout';
import KPISection from '../../components/KPISection';
import CashflowSection from '../../components/CashflowSection';
import InventorySection from '../../components/InventorySection';
import ReportsSection from '../../components/ReportsSection';
import MarketingSection from '../../components/MarketingSection';
import OperationsSection from '../../components/OperationsSection';
import RevenueSection from '../../components/RevenueSection';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DashboardPage() {
  const { currentTenant } = useTenant();
  const [tabValue, setTabValue] = useState(0);

  // Redirect to login if not authenticated
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      window.location.href = '/login';
    }
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {currentTenant.name} Dashboard
          </Typography>
          <BusinessSwitcher 
            currentBusinessId={currentTenant.id}
            businesses={Object.values(BUSINESS_CONFIGS)}
          />
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
            <Tab label="Overview" id="dashboard-tab-0" />
            <Tab label="Revenue" id="dashboard-tab-1" />
            <Tab label="Operations" id="dashboard-tab-2" />
            <Tab label="Marketing" id="dashboard-tab-3" />
            <Tab label="Reports" id="dashboard-tab-4" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <KPISection />
          {currentTenant.features.finance && (
            <CashflowSection stores={currentTenant.stores} />
          )}
          {currentTenant.features.inventory && (
            <InventorySection />
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <RevenueSection />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <OperationsSection />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <MarketingSection />
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <ReportsSection />
        </TabPanel>
      </Container>
    </DashboardLayout>
  );
} 