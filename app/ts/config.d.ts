declare module app {
  export interface Config {
    es:{
      host:string;
      port:string;
      uri:string;
    },
    categories:Category[],
    toc:{
      templateUrl:string;
    },
    kanji:{
      base:string;
      epub:string;
    }
  }

  interface Category{
    title:string;
    dir:string;
    pdf?:string,
    epub?:string,
    pages:Page[];
  }

  interface Page{
    title:string;
    file:string;
    topics?:string[];
  }

}
