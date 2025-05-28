import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import './Codeforces.css';

// Register Chart.js components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  LineElement,
  Title
);

const Codeforces = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [codeforcesData, setCodeforcesData] = useState(null);
  const [ratingData, setRatingData] = useState(null);
  const [metrics, setMetrics] = useState({
    totalAttempted: 0,
    totalSolved: 0,
    contests: 0,
    bestRank: 0,
    maxRating: 0,
    currentRating: 0
  });

  // Generate a color palette that matches the site's theme
  const generateColorPalette = (count) => {
    const colors = [];
    const hoverColors = [];
    
    // Base teal color from the site: #64ffda
    // Generate a range of colors around this theme
    for (let i = 0; i < count; i++) {
      const hue = (180 + Math.floor(i * (360 / count))) % 360; // Cycle through hues
      colors.push(`hsla(${hue}, 100%, 70%, 0.8)`);
      hoverColors.push(`hsla(${hue}, 100%, 75%, 1)`);
    }
    
    return { colors, hoverColors };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch problems data
        const problemsResponse = await fetch('https://codeforces.com/api/user.status?handle=sanchitkoul');
        if (!problemsResponse.ok) {
          throw new Error('Failed to fetch problems data from Codeforces API');
        }
        const problemsData = await problemsResponse.json();
        setCodeforcesData(problemsData);
        
        // Fetch rating data
        const ratingResponse = await fetch('https://codeforces.com/api/user.rating?handle=sanchitkoul');
        if (!ratingResponse.ok) {
          throw new Error('Failed to fetch rating data from Codeforces API');
        }
        const ratingData = await ratingResponse.json();
        setRatingData(ratingData);
        
        // Process metrics from both data sources
        if (problemsData.status === 'OK' && ratingData.status === 'OK') {
          const submissions = problemsData.result;
          const contests = ratingData.result;
          
          // Calculate problem metrics
          const uniqueProblems = new Set(
            submissions.map(sub => `${sub.problem.contestId}-${sub.problem.index}`)
          );
          const totalAttempted = uniqueProblems.size;
          
          const solvedSubmissions = submissions.filter(sub => sub.verdict === 'OK');
          const uniqueSolvedProblems = new Set(
            solvedSubmissions.map(sub => `${sub.problem.contestId}-${sub.problem.index}`)
          );
          const totalSolved = uniqueSolvedProblems.size;
          
          // Calculate contest metrics
          const contestCount = contests.length;
          
          // Find best rank (lowest number is best)
          const bestRank = contests.length > 0 
            ? Math.min(...contests.map(contest => contest.rank))
            : 0;
          
          // Find max rating
          const maxRating = contests.length > 0 
            ? Math.max(...contests.map(contest => contest.newRating))
            : 0;
            
          // Current rating (from the most recent contest)
          const currentRating = contests.length > 0 
            ? contests[contests.length - 1].newRating
            : 0;
          
          setMetrics({
            totalAttempted,
            totalSolved,
            contests: contestCount,
            bestRank,
            maxRating,
            currentRating
          });
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching Codeforces data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const prepareTagsChartData = () => {
    if (!codeforcesData || codeforcesData.status !== 'OK') return null;
    
    // Get solved submissions
    const solvedSubmissions = codeforcesData.result.filter(sub => sub.verdict === 'OK');
    
    // Count tags from solved problems
    const tagCounts = {};
    solvedSubmissions.forEach(sub => {
      // Use a unique identifier for each problem to avoid counting the same problem multiple times
      const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
      
      // Process each tag in the problem
      if (sub.problem.tags && sub.problem.tags.length > 0) {
        sub.problem.tags.forEach(tag => {
          if (!tagCounts[tag]) {
            tagCounts[tag] = new Set();
          }
          tagCounts[tag].add(problemId);
        });
      }
    });
    
    // Convert to format needed for chart
    const sortedTags = Object.entries(tagCounts)
      .map(([tag, problemSet]) => ({ tag, count: problemSet.size }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 tags
    
    const labels = sortedTags.map(item => item.tag);
    const data = sortedTags.map(item => item.count);
    
    const { colors, hoverColors } = generateColorPalette(labels.length);
    
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          hoverBackgroundColor: hoverColors,
          borderWidth: 1,
          borderColor: '#0a0e17'
        }
      ]
    };
  };

  const prepareVerdictChartData = () => {
    if (!codeforcesData || codeforcesData.status !== 'OK') return null;
    
    // Count verdicts
    const verdictCounts = {};
    codeforcesData.result.forEach(sub => {
      const verdict = sub.verdict || 'Unknown';
      verdictCounts[verdict] = (verdictCounts[verdict] || 0) + 1;
    });
    
    // Format verdict names to be more readable
    const formatVerdict = (verdict) => {
      switch (verdict) {
        case 'OK': return 'Accepted';
        case 'WRONG_ANSWER': return 'Wrong Answer';
        case 'TIME_LIMIT_EXCEEDED': return 'Time Limit';
        case 'MEMORY_LIMIT_EXCEEDED': return 'Memory Limit';
        case 'RUNTIME_ERROR': return 'Runtime Error';
        case 'COMPILATION_ERROR': return 'Compilation Error';
        default: return verdict;
      }
    };
    
    // Convert to format needed for chart
    const labels = Object.keys(verdictCounts).map(formatVerdict);
    const data = Object.values(verdictCounts);
    
    const { colors, hoverColors } = generateColorPalette(labels.length);
    
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          hoverBackgroundColor: hoverColors,
          borderWidth: 1,
          borderColor: '#0a0e17'
        }
      ]
    };
  };

  // Prepare rating history chart data
  const prepareRatingHistoryData = () => {
    if (!ratingData || ratingData.status !== 'OK' || ratingData.result.length === 0) return null;
    
    // Sort contests by time
    const sortedContests = [...ratingData.result].sort(
      (a, b) => a.ratingUpdateTimeSeconds - b.ratingUpdateTimeSeconds
    );
    
    // Get contest numbers (1, 2, 3, ...) for x-axis
    const contestNumbers = Array.from({ length: sortedContests.length }, (_, i) => i + 1);
    
    // Get new ratings for y-axis
    const ratings = sortedContests.map(contest => contest.newRating);
    
    // Get contest names for tooltips
    const contestNames = sortedContests.map(contest => contest.contestName);
    
    return {
      labels: contestNumbers,
      datasets: [
        {
          label: 'Rating',
          data: ratings,
          borderColor: '#64ffda',
          backgroundColor: 'rgba(100, 255, 218, 0.2)',
          pointBackgroundColor: '#64ffda',
          pointBorderColor: '#0a0e17',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#64ffda',
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.2,
          fill: true,
          borderWidth: 2
        }
      ],
      contestNames // Store contest names for custom tooltips
    };
  };

  const ratingHistoryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Contests',
          color: '#ccd6f6',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#a2aabc'
        },
        grid: {
          color: 'rgba(166, 176, 207, 0.1)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Rating',
          color: '#ccd6f6',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#a2aabc'
        },
        grid: {
          color: 'rgba(166, 176, 207, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          title: function(context) {
            const datasetIndex = context[0].datasetIndex;
            const index = context[0].dataIndex;
            const ratingData = prepareRatingHistoryData();
            return ratingData ? ratingData.contestNames[index] : '';
          },
          label: function(context) {
            return `Rating: ${context.parsed.y}`;
          },
          afterLabel: function(context) {
            const datasetIndex = context.datasetIndex;
            const index = context.dataIndex;
            if (index > 0 && ratingData && ratingData.result) {
              const sortedContests = [...ratingData.result].sort(
                (a, b) => a.ratingUpdateTimeSeconds - b.ratingUpdateTimeSeconds
              );
              const ratingChange = sortedContests[index].newRating - sortedContests[index].oldRating;
              const sign = ratingChange >= 0 ? '+' : '';
              return `Change: ${sign}${ratingChange}`;
            }
            return '';
          }
        },
        titleFont: {
          family: 'Inter, system-ui, sans-serif',
          size: 14
        },
        bodyFont: {
          family: 'Inter, system-ui, sans-serif',
          size: 13
        },
        padding: 12,
        backgroundColor: 'rgba(10, 14, 23, 0.9)',
        borderColor: '#64ffda',
        borderWidth: 1,
        titleColor: '#64ffda',
        bodyColor: '#e6f1ff',
      }
    }
  };

  // Determine the rating level based on Codeforces rating
  const getRatingLevel = (rating) => {
    if (rating < 1200) return { name: 'Newbie' };
    if (rating < 1400) return { name: 'Pupil' };
    if (rating < 1600) return { name: 'Specialist' };
    if (rating < 1900) return { name: 'Expert' };
    if (rating < 2100) return { name: 'Candidate Master' };
    if (rating < 2300) return { name: 'Master' };
    if (rating < 2400) return { name: 'International Master' };
    if (rating < 2600) return { name: 'Grandmaster' };
    if (rating < 3000) return { name: 'International Grandmaster' };
    return { name: 'Legendary Grandmaster' };
  };

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ccd6f6',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12
          },
          padding: 15
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          }
        },
        titleFont: {
          family: 'Inter, system-ui, sans-serif',
          size: 14
        },
        bodyFont: {
          family: 'Inter, system-ui, sans-serif',
          size: 13
        },
        padding: 12,
        backgroundColor: 'rgba(10, 14, 23, 0.9)',
        borderColor: '#64ffda',
        borderWidth: 1,
        titleColor: '#64ffda',
        bodyColor: '#e6f1ff',
      }
    },
  };

  if (loading) {
    return (
      <section id="codeforces" className="codeforces-section">
        <div className="codeforces-container">
          <h2 className="section-title">Codeforces Stats</h2>
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading Codeforces data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="codeforces" className="codeforces-section">
        <div className="codeforces-container">
          <h2 className="section-title">Codeforces Stats</h2>
          <div className="error-message">
            <p>Failed to load Codeforces data. Please try again later.</p>
            <p className="error-details">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  const tagsChartData = prepareTagsChartData();
  const verdictChartData = prepareVerdictChartData();
  const ratingHistoryData = prepareRatingHistoryData();
  const ratingLevel = getRatingLevel(metrics.currentRating);
  const maxRatingLevel = getRatingLevel(metrics.maxRating);

  return (
    <section id="codeforces" className="codeforces-section">
      <div className="codeforces-container">
        <h2 className="section-title">Codeforces Stats</h2>
        
        <div className="codeforces-content">
          {/* Problem Metrics */}
          <div className="metrics-container">
            <div className="metric">
              <h3>Total Problems</h3>
              <div className="metric-value">{metrics.totalAttempted}</div>
            </div>
            
            <div className="metric">
              <h3>Problems Solved</h3>
              <div className="metric-value">{metrics.totalSolved}</div>
            </div>
            
            <div className="metric">
              <h3>Contests</h3>
              <div className="metric-value">{metrics.contests}</div>
            </div>
          </div>
          
          {/* Rating Metrics */}
          <div className="metrics-container rating-metrics">
            <div className="metric rating-card">
              <h3>Current Rating</h3>
              <div className="metric-value" style={{ color: ratingLevel.color }}>
                {metrics.currentRating}
              </div>
              <div className="rating-name" style={{ color: ratingLevel.color }}>
                {ratingLevel.name}
              </div>
            </div>
            
            <div className="metric rating-card">
              <h3>Max Rating</h3>
              <div className="metric-value" style={{ color: maxRatingLevel.color }}>
                {metrics.maxRating}
              </div>
              <div className="rating-name" style={{ color: maxRatingLevel.color }}>
                {maxRatingLevel.name}
              </div>
            </div>
            
            <div className="metric">
              <h3>Best Rank</h3>
              <div className="metric-value">{formatNumber(metrics.bestRank)}</div>
            </div>
          </div>
          
          {/* Charts Container */}
          <div className="charts-container">
            <div className="chart-wrapper">
              <h3>Problem Tags Distribution</h3>
              <div className="chart-box">
                {tagsChartData && <Pie data={tagsChartData} options={chartOptions} />}
              </div>
            </div>
            
            <div className="chart-wrapper">
              <h3>Verdict Distribution</h3>
              <div className="chart-box">
                {verdictChartData && <Pie data={verdictChartData} options={chartOptions} />}
              </div>
            </div>
          </div>
          
          {/* Rating History Graph */}
          <div className="rating-history-container">
            <div className="chart-wrapper rating-history">
              <h3>Rating Progression</h3>
              <div className="chart-box rating-chart">
                {ratingHistoryData && <Line data={ratingHistoryData} options={ratingHistoryOptions} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Codeforces;