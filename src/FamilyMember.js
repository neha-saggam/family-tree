export const GENDER = {
    MALE: "male",
    FEMALE: "female"
}

export class FamilyMember {
    constructor(params) {
        const { name, gender, isRoot = false } = params;
        //Assume name is a unique identifier
        this._name = name;
        this._gender = gender;

        this._mother = null;
        this._father = null;
        this._children = [];
        this._spouse = null;
        this._isRoot = isRoot;
    }

    get isRoot() {
        return this._isRoot;
    }

    set isRoot(value) {
        this._isRoot = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get gender() {
        return this._gender;
    }

    set gender(value) {
        this._gender = value;
    }

    get mother() {
        return this._mother;
    }

    set mother(value) {
        this._mother = value;
    }

    get father() {
        return this._father;
    }

    set father(value) {
        this._father = value;
    }

    get children() {
        return this._children;
    }

    set children(value) {
        this._children = value;
    }

    addChild = (child) => {
        const updatedChild = child;
        if(this._gender === GENDER.MALE) {
            updatedChild.mother = this._spouse;
            updatedChild.father = this;
        } else {
            updatedChild.father = this._spouse;
            updatedChild.mother = this;
        }
        const children = this._children;
        children.push(updatedChild);
        this._children = children;
        this.addChildToSpouse(updatedChild);
    }

    addSpouse = (familyMember) => {
        this._spouse = familyMember;
        familyMember._spouse = this;
    }

    addChildToSpouse(familyMember) {
        const spouseChildren = this._spouse.children;
        spouseChildren.push(familyMember);
        this._spouse._children = spouseChildren;
    }

    getPaternalUncles = () => {
        const father = this._father;
        if(!father._mother) {
            return undefined;
        }
        const grandMother = father._mother;
        const unclesAndAunties = grandMother._children;
        return unclesAndAunties
            .filter((familyMember) =>
                familyMember._gender !== GENDER.FEMALE && familyMember._name !== father._name);
    }

    getPaternalAunties = () => {
        const father = this._father;
        if(!father._mother) {
            return undefined;
        }
        const grandMother = father._mother;
        const unclesAndAunties = grandMother._children;
        return unclesAndAunties
            .filter((familyMember) =>
                familyMember._gender !== GENDER.MALE && familyMember._name !== father._name);
    }

    getMaternalUncles = () => {
        const mother = this._mother;
        if(!mother._mother) {
            return undefined;
        }
        const grandMother = mother._mother;
        const unclesAndAunties = grandMother._children;
        return unclesAndAunties
            .filter((familyMember) =>
                familyMember._gender !== GENDER.FEMALE && familyMember._name !== mother._name);
    }

    getMaternalAunties = () => {
        const mother = this._mother;
        if(!mother._mother) {
            return undefined;
        }
        const grandMother = mother._mother;
        const unclesAndAunties = grandMother._children;
        return unclesAndAunties
            .filter((familyMember) =>
                familyMember._gender !== GENDER.MALE && familyMember._name !== mother._name);
    }

    getSons = () => {
        if(!this._children) {
            return undefined;
        }
        const children = this._children;
        return children.filter((child) => child.gender !== GENDER.FEMALE);
    }

    getDaughters = () => {
        if(!this._children) {
            return undefined;
        }
        const children = this._children;
        return children.filter((child) => child.gender !== GENDER.MALE);
    }

    getBrothers = () => {
        if(!this._father) {
            return undefined;
        }
        const father = this._father;
        return father.children.filter((child) => child.gender !== GENDER.FEMALE && child.name !== this._name);
    }

    getBrotherInLaws = () => {
        if(!this._spouse) {
            return undefined;
        }
        const spouse = this._spouse;
        if(!spouse.father) {
            return undefined;
        }
        const fatherInLaw = spouse.father;
        return fatherInLaw.children.filter((child) => child.gender !== GENDER.FEMALE && child.name !== this._name);
    }

    getSisters = () => {
        if(!this._mother) {
            return undefined;
        }
        const mother = this._mother;
        return mother.children.filter((child) => child.gender !== GENDER.MALE && child.name !== this._name);
    }

    getSisterInLaws = () => {
        if(!this._spouse) {
            return undefined;
        }
        const spouse = this._spouse;
        if(!spouse.father) {
            return undefined;
        }
        const fatherInLaw = spouse.father;
        return fatherInLaw.children.filter((child) => child.gender !== GENDER.MALE && child.name !== this._name);
    }

    getGrandDaughters = () => {
        if(!this._children) {
            return undefined;
        }
        const children = this._children;
        const grandChildren = children.flatMap((child) => child._children);
        return grandChildren.filter((child) => child.gender !== GENDER.MALE);
    }

    getCousins = () => { //Children of parent sibling
        if(!this._father) {
            return undefined;
        }
        const father = this._father;
        if(!father.mother) {
            return undefined;
        }
        const grandMother = father.mother;
        const unclesAndAunties = grandMother.children.filter((child) => child._name !== father._name);
        const cousins = unclesAndAunties.flatMap((uncleOrAunty) => uncleOrAunty.children);
        return cousins;
    }

    relations =  {
        "Paternal Uncle": this.getPaternalUncles,
        "Maternal uncle": this.getMaternalUncles,
        "Paternal aunt": this.getPaternalAunties,
        "Maternal aunt": this.getMaternalAunties,
        "Sister-in law": this.getSisterInLaws,
        "Brother-in law": this.getBrotherInLaws,
        "Cousins": this.getCousins,
        "Father": () => this._father,
        "Mother": () => this._mother,
        "Children": () => this._children,
        "Son": this.getSons,
        "Daughter": this.getDaughters,
        "Brothers": this.getBrothers,
        "Sisters": this.getSisters,
        "Grand daughter": this.getGrandDaughters,
    }

    getRelation = (relation) => {
        if(!this.relations[relation]) {
            return undefined;
        }
        return this.relations[relation]();
    };
}