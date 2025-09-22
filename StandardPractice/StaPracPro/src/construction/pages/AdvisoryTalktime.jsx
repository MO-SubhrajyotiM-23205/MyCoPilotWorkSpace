import React, { useState, useMemo } from 'react';
import { Box, Paper, TextField, Button, Typography, Alert, CircularProgress, MenuItem, Divider, Chip, Table, TableHead, TableRow, TableCell, TableBody, ToggleButtonGroup, ToggleButton, Stack } from '@mui/material';
import { awsApiService } from '../services/AwsApiService';

const defaultForm = { advcode: '', batype: 'advisory' };

const AdvisoryTalktime = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [viewMode, setViewMode] = useState('formatted');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); setData(null); setLoading(true);
    try {
      const result = await awsApiService.getAdvisoryTalktimeDetails(form);
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error?.message || 'Failed to fetch talktime details');
      }
    } catch (err) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  // --- Helpers ------------------------------------------------------------
  const extractArray = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    // find first array value in object
    for (const v of Object.values(payload)) {
      if (Array.isArray(v)) return v;
    }
    return [];
  };

  const metrics = useMemo(() => {
    if (!data) return [];
    const numeric = [];
    const traverse = (obj, prefix='') => {
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        Object.entries(obj).forEach(([k,v]) => {
          const path = prefix ? `${prefix}.${k}` : k;
          if (typeof v === 'number') numeric.push({ key: path, value: v });
          else if (typeof v === 'object') traverse(v, path);
        });
      }
    };
    traverse(data);
    return numeric.sort((a,b)=>a.key.localeCompare(b.key));
  }, [data]);

  const dataArray = useMemo(() => extractArray(data), [data]);

  const handleViewMode = (_, val) => { if (val) setViewMode(val); };

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', py: 6, px: 2, backgroundColor: 'background.default' }}>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 680, p: 4 }}>
        <Typography variant="h5" gutterBottom>Advisory Talktime Details</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter an advisory code to retrieve talktime details. Token will be obtained automatically.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mb: 3 }}>
          <TextField
            required
            fullWidth
            name="advcode"
            label="Advisory Code"
            value={form.advcode}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            select
            fullWidth
            name="batype"
            label="BA Type"
            value={form.batype}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="advisory">Advisory</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button type="submit" variant="contained" disabled={loading || !form.advcode}>
              {loading ? <CircularProgress size={22} /> : 'Fetch Details'}
            </Button>
            <Button type="button" variant="outlined" onClick={() => { setForm(defaultForm); setData(null); setError(null); }} disabled={loading}>Reset</Button>
          </Box>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {data && (
          <Box>
            <Divider sx={{ mb: 2 }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={2} sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>Result</Typography>
              <ToggleButtonGroup
                size="small"
                value={viewMode}
                exclusive
                onChange={handleViewMode}
              >
                <ToggleButton value="formatted">Formatted</ToggleButton>
                <ToggleButton value="raw">Raw JSON</ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            {viewMode === 'formatted' && (
              <Box>
                {/* Metrics chips */}
                {metrics.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>Numeric Metrics</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {metrics.slice(0, 25).map(m => (
                        <Chip key={m.key} label={`${m.key}: ${m.value}`} size="small" />
                      ))}
                      {metrics.length > 25 && <Chip label={`+${metrics.length - 25} more`} size="small" color="info" />}
                    </Box>
                  </Box>
                )}

                {/* Table if array present */}
                {dataArray.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>Records ({dataArray.length})</Typography>
                    <Box sx={{ maxHeight: 380, overflow: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Table size="small" stickyHeader>
                        <TableHead>
                          <TableRow>
                            {Object.keys(dataArray[0] || {}).map(col => (
                              <TableCell key={col} sx={{ whiteSpace: 'nowrap' }}>{col}</TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dataArray.map((row, idx) => (
                            <TableRow key={idx} hover>
                              {Object.keys(dataArray[0] || {}).map(col => (
                                <TableCell key={col}>{formatValue(row[col])}</TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Box>
                )}

                {/* Fallback if nothing recognized */}
                {dataArray.length === 0 && metrics.length === 0 && (
                  <Alert severity="info">No tabular or numeric data recognized. Switch to Raw JSON view.</Alert>
                )}
              </Box>
            )}

            {viewMode === 'raw' && (
              <pre style={{ maxHeight: 400, overflow: 'auto', background: '#0d1117', color: '#e6edf3', padding: '12px', borderRadius: 6, fontSize: 13 }}>
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

// Format cell values for table
function formatValue(v) {
  if (v == null) return '';
  if (typeof v === 'number') return Number.isInteger(v) ? v : v.toFixed(2);
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}

export default AdvisoryTalktime;
