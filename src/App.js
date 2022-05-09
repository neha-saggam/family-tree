import './App.css';
import {useState} from "react";
import {FamilyTree} from "./FamilyTree";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {GENDER} from "./FamilyMember";

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

const initialFamilyTree = new FamilyTree();

function App() {

    const [familyRelative, setFamilyRelative] = useState("");
    const [relation, setRelation] = useState("");
    const [relationName, setRelationName] = useState("");
    const [mother, setMother] = useState("");
    const [childName, setChildName] = useState("");
    const [gender, setGender] = useState("");
    const [familyTree, setFamilyTree] = useState(initialFamilyTree);
    const [error, setError] = useState('');
    const [motherWithMaxGirlChildren, setMotherWithMaxGirlChildren] = useState("");

    const getRelative = () => {
        const familyMember = familyTree.getFamilyMember(familyRelative);
        const relative = familyMember.getRelation(relation);

        setRelationName(relative
            ? Array.isArray(relative)
                ? relative.map((relative) => relative.name): relative.name: "Unable to find relation");
    }

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

    const getMotherWithMostGirls = () => {
        const names = familyTree.getMotherWithMostGirls();
        setMotherWithMaxGirlChildren(names.join(", "));
    }

  return (
    <div className="App">
      <header className="App-header">
          <h3>Meet the Family</h3>
          <Grid container spacing={1} justifyContent="center">
              <Grid item xs={2}>
                  <TextField
                      required
                      label="Family Member Name"
                      variant="outlined"
                      value={familyRelative}
                      onChange={(e) => setFamilyRelative(e.target.value)} />
              </Grid>
              <Grid item xs={2}>
                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Relation</InputLabel>
                      <Select
                          value={relation}
                          label="Relation"
                          onChange={(event) => setRelation(event.target.value)}
                      >
                          {Object.values(RELATIONS).map((relation) => <MenuItem value={relation}>{relation}</MenuItem>)}
                      </Select>
                  </FormControl>
              </Grid>
          </Grid>
          <Grid mt={4}>
              <Grid item xs={8}>
                  <Button onClick={getRelative} variant="contained">Get Relative</Button>
              </Grid>
          </Grid>
          <div style={{ display: "flex", justifyContent: "space-between"}}>
          </div>
          <p>{relationName}</p>

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
          <p style={{ color: 'red' }}>{error}</p>

          <Grid mt={4}>
              <Grid item xs={8}>
                  <Button onClick={addChild} variant="contained">Add Child</Button>
              </Grid>
          </Grid>

          <h3>The Girl Child</h3>
          <Grid>
              <Grid item xs={8}>
                  <Button onClick={getMotherWithMostGirls} variant="contained">Get Mother with most girls</Button>
              </Grid>
          </Grid>
          <p>{motherWithMaxGirlChildren}</p>
      </header>
    </div>
  );
}

export default App;
