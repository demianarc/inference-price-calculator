import React, { useState, useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Grid,
  Link,
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        },
      },
    },
  },
});

const providerLinks = {
  "DeepInfra": "https://deepinfra.com",
  "Nebius": "https://nebius.com",
  "Together AI": "https://www.together.xyz",
  "Fireworks AI": "https://www.fireworks.ai",
  "Octo AI": "https://octo.ai",
  "Replicate": "https://www.replicate.com",
  "Groq": "https://www.groq.com",
  "Lepton": "https://www.lepton.ai",
  "Cloudflare": "https://www.cloudflare.com",
  "OpenAI": "https://openai.com",
  "Anthropic": "https://www.anthropic.com",
};

const data = [
  { provider: "Nebius base", parameters: 2.4, model: "deepseek-coder-v2-lite-instruct", inputPrice: 0.20, outputPrice: 0.60 },
  { provider: "Nebius fast", parameters: 2.4, model: "deepseek-coder-v2-lite-instruct", inputPrice: 0.40, outputPrice: 1.20 },
  { provider: "Replicate", parameters: 7, model: "llama-2-7b", inputPrice: 0.05, outputPrice: 0.25 },
  { provider: "Replicate", parameters: 7, model: "llama-2-7b-chat", inputPrice: 0.05, outputPrice: 0.25 },
  { provider: "Replicate", parameters: 7, model: "mistral-7b-instruct-v0.2", inputPrice: 0.05, outputPrice: 0.25 },
  { provider: "Replicate", parameters: 7, model: "mistral-7b-v0.1", inputPrice: 0.05, outputPrice: 0.25 },
  { provider: "Nebius base", parameters: 7, model: "OLMo-7B-Instruct", inputPrice: 0.08, outputPrice: 0.24 },
  { provider: "Together AI turbo", parameters: 7, model: "mistral-7b-instruct-v0.2", inputPrice: 0.20, outputPrice: 0.20 },
  { provider: "Fireworks AI", parameters: 7, model: "mistral-7b-v0.1", inputPrice: 0.20, outputPrice: 0.20 },
  { provider: "Fireworks AI", parameters: 7, model: "llama-2-7b", inputPrice: 0.20, outputPrice: 0.20 },
  { provider: "Cloudflare", parameters: 7, model: "llama-2-7b-chat-fp16", inputPrice: 0.45, outputPrice: 6.56 },
  { provider: "Cloudflare", parameters: 7, model: "llama-2-7b-chat-int8", inputPrice: 0.05, outputPrice: 0.13 },
  { provider: "Cloudflare", parameters: 7, model: "mistral-7b-instruct", inputPrice: 0.11, outputPrice: 0.19 },
  { provider: "Deepinfra", parameters: 7, model: "Mistral-7B-v3", inputPrice: 0.06, outputPrice: 0.06 },
  { provider: "Deepinfra", parameters: 7, model: "Mistral-7B", inputPrice: 0.06, outputPrice: 0.06 },
  { provider: "Deepinfra", parameters: 7, model: "Qwen2-7b", inputPrice: 0.07, outputPrice: 0.07 },
  { provider: "Groq", parameters: 7, model: "Gemma 7B", inputPrice: 0.07, outputPrice: 0.07 },
  { provider: "Lepton", parameters: 7, model: "Mistral 7B", inputPrice: 0.07, outputPrice: 0.07 },
  { provider: "Octo AI", parameters: 7, model: "Mistral 7B", inputPrice: 0.15, outputPrice: 0.15 },
  { provider: "Octo AI", parameters: 7, model: "llama-2-7b", inputPrice: 0.15, outputPrice: 0.15 },
  { provider: "Replicate", parameters: 8, model: "llama-3-8b", inputPrice: 0.05, outputPrice: 0.25 },
  { provider: "Replicate", parameters: 8, model: "llama-3-8b-instruct", inputPrice: 0.05, outputPrice: 0.25 },
  { provider: "Nebius base", parameters: 8, model: "llama-3.1-8b-instruct", inputPrice: 0.04, outputPrice: 0.12 },
  { provider: "Nebius fast", parameters: 8, model: "llama-3.1-8b-instruct", inputPrice: 0.13, outputPrice: 0.40 },
  { provider: "Together AI Lite", parameters: 8, model: "llama-3-8b-instruct", inputPrice: 0.10, outputPrice: 0.10 },
  { provider: "Together AI turbo", parameters: 8, model: "llama-3-8b-instruct", inputPrice: 0.18, outputPrice: 0.18 },
  { provider: "Fireworks AI", parameters: 8, model: "llama-3.1-8b-instruct", inputPrice: 0.20, outputPrice: 0.20 },
  { provider: "Deepinfra", parameters: 8, model: "Llama-3.1-8B-Instruct", inputPrice: 0.06, outputPrice: 0.06 },
  { provider: "Deepinfra", parameters: 8, model: "Llama-3-8B-Instruct", inputPrice: 0.06, outputPrice: 0.06 },
  { provider: "Groq", parameters: 8, model: "Llama 3 8B", inputPrice: 0.05, outputPrice: 0.08 },
  { provider: "Lepton", parameters: 8, model: "Llama3.1 8b", inputPrice: 0.07, outputPrice: 0.07 },
  { provider: "Nebius base", parameters: 12, model: "mistral-nemo-instruct-2407", inputPrice: 0.08, outputPrice: 0.24 },
  { provider: "Nebius fast", parameters: 12, model: "mistral-nemo-instruct-2407", inputPrice: 0.16, outputPrice: 0.48 },
  { provider: "Lepton", parameters: 12, model: "mistral-nemo-instruct-2407", inputPrice: 0.18, outputPrice: 0.18 },
  { provider: "Replicate", parameters: 12.9, model: "mistral-8x7b-instruct-v0.1", inputPrice: 0.30, outputPrice: 1.00 },
  { provider: "Nebius base", parameters: 12.9, model: "mixtral-8x7B-instruct-v0.1", inputPrice: 0.17, outputPrice: 0.50 },
  { provider: "Nebius fast", parameters: 12.9, model: "mixtral-8x7B-instruct-v0.1", inputPrice: 0.40, outputPrice: 1.20 },
  { provider: "Together AI turbo", parameters: 12.9, model: "mixtral-8x7B-instruct-v0.1", inputPrice: 0.60, outputPrice: 0.60 },
  { provider: "Fireworks AI", parameters: 12.9, model: "mixtral-8x7B-instruct-v0.1", inputPrice: 0.50, outputPrice: 0.50 },
  { provider: "Deepinfra", parameters: 12.9, model: "mixtral-8x7B-chat", inputPrice: 0.24, outputPrice: 0.24 },
  { provider: "Groq", parameters: 12.9, model: "Mixtral 8x7B", inputPrice: 0.24, outputPrice: 0.24 },
  { provider: "Lepton", parameters: 12.9, model: "Mixtral 8x7b", inputPrice: 0.50, outputPrice: 0.50 },
  { provider: "Octo AI", parameters: 12.9, model: "Mixtral-8x7B", inputPrice: 0.45, outputPrice: 0.45 },
  { provider: "Replicate", parameters: 13, model: "llama-2-13b", inputPrice: 0.10, outputPrice: 0.50 },
  { provider: "Replicate", parameters: 13, model: "lama-2-13b-chat", inputPrice: 0.10, outputPrice: 0.50 },
  { provider: "Deepinfra", parameters: 13, model: "Phi-3-medium-4k", inputPrice: 0.14, outputPrice: 0.14 },
  { provider: "Lepton", parameters: 13, model: "Llama2 13b", inputPrice: 0.30, outputPrice: 0.30 },
  { provider: "Lepton", parameters: 13, model: "Nous: Hermes 13B", inputPrice: 0.18, outputPrice: 0.18 },
  { provider: "Octo AI", parameters: 13, model: "mistral-nemo-instruct-2407", inputPrice: 0.20, outputPrice: 0.20 },
  { provider: "Nebius base", parameters: 14, model: "phi-3-mini-4k-instruct", inputPrice: 0.04, outputPrice: 0.12 },
  { provider: "Nebius fast", parameters: 14, model: "phi-3-mini-4k-instruct", inputPrice: 0.13, outputPrice: 0.40 },
  { provider: "Nebius base", parameters: 39, model: "mixtral-8x22b-instruct-v0.1", inputPrice: 0.43, outputPrice: 1.30 },
  { provider: "Nebius fast", parameters: 39, model: "mixtral-8x22b-instruct-v0.1", inputPrice: 0.80, outputPrice: 2.40 },
  { provider: "Together AI turbo", parameters: 39, model: "mixtral-8x22b-instruct-v0.1", inputPrice: 1.20, outputPrice: 1.20 },
  { provider: "Fireworks AI", parameters: 39, model: "mixtral-8x22b-instruct-v0.1", inputPrice: 1.20, outputPrice: 1.20 },
  { provider: "Octo AI", parameters: 39, model: "Mixtral-8x22B", inputPrice: 1.20, outputPrice: 1.20 },
  { provider: "Replicate", parameters: 70, model: "llama-2-70b", inputPrice: 0.65, outputPrice: 2.75 },
  { provider: "Replicate", parameters: 70, model: "llama-2-70b-chat", inputPrice: 0.65, outputPrice: 2.75 },
  { provider: "Replicate", parameters: 70, model: "meta-llama-3-70b", inputPrice: 0.65, outputPrice: 2.75 },
  { provider: "Replicate", parameters: 70, model: "meta-llama-3-70b-instruct", inputPrice: 0.65, outputPrice: 2.75 },
  { provider: "Nebius base", parameters: 70, model: "llama-3.1-70B-instruct", inputPrice: 0.40, outputPrice: 1.20 },
  { provider: "Nebius fast", parameters: 70, model: "llama-3.1-70B-instruct", inputPrice: 0.60, outputPrice: 1.80 },
  { provider: "Together AI Lite", parameters: 70, model: "llama-2-70b", inputPrice: 0.54, outputPrice: 0.54 },
  { provider: "Together AI turbo", parameters: 70, model: "llama-2-70b", inputPrice: 0.88, outputPrice: 0.88 },
  { provider: "Fireworks AI", parameters: 70, model: "llama-2-70b", inputPrice: 0.90, outputPrice: 0.90 },
  { provider: "Deepinfra", parameters: 70, model: "Llama-3.1-70B-Instruct", inputPrice: 0.52, outputPrice: 0.75 },
  { provider: "Deepinfra", parameters: 70, model: "Llama-3-70B-Instruct", inputPrice: 0.52, outputPrice: 0.75 },
  { provider: "Groq", parameters: 70, model: "Llama 3 70B", inputPrice: 0.59, outputPrice: 0.79 },
  { provider: "Lepton", parameters: 70, model: "Llama3 70b", inputPrice: 0.80, outputPrice: 0.80 },
  { provider: "Octo AI", parameters: 70, model: "llama-2-70b", inputPrice: 0.90, outputPrice: 0.90 },
  { provider: "Replicate", parameters: 405, model: "llama-3.1-405b-instruct", inputPrice: 9.50, outputPrice: 9.50 },
  { provider: "Nebius base", parameters: 405, model: "llama-3.1-405b-instruct", inputPrice: 2.50, outputPrice: 7.50 },
  { provider: "Together AI turbo", parameters: 405, model: "llama-3.1-405b-instruct", inputPrice: 5.00, outputPrice: 5.00 },
  { provider: "Fireworks AI", parameters: 405, model: "llama-3.1-405b-instruct", inputPrice: 3.00, outputPrice: 3.00 },
  { provider: "Lepton", parameters: 405, model: "llama-3.1-405b-instruct", inputPrice: 2.80, outputPrice: 2.80 },
  { provider: "Octo AI", parameters: 405, model: "llama-3.1-405b-instruct", inputPrice: 3.00, outputPrice: 9.00 },
  { provider: "Deepinfra", parameters: 72, model: "Qwen2-72b", inputPrice: 0.56, outputPrice: 0.77 },
  { provider: "OpenAI", parameters: "Closed source API", model: "gpt-4o-mini", inputPrice: 0.15, outputPrice: 0.60 },
  { provider: "OpenAI", parameters: "Closed source API", model: "gpt-3.5-turbo-0125", inputPrice: 0.50, outputPrice: 1.50 },
  { provider: "OpenAI", parameters: "Closed source API", model: "gpt-4o-2024-08-06", inputPrice: 2.50, outputPrice: 10.00 },
  { provider: "OpenAI", parameters: "Closed source API", model: "gpt-4o", inputPrice: 5.00, outputPrice: 15.00 },
  { provider: "OpenAI", parameters: "Closed source API", model: "gpt-4o-2024-05-13", inputPrice: 5.00, outputPrice: 15.00 },
  { provider: "OpenAI", parameters: "Closed source API", model: "gpt-4-turbo", inputPrice: 10.00, outputPrice: 30.00 },
  { provider: "Anthropic", parameters: "Closed source API", model: "Claude 3 Haiku", inputPrice: 0.25, outputPrice: 1.25 },
  { provider: "Anthropic", parameters: "Closed source API", model: "Claude 3.5 Sonnet", inputPrice: 3.00, outputPrice: 15.00 },
  { provider: "Anthropic", parameters: "Closed source API", model: "Claude 3 Opus", inputPrice: 15.00, outputPrice: 75.00 },
];

