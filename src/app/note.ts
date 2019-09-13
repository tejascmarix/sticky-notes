export class Note {
    id: number;
    old_text: string;
    new_text: string;
    isEdit: boolean;
    option: option;
    constructor() {
        this.isEdit = false;
        this.option = new option();
        this.option.theme = 'vs-dark';
        this.option.fontSize = '12px';
        this.option.language = 'csharp';
    }

}

class option {
    theme: string;
    language: string;
    fontSize: string;
}