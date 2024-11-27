import React, { useEffect, useState } from "react";
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
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"; 
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi"; 
import KingBedIcon from "@mui/icons-material/KingBed"; 
import AccessibilityIcon from "@mui/icons-material/Accessibility"; 
import PanoramaHorizontalIcon from "@mui/icons-material/PanoramaHorizontal"; 
import TouchAppIcon from "@mui/icons-material/TouchApp"; 
import RemoveIcon from '@mui/icons-material/Remove';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Divider from '@mui/material/Divider';
import axios from "axios";
import { createExercises  } from "../apiRequest/Exercises";


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
  
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  const [isOn, setIsOn] = useState(false);

  const getAllExercises = async () => {
    
    return [
      { name: 'Push Up', sets: 3, reps: 12, holdTime: 0, weight: 0, turnsPerMinute: 0 },
      { name: 'Squats', sets: 4, reps: 10, holdTime: 0, weight: 0, turnsPerMinute: 0 },
      { name: 'Squats', sets: 4, reps: 10, holdTime: 0, weight: 0, turnsPerMinute: 0 },
    ];
  };

  
  useEffect(() => {
    const getData = async () => {
      try {
        const responseGetOrganization = await getAllExercises();
        if (Array.isArray(responseGetOrganization)) {
          setData(responseGetOrganization); 
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    getData();
  }, []);
  


  const deleteExercise = (index: number) => {
    setData(data.filter((_, i) => i !== index)); 
  };
  

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", holdTime: "", weight: "", turnsPerMinute: "",is_deleted: false }]);
  };

  


  const saveExercises = async () => {
    try {
      setLoading(true);
      setError(""); 
      setSuccessMessage(""); 
  
      
      const response = await createExercises(exercises)
      console.log("API response:", response);
  
      
      if (response?.message == "success") {
        setSuccessMessage("Exercises saved successfully!");
        
        
        alert("Exercises successfully created!");
        window.location.reload(); 
      } else {
       
        setError("Failed to save exercises. Please try again.");
        alert(response.data.message || "Something went wrong.");
      }
    } catch (err: any) {
      
      setError("Failed to save exercises. Please try again.");
      
      
      alert("Error: " + (err?.response?.data?.message || err?.message || "Something went wrong"));
    } finally {
      setLoading(false); 
    }
  };
  
  
  
  
  const updateExercise = (index, field, value) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setExercises(updatedExercises);
  };


  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

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

  
   
  const incrementBreakInterval = () => {
    setBreakInterval((prev) => prev + 1);
  };

  const decrementBreakInterval = () => {
    setBreakInterval((prev) => (prev > 0 ? prev - 1 : 0));
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



  const saveAsCombo = async () => {
    try {
      
      const payload = {
        programmeName: programmeName, 
        selectedCombo: exerciseCombo, 
        exercises: exercises.map((exercise) => ({
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          holdTime: exercise.holdTime,
          weight: exercise.weight,
          turnsPerMinute: exercise.turnsPerMinute,
        })), 
        daysOfWeek: selectedDays, 
        notes:notes, 
      };
  
      
      const response = await fetch("http://localhost:3000/api/v1/programs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      
      if (response.ok) {
        const result = await response.json();
        console.log("Program saved successfully:", result);
        alert("Program saved successfully!");
        window.location.reload();
      } else {
        const error = await response.json();
        console.error("Error saving program:", error.message);
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
      window.location.reload();
    }
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

      <Box>
 

     
      <Box display="flex" flexDirection="column" gap={2}>
      {data.map((exercise, index) => (  
        <Box
          key={index}
          display="flex"
          width="100%"
          alignItems="center"
          sx={{ mb: 1, border: "0.5px solid", padding: 2, borderRadius: "25px" }}
        >
          <Box width="40%">
            <TextField
              label="Exercise Name"
              value={exercise.name}
              size="small"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              disabled
            />
          </Box>

          <Box width="60%">
            <Box display="flex" flexDirection={"column"} gap={1} sx={{ mb: 1 }}>
              <Box
                display="flex"
                justifyContent="right"
                alignItems="center"
                sx={{ mb: 1, gap: 6 }}
              >
                <Box
                  onClick={toggleSwitch}
                  sx={{
                    width: 60,
                    height: 30,
                    backgroundColor: isOn ? "success.main" : "grey.400",
                    borderRadius: 15,
                    position: "relative",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      backgroundColor: "white",
                      borderRadius: "50%",
                      position: "absolute",
                      top: 2,
                      left: isOn ? 32 : 2,
                      transition: "left 0.3s ease",
                    }}
                  ></Box>
                </Box>

                <IconButton color="primary" size="small" sx={{ width: 30, height: 30 }}>
                  <DuplicateIcon />
                </IconButton>

                <IconButton
                  onClick={() => deleteExercise(index)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
                <TextField
                  label="Sets"
                  value={exercise.sets}
                  type="number"
                  size="small"
                  sx={{ width: "12%" }}
                  disabled
                />
                <TextField
                  label="Reps"
                  value={exercise.reps}
                  type="number"
                  size="small"
                  sx={{ width: "12%" }}
                  disabled
                />
                <TextField
                  label="Hold Time"
                  value={exercise.holdTime}
                  type="number"
                  size="small"
                  sx={{ width: "12%" }}
                  disabled
                />
                <TextField
                  label="Weight (Kg)"
                  value={exercise.weight}
                  type="number"
                  size="small"
                  sx={{ width: "12%" }}
                  disabled
                />
                <TextField
                  label="Turns Per Minute"
                  value={exercise.turnsPerMinute}
                  type="number"
                  size="small"
                  sx={{ width: "12%" }}
                  disabled
                />
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>


        
      {exercises.map((exercise, index) => (
  <Box
    key={index}
    display="flex"
    width="100%"
    alignItems="center"
    sx={{ mb: 1, border: "0.5px solid", padding: 2, borderRadius: "25px" }}
  >
    <Box width="40%">
      <TextField
        label="Exercise Name"
        value={exercise.name}
        onChange={(e) => updateExercise(index, "name", e.target.value)}
        size="small"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },
        }}
      />
    </Box>

    <Box width="60%">
      <Box display="flex" flexDirection={"column"} gap={1} sx={{ mb: 1 }}>
        <Box
          display="flex"
          justifyContent="right"
          alignItems="center"
          sx={{ mb: 1, gap: 6 }}
        >
          <Box
            onClick={toggleSwitch}
            sx={{
              width: 60,
              height: 30,
              backgroundColor: isOn ? "success.main" : "grey.400",
              borderRadius: 15,
              position: "relative",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            <Box
              sx={{
                width: 26,
                height: 26,
                backgroundColor: "white",
                borderRadius: "50%",
                position: "absolute",
                top: 2,
                left: isOn ? 32 : 2,
                transition: "left 0.3s ease",
              }}
            ></Box>
          </Box>

          <IconButton color="primary" size="small" sx={{ width: 30, height: 30 }}>
            <DuplicateIcon />
          </IconButton>

          <IconButton
            onClick={() => deleteExercise(index)}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
        >
          <TextField
            label="Sets"
            type="number"
            value={exercise.sets}
            onChange={(e) => updateExercise(index, "sets", e.target.value)}
            size="small"
            sx={{ width: "12%" }}
          />
          <TextField
            label="Reps"
            type="number"
            value={exercise.reps}
            onChange={(e) => updateExercise(index, "reps", e.target.value)}
            size="small"
            sx={{ width: "12%" }}
          />
          <TextField
            label="Hold Time"
            type="number"
            value={exercise.holdTime}
            onChange={(e) => updateExercise(index, "holdTime", e.target.value)}
            size="small"
            sx={{ width: "12%" }}
          />
          <TextField
            label="Weight (Kg)"
            type="number"
            value={exercise.weight}
            onChange={(e) => updateExercise(index, "weight", e.target.value)}
            size="small"
            sx={{ width: "12%" }}
          />
          <TextField
            label="Turns Per Minute"
            type="number"
            value={exercise.turnsPerMinute}
            onChange={(e) =>
              updateExercise(index, "turnsPerMinute", e.target.value)
            }
            size="small"
            sx={{ width: "12%" }}
          />
        </Box>
      </Box>
      
      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={saveExercises}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Exercises"}
        </Button>
      </Box>
    </Box>
  </Box>
))}

      


      <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addExercise}
          sx={{ mt: 2, ml: 3, padding: 3 }}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Exercise"}
        </Button>

        {successMessage && <Typography color="success.main">{successMessage}</Typography>}
        {error && <Typography color="error.main">{error}</Typography>}

        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
            Break Interval
            <Tooltip title="Time to rest between exercises" placement="top">
              <HelpOutlineIcon fontSize="small" />
            </Tooltip>
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              onClick={decrementBreakInterval}
              size="small"
              sx={{ border: "1px solid #ccc", backgroundColor: "#f0f0f0" }}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              value={breakInterval}
              variant="outlined"
              size="small"
              inputProps={{ readOnly: true, style: { textAlign: "center", width: "20px" } }}
            />
            <IconButton
              onClick={incrementBreakInterval}
              size="small"
              sx={{ border: "1px solid #ccc", backgroundColor: "#f0f0f0" }}
            >
              <AddIcon />
            </IconButton>
            <Typography>seconds</Typography>
          </Box>
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
  onClick={saveAsCombo}
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