const getModelBrand = (model) => {
  const lowerModel = model.toLowerCase();
  if (lowerModel.includes('llama')) return 'Meta';
  if (lowerModel.includes('mistral') || lowerModel.includes('mixtral')) return 'Mistral';
  if (lowerModel.includes('qwen')) return 'Alibaba';
  if (lowerModel.includes('gemma')) return 'Google';
  if (lowerModel.includes('olmo')) return 'Allenai';
  if (lowerModel.includes('phi')) return 'Microsoft';
  if (lowerModel.includes('hermes')) return 'Nous';
  if (lowerModel.includes('gpt')) return 'OpenAI';
  if (lowerModel.includes('claude')) return 'Anthropic';
  return 'Other';
};

const groupParameters = (params) => {
  if (params >= 7 && params <= 8) return '7B-8B';
  if (params >= 12 && params <= 14) return '12B-14B';
  if (params >= 70 && params <= 72) return '70B-72B';
  if (params === 39) return 'Mixtral-8x22B';
  return `${params}`;
};

const processedData = data.map(item => ({
  ...item,
  parameterGroup: groupParameters(item.parameters),
  averagePrice: (item.inputPrice + item.outputPrice) / 2,
  weightedPrice: (9 * item.inputPrice + item.outputPrice) / 10,
  modelBrand: getModelBrand(item.model)
}));

