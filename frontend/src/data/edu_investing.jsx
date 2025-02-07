import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

function InvestingEdu() {
  const [selectedSection, setSelectedSection] = useState(null);

  const handleTileClick = (section) => {
    setSelectedSection(section);
  };

  const sections = [
    { title: "Goals", link: "/edu_goals" },
    { title: "Current Situation", link: "/edu_currentFinances" },
    { title: "Spending", link: "/edu_spending" },
    { title: "Investing", link: "/edu_investing" }
  ];

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <SchoolIcon sx={{ fontSize: 30 }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Financial Education Center
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: selectedSection === section.title ? 'primary.light' : 'white',
                  color: selectedSection === section.title ? 'white' : 'black'
                }}
                onClick={() => handleTileClick(section.title)}
              >
                <Typography variant="h6">{section.title}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {selectedSection && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {selectedSection}
            </Typography>
            <Typography variant="body1">
              {/* Render the content based on the selected section */}
              {selectedSection === "Goals" && "Content for Goals..."}
              {selectedSection === "Current Situation" && "Content for Current Situation..."}
              {selectedSection === "Spending" && "Content for Spending..."}
              {selectedSection === "Investing" && "Content for Investing..."}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default InvestingEdu;

export const investing = {
  title: "Investing",
  description:
    "Investing involves putting your money to work in various assets to build wealth over time. A strong grasp of investment fundamentals enables you to make informed choices that align with your financial goals and risk tolerance. Whether you’re interested in stocks, bonds, real estate, or more complex financial instruments, understanding the basics of market behavior, diversification, and compounding is essential for growing your assets strategically and sustainably. By staying disciplined and focusing on long-term objectives, you can harness the power of investing to reach major milestones, like retirement or educational funding, while mitigating unnecessary risks.",
  summary: "Investing is a key component of building wealth over time.",
  content: [
    {
      heading: "Introduction to Investing",
      text: "Investing involves putting money into assets with the expectation of generating a return. It is a fundamental aspect of building wealth and achieving financial goals. By understanding the principles of investing, you can make informed decisions that align with your risk tolerance and financial objectives."
    },
    {
      heading: "Types of Investments",
      text: "There are various types of investments, including stocks, bonds, and real estate. Each type of investment has its own risk and return characteristics. Stocks represent ownership in a company and offer the potential for high returns, but also come with higher risk. Bonds are debt instruments that provide regular interest payments and are generally considered safer than stocks. Real estate involves purchasing property and can provide both rental income and capital appreciation."
    },
    {
      heading: "Risk and Return",
      text: "Understanding the relationship between risk and return is crucial for making informed investment decisions. Higher potential returns usually come with higher risk. It is important to assess your risk tolerance and investment horizon before making investment choices. Diversifying your portfolio can help manage risk and improve the potential for returns."
    },
    {
      heading: "Diversification",
      text: "Diversification helps reduce risk by spreading your investments across different assets. By investing in a mix of stocks, bonds, real estate, and other asset classes, you can mitigate the impact of poor performance in any single investment. Diversification is a key strategy for achieving long-term financial goals while managing risk."
    },
    {
      heading: "Investment Strategies",
      text: "There are various investment strategies that investors can use to achieve their financial goals. Some common strategies include value investing, growth investing, and income investing. Value investing involves buying undervalued stocks with the expectation that their price will increase over time. Growth investing focuses on companies with high growth potential, even if their current valuations are high. Income investing aims to generate regular income through dividends or interest payments."
    },
    {
      heading: "The Power of Compounding",
      text: "Compounding is the process of earning returns on both your original investment and the returns that investment has already generated. Over time, compounding can significantly increase the value of your investments. The earlier you start investing, the more you can benefit from the power of compounding. Consistent contributions and reinvestment of earnings are key to maximizing the benefits of compounding."
    },
    {
      heading: "Tax-Efficient Investing",
      text: "Tax-efficient investing involves strategies to minimize the impact of taxes on your investment returns. This can include using tax-advantaged accounts like IRAs and 401(k)s, as well as selecting investments that generate tax-efficient income. Understanding the tax implications of your investment decisions can help you keep more of your returns and grow your wealth more effectively."
    },
    {
      heading: "Behavioral Finance",
      text: "Behavioral finance studies the psychological factors that influence investor behavior. Emotions like fear and greed can lead to irrational investment decisions, such as panic selling during market downturns or chasing high returns during market booms. By understanding common behavioral biases, investors can develop strategies to avoid these pitfalls and make more rational investment decisions."
    },
    {
      heading: "Evaluating Investment Performance",
      text: "Regularly evaluating the performance of your investments is important for ensuring that you are on track to meet your financial goals. This involves reviewing your portfolio's returns, comparing them to relevant benchmarks, and assessing whether your investment strategy is still appropriate. Making adjustments based on performance evaluations can help you stay aligned with your financial objectives."
    },
    {
      heading: "Sustainable Investing",
      text: "Sustainable investing, also known as socially responsible investing (SRI) or environmental, social, and governance (ESG) investing, involves selecting investments based on their impact on society and the environment. Sustainable investors seek to generate positive returns while supporting companies that align with their values. This approach can help promote long-term sustainability and ethical business practices."
    },
    {
      heading: "Planning for Retirement",
      text: "Investing for retirement is a critical aspect of financial planning. It involves setting long-term goals, determining the amount of savings needed, and selecting appropriate investments to achieve those goals. Retirement planning also includes considering factors like inflation, healthcare costs, and life expectancy. By starting early and making consistent contributions, you can build a substantial retirement nest egg and enjoy financial security in your later years."
    },
    {
      heading: "Asset Allocation",
      text: "Asset allocation refers to how you distribute your investment capital across different asset classes, such as stocks, bonds, and cash. The right mix depends on your risk tolerance, time horizon, and financial objectives. Adjusting asset allocation over time is key to maintaining a balanced approach that adapts to market conditions and your evolving goals."
    },
    {
      heading: "Dollar-Cost Averaging",
      text: "Dollar-cost averaging is an investment technique where you invest a fixed amount of money at regular intervals, regardless of market conditions. This strategy helps mitigate the risk of making a lump-sum investment at the wrong time. Over the long term, dollar-cost averaging can reduce the average cost per share and smooth out the impact of market volatility."
    },
    {
      heading: "Market Volatility",
      text: "Market volatility refers to the frequency and magnitude of price movements. High volatility can be unnerving, but it can also present buying opportunities. Having a clear understanding of your investment horizon and risk tolerance helps you navigate market swings without making emotional decisions that could derail your long-term plans."
    },
    {
      heading: "Building an Investment Plan",
      text: "An investment plan acts as your roadmap for achieving financial success. It outlines your goals, risk tolerance, asset allocation, and strategies for monitoring and adjusting your portfolio. Regularly reviewing and refining this plan keeps you focused on your objectives and prepared for changes in market conditions or personal circumstances."
    }
  ],
  details: "Key points about investing.",
  advancedLinks: [
    { text: "Advanced Investing Techniques", url: "https://www.investopedia.com/articles/investing/100515/advanced-investing-strategies.asp" },
    { text: "Morningstar Research", url: "https://www.morningstar.com/" },
    { text: "Bogleheads Investing Wiki", url: "https://www.bogleheads.org/wiki/Main_Page" },
    { text: "Investor.gov (SEC)", url: "https://www.investor.gov/" },
    { text: "Motley Fool Investing Advice", url: "https://www.fool.com/" }
  ]
};
