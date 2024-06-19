import { TextField } from "@mui/material";


// eslint-disable-next-line react/prop-types
export default function BasicTextField({label, name, type, required, value, onChange}){
return(
    <TextField 
    style={{width: '100%', color: '#ffff', fontSize:'20px', marginBottom: '10px' }}
    inputProps={{style:{color: '#000'}}}
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