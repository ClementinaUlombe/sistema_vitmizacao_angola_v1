"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label'; // Import Label component
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Define interfaces for data types
interface AgeGroupData {
  ageGroup: string;
  count: number;
}
const translations: { [key: string]: string } = {
    '18-24': '18-24 anos',
    '25-34': '25-34 anos',
    '35-44': '35-44 anos',
    '45-54': '45-54 anos',
    '55-64': '55-64 anos',
    '65+': '65+ anos',
    'assault': 'Assalto',
    'theft': 'Roubo',
    'burglary': 'Invasão de domicílio',
    'vandalism': 'Vandalismo',
    'kidnapping': 'Sequestro',
    'homicide': 'Homicídio',
    'robbery': 'Roubo',
    'fraud': 'Fraude',
    'sexual-assault': 'Agressão Sexual',
    'car-theft': 'Roubo de Carro',
    'other': 'Outro',
    'male': 'Masculino',
    'female': 'Feminino',
    'unknown': 'Não especificado',
    'very-low': 'Muito Baixa',
    'low': 'Baixa',
    'medium': 'Média',
    'high': 'Alta',
    'very-high': 'Muito Alta',
    'did-not-believe-the-police-could-do-anything': 'Não acreditava que a polícia pudesse fazer algo',
    'fear-of-reprisal': 'Medo de represálias',
    'lack-of-evidence': 'Falta de provas',
    'did-not-think-it-was-important-enough': 'Não achou que fosse importante o suficiente',
    'distrust-of-the-police': 'Desconfiança na polícia',
    'student': 'Estudante',
    'unemployed': 'Desempregado',
    'employed': 'Empregado',
    'self-employed': 'Autônomo',
    'retired': 'Aposentado',
    'primary': 'Ensino primário',
    'secondary': 'Ensino secundário',
    'higher': 'Ensino superior',
    'none': 'Nenhum',
};

const translate = (key: string | null | undefined): string => {
    if (!key) {
        return 'Não especificado';
    }
    const normalizedKey = key.toLowerCase().replace(/[ _]/g, '-');
    return translations[normalizedKey] || key;
};


interface CrimeTypeData {
  name: string;
  count: number;
}

interface SecurityPerceptionData {
  gender: string;
  avgDaySecurity: number;
  avgNightSecurity: number;
}

interface CrimesByNeighborhoodData {
    neighborhood: string;
    [key: string]: string | number;
}

interface VictimizationByAgeAndGenderData {
    ageGroup: string;
    [key: string]: string | number;
}

interface ReasonsForNotReportingData {
    name: string;
    count: number;
}

interface OccupationVictimData {
    occupation: string;
    victims: number;
    nonVictims: number;
}

interface PoliceTrustData {
    trustLevel: string;
    count: number;
}

interface DayNightSecurityData {
    neighborhood: string;
    daySecurity: number;
    nightSecurity: number;
}

interface VictimizationByEducationLevelData {
    educationLevel: string;
    victims: number;
    nonVictims: number;
}


