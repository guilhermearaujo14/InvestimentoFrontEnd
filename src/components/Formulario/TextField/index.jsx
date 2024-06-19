import { TextField } from "@mui/material";


// eslint-disable-next-line react/prop-types
export default function BasicTextField({label, name, type, required, value, onChange}){
return(
    <TextField 
    style={
        {
            width: '100%', 
            fontSize:'20px', 
            marginBottom: '10px',
            borderRadius: '5px'
        }
        }
    inputProps={
        {
            style:{
                color: '#fff',
                fontWeight: 'bold'
            }
        }
    }
    InputLabelProps={{
        style:{
               color: '#FFF',
            fontWeight: '400'
        }
    }}
    id="outlined-basic" 
    label={label} 
    variant="outlined" 
    name={name} 
    type={type}
    required={required}
    value={value} 
    onChange={onChange}/>
)
}