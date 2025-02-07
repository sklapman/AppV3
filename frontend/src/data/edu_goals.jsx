import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

export const goals = {
  title: "Financial Goals",
  description:
    "Setting and achieving financial goals is one of the most crucial steps toward long-term financial well-being. By clarifying what you aim to accomplish, you create a roadmap that guides your financial decisions and keeps you focused on the bigger picture. Whether it’s saving for a significant purchase in the near future, planning mid-range objectives like further education, or investing for retirement decades down the line, a well-crafted set of goals helps you stay disciplined and motivated. It allows you to measure progress, adjust strategies when necessary, and celebrate achievements along the way, ultimately leading to a more secure and fulfilling financial life.",
  summary: "Setting financial goals is essential for long-term financial success.",
  content: [
    {
      heading: "Setting Financial Goals",
      text: "Financial goals serve as both your compass and your map. They help you identify your priorities and chart a course for reaching them. These objectives give you a framework to guide your daily decisions—such as cutting back on unnecessary expenses or focusing on paying down high-interest debt. By establishing clear and attainable goals, you can measure your progress, stay motivated, and make adjustments when life inevitably changes. Whether you’re saving for a short getaway, investing in education, or planning for retirement, a well-defined goal transforms vague aspirations into tangible milestones."
    },
    {
      heading: "Short-term Goals",
      text: "Short-term goals are the quick wins that set the stage for larger achievements. Typically, these goals can be accomplished within a year and often include tasks like building a modest emergency fund, paying off a small debt, or saving for a vacation. They serve as immediate morale boosters, proving to yourself that consistent and focused effort yields real results. Short-term targets also help you form positive financial habits that support more ambitious, long-range plans."
    },
    {
      heading: "Medium-term Goals",
      text: "Medium-term goals generally span from one to five years and often involve more substantial financial commitments. Examples may include purchasing a car, saving for a down payment on a home, or funding a professional certification. Because these goals require a longer timeline, they demand both discipline and adaptability. It’s important to track your progress and recalibrate your strategy if life events—like a job change or an unexpected expense—throw you off course. The key is to remain persistent and regularly evaluate whether your plan aligns with your current priorities and resources."
    },
    {
      heading: "Long-term Goals",
      text: "Long-term goals typically extend beyond five years and encompass the biggest financial milestones of your life. Common examples include saving for retirement, paying off a mortgage, or leaving a legacy for your heirs. These goals often require a steady, multi-faceted approach that includes budgeting, investing, and risk management. Because so much can change over time, it’s critical to reassess your long-term goals periodically, making sure they still align with your evolving personal and financial circumstances. With a consistent saving and investing plan, you’ll be better prepared to handle market fluctuations and life’s surprises, ultimately paving the way for a secure and comfortable future."
    },
    {
      heading: "Prioritizing Multiple Goals",
      text: "Often, you’ll find yourself juggling several financial goals at once—such as saving for a home while also aiming to pay off student loans. Prioritizing them involves weighing factors like interest rates, life stages, and personal values. One effective strategy is to rank each goal based on urgency, long-term impact, and emotional importance. By organizing your objectives, you can allocate resources and focus your efforts more efficiently, ensuring you make steady progress on all fronts."
    },
    {
      heading: "SMART Goals",
      text: "SMART is an acronym that stands for Specific, Measurable, Achievable, Relevant, and Time-bound. Applying this framework to your financial goals makes them clearer and more attainable. Instead of vaguely stating, 'I want to save more money,' you might specify 'I will save $2,000 in the next six months by cutting down on dining out and subscription services.' This structure helps you track your progress, stay accountable, and maintain clarity on why each goal matters."
    },
    {
      heading: "Tracking and Accountability",
      text: "The best goals in the world won’t matter if you aren’t monitoring your progress. Regular tracking helps you adjust plans in real time and celebrate milestones as they come. You might use budgeting apps, spreadsheets, or even just a notebook to record income, expenses, and progress toward specific targets. Sharing your goals with a trusted friend or a financial advisor can also bolster accountability, giving you external motivation to stick to your plan."
    },
    {
      heading: "Adapting to Life Changes",
      text: "Your financial situation and personal priorities can shift drastically with events like marriage, having children, career changes, or unexpected emergencies. Periodically reviewing and adjusting your financial goals ensures they remain aligned with your current circumstances. Being flexible doesn’t mean abandoning your ambitions; rather, it helps you reallocate resources and reshuffle priorities to keep you on track, ultimately enabling you to handle life’s uncertainties without losing sight of long-term aspirations."
    }
  ],
  details: "Key points about setting financial goals.",
  advancedLinks: [
    { text: "Advanced Goal Setting", url: "https://www.thebalance.com/how-to-set-financial-goals-1289581" },
    { text: "SMART Goals", url: "https://www.smartsheet.com/blog/essential-guide-writing-smart-goals" },
    { text: "Financial Goal Examples", url: "https://www.nerdwallet.com/article/finance/financial-goals" },
    { text: "How to Achieve Financial Goals", url: "https://www.investopedia.com/articles/personal-finance/010916/5-steps-setting-and-achieving-financial-goals.asp" },
    { text: "Short-term vs Long-term Goals", url: "https://www.daveramsey.com/blog/short-term-long-term-goals" },
    { text: "Goal Setting Strategies", url: "https://www.forbes.com/sites/forbescoachescouncil/2018/01/03/15-goal-setting-strategies-for-success-this-year/" }
  ]
};

function GoalsEdu() {
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
          {/* This is where the goals content can be displayed */}
        </div>
      </Container>
    </Box>
  );
}

export default GoalsEdu;
