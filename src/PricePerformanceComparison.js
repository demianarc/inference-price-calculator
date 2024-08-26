import React, { useState, useMemo, useCallback } from 'react';
import { 
  Box, Card, CardContent, Typography, Slider, FormControl, InputLabel, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme
} from '@mui/material';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Card sx={{ p: 1 }}>
        <Typography variant="subtitle2">{data.model}</Typography>
        <Typography variant="body2">Relative Quality: {data.relativeQuality.toFixed(2)}</Typography>
        <Typography variant="body2">Relative Cost: {data.relativeCost.toFixed(2)}</Typography>
        <Typography variant="body2">Output Speed: {data.outputSpeed.toFixed(2)} tokens/s</Typography>
      </Card>
    );
  }
  return null;
};

const PricePerformanceComparison = ({ data }) => {
  const theme = useTheme();
  const [qualityThreshold, setQualityThreshold] = useState(50);
  const [referenceModel, setReferenceModel] = useState('GPT-4o (Aug 6)');

  const processedData = useMemo(() => {
    const refModel = data.find(m => m.model === referenceModel) || data[0];
    return data
      .filter(model => model.qualityIndex >= qualityThreshold)
      .map(model => ({
        ...model,
        relativeQuality: model.qualityIndex / refModel.qualityIndex,
        relativeCost: model.price / refModel.price,
        size: Math.log(model.outputSpeed) * 5
      }))
      .sort((a, b) => (b.relativeQuality / b.relativeCost) - (a.relativeQuality / a.relativeCost));
  }, [data, qualityThreshold, referenceModel]);

  const topAlternatives = useMemo(() => processedData.slice(0, 5), [processedData]);

  const handleQualityThresholdChange = useCallback((_, newValue) => {
    setQualityThreshold(newValue);
  }, []);

  const handleReferenceModelChange = useCallback((event) => {
    setReferenceModel(event.target.value);
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Price-Performance Comparison</Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Minimum Quality Threshold</Typography>
          <Slider
            value={qualityThreshold}
            onChange={handleQualityThresholdChange}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={100}
          />
        </Box>
        
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="reference-model-label">Reference Model</InputLabel>
          <Select
            labelId="reference-model-label"
            value={referenceModel}
            label="Reference Model"
            onChange={handleReferenceModelChange}
          >
            {data.map(model => (
              <MenuItem key={model.model} value={model.model}>{model.model}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
            <XAxis 
              type="number" 
              dataKey="relativeCost" 
              name="Relative Cost" 
              domain={[0, 'dataMax']}
              tickFormatter={(value) => value.toFixed(2)}
            >
              <Label value="Relative Cost (lower is better)" offset={-40} position="insideBottom" />
            </XAxis>
            <YAxis 
              type="number" 
              dataKey="relativeQuality" 
              name="Relative Quality"
              domain={[0, 'dataMax']}
              tickFormatter={(value) => value.toFixed(2)}
            >
              <Label value="Relative Quality" angle={-90} offset={-45} position="insideLeft" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <ZAxis type="number" dataKey="size" range={[50, 400]} name="Output Speed" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Scatter 
              name="Models" 
              data={processedData} 
              fill={theme.palette.primary.main}
              stroke={theme.palette.primary.dark}
            />
          </ScatterChart>
        </ResponsiveContainer>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Top 5 Alternatives</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Model</TableCell>
                <TableCell align="right">Relative Quality</TableCell>
                <TableCell align="right">Relative Cost</TableCell>
                <TableCell align="right">Quality/Cost Ratio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topAlternatives.map((model) => (
                <TableRow key={model.model}>
                  <TableCell component="th" scope="row">{model.model}</TableCell>
                  <TableCell align="right">{model.relativeQuality.toFixed(2)}</TableCell>
                  <TableCell align="right">{model.relativeCost.toFixed(2)}</TableCell>
                  <TableCell align="right">{(model.relativeQuality / model.relativeCost).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PricePerformanceComparison;