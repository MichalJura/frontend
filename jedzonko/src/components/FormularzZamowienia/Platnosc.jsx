import React from 'react';
import { useForm } from "react-hook-form";
import { Grid, TextField, Paper, Typography,Button } from '@material-ui/core';
import useStyles from './styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import apiClient from '../api/apiClient';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

// const schema = yup.object().shape({
//     miejscowosc: yup.string().required(),
//     ulica: yup.string().required(),
//     nrbudynku: yup.number().required(),
//     nrtelefonu: yup.number().required()
// });
const OrangeCheckbox = withStyles({
    root: {
        color: orange[400],
        '&$checked': {
            color: orange[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


export default function Platnosc() {
    const classes = useStyles();
    const[nr_karty,setKarta] = React.useState("");
    const[termin_karty,setTermin]= React.useState("");
    const[nr_seryjny,setNumer] = React.useState("");
    const[forma_platnosci,setPlatnosc] = React.useState("");
    const [open, setOpen] = React.useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const handleClose = (event, reason) => {
   setOpen(false);
    };

    const [state, setState] = React.useState({
        checked: true,
    });

    const handleChange1 = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        console.log("CHECK BOX VALUE", event.target.checked);
        setPlatnosc(event.target.checked);
    };

    const Platnosc = async(form) =>
    {
     await apiClient.post(`http://127.0.0.1:8000/platnosc/`,form);  
     setOpen(true);
    };

    const {  register, handleSubmit } = useForm({
        //  resolver: yupResolver(schema),
            mode: 'onSubmit',
    });

    const handleChange = (form) =>{
        form.nr_karty = nr_karty;
        form.termin_karty = termin_karty;
        form.nr_seryjny = nr_seryjny;
        console.log("FROMA PLATNOSCI", forma_platnosci);
        form.forma_platnosci = forma_platnosci;
        Platnosc(form);
    };
    return (
        <form onSubmit={handleSubmit(handleChange)}>
            <Grid container className={classes.calykomponent}>
                <Paper elevation={3} >
                    <Grid className={classes.napis}>
                        <Grid>
                            <FormControlLabel
                                control={<OrangeCheckbox checked={state.checked} onChange={handleChange1} name="checked" value={ forma_platnosci}  />}
                                label="Płatność przy odbiorze"
                            />
                        </Grid>
                        <Snackbar open={open} autoHideDuration={500} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                Udało się dodać informacje
                             </Alert>
                        </Snackbar>
                        <Typography variant="h4" variant="overline" gutterBottom>Płatność kartą</Typography>
                    </Grid>
                    <Grid className={classes.poszczegolnegridy}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Numer karty"
                            variant="outlined"
                            value={nr_karty}
                            onChange={(e) => setKarta(e.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Termin karty"
                            variant="outlined"
                            ref={register}
                            value={termin_karty}
                            onChange={(e) => setTermin(e.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Numer seryjny"
                            variant="outlined"
                            ref={register}
                            value={nr_seryjny}
                            onChange={(e) => setNumer(e.target.value)}
                        />
                         <Button className={classes.buton} type="submit">Zapłać </Button>
                    </Grid>
                </Paper>
            </Grid>
        </form>
    )
}