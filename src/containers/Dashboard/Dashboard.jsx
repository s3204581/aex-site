import React from 'react';
import {
  Container, Typography, Paper, Grid, Box, ListItem, ListItemText
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import ListIcon from '@mui/icons-material/List';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

// Mocked data
const growthData = [
    {year: '2020', growth: 12},
    {year: '2021', growth: 16},
    {year: '2022', growth: 18},
    {year: '2023', growth: 20},
];

const methodsData = [
    {name: 'Spear phishing', value: 400},
    {name: 'Vishing', value: 300},
    {name: 'Whaling', value: 150},
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function ReportsPage() {
    return (
        <Container style={{ marginTop: '40px' }}>
            <Typography variant="h4" gutterBottom>
                Phishing Trends & Statistics
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Box display="flex" alignItems="center" marginBottom="20px">
                            <TrendingUpIcon color="primary" style={{ marginRight: '10px' }} />
                            <Typography variant="h6">Phishing Growth Rate</Typography>
                        </Box>
                        <BarChart width={300} height={200} data={growthData}>
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="growth" fill="#8884d8" />
                        </BarChart>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Box display="flex" alignItems="center" marginBottom="20px">
                            <PieChartIcon color="primary" style={{ marginRight: '10px' }} />
                            <Typography variant="h6">Methods Used</Typography>
                        </Box>
                        <PieChart width={300} height={200}>
                            <Pie data={methodsData} cx={150} cy={100} outerRadius={80} fill="#8884d8" dataKey="value">
                                {methodsData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Box display="flex" alignItems="center" marginBottom="20px">
                            <ListIcon color="primary" style={{ marginRight: '10px' }} />
                            <Typography variant="h6">Statistics</Typography>
                        </Box>
                        <ListItem>
                            <ListItemText primary="Total phishing attempts in 2023: 20,000" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Most targeted sector: Banking and Finance" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Increase in spear phishing: 18% from last year" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Most successful method: Email phishing" />
                        </ListItem>
                    </Paper>
                </Grid>
                
            </Grid>
            
        </Container>
    );
}

export default ReportsPage;
