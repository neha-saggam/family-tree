import {FamilyMember, GENDER} from "./FamilyMember";

export class FamilyTree {
    constructor() {
        this.familyMembers = {};
        this.constructFamily();
    }

    addMember({ name, gender, isRoot = false }) {
        const familyMember = new FamilyMember({ name, gender, isRoot });
        this.familyMembers[name] = familyMember;
    }

    getFamilyMember(name) {
        return this.familyMembers[name];
    }

    addChildToFamilyMember(familyMember, childName) {
        this.familyMembers[familyMember.name].addChild(this.familyMembers[childName]);
    }

    getMothersWithoutRoot = () => {
        const females = Object.values(this.familyMembers).filter((familyMember) => familyMember.gender === GENDER.FEMALE);
        return females.filter((female) => female.children.length > 0 && !female.isRoot);
    }

    getMotherWithMostGirls = () => {
        const mothers = this.getMothersWithoutRoot();
        const mothersMap = new Map();
        mothers.forEach((mother) => {
            mothersMap.set(mother.name, mother.children.filter((child) => child.gender === GENDER.FEMALE).length);
        });
        const maxNumberOfGirlChildren =  Math.max(...mothersMap.values());
        const mothersWithMaxGirlChildren = [...mothersMap.entries()].filter(([k,v]) => v === maxNumberOfGirlChildren);
        return mothersWithMaxGirlChildren.map((m) => m[0]);
    }

    constructFamily = () => {
        const kingShan = { name: "King Shan", gender: GENDER.MALE, isRoot: true };
        this.addMember(kingShan);

        const queenAnga = { name: "Queen Anga", gender: GENDER.FEMALE, isRoot: true };
        this.addMember(queenAnga);
        this.familyMembers[kingShan.name].addSpouse(this.familyMembers[queenAnga.name]);

        const ishChild = {name: "Ish", gender: GENDER.MALE};
        this.addMember(ishChild);
        this.familyMembers[kingShan.name].addChild(this.familyMembers[ishChild.name]);


        const ambi = {name: "Ambi", gender: GENDER.FEMALE };
        const chit = {name: "Chit", gender: GENDER.MALE};
        this.addMember(ambi);
        this.addMember(chit);
        this.familyMembers[chit.name].addSpouse(this.familyMembers[ambi.name]);

        const jaya = {name: "Jaya", gender: GENDER.FEMALE};
        this.addMember(jaya);
        const drita = {name: "Drita", gender: GENDER.MALE};
        this.addMember(drita);
        this.familyMembers[drita.name].addSpouse(this.familyMembers[jaya.name]);


        const jata = {name: "Jata", gender: GENDER.MALE};
        this.addMember(jata);
        const mnu = {name: "Mnu", gender: GENDER.MALE};
        this.addMember(mnu);
        const driya = {name: "Driya", gender: GENDER.FEMALE};
        this.addMember(driya);
        this.familyMembers[driya.name].addSpouse(this.familyMembers[mnu.name]);

        this.familyMembers[drita.name].addChild(this.familyMembers[jata.name]);
        this.familyMembers[drita.name].addChild(this.familyMembers[driya.name]);

        const vrita = {name: "Vrita", gender: GENDER.MALE};
        this.addMember(vrita);

        this.familyMembers[chit.name].addChild(this.familyMembers[drita.name]);
        this.familyMembers[chit.name].addChild(this.familyMembers[vrita.name]);

        this.familyMembers[kingShan.name].addChild(this.familyMembers[chit.name]);

        const lika = {name: "Lika", gender: GENDER.FEMALE};
        this.addMember(lika);
        const vich = {name: "Vich", gender: GENDER.MALE};
        this.addMember(vich);
        const jnki = {name: "Jnki", gender: GENDER.FEMALE};
        this.addMember(jnki);
        const vila = {name: "Vila", gender: GENDER.MALE};
        this.addMember(vila);
        const gru = {name: "Gru", gender: GENDER.MALE};
        this.addMember(gru);
        const lavnya = {name: "Lavnya", gender: GENDER.FEMALE};
        this.addMember(lavnya);

        this.familyMembers[lavnya.name].addSpouse(this.familyMembers[gru.name]);
        this.familyMembers[vila.name].addSpouse(this.familyMembers[jnki.name]);

        this.familyMembers[vila.name].addChild(this.familyMembers[lavnya.name]);

        const kpila = {name: "Kpila", gender: GENDER.MALE};
        this.addMember(kpila);
        const chika = {name: "Chika", gender: GENDER.FEMALE};
        this.addMember(chika);

        this.familyMembers[chika.name].addSpouse(this.familyMembers[kpila.name]);
        this.familyMembers[vich.name].addSpouse(this.familyMembers[lika.name]);
        this.familyMembers[vich.name].addChild(this.familyMembers[vila.name]);
        this.familyMembers[vich.name].addChild(this.familyMembers[chika.name]);
        this.familyMembers[kingShan.name].addChild(this.familyMembers[vich.name]);

        const asva = {name: "Asva", gender: GENDER.MALE};
        this.addMember(asva);
        const satvy = {name: "Satvy", gender: GENDER.FEMALE};
        this.addMember(satvy);

        this.familyMembers[satvy.name].addSpouse(this.familyMembers[asva.name]);


        const krpi = {name: "Krpi", gender: GENDER.FEMALE};
        this.addMember(krpi);
        const kriya = {name: "Kriya", gender: GENDER.MALE};
        this.addMember(kriya);
        const savya = {name: "Savya", gender: GENDER.MALE};
        this.addMember(savya);

        this.familyMembers[savya.name].addSpouse(this.familyMembers[krpi.name]);
        this.familyMembers[savya.name].addChild(this.familyMembers[kriya.name]);


        const misa = {name: "Misa", gender: GENDER.MALE};
        this.addMember(misa);
        const saayan ={name: "Saayan", gender: GENDER.MALE};
        this.addMember(saayan);
        const mina = {name: "Mina", gender: GENDER.FEMALE};
        this.addMember(mina);

        this.familyMembers[saayan.name].addSpouse(this.familyMembers[mina.name]);
        this.familyMembers[saayan.name].addChild(this.familyMembers[misa.name]);

        const vyan = {name: "Vyan", gender: GENDER.MALE};
        this.addMember(vyan);
        const satya = {name: "Satya", gender: GENDER.FEMALE};
        this.addMember(satya);

        this.familyMembers[satya.name].addSpouse(this.familyMembers[vyan.name]);

        this.familyMembers[satya.name].addChild(this.familyMembers[satvy.name]);
        this.familyMembers[satya.name].addChild(this.familyMembers[savya.name]);
        this.familyMembers[satya.name].addChild(this.familyMembers[saayan.name]);

        this.familyMembers[kingShan.name].addChild(this.familyMembers[satya.name]);
    }
}