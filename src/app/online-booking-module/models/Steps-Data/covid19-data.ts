import { DataParent } from "./data-parent";

export class Covid19Data extends DataParent {
    public firstOption: boolean;
    public secondOption: boolean;
    public thirdOption: boolean;
    public fourthOption: boolean;


    constructor(_order: number, first: boolean, second: boolean, third: boolean, fourth: boolean) {
        super(_order, 'COVID19preScr');
        this.firstOption = first;
        this.secondOption = second;
        this.thirdOption = third;
        this.fourthOption = fourth;
    }
}
