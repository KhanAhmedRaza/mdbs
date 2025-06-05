import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from '@mui/material';
import {
  CalendarToday,
  AttachMoney,
  People,
  TrendingUp,
} from '@mui/icons-material';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

const DashboardCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { key } = context.query;

  if (key === 'mdb2024') {
    return {
      redirect: {
        destination: '/admin/dashboard?key=' + key,
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/auth',
      permanent: false,
    },
  };
};

// This page will never be rendered
export default function Admin() {
  return null;
} 