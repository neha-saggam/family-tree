import './App.css';
import {useState} from "react";
import {FamilyTree} from "./FamilyTree";
import {Button, Grid, TextField} from "@mui/material";

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

function App() {

    const [familyRelative, setFamilyRelative] = useState("");
    const [relation, setRelation] = useState("");
    const [relationName, setRelationName] = useState("");
    const [mother, setMother] = useState("");
    const [childName, setChildName] = useState("");
    const [gender, setGender] = useState("");
    const [familyTree, setFamilyTree] = useState(new FamilyTree());
    const [familyMemberOne, setFamilyMemberOne] = useState('');
    const [familyMemberTwo, setFamilyMemberTwo] = useState('');
    const [relationBetweenFamilyMembers, setRelationBetweenFamilyMembers] = useState("");
    const [motherWithMaxGirlChildren, setMotherWithMaxGirlChildren] = useState("");

    const getRelative = () => {
        const familyMember = familyTree.getFamilyMember(familyRelative);
        const relative = familyMember.getRelation(relation);

        setRelationName(relative
            ? Array.isArray(relative)
                ? relative.map((relative) => relative.name): relative.name: "Unable to find relation");
    }

    const addChild = () => {
        familyTree.addMember({ name: childName, gender });
        const familyMember = familyTree.getFamilyMember(mother);
        familyTree.addChildToFamilyMember(familyMember, childName);
        setFamilyTree(familyTree);
    }

    const getMotherWithMostGirls = () => {
        const names = familyTree.getMotherWithMostGirls();
        setMotherWithMaxGirlChildren(names.join(", "));
    }

    const getRelation = () => {
        // const familyMembers = familyTree.getMotherWithMostGirls;
    }

  return (
    <div className="App">
      <header className="App-header">
          <h3>Meet the Family</h3>
          <Grid container spacing={1} justifyContent="center">
              <Grid item xs={2}>
                  <TextField label="Family Member Name" variant="outlined" value={familyRelative} onChange={(e) => setFamilyRelative(e.target.value)} />
              </Grid>
              <Grid item xs={2}>
                  <TextField label="Relation" variant="outlined" value={relation} onChange={(e) => setRelation(e.target.value)} />
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
                      onChange={(e) => setMother(e.target.value)} />
              </Grid>
              <Grid item xs={2}>
                  <TextField
                      label="Child"
                      variant="outlined"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)} />
              </Grid>
              <Grid item xs={2}>
                  <TextField
                      label="Gender"
                      variant="outlined"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)} />
              </Grid>
          </Grid>
          <Grid mt={4}>
              <Grid item xs={8}>
                  <Button onClick={addChild} variant="contained">Add Child</Button>
              </Grid>
          </Grid>
          <div style={{ display: "flex", justifyContent: "space-between"}}>
          </div>

          <h3>The Girl Child</h3>
          <Grid mt={4}>
              <Grid item xs={8}>
                  <Button onClick={getMotherWithMostGirls} variant="contained">Get Mother with most girls</Button>
              </Grid>
          </Grid>
          <div style={{ display: "flex", justifyContent: "space-between"}}>
          </div>
          <p>{motherWithMaxGirlChildren}</p>

          <h3>Who's Your Daddy</h3>
          <Grid container spacing={1} justifyContent="center">
              <Grid item xs={2}>
                  <TextField label="Family Member Name" variant="outlined" value={familyMemberOne} onChange={(e) => setFamilyMemberOne(e.target.value)} />
              </Grid>
              <Grid item xs={2}>
                  <TextField label="Family Member Name" variant="outlined" value={familyMemberTwo} onChange={(e) => setFamilyMemberTwo(e.target.value)} />
              </Grid>
          </Grid>
          <Grid mt={4}>
              <Grid item xs={8}>
                  <Button onClick={getRelation} variant="contained">Get Relation</Button>
              </Grid>
          </Grid>
          <div style={{ display: "flex", justifyContent: "space-between"}}>
          </div>
          <p>{relationBetweenFamilyMembers}</p>
      </header>
    </div>
  );
}

export default App;
