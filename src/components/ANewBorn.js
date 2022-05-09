import {useState} from "react";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {GENDER} from "../models/FamilyMember";
import {ErrorMessage} from "../atoms/ErrorMessage";

export function ANewBorn({ familyTree, setFamilyTree }) {

    const [mother, setMother] = useState("");
    const [childName, setChildName] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState('');

    const addChild = () => {
        if(!childName || !gender || !mother) {
            setError(`Please enter all the fields`);
            return;
        }
        setError('');
        familyTree.addMember({ name: childName, gender });
        const familyMember = familyTree.getFamilyMember(mother);
        familyTree.addChildToFamilyMember(familyMember, childName);
        setFamilyTree(familyTree);
        familyTree.setFamilyMembers(familyTree.familyMembers);
    }

    return (
        <>
            <h3>A New Born</h3>
            <Grid container spacing={1} justifyContent="center">
                <Grid item xs={2}>
                    <TextField
                        label="Mother"
                        variant="outlined"
                        value={mother}
                        required
                        onChange={(e) => setMother(e.target.value)} />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        label="Child"
                        variant="outlined"
                        value={childName}
                        required
                        onChange={(e) => setChildName(e.target.value)} />
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            value={gender}
                            label="Gender"
                            onChange={(event) => setGender(event.target.value)}
                            required
                        >
                            {Object.values(GENDER).map((gender) => <MenuItem value={gender}>{gender}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <ErrorMessage>{error}</ErrorMessage>

            <Grid mt={4}>
                <Grid item xs={8}>
                    <Button onClick={addChild} variant="contained">Add Child</Button>
                </Grid>
            </Grid>
        </>
    );
}
