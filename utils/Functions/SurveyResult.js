export class SurveyResult {
    constructor(bmi, bmiClassificationType, bodyFatPercentage, bfpType, bodyFatMass, bodyFatMassClassificationType, leanBodyMass, bmr, bmrType) {
        this.bmi = bmi;
        this.bmiClassificationType = bmiClassificationType;
        this.bodyFatPercentage = bodyFatPercentage;
        this.bfpType = bfpType;
        this.bodyFatMass = bodyFatMass;
        this.bodyFatMassClassificationType = bodyFatMassClassificationType;
        this.leanBodyMass = leanBodyMass;
        this.bmr = bmr;
        this.bmrType = bmrType;
    }

    // Getters
    getBmi() {
        return this.bmi;
    }

    getBmiClassificationType() {
        return this.bmiClassificationType;
    }

    getBodyFatPercentage() {
        return this.bodyFatPercentage;
    }

    getBfpType() {
        return this.bfpType;
    }

    getBodyFatMass() {
        return this.bodyFatMass;
    }

    getBodyFatMassClassificationType() {
        return this.bodyFatMassClassificationType;
    }

    getLeanBodyMass() {
        return this.leanBodyMass;
    }

    getBmr() {
        return this.bmr;
    }

    getBmrType() {
        return this.bmrType;
    }

    // Setters
    setBmi(bmi) {
        this.bmi = bmi;
    }

    setBmiClassificationType(bmiClassificationType) {
        this.bmiClassificationType = bmiClassificationType;
    }

    setBodyFatPercentage(bodyFatPercentage) {
        this.bodyFatPercentage = bodyFatPercentage;
    }

    setBfpType(bfpType) {
        this.bfpType = bfpType;
    }

    setBodyFatMass(bodyFatMass) {
        this.bodyFatMass = bodyFatMass;
    }

    setBodyFatMassClassificationType(bodyFatMassClassificationType) {
        this.bodyFatMassClassificationType = bodyFatMassClassificationType;
    }

    setLeanBodyMass(leanBodyMass) {
        this.leanBodyMass = leanBodyMass;
    }

    setBmr(bmr) {
        this.bmr = bmr;
    }

    setBmrType(bmrType) {
        this.bmrType = bmrType;
    }
}