import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Stack,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  BarChart as ChartIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  AccountBalance as FinanceIcon,
  People as CustomersIcon,
  Inventory as InventoryIcon,
  Schedule as AppointmentsIcon,
  TrendingUp as PerformanceIcon,
  Campaign as MarketingIcon,
} from '@mui/icons-material';
import ClientOnly from './ClientOnly';

interface ReportType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  availableFormats: string[];
}

const ReportsSection: React.FC = () => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().setDate(1)) // First day of current month
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const reportTypes: ReportType[] = [
    {
      id: 'financial',
      title: 'Financial Summary',
      description: 'Revenue, expenses, profit margins, and financial trends',
      icon: <FinanceIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      availableFormats: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 'customers',
      title: 'Customer Analytics',
      description: 'Customer demographics, retention rates, and satisfaction scores',
      icon: <CustomersIcon sx={{ fontSize: 40, color: theme.palette.info.main }} />,
      availableFormats: ['PDF', 'Excel'],
    },
    {
      id: 'inventory',
      title: 'Inventory Status',
      description: 'Stock levels, usage patterns, and reorder recommendations',
      icon: <InventoryIcon sx={{ fontSize: 40, color: theme.palette.warning.main }} />,
      availableFormats: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 'appointments',
      title: 'Appointment Analytics',
      description: 'Booking trends, popular services, and peak hours',
      icon: <AppointmentsIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      availableFormats: ['PDF', 'Excel'],
    },
    {
      id: 'performance',
      title: 'Staff Performance',
      description: 'Service ratings, productivity metrics, and revenue per staff',
      icon: <PerformanceIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      availableFormats: ['PDF', 'Excel'],
    },
    {
      id: 'marketing',
      title: 'Marketing Results',
      description: 'Campaign performance, ROI analysis, and customer acquisition',
      icon: <MarketingIcon sx={{ fontSize: 40, color: theme.palette.error.main }} />,
      availableFormats: ['PDF', 'Excel', 'CSV'],
    },
  ];

  const handleGenerateReport = (reportId: string, format: string) => {
    // In a real app, this would call an API to generate the report
    console.log(`Generating ${reportId} report in ${format} format`);
    console.log(`Date range: ${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Reports & Analytics
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
        <ClientOnly>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { size: 'small' } }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ textField: { size: 'small' } }}
            />
            <Button
              variant="outlined"
              startIcon={<ChartIcon />}
              onClick={() => handleGenerateReport('all', 'PDF')}
            >
              Generate All Reports
            </Button>
          </Stack>
        </ClientOnly>
      </Paper>

      <Grid container spacing={3}>
        {reportTypes.map((report) => (
          <Grid item xs={12} sm={6} md={4} key={report.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {report.icon}
                  <Typography variant="h6" sx={{ ml: 2 }}>
                    {report.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {report.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Box>
                  {report.availableFormats.map((format) => (
                    <Tooltip key={format} title={`Download as ${format}`}>
                      <IconButton
                        size="small"
                        onClick={() => handleGenerateReport(report.id, format)}
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
                <Box>
                  <Tooltip title="Print Report">
                    <IconButton size="small">
                      <PrintIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share Report">
                    <IconButton size="small">
                      <ShareIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="body2" color="textSecondary">
          Reports are generated in real-time with the latest data
        </Typography>
      </Box>
    </Box>
  );
};

export default ReportsSection; 