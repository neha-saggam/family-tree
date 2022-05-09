import {useState} from "react";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {ErrorMessage} from "../atoms/ErrorMessage";

const RELATIONS = {
    PaternalUncle: "Paternal Uncle",
    MaternalUncle: "Maternal uncle",
    PaternalAunt: "Paternal aunt",
    MaternalAunt: "Maternal aunt",
    SisterInLaw: "Sister-in law",
    BrotherInLaw: "Brother-in law",
    Cousins: "Cousins",
    Father: "Father",
    Mother:  "Mother",
    Children: "Children",
    Son: "Son",
    Daughter: "Daughter",
    Brother: "Brothers",
    Sister: "Sisters",
    GrandDaughter: "Grand daughter",
};


export function MeetTheFamily({ familyTree }) {

    const [familyRelative, setFamilyRelative] = useState("");
    const [relation, setRelation] = useState("");
    const [relationName, setRelationName] = useState("");
    const [error, setError] = useState('');

    const getRelative = () => {
        if (!familyRelative || !relation) {
            setError(`Please enter all the fields`);
            return;
        }
        setError('');
        const familyMember = familyTree.getFamilyMember(familyRelative);
        const relative = familyMember.getRelation(relation);

        setRelationName(relative
            ? Array.isArray(relative)
                ? relative.map((relative) => relative.name).join(', '): relative.name : "Unable to find relation");
    }

    return (
        <>
            <h3>Meet the Family</h3>
            <Grid container spacing={1} justifyContent="center">
                <Grid item xs={2}>
                    <TextField
                        required
                        label="Family Member Name"
                        variant="outlined"
                        value={familyRelative}
                        onChange={(e) => setFamilyRelative(e.target.value)}/>
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Relation</InputLabel>
                        <Select
                            value={relation}
                            label="Relation"
                            onChange={(event) => setRelation(event.target.value)}
                        >
                            {Object.values(RELATIONS).map((relation) => <MenuItem
                                value={relation}>{relation}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid mt={4}>
                <Grid item xs={8}>
                    <Button onClick={getRelative} variant="contained">Get Relative</Button>
                </Grid>
            </Grid>
            <div style={{display: "flex", justifyContent: "space-between"}}>
            </div>
            <ErrorMessage>{error}</ErrorMessage>
            <p>{relationName}</p>
        </>
    );
}
