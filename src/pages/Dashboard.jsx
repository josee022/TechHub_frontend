import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../service/api';
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  useTheme,
  alpha,
  Fade,
  Zoom
} from "@mui/material";
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';
import DevicesIcon from '@mui/icons-material/Devices';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Colores para los gráficos - Paleta más moderna y armoniosa
const COLORS = ['#3f51b5', '#00bcd4', '#4caf50', '#ff9800', '#f44336', '#9c27b0'];

const Dashboard = () => {
  const theme = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Error al cargar datos del dashboard:', err);
        setError('No se pudieron cargar los datos del dashboard. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Componente de tarjeta de estadística mejorado
  const StatCard = ({ title, value, color, icon, subtitle }) => (
    <Zoom in={true} style={{ transitionDelay: '100ms' }}>
      <Card 
        sx={{ 
          height: '100%', 
          borderRadius: '16px',
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 20px 0 rgba(0,0,0,0.15)',
          },
          background: `linear-gradient(135deg, ${alpha(color, 0.9)} 0%, ${alpha(color, 0.7)} 100%)`,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              {title}
            </Typography>
            {icon && (
              <Box sx={{ color: 'white', fontSize: 40, opacity: 0.8 }}>
                {icon}
              </Box>
            )}
          </Box>
          <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Zoom>
  );

  // Componente de gráfico mejorado
  const ChartContainer = ({ title, children, delay = 0 }) => (
    <Fade in={true} style={{ transitionDelay: `${delay}ms` }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          height: '100%', 
          borderRadius: '16px',
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.08)',
          }
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
          {title}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {children}
      </Paper>
    </Fade>
  );

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 min-h-screen">
        <Header />
        <Container maxWidth="lg" className="py-20">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" flexDirection="column">
            <CircularProgress size={60} thickness={4} sx={{ color: 'white', mb: 3 }} />
            <Typography variant="h6" sx={{ color: 'white' }}>
              Cargando estadísticas...
            </Typography>
          </Box>
        </Container>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 min-h-screen">
        <Header />
        <Container maxWidth="lg" className="py-20">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: '16px',
                maxWidth: '500px',
                textAlign: 'center'
              }}
            >
              <Typography variant="h5" color="error" gutterBottom>
                Error
              </Typography>
              <Typography variant="body1">
                {error}
              </Typography>
            </Paper>
          </Box>
        </Container>
        <Footer />
      </div>
    );
  }

  // Preparar datos para el gráfico de dispositivos por tipo
  const devicesByTypeData = stats?.devices_by_type || [];
  
  // Preparar datos para el gráfico de dispositivos por mes
  const devicesByMonthData = stats?.devices_by_month || [];
  
  // Preparar datos para el gráfico de actividad reciente
  const recentActivityData = stats?.recent_activity || [];

  // Datos para el gráfico radial de dispositivos activos vs inactivos
  const activeVsInactiveData = [
    {
      name: 'Activos',
      value: stats?.basic_stats?.active_devices || 0,
      fill: '#4caf50'
    },
    {
      name: 'Inactivos',
      value: stats?.basic_stats?.inactive_devices || 0,
      fill: '#f44336'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 min-h-screen">
      <Header />

      <Container maxWidth="lg" className="py-10">
        <Box className="mb-8">
          <Typography variant="h3" className="text-4xl font-extrabold text-white mb-2">
            Dashboard
          </Typography>
          <Typography variant="h6" className="text-white opacity-80 mb-8">
            Visualiza y analiza tus dispositivos IoT con estadísticas detalladas
          </Typography>
        </Box>

        {/* Tarjetas de estadísticas básicas */}
        <Grid container spacing={4} className="mb-8">
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Total Dispositivos" 
              value={stats?.basic_stats?.total_devices || 0} 
              color="#3f51b5"
              icon={<DevicesIcon />}
              subtitle="Dispositivos registrados"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Dispositivos Activos" 
              value={stats?.basic_stats?.active_devices || 0} 
              color="#4caf50"
              icon={<CheckCircleIcon />}
              subtitle="En funcionamiento"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Dispositivos Inactivos" 
              value={stats?.basic_stats?.inactive_devices || 0} 
              color="#f44336"
              icon={<CancelIcon />}
              subtitle="Fuera de servicio"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Calificación Promedio" 
              value={stats?.basic_stats?.avg_rating || 0} 
              color="#ff9800"
              icon={<StarIcon />}
              subtitle="Basado en reviews"
            />
          </Grid>
        </Grid>

        {/* Gráficos */}
        <Grid container spacing={4}>
          {/* Primera fila: Gráfico de dispositivos activos vs inactivos y Dispositivos por Tipo */}
          <Grid item xs={12} md={6}>
            <ChartContainer title="Estado de Dispositivos" delay={100}>
              {activeVsInactiveData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="30%" 
                    outerRadius="90%" 
                    data={activeVsInactiveData} 
                    startAngle={90} 
                    endAngle={-270}
                  >
                    <RadialBar
                      minAngle={15}
                      background
                      clockWise
                      dataKey="value"
                      cornerRadius={10}
                      label={{ fill: '#666', position: 'insideStart' }}
                    />
                    <Legend 
                      iconSize={10} 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      wrapperStyle={{ paddingLeft: '10px' }}
                    />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                  <Typography variant="body1" color="text.secondary">
                    No hay datos disponibles
                  </Typography>
                </Box>
              )}
            </ChartContainer>
          </Grid>

          {/* Gráfico de dispositivos por tipo */}
          <Grid item xs={12} md={6}>
            <ChartContainer title="Dispositivos por Tipo" delay={200}>
              {devicesByTypeData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={devicesByTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="tipo"
                      label={({ tipo, percent }) => `${tipo}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {devicesByTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [`${value} dispositivos`, props.payload.tipo]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                  <Typography variant="body1" color="text.secondary">
                    No hay datos disponibles
                  </Typography>
                </Box>
              )}
            </ChartContainer>
          </Grid>

          {/* Segunda fila: Ubicaciones más comunes (ancho completo) */}
          <Grid item xs={12}>
            <ChartContainer title="Ubicaciones más Comunes" delay={300}>
              {stats?.top_locations && stats.top_locations.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={stats.top_locations}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="ubicacion" 
                      type="category" 
                      tick={{ fontSize: 12 }}
                      width={100}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      name="Dispositivos" 
                      fill="#ff9800"
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                  <Typography variant="body1" color="text.secondary">
                    No hay datos disponibles
                  </Typography>
                </Box>
              )}
            </ChartContainer>
          </Grid>

          {/* Tercera fila: Dispositivos creados por mes (ancho completo) */}
          <Grid item xs={12}>
            <ChartContainer title="Dispositivos Creados por Mes" delay={400}>
              {devicesByMonthData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={devicesByMonthData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha('#000', 0.1)} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: alpha('#000', 0.15) }}
                    />
                    <YAxis 
                      axisLine={{ stroke: alpha('#000', 0.15) }}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: 'none'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      name="Dispositivos" 
                      fill="#3f51b5"
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                  <Typography variant="body1" color="text.secondary">
                    No hay datos disponibles
                  </Typography>
                </Box>
              )}
            </ChartContainer>
          </Grid>

          {/* Cuarta fila: Actividad reciente (ancho completo) */}
          <Grid item xs={12}>
            <ChartContainer title="Actividad Reciente (Últimos 30 días)" delay={500}>
              {recentActivityData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={recentActivityData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha('#000', 0.1)} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: alpha('#000', 0.15) }}
                    />
                    <YAxis 
                      axisLine={{ stroke: alpha('#000', 0.15) }}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: 'none'
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name="Actividad"
                      stroke="#00bcd4"
                      strokeWidth={3}
                      dot={{ r: 6, strokeWidth: 2 }}
                      activeDot={{ r: 8, strokeWidth: 0, fill: '#00bcd4' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                  <Typography variant="body1" color="text.secondary">
                    No hay datos disponibles
                  </Typography>
                </Box>
              )}
            </ChartContainer>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </div>
  );
};

export default Dashboard;
