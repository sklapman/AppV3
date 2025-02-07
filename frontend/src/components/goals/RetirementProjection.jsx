// RetirementProjection.js
import React, { useState, useCallback, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  TextField, 
  Box,
  Divider,
  Paper,
  InputAdornment 
} from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import RetirementIcon from '@mui/icons-material/BeachAccess'; // Import a retirement icon
import { 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  ComposedChart,
  ReferenceDot
} from 'recharts';

const RetirementProjection = () => {
  const [retirementData, setRetirementData] = useState(() => {
    const savedData = localStorage.getItem('retirementData');
    return savedData ? JSON.parse(savedData) : {
      currentAge: 30,
      amountInvested: 100000,
      investedEachYear: 20000,
      growthRate: 8,
      retirementAge: 65,
      annualWithdrawal: 80000,
      socialSecurityAge: 67,
      socialSecurityPayment: 20000,
    };
  });

  const [chartData, setChartData] = useState([]);

  const calculateProjection = useCallback(() => {
    const growthRate = retirementData.growthRate / 100;
    let balance = retirementData.amountInvested;
    let totalContributions = retirementData.amountInvested;
    let totalWithdrawals = 0;
    let totalSocialSecurity = 0;
    const data = [];
    const finalAge = 95;

    for (let age = retirementData.currentAge; age <= finalAge; age++) {
      const isRetirementPhase = age >= retirementData.retirementAge;

      if (age >= retirementData.socialSecurityAge) {
        balance += retirementData.socialSecurityPayment;
        totalSocialSecurity += retirementData.socialSecurityPayment;
      }

      if (!isRetirementPhase) {
        balance = (balance + retirementData.investedEachYear) * (1 + growthRate);
        totalContributions += retirementData.investedEachYear;
      } else {
        balance = (balance - retirementData.annualWithdrawal) * (1 + growthRate);
        totalWithdrawals += retirementData.annualWithdrawal;
      }

      data.push({
        age,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions),
        earnings: Math.round(balance - totalContributions + totalWithdrawals),
        withdrawals: Math.round(totalWithdrawals),
        socialSecurity: totalSocialSecurity,
        phase: isRetirementPhase ? 'Withdrawal' : 'Accumulation'
      });
    }

    return data;
  }, [retirementData]);

  useEffect(() => {
    setChartData(calculateProjection());
  }, [calculateProjection]);

  useEffect(() => {
    localStorage.setItem('retirementData', JSON.stringify(retirementData));
  }, [retirementData]);

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper 
          sx={{ 
            p: 2.5, 
            backgroundColor: 'rgba(255, 255, 255, 0.98)', 
            boxShadow: 3,
            minWidth: '200px'
          }}
        >
          <Typography variant="h6" sx={{ mb: 1.5, color: '#2d3436' }}>
            Age {label}
          </Typography>
          {payload.map((entry, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 0.75
              }}
            >
              <Typography 
                sx={{ 
                  color: entry.color,
                  fontWeight: entry.dataKey === 'balance' ? 600 : 400,
                  fontSize: entry.dataKey === 'balance' ? '1.1rem' : '0.9rem'
                }}
              >
                {entry.name}:
              </Typography>
              <Typography 
                sx={{ 
                  color: entry.color,
                  fontWeight: entry.dataKey === 'balance' ? 600 : 400,
                  fontSize: entry.dataKey === 'balance' ? '1.1rem' : '0.9rem'
                }}
              >
                {formatCurrency(entry.value)}
              </Typography>
            </Box>
          ))}
        </Paper>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy } = props;
    return (
      <svg x={cx - 12} y={cy - 12} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <RetirementIcon sx={{ color: '#ff7300', fontSize: 24 }} />
      </svg>
    );
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <SavingsIcon sx={{ mr: 2, color: 'primary.main' }} />
        Retirement Projection
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Full-width graph section */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="age" 
              label={{ 
                value: 'Age (years)', 
                position: 'insideBottom', 
                offset: -10,
                style: { textAnchor: 'middle', fill: '#666' }
              }}
              tick={{ fill: '#666' }}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              tick={{ fill: '#666' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              formatter={(value) => <span style={{ color: '#666', fontSize: '0.9rem' }}>{value}</span>}
            />
            <Area 
              type="monotone" 
              dataKey="contributions" 
              stackId="1"
              fill="#82ca9d" 
              fillOpacity={0.3}
              stroke="#82ca9d"
              name="Total Contributions"
            />
            <Area 
              type="monotone" 
              dataKey="earnings" 
              stackId="1"
              fill="#8884d8" 
              fillOpacity={0.3}
              stroke="#8884d8"
              name="Investment Earnings"
            />
            <Area 
              type="monotone" 
              dataKey="withdrawals" 
              fill="#ff6b6b" 
              fillOpacity={0.2}
              stroke="#ff6b6b"
              name="Total Withdrawals"
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#ff7300"
              strokeWidth={3}
              dot={false}
              name="Total Balance"
            />
            <Line
              type="monotone"
              dataKey="socialSecurity"
              stroke="#8884d8"
              strokeWidth={2}
              name="Social Security"
            />
            <ReferenceDot 
              x={retirementData.retirementAge} 
              y={chartData.find(d => d.age === retirementData.retirementAge)?.balance || 0} 
              r={10} 
              fill="#ff7300" 
              stroke="none"
              label={<CustomDot />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Paper>

      {/* Controls section below graph */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Current Age"
              type="number"
              fullWidth
              margin="normal"
              value={retirementData.currentAge}
              onChange={(e) => setRetirementData({ ...retirementData, currentAge: parseInt(e.target.value) || 0 })}
              InputProps={{
                inputProps: { min: 0, max: 100 }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Amount Already Invested"
              type="number"
              fullWidth
              margin="normal"
              value={retirementData.amountInvested}
              onChange={(e) => setRetirementData({ ...retirementData, amountInvested: parseInt(e.target.value) || 0 })}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Annual Investment"
              type="number"
              fullWidth
              margin="normal"
              value={retirementData.investedEachYear}
              onChange={(e) => setRetirementData({ ...retirementData, investedEachYear: parseInt(e.target.value) || 0 })}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Expected Annual Return (%)"
              type="number"
              fullWidth
              margin="normal"
              value={retirementData.growthRate}
              onChange={(e) => setRetirementData({ ...retirementData, growthRate: parseFloat(e.target.value) || 0 })}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                inputProps: { min: 0, max: 20, step: 0.1 }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Retirement Age"
              type="number"
              fullWidth
              margin="normal"
              value={retirementData.retirementAge}
              onChange={(e) => setRetirementData({ ...retirementData, retirementAge: parseInt(e.target.value) || 0 })}
              InputProps={{
                inputProps: { min: 0, max: 100 }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Annual Retirement Spending"
              type="number"
              fullWidth
              margin="normal"
              value={retirementData.annualWithdrawal}
              onChange={(e) => setRetirementData({ ...retirementData, annualWithdrawal: parseInt(e.target.value) || 0 })}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Social Security Start Age"
              type="number"
              fullWidth
              margin="normal"
              value={retirementData.socialSecurityAge}
              onChange={(e) =>
                setRetirementData({ 
                  ...retirementData, 
                  socialSecurityAge: parseInt(e.target.value) || 0 
                })
              }
              InputProps={{
                inputProps: { min: 0, max: 100 }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Annual Social Security Payment"
              type="number"
              fullWidth
              margin="normal"
              value={retirementData.socialSecurityPayment}
              onChange={(e) =>
                setRetirementData({ 
                  ...retirementData, 
                  socialSecurityPayment: parseInt(e.target.value) || 0 
                })
              }
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default RetirementProjection;
