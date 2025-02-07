import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

export const spending = {
  title: "Spending",
  description:
    "Effectively managing how you spend your money is crucial for achieving both short- and long-term financial stability. It’s not just about cutting costs—it’s about making deliberate choices that align with your personal values and priorities. Whether you’re setting up your first budget, trying to cut down on impulse purchases, or looking to optimize your daily spending habits, a thoughtful approach to expenses can free up funds for savings, investments, and other financial goals. Proper spending management can significantly reduce stress, increase savings, and help you lead a more balanced and financially secure life.",
  summary: "Effective spending management is crucial for financial stability.",
  content: [
    {
      heading: "Understanding Spending",
      text: "Spending is the amount of money you use to purchase goods and services. Recognizing the difference between essential and discretionary spending is a vital first step toward better financial control. It helps you pinpoint your spending triggers and prioritize what truly matters. By getting a clear sense of where your money goes, you’ll gain insights into your financial habits and learn to reallocate resources more effectively."
    },
    {
      heading: "Creating a Budget",
      text: "A budget is your financial roadmap, outlining how much you plan to spend in different areas of your life. Establishing spending limits—based on both fixed and variable expenses—ensures you’re setting aside enough for bills, savings, and discretionary purchases. Budgeting doesn’t mean depriving yourself; rather, it helps you direct your resources more strategically. Over time, a well-planned budget can reduce financial stress, prevent overspending, and free up funds for larger goals."
    },
    {
      heading: "Tracking Your Expenses",
      text: "Tracking your expenses goes hand in hand with budgeting. By regularly noting down purchases—whether through an app, spreadsheet, or a simple notebook—you become more aware of your spending patterns. This awareness not only helps you adjust future expenses but also highlights areas where you might cut costs without sacrificing quality of life. Accurate expense tracking is a powerful tool for maintaining control and continuously refining your financial strategy."
    },
    {
      heading: "Reducing Unnecessary Spending",
      text: "Identifying and reducing unnecessary spending is often the quickest way to boost your savings and financial flexibility. Whether it’s a habit of grabbing daily lattes, subscribing to underused services, or impulse buying, pinpointing these leaks in your budget can free up funds for more important financial goals. Practicing mindful spending—thinking twice before every purchase—can rein in these costs and help you develop a healthier relationship with money."
    },
    {
      heading: "Needs vs. Wants",
      text: "One of the cornerstones of smart spending is learning to distinguish between needs and wants. Needs are essential items or services—such as housing, food, and basic utilities—while wants are non-essentials that enhance your lifestyle but may not be strictly necessary. Evaluating purchases through this lens helps you prioritize your money for what truly matters and limit the resources you allocate to discretionary items."
    },
    {
      heading: "Managing Impulse Buying",
      text: "Impulse buying is a major culprit behind budget overruns and financial regrets. These spur-of-the-moment purchases often serve a temporary emotional need rather than a practical purpose. You can curb impulse buying by implementing a 'cooling-off' period before making non-essential purchases, creating strict shopping lists, or allocating a fixed amount of 'fun money' each month. Reducing spur-of-the-moment spending can substantially impact your overall financial health."
    },
    {
      heading: "Optimizing Everyday Expenses",
      text: "Small daily costs—like coffee runs, takeout lunches, or unused subscription services—can add up over time. By auditing your regular expenditures, you can identify where small changes in spending habits yield big savings. Simple strategies, such as meal prepping, negotiating service fees, or using discounts and coupons, can lead to significant savings without sacrificing quality of life. Over time, these incremental improvements compound to make a substantial difference in your financial trajectory."
    },
    {
      heading: "Revisiting and Adjusting Your Budget",
      text: "A budget is never a one-and-done task; it should evolve alongside your changing life circumstances. Regular check-ins—monthly, quarterly, or annually—help you stay aligned with your goals, respond to unexpected financial developments, and take advantage of new opportunities. By remaining open to adjustments, you ensure your spending strategy remains both realistic and effective, setting you up for long-term financial stability."
    }
  ],
  details: "Key points about spending management.",
  advancedLinks: [
    { text: "Advanced Spending Strategies", url: "https://www.investopedia.com/articles/personal-finance/011216/10-ways-save-money-your-budget.asp" },
    { text: "How to Create a Budget", url: "https://www.nerdwallet.com/article/finance/how-to-budget" },
    { text: "Expense Tracking Tips", url: "https://www.thebalance.com/how-to-track-your-expenses-2385699" },
    { text: "Cutting Unnecessary Expenses", url: "https://www.daveramsey.com/blog/ways-to-cut-spending" },
    { text: "50/30/20 Budget Rule", url: "https://www.investopedia.com/terms/1/50-30-20-rule.asp" },
    { text: "Budgeting Apps", url: "https://www.cnbc.com/select/best-budgeting-apps/" }
  ]
};

// Here is an example of how you might display this on a React page
function SpendingEdu() {
  return (
    <Box sx={{ pt: 4, pb: 8 }}>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Financial Plan App
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/edu_goals">Goals</Button>
          <Button color="inherit" component={Link} to="/edu_currentFinances">Current Situation</Button>
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 1
          }}
        >
          <SchoolIcon sx={{ fontSize: 30 }} />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.5rem', md: '2rem' },
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Financial Education Center
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <div>
          {/* This is where the spending content can be displayed */}
        </div>
      </Container>
    </Box>
  );
}

export default SpendingEdu;
