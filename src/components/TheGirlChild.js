import {useState} from "react";
import {Button, Grid } from "@mui/material";

export function TheGirlChild({ familyTree }) {
    const [motherWithMaxGirlChildren, setMotherWithMaxGirlChildren] = useState("");


    const getMotherWithMostGirls = () => {
        const names = familyTree.getMotherWithMostGirls();
        setMotherWithMaxGirlChildren(names.join(", "));
    }

    return (
        <>
            <h3>The Girl Child</h3>
            <Grid>
                <Grid item xs={8}>
                    <Button onClick={getMotherWithMostGirls} variant="contained">Get Mother with most girls</Button>
                </Grid>
            </Grid>
            <p>{motherWithMaxGirlChildren}</p>
        </>
    );
}