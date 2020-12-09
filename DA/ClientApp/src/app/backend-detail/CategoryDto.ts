
    export class CategoryDto
    {
        id: number;
      name: string;
      contentLink: string;
      constructor(name: string, contentLink: string) {
        this.contentLink = contentLink;
        this.name = name;
      }
    }

