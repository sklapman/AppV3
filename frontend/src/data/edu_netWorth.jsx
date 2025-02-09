import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

export const netWorth = {
  title: "Net Worth",
  description: "Understanding your net worth is essential for making informed financial decisions. By taking a close look at your assets and liabilities, you can identify both strengths and areas of improvement. This process lays the groundwork for creating effective budgets, maintaining healthy savings, and ultimately achieving your short-term and long-term goals. A clear grasp of your net worth helps you make strategic decisions, avoid unnecessary debt, and set realistic expectations for the future.",
  summary: "Knowing your net worth is the first step to financial planning.",
  content: [
    {
      heading: "Assessing Your Finances",
      text: "Assessing your finances begins with taking a comprehensive look at all the moving parts that make up your financial life. It involves gathering details about your income sources, monthly expenditures, and any existing debts or liabilities. This self-evaluation not only shows you where your money is going but also helps you identify trends that could be either beneficial (like consistent savings) or detrimental (like recurring overspending). A thorough assessment is the bedrock of a good financial plan because it reveals your spending habits and uncovers hidden leaks in your budget that may be holding you back. The better you understand your financial picture, the easier it is to make responsible decisions about saving, investing, and spending."
    },
    {
      heading: "Income",
      text: "Income is the fuel that drives your financial engine. It includes wages from a job, returns on investments, rental earnings, or profits from a side hustle or business. By increasing the number of income streams, you reduce your dependency on one source and create a buffer against unforeseen setbacks. Properly tracking and categorizing your income sources helps you measure financial progress over time. Knowing how much you earn allows you to set realistic goals and develop strategies to meet or exceed them—whether that involves asking for a raise, seeking better-paying opportunities, or turning a hobby into a profitable venture."
    },
    {
      heading: "Expenses",
      text: "Expenses are the outflow of money to cover your various needs and wants—ranging from essential bills like rent, utilities, and groceries, to discretionary spending such as dining out or entertainment. Understanding your expenses is crucial for maintaining balance in your financial life. When you categorize expenses, you’re more aware of potential areas for cost-saving measures and can decide how best to distribute your funds. A deeper look at spending patterns makes it easier to identify which costs are necessary and which can be trimmed to free up resources for more significant financial goals like saving, investing, or paying down debt."
    },
    {
      heading: "Net Worth",
      text: "Net worth acts like a scoreboard for your overall financial health, calculated as the difference between your assets (the things you own) and your liabilities (the debts you owe). Assets might include properties, investments, or valuable personal possessions, while liabilities encompass credit card balances, loans, or mortgages. Tracking your net worth over time provides a snapshot of whether you’re moving closer to—or further away from—financial independence. An upward trend indicates growth and prosperity, while a downward or stagnant trend may signal the need to reassess your spending, debt repayment strategies, or investment approach."
    },
    {
      heading: "Emergency Fund",
      text: "An emergency fund is the financial safety net designed to catch you when life’s unexpected costs come knocking, be it a sudden medical bill, car repair, or a job loss. Typically, experts recommend setting aside three to six months’ worth of living expenses for emergencies. This buffer protects your regular savings and investments from the impact of unforeseen events. By having quick access to cash during difficult times, you can avoid high-interest loans and keep your finances on track. Building an emergency fund gradually—either by automating part of your paycheck or depositing surplus earnings—can significantly reduce stress and provide peace of mind."
    },
    {
      heading: "Budgeting",
      text: "Budgeting is the process of mapping out where every dollar goes and ensuring your spending aligns with your financial goals. A well-crafted budget details monthly income, categorizes expenditures, and sets limits on variable costs like entertainment or eating out. By following a strict yet realistic plan, you can prioritize essential expenses, save for emergencies, pay off debt, and even reward yourself sensibly. Budgeting also helps you develop long-term financial discipline. Over time, you become more attentive to how your spending choices impact your overall financial health, making you better equipped to manage unexpected challenges and pursue wealth-building opportunities."
    },
    {
      heading: "Debt Management",
      text: "Debt management involves crafting and executing a plan to repay money borrowed through credit cards, loans, or other forms of credit. High-interest debt—such as credit card balances—often poses the greatest risk to financial stability if left unchecked. By methodically prioritizing and repaying outstanding balances, you minimize interest costs and free up more cash for saving or investing. Some popular strategies include the “debt snowball” (paying off small balances first) or the “debt avalanche” (focusing on the highest interest rate first). Effective debt management not only improves your credit score but also relieves stress and paves the way for long-term financial success."
    },
    {
      heading: "Track Your Net Worth",
      text: "Ready to put this knowledge into practice? Use our Net Worth Tracker to start monitoring your financial progress.",
      action: {
        text: "Go to Net Worth Tracker",
        link: "/net-worth"
      }
    }
  ],
  details: "Key points about assessing net worth.",
  advancedLinks: [
    { text: "Advanced Financial Assessment", url: "https://www.investopedia.com/articles/personal-finance/010516/how-assess-your-financial-situation.asp" },
    { text: "Budgeting Basics", url: "https://www.nerdwallet.com/article/finance/how-to-budget" },
    { text: "Emergency Savings Guide", url: "https://www.thebalance.com/emergency-fund-why-you-need-one-and-how-much-you-should-save-2385698" },
    { text: "Debt Management Strategies", url: "https://www.daveramsey.com/blog/get-out-of-debt-with-the-debt-snowball-plan" },
    { text: "Net Worth Calculation", url: "https://www.investopedia.com/articles/pf/07/net_worth.asp" },
    { text: "Income Streams", url: "https://www.entrepreneur.com/article/299551" }
  ]
};

function NetWorthEdu() {
  return (
    <Box sx={{ pt: 4, pb: 8 }}>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Financial Plan App
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/edu_goals">Goals</Button>
          <Button color="inherit" component={Link} to="/edu_netWorth">Net Worth</Button>
          <Button color="inherit" component={Link} to="/edu_spending">Spending</Button>
          <Button color="inherit" component={Link} to="/edu_investing">Investing</Button>
          <Button color="inherit" component={Link} to="/edu_education">Education</Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: '100%',
          minHeight: '15vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a237e 20%, #5e35b1 80%)',
          color: 'white',
          textAlign: 'center',
          p: 2,
          position: 'relative',
          borderRadius: '0 0 16px 16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <SchoolIcon sx={{ fontSize: 30 }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Financial Education Center
        </Typography>
      </Box>
      <Container maxWidth="lg">
        {/* ...existing code that will use netWorth content... */}
      </Container>
    </Box>
  );
}

export default NetWorthEdu;
