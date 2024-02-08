import { Box, Typography } from '@layer5/sistent';

// million-ignore
export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div" style={{ paddingTop: 2 }}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default TabPanel;