type GraphType = 'residentsByAge' | 'victimizationByCrimeType' | 'securityPerceptionByGender' | 'crimesByNeighborhood' | 'victimizationByAgeAndGender' | 'occupationVictim' | 'dayNightSecurity' | 'victimizationByEducationLevel';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const GraphDisplay: React.FC = () => {
  const [selectedGraph, setSelectedGraph] = useState<GraphType>('residentsByAge');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      let endpoint = '';
      switch (selectedGraph) {
        case 'residentsByAge':
          endpoint = '/api/data/residents-by-age-group';
          break;
        case 'victimizationByCrimeType':
          endpoint = '/api/data/victimization-by-crime-type';
          break;
        case 'securityPerceptionByGender':
          endpoint = '/api/data/security-perception-by-gender';
          break;
        case 'crimesByNeighborhood':
            endpoint = '/api/data/crimes-by-neighborhood';
            break;
        case 'victimizationByAgeAndGender':
            endpoint = '/api/data/victimization-by-age-and-gender';
            break;
        case 'occupationVictim':
            endpoint = '/api/data/occupation-victim';
            break;
        case 'dayNightSecurity':
            endpoint = '/api/data/day-night-security';
            break;
        case 'victimizationByEducationLevel':
            endpoint = '/api/data/victimization-by-education-level';
            break;
        default:
          setError('Tipo de gráfico inválido.');
          setLoading(false);
          return;
      }

      try {
        const response = await fetch(endpoint);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Falha ao buscar dados.');
        }
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedGraph]);

  const renderGraph = () => {
    if (loading) {
      return <p className="text-center text-muted-foreground">Carregando dados...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500">Erro: {error}</p>;
    }
    if (!data || data.length === 0) {
      return <p className="text-center text-muted-foreground">Nenhum dado disponível para exibir.</p>;
    }

    const chartComponents: { [key in GraphType]: JSX.Element } = {
        residentsByAge: (
            <BarChart data={data.map(item => ({...item, ageGroup: translate(item.ageGroup)})) as AgeGroupData[]}
                      margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                      }}>
                <XAxis dataKey="ageGroup" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        ),
        victimizationByCrimeType: (
            <PieChart>
                <Pie data={data.map(item => ({...item, name: translate(item.name)})) as CrimeTypeData[]} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" labelLine={false} label={renderCustomizedLabel}>
                    {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
            </PieChart>
        ),
        securityPerceptionByGender: (
            <BarChart data={data.map(item => ({...item, gender: translate(item.gender)})) as SecurityPerceptionData[]}
                      margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                      }}>
                <XAxis dataKey="gender" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Bar dataKey="avgDaySecurity" fill="#82ca9d" name="Segurança Diurna Média" />
                <Bar dataKey="avgNightSecurity" fill="#ffc658" name="Segurança Noturna Média" />
            </BarChart>
        ),
        crimesByNeighborhood: (() => {
            const crimeTypes = Array.from(new Set(data.flatMap(Object.keys))).filter(key => key !== 'neighborhood');
            const translatedCrimeTypes = crimeTypes.map(translate);
            const translatedData = data.map(item => {
                const translatedItem: { [key: string]: string | number } = { neighborhood: translate(item.neighborhood) };
                crimeTypes.forEach(crime => {
                    translatedItem[translate(crime)] = item[crime] || 0;
                });
                return translatedItem;
            });
            return (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="min-w-[180px]">Bairro</TableHead>
                                {translatedCrimeTypes.map((crime, index) => (
                                    <TableHead key={index} className="min-w-[150px]">{crime}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {translatedData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium min-w-[180px]">{item.neighborhood}</TableCell>
                                    {translatedCrimeTypes.map((crime, crimeIndex) => (
                                        <TableCell key={crimeIndex} className="min-w-[150px]">{item[crime]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            );
        })(),
        victimizationByAgeAndGender: (() => {
            const genderTypes = Array.from(new Set(data.flatMap(Object.keys))).filter(key => key !== 'ageGroup');
            const translatedGenderTypes = genderTypes.map(translate);
            const translatedData = data.map(item => {
                const translatedItem: { [key: string]: string | number } = { ageGroup: translate(item.ageGroup) };
                genderTypes.forEach(gender => {
                    translatedItem[translate(gender)] = item[gender] || 0;
                });
                return translatedItem;
            });
            return (
                <BarChart data={translatedData}
                          margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                          }}>
                    <XAxis dataKey="ageGroup" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={100} />
                    <YAxis tick={{ fontSize: 12 }} />
                    {translatedGenderTypes.map((gender, index) => <Bar key={gender} dataKey={gender} stackId="a" fill={COLORS[index % COLORS.length]} name={gender} />)}
                </BarChart>
            );
        })(),
        occupationVictim: (
            <BarChart data={data.map(item => ({...item, occupation: translate(item.occupation)})) as OccupationVictimData[]}
                      margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                      }}>
                <XAxis dataKey="occupation" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={100} />
                <YAxis tick={{ fontSize: 12 }} />
                <Bar dataKey="victims" stackId="a" fill="#8884d8" name="Vítimas" />
                <Bar dataKey="nonVictims" stackId="a" fill="#82ca9d" name="Não Vítimas" />
            </BarChart>
        ),
        dayNightSecurity: (
            <BarChart data={data.map(item => ({...item, neighborhood: translate(item.neighborhood)})) as DayNightSecurityData[]}
                      margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                      }}>
                <XAxis dataKey="neighborhood" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={100} />
                <YAxis tick={{ fontSize: 12 }} />
                <Bar dataKey="daySecurity" fill="#82ca9d" name="Segurança Diurna" />
                <Bar dataKey="nightSecurity" fill="#ffc658" name="Segurança Noturna" />
            </BarChart>
        ),
        victimizationByEducationLevel: (
            <BarChart data={data.map(item => ({...item, educationLevel: translate(item.educationLevel)})) as VictimizationByEducationLevelData[]}
                      margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                      }}>
                <XAxis dataKey="educationLevel" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={100} />
                <YAxis tick={{ fontSize: 12 }} />
                <Bar dataKey="victims" stackId="a" fill="#8884d8" name="Vítimas" />
                <Bar dataKey="nonVictims" stackId="a" fill="#82ca9d" name="Não Vítimas" />
            </BarChart>
        ),
    };

    const chart = chartComponents[selectedGraph];

    if (selectedGraph === 'crimesByNeighborhood') {
      return chart;
    }

    const height = selectedGraph === 'residentsByAge' || selectedGraph === 'victimizationByCrimeType' ? 300 : 400;

    return (
        <ResponsiveContainer width="100%" height={height}>
            {React.cloneElement(chart, {
                children: [
                    <CartesianGrid key="grid" strokeDasharray="3 3" />,
                    ...React.Children.toArray(chart.props.children),
                    <Tooltip key="tooltip" />,
                    <Legend key="legend" />,
                ],
            })}
        </ResponsiveContainer>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Visualização de Dados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="graph-select">Selecionar Gráfico:</Label>
          <Select value={selectedGraph} onValueChange={(value: GraphType) => setSelectedGraph(value)}>
            <SelectTrigger id="graph-select" className="w-[240px]">
              <SelectValue placeholder="Selecione um gráfico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residentsByAge">Residentes por Faixa Etária</SelectItem>
              <SelectItem value="victimizationByCrimeType">Vitimização por Tipo de Crime</SelectItem>
              <SelectItem value="securityPerceptionByGender">Percepção de Segurança por Gênero</SelectItem>
              <SelectItem value="crimesByNeighborhood">Crimes por Bairro</SelectItem>
              <SelectItem value="victimizationByAgeAndGender">Vitimização por Faixa Etária e Gênero</SelectItem>
              <SelectItem value="occupationVictim">Ocupação vs. Vítima de Crime</SelectItem>
              <SelectItem value="dayNightSecurity">Percepção de Segurança (Dia vs. Noite)</SelectItem>
              <SelectItem value="victimizationByEducationLevel">Vitimização por Nível de Escolaridade</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {renderGraph()}
      </CardContent>
    </Card>
  );
};

export default GraphDisplay;
