import {useState} from "react";
import {FamilyTree} from "../models/FamilyTree";
import {MeetTheFamily} from "./MeetTheFamily";
import {ANewBorn} from "./ANewBorn";
import {TheGirlChild} from "./TheGirlChild";

const initialFamilyTree = new FamilyTree();

function Main() {
    const [familyTree, setFamilyTree] = useState(initialFamilyTree);

    return (
        <div className="App">
            <header className="App-header">
                <MeetTheFamily familyTree={familyTree} />

                <ANewBorn familyTree={familyTree} setFamilyTree={setFamilyTree} />

                <TheGirlChild familyTree={familyTree} />
            </header>
        </div>
    );
}

export default Main;
