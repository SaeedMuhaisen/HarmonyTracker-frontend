import { PreviewServices } from "./PreviewServices"

export class Test {
    constructor() {
        console.log('hesssssllo')
        const test = {
            gender: "male",
            birthDate: 860932800000,
            preferredUnit: 'cm',
            preferredWeightUnit: 'kg',
            height: 173,
            weight: 83,
            extraData: true,
            waistNarrowest: 95.5,
            waistNavel: 96.5,
            hipWidest: 105,
            thighWidest: 59.5,
            neckNarrowest: 39.8,
            bicepsWidest: 32.5,
            forearmWidest: 26.5,
            wristNarrowest: 15.5,
            activityLevel: 1.1,
            goal: 0,
        }

        const prev=new PreviewServices()
        const temp=prev.createMacroPlan(test)
        console.log(temp)
    }
}
