import { Divider, List, ListItem, ListSubheader, Typography } from '@layer5/sistent';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

export function Validation({ errors, compCount, handleClose }) {
  const [open, setOpen] = React.useState([false]);

  const handleClick = (index) => {
    let updatedState = [...open];
    updatedState[index] = !updatedState[index];
    setOpen(updatedState);
  };
  let errorCount =
    errors?.reduce((count, ele) => {
      return ele.errors.length + count;
    }, 0) || 0;

  return (
    <List
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <Typography variant="h6" sx={{ position: 'relative', left: '35px' }}>
            {compCount} component{compCount > 1 ? 's' : ''}
            {
              <Divider
                style={{
                  transform: 'rotate(90deg)',
                  width: '33%',
                  top: '-10px',
                  position: 'relative',
                  left: '120px',
                }}
              />
            }
          </Typography>
          <Typography
            variant="h6"
            sx={{
              position: 'relative',
              left: '-50px',
              borderRadius: '0.4rem',
              padding: '0.5rem',
              top: '-0.45rem',
              border: `2px solid ${errorCount > 0 ? '#F0A303' : '#3fc6b6'}`,
              color: `${errorCount > 0 ? '#F0A303' : '#3fc6b6'}`,
            }}
          >
            error{errorCount > 1 ? 's' : ''}: {errorCount}
          </Typography>
        </ListSubheader>
      }
      style={{ width: '100%', maxHeight: '18rem' }}
    >
      {errors?.length > 0 ? (
        errors?.map((err, index) => (
          <div style={{ margin: '0.6rem 0rem' }} key={index}>
            <ListItem
              button
              onClick={() => handleClick(index)}
              sx={{ backgroundColor: 'transparent' }}
            >
              <ListItemText primary={err?.service} />({err?.errors.length})
              {open[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={open[index]}
              timeout="auto"
              unmountOnExit
              onClick={() => {
                handleClose();
                // err.openRJSF();
              }}
            >
              {err?.errors.map((description, index) => (
                <Typography
                  variant="subtitle2"
                  sx={{
                    padding: '8px',
                    backgroundColor: '#e0e0e0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  key={index}
                >
                  {description?.charAt(0).toUpperCase() + description?.slice(1)}
                  {index !== err?.errors.length - 1 ? ', ' : ''}
                </Typography>
              ))}
            </Collapse>
          </div>
        ))
      ) : (
        <Typography variant="h6" align="center">
          No Validation errors.
        </Typography>
      )}
    </List>
  );
}

export default Validation;
