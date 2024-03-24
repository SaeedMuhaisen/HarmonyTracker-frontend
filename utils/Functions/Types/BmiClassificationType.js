
export class BmiClassificationType {
    constructor(lowerBound, upperBound) {
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }

    static getType(index) {
        const classifications = [
            { type: "SEVERE_THINNESS", lowerBound: 0, upperBound: 16 },
            { type: "MODERATE_THINNESS", lowerBound: 16, upperBound: 17 },
            { type: "MILD_THINNESS", lowerBound: 17, upperBound: 18.5 },
            { type: "NORMAL", lowerBound: 18.5, upperBound: 25 },
            { type: "OVERWEIGHT", lowerBound: 25, upperBound: 30 },
            { type: "OBESE_CLASS_I", lowerBound: 30, upperBound: 35 },
            { type: "OBESE_CLASS_II", lowerBound: 35, upperBound: 40 },
            { type: "OBESE_CLASS_III", lowerBound: 40, upperBound: 10000 }
        ];

        for (const classification of classifications) {
            if (index >= classification.lowerBound && index < classification.upperBound) {
                return classification.type;
            }
        }
        return null;
    }
}