const uniqueData = processedData.filter((item, index, self) =>
  index === self.findIndex((t) => t.provider === item.provider && t.model === item.model)
);

const parameterOptions = ['All', ...new Set(uniqueData.map(item => item.parameterGroup))];
const modelBrands = ['All', 'Alibaba', 'Meta', 'Mistral', 'Google', 'Microsoft', 'Allenai', 'Nous', 'OpenAI', 'Anthropic'];
const providers = ['All', ...new Set(uniqueData.map(item => item.provider.split(' ')[0]))];


const InferencePriceCalculator = () => {
  const [selectedParameters, setSelectedParameters] = useState('All');
  const [pricingType, setPricingType] = useState('average');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedProvider, setSelectedProvider] = useState('All');

  const filteredData = useMemo(() => {
    return uniqueData
      .filter(item => selectedParameters === 'All' || item.parameterGroup === selectedParameters)
      .filter(item => selectedBrand === 'All' || item.modelBrand === selectedBrand)
      .filter(item => selectedProvider === 'All' || item.provider.startsWith(selectedProvider))
      .sort((a, b) => {
        const getPrice = (item) => {
          switch(pricingType) {
            case 'average': return item.averagePrice;
            case 'weighted': return item.weightedPrice;
            case 'input': return item.inputPrice;
            case 'output': return item.outputPrice;
            default: return item.averagePrice;
          }
        };
        return getPrice(a) - getPrice(b);
      });
  }, [selectedParameters, pricingType, selectedBrand, selectedProvider]);

  const getProviderLink = (provider) => {
    const baseProvider = provider.split(' ')[0];
    return providerLinks[baseProvider] || '#';
  };

  const getDisplayPrice = (item) => {
    switch(pricingType) {
      case 'average': return item.averagePrice;
      case 'weighted': return item.weightedPrice;
      case 'input': return item.inputPrice;
      case 'output': return item.outputPrice;
      default: return item.averagePrice;
    }
  };
  
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        background: 'linear-gradient(120deg, #e0f7fa 0%, #ffffff 100%)',
        minHeight: '100vh',
        padding: '40px 20px',
      }}>
        <Card sx={{ maxWidth: 1200, margin: 'auto', overflow: 'hidden' }}>
          <Box sx={{
            background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
            padding: '40px 20px',
            color: 'white',
          }}>
            <Typography variant="h4" gutterBottom align="center">
              AI Inference Price Explorer
            </Typography>
            <Typography variant="subtitle1" align="center" paragraph>
              Compare costs across open-source language models
            </Typography>
            <Typography variant="body2" align="center">
              Open-source models offer flexibility and cost savings for AI inference. Compare providers to optimize your projects.
            </Typography>
          </Box>
          <CardContent>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Model Size</InputLabel>
                  <Select
                    value={selectedParameters}
                    label="Model Size"
                    onChange={(e) => setSelectedParameters(e.target.value)}
                  >
                    {parameterOptions.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Pricing Type</InputLabel>
                  <Select
                    value={pricingType}
                    label="Pricing Type"
                    onChange={(e) => setPricingType(e.target.value)}
                  >
                    <MenuItem value="average">Average (1:1 ratio)</MenuItem>
                    <MenuItem value="weighted">Weighted (9:1 ratio)</MenuItem>
                    <MenuItem value="input">Input</MenuItem>
                    <MenuItem value="output">Output</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Model Brand</InputLabel>
                  <Select
                    value={selectedBrand}
                    label="Model Brand"
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    {modelBrands.map(brand => (
                      <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Provider</InputLabel>
                  <Select
                    value={selectedProvider}
                    label="Provider"
                    onChange={(e) => setSelectedProvider(e.target.value)}
                  >
                    {providers.map(provider => (
                      <MenuItem key={provider} value={provider}>{provider}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom>
              Text Model Pricing Comparison
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Provider</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Model</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price per 1M tokens</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
                      <TableCell>
                        <Link href={getProviderLink(item.provider)} target="_blank" rel="noopener noreferrer" color="primary">
                          {item.provider}
                        </Link>
                      </TableCell>
                      <TableCell>{item.model}</TableCell>
                      <TableCell>${getDisplayPrice(item).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="body2" align="right" sx={{ fontStyle: 'italic' }}>
              Dev by <Link href="https://x.com/demian_ia" target="_blank" rel="noopener noreferrer">Dylan</Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default InferencePriceCalculator;