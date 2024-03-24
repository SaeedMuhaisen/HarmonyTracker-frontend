import { SurveyResult } from "./SurveyResult";
import { BmiClassificationType } from "./Types/BmiClassificationType";

export class PreviewServices {
    constructor() {
        this.calculatorUtil = new CalculatorUtil();
    }

    createMacroPlan(bodyDetails) {
        const macros = new SurveyResult();

        const bmi = this.calculatorUtil.calculateBMI(bodyDetails.weight, bodyDetails.height);
        const age = new Date().getFullYear() - new Date(bodyDetails.birthDate).getFullYear();

        macros.setBmi(bmi);
        macros.setBmiClassificationType(BmiClassificationType.getType(bmi));

        if (bodyDetails.extraData) {
            macros.setBodyFatPercentage(this.calculatorUtil.calculateBFPWithUnits(
                bodyDetails.waistNavel,
                bodyDetails.height,
                bodyDetails.neckNarrowest,
                bodyDetails.hipWidest,
                bodyDetails.gender
            ));
            macros.setBfpType(BFPType.ExtraData);
            macros.setBmr(370 + 21.6 * (1 - macros.getBodyFatPercentage() / 100) * bodyDetails.weight);
            macros.setBmrType(BMRType.KMA);

        } else {
            macros.setBodyFatPercentage(this.calculatorUtil.calculateBFPWithBMI(bmi, age, bodyDetails.gender));
            macros.setBfpType(BFPType.BMI);
            macros.setBmr(this.calculatorUtil.calculateBMRWithMSJ(bodyDetails.height, bodyDetails.weight, age, bodyDetails.gender));
            macros.setBmrType(BMRType.MSJ);
        }
        macros.setLeanBodyMass(bodyDetails.weight - macros.getBodyFatPercentage() / 100 * bodyDetails.weight);
        macros.setBodyFatMass(bodyDetails.weight * macros.getBodyFatPercentage() / 100);
        macros.setBodyFatMassClassificationType(BodyFatMassClassificationType.getType(macros.getBodyFatPercentage(), bodyDetails.gender, age));
        console.log(macros)
        return macros;
    }
}

export class CalculatorUtil {
    calculateBMI(weight, height) {
        return weight / Math.pow(height * 0.01, 2);
    }

    calculateBFPWithBMI(bmi, age, genderType) {
        if (genderType === GenderType.male) {
            return (1.20 * bmi) + (0.23 * age) - 16.2;
        } else {
            return (1.20 * bmi) + (0.23 * age) - 5.4;
        }
    }

    calculateBMRWithMSJ(height, weight, age, genderType) {
        if (genderType === GenderType.male) {
            return 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            return 10 * weight + 6.25 * height - 5 * age - 161;
        }
    }

    calculateBFPWithUnits(waist, height, neck, hip, genderType) {
        if (genderType === GenderType.male) {
            return (495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height))) - 450;
        } else {
            return (495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height))) - 450;
        }
    }
}

const GenderType = {
    male: 'male',
    female: 'female'
};

const BFPType = {
    BMI: 'BMI',
    ExtraData: 'ExtraData',
};

const BMRType = {
    MSJ: 'MSJ',
    KMA: 'KMA',
};

