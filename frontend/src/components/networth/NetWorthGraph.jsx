import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Box, Typography, Grid } from '@mui/material';

const COLORS = ['#4CAF50', '#F44336', '#FFBB28', '#FF8042']; // Green for assets, Red for liabilities

function NetWorthGraph({ items }) {
  const totalNetWorthData = [
    { name: 'Assets', value: items.filter(item => item.type === 'assets' && !item.excluded).reduce((sum, item) => sum + item.value, 0) },
    { name: 'Liabilities', value: items.filter(item => item.type === 'liabilities' && !item.excluded).reduce((sum, item) => sum + item.value, 0) }
  ];

  const assetsData = items.filter(item => item.type === 'assets' && !item.excluded).map(item => ({ name: item.name, value: item.value }));
  const liabilitiesData = items.filter(item => item.type === 'liabilities' && !item.excluded).map(item => ({ name: item.name, value: item.value }));

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Net Worth Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Total Net Worth
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={totalNetWorthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`} />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Bar dataKey="value" name="Value">
                {totalNetWorthData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Assets
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={assetsData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {assetsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Liabilities
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={liabilitiesData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {liabilitiesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NetWorthGraph;
