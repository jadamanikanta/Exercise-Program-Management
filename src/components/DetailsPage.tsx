import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  Tooltip,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  FormControlLabel ,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DuplicateIcon from "@mui/icons-material/FileCopy";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"; // Example icon for Dumbbell
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi"; // Example icon for Resistance Band
import KingBedIcon from "@mui/icons-material/KingBed"; // Example icon for Bed
import AccessibilityIcon from "@mui/icons-material/Accessibility"; // Example icon for Front
import PanoramaHorizontalIcon from "@mui/icons-material/PanoramaHorizontal"; // Example icon for Slide
import TouchAppIcon from "@mui/icons-material/TouchApp"; // Example icon for Manual Rep Count
import RemoveIcon from '@mui/icons-material/Remove';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Divider from '@mui/material/Divider';


const ExerciseProgram = () => {
  const [programmeName, setProgrammeName] = useState("Knee Rehab Programme");
  const [exerciseCombo, setExerciseCombo] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dailyFrequency, setDailyFrequency] = useState(10);
  const [availableCombos] = useState([
    "Lower limb strengthening",
    "Static standing balance",
    "Dynamic exercises",
  ]);
  const [breakInterval, setBreakInterval] = React.useState(10);
  const exerciseComboDetails = [
    { label: "Dumbbell", icon: <FitnessCenterIcon /> },
    { label: "Kettlebell", icon: <SportsKabaddiIcon /> },
    { label: "Resistance Band", icon: <SportsKabaddiIcon /> },
    { label: "Bed", icon: <KingBedIcon /> },
    { label: "Front", icon: <AccessibilityIcon /> },
    { label: "Slide", icon: <PanoramaHorizontalIcon /> },
    { label: "Manual Rep Count", icon: <TouchAppIcon /> },
  ];

  const [exercises, setExercises] = useState([
    { name: "Knee Bends", sets: 10, holdTime: 10, weight: 0 },
    { name: "Forward Lunge (without hand support)", sets: 10, reps: 10, weight: 0 },
    { name: "VOXR1", turnsPerMinute: 10 },
  ]);

  const handleAddCombo = (combo: string) => {
    if (!exerciseCombo.includes(combo)) {
      setExerciseCombo([...exerciseCombo, combo]);
    }
  };

  const handleRemoveCombo = (combo: string) => {
    setExerciseCombo(exerciseCombo.filter((item) => item !== combo));
  };

  const handleClearAll = () => {
    setProgrammeName("");
    setExerciseCombo([]);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: "New Exercise", sets: 0, reps: 0, weight: 0 }]);
  };
   
  const incrementBreakInterval = () => {
    setBreakInterval((prev) => prev + 1);
  };

  const decrementBreakInterval = () => {
    setBreakInterval((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const deleteExercise = (index: number) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDayChange = (event, newDays) => {
    setSelectedDays(newDays);
    setSelectAll(newDays.length === days.length);
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setSelectedDays(isChecked ? days : []);
  };

  const incrementDailyFrequency = () => {
    setDailyFrequency((prev) => prev + 1);
  };
  
  const decrementDailyFrequency = () => {
    setDailyFrequency((prev) => (prev > 0 ? prev - 1 : 0));
  };
  
   
  
  return (
    
    <Box p={3}>
        <Box sx={{display:'flex',justifyContent:'center',fontWeight:'bold',mb:3}}>
            <Typography sx={{fontSize:'45px',textDecoration: "underline",textDecorationThickness: "2px", textUnderlineOffset: "5px", }}>Exercise Program Management</Typography>
        </Box>
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={12} md={5}>
          <Typography variant="body1" mb={1} sx={{fontWeight:'bold'}}>
            Programme Name
          </Typography>
          <TextField
            label="Programme Name"
            value={programmeName}
            onChange={(e) => setProgrammeName(e.target.value)}
            placeholder="Enter programme name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography variant="body1" mb={1} sx={{fontWeight:'bold'}}>
            Select Exercise Combo
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Select Combo</InputLabel>
            <Select
              onChange={(e) => handleAddCombo(e.target.value)}
              defaultValue=""
            >
              <MenuItem value="" disabled>
                Select Combo
              </MenuItem>
              {availableCombos.map((combo, index) => (
                <MenuItem key={index} value={combo}>
                  {combo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClearAll}
            fullWidth
            sx={{marginTop:3}}
          >
            Clear All
          </Button>
        </Grid>
      </Grid>

      <Box mb={3} display="flex" flexWrap="wrap" gap={1}>
        <Box sx={{width:'700px'}} >
      {exerciseComboDetails.map((combo, index) => (
        <Chip
          key={index}
          label={combo.label}
          icon={combo.icon}
          color="primary"
          sx={{
            backgroundColor: "white",
            color: "black",
            marginRight:'5px',
            marginBottom:'5px',
            border: "1px solid #ccc",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            '& .MuiChip-icon': {
              color: "#4CAF50", // Change the icon color if needed
            },
          }}
        />
      ))}
      </Box>

      <Box>
            {exerciseCombo.map((combo, index) => (
            
             <Chip
            key={index}
            label={combo}
            color="primary"
            onDelete={() => handleRemoveCombo(combo)}
            sx={{ marginRight: 1, marginBottom: 1 }}
             />
             ))}
        </Box>
    </Box>



      <Grid item xs={12}>
        <Typography variant="h5" mb={2} sx={{fontSize:'20px',fontWeight:'bold'}}>
          Exercise Programme
        </Typography>
      </Grid>

      {exercises.map((exercise, index) => (
        <Box
          key={index}
          mb={2}
          p={2}
          border={1}
          borderRadius={2}
          borderColor="grey.300"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">{exercise.name}</Typography>
            </Grid>
            {exercise.sets !== undefined && (
              <Grid item xs={4} sm={2}>
                <TextField
                  label="Sets"
                  type="number"
                  defaultValue={exercise.sets}
                  size="small"
                  fullWidth
                />
              </Grid>
            )}
            {exercise.reps !== undefined && (
              <Grid item xs={4} sm={2}>
                <TextField
                  label="Reps"
                  type="number"
                  defaultValue={exercise.reps}
                  size="small"
                  fullWidth
                />
              </Grid>
            )}
            {exercise.holdTime !== undefined && (
              <Grid item xs={4} sm={2}>
                <TextField
                  label="Hold Time"
                  type="number"
                  defaultValue={exercise.holdTime}
                  size="small"
                  fullWidth
                />
              </Grid>
            )}
            {exercise.weight !== undefined && (
              <Grid item xs={4} sm={2}>
                <TextField
                  label="Weight (Kg)"
                  type="number"
                  defaultValue={exercise.weight}
                  size="small"
                  fullWidth
                />
              </Grid>
            )}
            {exercise.turnsPerMinute !== undefined && (
              <Grid item xs={4} sm={2}>
                <TextField
                  label="Turns Per Minute"
                  type="number"
                  defaultValue={exercise.turnsPerMinute}
                  size="small"
                  fullWidth
                />
              </Grid>
            )}
            
            <Grid item xs={12} sm={2}>
              <IconButton
                onClick={() => deleteExercise(index)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" size="small" sx={{ color: "blue" }}>
                <DuplicateIcon /> Duplicate
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}

<Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
      
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addExercise}
        sx={{ mt: 2,ml: 3 ,padding:3}}
      >
        Add Exercises
      </Button>

      
      <Box
  display="flex"
  flexDirection={"column"}
  alignItems="center"
  gap={1} 
  justifyContent="flex-start" 
  sx={{ padding: 1 }}
>
  <Typography sx={{ fontSize: '22px', paddingRight: '10px',fontWeight:'bold' }}>
    Break Interval
    <Tooltip
      title="Time to rest between exercises"
      placement="top"
      sx={{ marginLeft: '10px', marginRight: '10px' }}
    >
      <HelpOutlineIcon fontSize="small" />
    </Tooltip>
  </Typography>

  <Box display="flex" alignItems="center" gap={0.5}>
    <IconButton
      onClick={decrementBreakInterval}
      size="small"
      sx={{
        border: '1px solid #ccc',
        backgroundColor: '#f0f0f0',
        '&:hover': {
          backgroundColor: '#e0e0e0',
        },
      }}
    >
      <RemoveIcon />
    </IconButton>
    <TextField
      value={breakInterval}
      variant="outlined"
      size="small"
      inputProps={{
        readOnly: true,
        style: { textAlign: 'center', width: '20px' },
      }}
    />
    <IconButton
      onClick={incrementBreakInterval}
      size="small"
      sx={{
        border: '1px solid #ccc',
        backgroundColor: '#f0f0f0',
        '&:hover': {
          backgroundColor: '#e0e0e0',
        },
      }}
    >
      <AddIcon />
    </IconButton>
    <Typography>seconds</Typography>
  </Box>
</Box>


    </Box>

    <Divider sx={{ borderWidth: 3, borderColor: 'gray', marginY: 2 }} />



    <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
        <Box>
       <Box sx={{display:'flex',justifyContent:'space-between'}}>
       <Typography sx={{fontSize:'20px',fontWeight:'bold'}}>Day Of Week</Typography>
       <FormControlLabel
        control={
            
          <Checkbox
            checked={selectAll}
            onChange={handleSelectAll}
            color="primary"
          />
        }
        label="Select All"
      />
        </Box>    
      
      <ToggleButtonGroup
        value={selectedDays}
        onChange={handleDayChange}
        color="primary"
        exclusive={false} 
        sx={{ display: "flex", gap: "2px" }}
      >
        {days.map((day, index) => (
          <ToggleButton key={index} value={day} sx={{
            borderRadius: "50%", // Make it circular
            border: "1px solid", // Ensure there's a visible border
            "&.Mui-selected": {
              backgroundColor: "blue", // Blue background when selected
              color: "white", // Optional: Change text color when selected
              "&:hover": {
                backgroundColor: "darkblue", // Darker blue on hover
              },
            },
          }} >
            {day}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      </Box>
      <Box
  display="flex"
  flexDirection={"column"}
  alignItems="center"
  gap={1}
  justifyContent="flex-start"
  sx={{ padding: 1 }}
>
  <Typography sx={{ fontSize: '22px', paddingRight: '15px',fontWeight:'bold' }}>
    Daily Frequency
  </Typography>

  <Box display="flex" alignItems="center" gap={0.5}>
    <IconButton
      onClick={decrementDailyFrequency}
      size="small"
      sx={{
        border: '1px solid #ccc',
        backgroundColor: '#f0f0f0',
        '&:hover': {
          backgroundColor: '#e0e0e0',
        },
      }}
    >
      <RemoveIcon />
    </IconButton>
    <TextField
      value={dailyFrequency}
      variant="outlined"
      size="small"
      inputProps={{
        readOnly: true,
        style: { textAlign: 'center', width: '20px' },
      }}
    />
    <IconButton
      onClick={incrementDailyFrequency}
      size="small"
      sx={{
        border: '1px solid #ccc',
        backgroundColor: '#f0f0f0',
        '&:hover': {
          backgroundColor: '#e0e0e0',
        },
      }}
    >
      <AddIcon />
    </IconButton>
    <Typography>sessions/day</Typography>
  </Box>
</Box>

    </Box>


 
    <Box>
        <Typography sx={{fontSize:'20px',mt:2,fontWeight:'bold'}}>Therapist Notes</Typography>
        <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2
      }}
    >
      <TextField
        multiline
        rows={7}
        placeholder="Add Notes"
        variant="outlined"
        fullWidth
        sx={{
          backgroundColor: "#D4EBF8",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            borderColor: "transparent",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          width: "100%",
          gap:4
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Save as Combo
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Add Entry
        </Button>
      </Box>
    </Box>

    </Box>

   

    </Box>
  );
};

export default ExerciseProgram;