const BodyFatMassClassificationType = {
    LOW: "LOW",
    EXCELLENT: "EXCELLENT",
    GOOD: "GOOD",
    FAIR: "FAIR",
    POOR: "POOR",
    HIGH: "HIGH",

    getType: function (percentage, genderType, age) {
        if (genderType === "male") {
            if (age >= 20 && age <= 29) {
                if (percentage < 8) {
                    return this.LOW;
                } else if (percentage >= 8 && percentage < 10.6) {
                    return this.EXCELLENT;
                } else if (percentage >= 10.6 && percentage < 14.9) {
                    return this.GOOD;
                } else if (percentage >= 14.9 && percentage < 18.7) {
                    return this.FAIR;
                } else if (percentage >= 18.7 && percentage < 23.2) {
                    return this.POOR;
                } else if (percentage >= 23.2) {
                    return this.HIGH;
                }
            } else if (age >= 30 && age <= 39) {
                if (percentage < 8) {
                    return this.LOW;
                } else if (percentage >= 8 && percentage < 14.6) {
                    return this.EXCELLENT;
                } else if (percentage >= 14.6 && percentage < 18.3) {
                    return this.GOOD;
                } else if (percentage >= 18.3 && percentage < 21.4) {
                    return this.FAIR;
                } else if (percentage >= 21.4 && percentage < 25) {
                    return this.POOR;
                } else if (percentage >= 25) {
                    return this.HIGH;
                }
            } else if (age >= 40 && age <= 49) {
                if (percentage < 8) {
                    return this.LOW;
                } else if (percentage >= 8 && percentage < 17.5) {
                    return this.EXCELLENT;
                } else if (percentage >= 17.5 && percentage < 20.7) {
                    return this.GOOD;
                } else if (percentage >= 20.7 && percentage < 23.5) {
                    return this.FAIR;
                } else if (percentage >= 23.5 && percentage < 26.7) {
                    return this.POOR;
                } else if (percentage >= 26.7) {
                    return this.HIGH;
                }
            } else if (age >= 50 && age <= 59) {
                if (percentage < 8) {
                    return this.LOW;
                } else if (percentage >= 8 && percentage < 19.2) {
                    return this.EXCELLENT;
                } else if (percentage >= 19.2 && percentage < 22.2) {
                    return this.GOOD;
                } else if (percentage >= 22.2 && percentage < 24.7) {
                    return this.FAIR;
                } else if (percentage >= 24.7 && percentage < 27.9) {
                    return this.POOR;
                } else if (percentage >= 27.9) {
                    return this.HIGH;
                }
            } else if (age >= 60 && age <= 1000) {
                if (percentage < 8) {
                    return this.LOW;
                } else if (percentage >= 8 && percentage < 19.8) {
                    return this.EXCELLENT;
                } else if (percentage >= 19.8 && percentage < 22.7) {
                    return this.GOOD;
                } else if (percentage >= 22.7 && percentage < 25.3) {
                    return this.FAIR;
                } else if (percentage >= 25.3 && percentage < 28.5) {
                    return this.POOR;
                } else if (percentage >= 28.5) {
                    return this.HIGH;
                }
            }
        } else if (genderType === "female") {
            if (age >= 20 && age <= 29) {
                if (percentage < 14) {
                    return this.LOW;
                } else if (percentage >= 14 && percentage < 16.6) {
                    return this.EXCELLENT;
                } else if (percentage >= 16.6 && percentage < 19.5) {
                    return this.GOOD;
                } else if (percentage >= 19.5 && percentage < 22.8) {
                    return this.FAIR;
                } else if (percentage >= 22.8 && percentage < 27.2) {
                    return this.POOR;
                } else if (percentage >= 27.2) {
                    return this.HIGH;
                }
            } else if (age >= 30 && age <= 39) {
                if (percentage < 14) {
                    return this.LOW;
                } else if (percentage >= 14 && percentage < 17.5) {
                    return this.EXCELLENT;
                } else if (percentage >= 17.5 && percentage < 20.9) {
                    return this.GOOD;
                } else if (percentage >= 20.9 && percentage < 24.7) {
                    return this.FAIR;
                } else if (percentage >= 24.7 && percentage < 29.2) {
                    return this.POOR;
                } else if (percentage >= 29.2) {
                    return this.HIGH;
                }
            } else if (age >= 40 && age <= 49) {
                if (percentage < 14) {
                    return this.LOW;
                } else if (percentage >= 14 && percentage < 19.9) {
                    return this.EXCELLENT;
                } else if (percentage >= 19.9 && percentage < 23.9) {
                    return this.GOOD;
                } else if (percentage >= 23.9 && percentage < 27.7) {
                    return this.FAIR;
                } else if (percentage >= 27.7 && percentage < 31.9) {
                    return this.POOR;
                } else if (percentage >= 31.9) {
                    return this.HIGH;
                }
            } else if (age >= 50 && age <= 59) {
                if (percentage < 14) {
                    return this.LOW;
                } else if (percentage >= 14 && percentage < 22.6) {
                    return this.EXCELLENT;
                } else if (percentage >= 22.6 && percentage < 27.1) {
                    return this.GOOD;
                } else if (percentage >= 27.1 && percentage < 30.5) {
                    return this.FAIR;
                } else if (percentage >= 30.5 && percentage < 34.6) {
                    return this.POOR;
                } else if (percentage >= 34.6) {
                    return this.HIGH;
                }
            } else if (age >= 60 && age <= 1000) {
                if (percentage < 14) {
                    return this.LOW;
                } else if (percentage >= 14 && percentage < 23.3) {
                    return this.EXCELLENT;
                } else if (percentage >= 23.3 && percentage < 28) {
                    return this.GOOD;
                } else if (percentage >= 28 && percentage < 31.4) {
                    return this.FAIR;
                } else if (percentage >= 31.4 && percentage < 35.5) {
                    return this.POOR;
                } else if (percentage >= 35.5) {
                    return this.HIGH;
                }
            }
        }
        return null;
    }
};